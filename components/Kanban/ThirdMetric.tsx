import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import apolloClient from "../../context/apollo-client";
import { useAppContext } from "../../context/AppContext";
import List from "../Lists/List";

const ThirdMetric = () => {
  const [status, setStatus] = useState([]);
  const [issues, setIssues] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [appState, setAppState] = useAppContext();

  const QUERY_ALL_STATUS = gql`
    query {
      node(id: "${appState.projectId}") {
        ... on ProjectV2 {
          fields(first: 50) {
            nodes {
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const QUERY_ALL_ISSUES_WITH_STATUS = gql`
    query {
      search(type: ISSUE, query: "project:${appState.projectOwner}/${appState.projectNumber} is:issue", last: 100) {
        edges {
          node {
            ... on Issue {
              title
              closedAt
              createdAt
              closed
              projectItems(first: 10) {
                nodes {
                  fieldValues(first: 20) {
                    nodes {
                      ... on ProjectV2ItemFieldSingleSelectValue {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  useEffect(() => {
    async function fetchData() {
      const response = await apolloClient
        .query({
          query: QUERY_ALL_STATUS,
          context: {
            headers: { authorization: `Bearer ${appState.githubToken}` },
          },
        })
        .catch((e) => {
          return undefined;
        });

      if (response === undefined) {
        console.log("Problem");
      } else {
        const nodes = response.data.node.fields.nodes;
        setStatus(
          nodes.reduce((pv, cv) => {
            if (cv.id) {
              pv = cv.options;
            }
            return pv;
          }, [])
        );
      }
    }
    fetchData();
  }, [QUERY_ALL_STATUS, appState.githubToken]);

  useEffect(() => {
    async function fetchData() {
      const response = await apolloClient
        .query({
          query: QUERY_ALL_ISSUES_WITH_STATUS,
          context: {
            headers: { authorization: `Bearer ${appState.githubToken}` },
          },
        })
        .catch((e) => {
          return undefined;
        });

      if (response === undefined) {
        console.log("Problem");
      } else {
        const nodes = response.data.search.edges;
        setIssues(
          nodes.reduce((pv, cv) => {
            if (cv.node.title) {
              const index = cv.node.projectItems.nodes[0].fieldValues.nodes
                .map((object) => object.__typename)
                .indexOf("ProjectV2ItemFieldSingleSelectValue");

              pv.push({
                title: cv.node.title,
                column:
                  cv.node.projectItems.nodes[0].fieldValues.nodes[index].name,
              });
            }
            return pv;
          }, [])
        );
      }
    }
    fetchData();
  }, [QUERY_ALL_ISSUES_WITH_STATUS, appState.githubToken]);

  return (
    <div className="first-question">
      <h1>3. Select column status :</h1>
      <div className="dropdown-field">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {status.map((stat) => {
            return (
              <option key={stat.id} value={stat.name}>
                {stat.name}
              </option>
            );
          })}
        </select>
        <i className="ph-caret-down"></i>
      </div>
      <h2>
        {`The column : ${selectedStatus} has 
        ${issues.reduce((pv, cv) => {
          if (cv.column === selectedStatus) {
            return pv + 1;
          }
          return pv;
        }, 0)}
        issues`}
      </h2>
    </div>
  );
};

export default ThirdMetric;
