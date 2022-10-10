import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import apolloClient from "../../context/apollo-client";
import { useAppContext } from "../../context/AppContext";

const FirstMetric = () => {
  const [issues, setIssues] = useState([]);

  const [issueStartDate, setIssueStartDate] = useState(new Date());
  const [issueEndDate, setIssueEndDate] = useState(new Date());
  const [issueClosed, setIssueClosed] = useState(false);

  const [selectedIssue, setSelectedIssue] = useState("");
  const [appState, setAppState] = useAppContext();

  const QUERY_ALL_ISSUES = gql`
    query {
      search(type: ISSUE, query: "project:${appState.projectOwner}/${appState.projectNumber} is:issue", last: 100) {
        edges {
          node {
            ... on Issue {
              title
              createdAt
              closedAt
              body
              id
              closed
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
          query: QUERY_ALL_ISSUES,
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
        setIssues(response.data.search.edges);
      }
    }
    fetchData();
  }, [QUERY_ALL_ISSUES, appState.githubToken]);

  const QUERY_ISSUE = gql`
    query {
      node(id: "${selectedIssue}") {
        ... on Issue {
          title
          createdAt
          closedAt
          id
          closed
        }
      }
    }
  `;

  useEffect(() => {
    async function fetchData() {
      const response = await apolloClient
        .query({
          query: QUERY_ISSUE,
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
        setIssueStartDate(response.data.node.createdAt);
        setIssueEndDate(response.data.node.closedAt);
        setIssueClosed(response.data.node.closed);
      }
    }
    fetchData();
  }, [QUERY_ISSUE, appState.githubToken]);

  const startDate = new Date(issueStartDate);
  const actualDate = issueClosed ? new Date(issueEndDate) : new Date();
  const leadTime = Math.round((actualDate - startDate) / (1000 * 60));

  return (
    <div className="first-question">
      <h1>1. Select your Issue :</h1>
      <div className="dropdown-field">
        <select
          value={selectedIssue}
          onChange={(e) => setSelectedIssue(e.target.value)}
        >
          {issues.map((issue) => {
            if (issue.node.id) {
              return (
                <option key={issue.node.id} value={issue.node.id}>
                  {issue.node.title}
                </option>
              );
            }
          })}
        </select>
        <i className="ph-caret-down"></i>
      </div>

      <h2>This issue is {issueClosed ? `closed` : `open`}</h2>
      <h2>
        The LeadTime of this issue
        <span>
          {issueClosed ? " was " : " is "}
          {`${leadTime} minutes or ${Math.round(leadTime / 60)} hours`}
        </span>
      </h2>
    </div>
  );
};

export default FirstMetric;
