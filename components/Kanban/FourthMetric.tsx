import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import apolloClient from "../../context/apollo-client";
import { useAppContext } from "../../context/AppContext";

const FourthMetric = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [issues, setIssues] = useState([]);

  const [appState, setAppState] = useAppContext();

  const QUERY_CLOSED_ISSUES_WITH_DATES = gql`
        query {
          search(
            type: ISSUE
            query: "project:${appState.projectOwner}/${
    appState.projectNumber
  } is:closed is:issue created:>${startDate.toISOString()} closed:<${endDate.toISOString()}"
            last: 100
          ) {
            edges {
              node {
                ... on Issue {
                  title
                  closedAt
                  createdAt
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
          query: QUERY_CLOSED_ISSUES_WITH_DATES,
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
  }, [QUERY_CLOSED_ISSUES_WITH_DATES, appState.githubToken]);

  return (
    <div className="second-question">
      <h1>4. Select start and end dates :</h1>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
      />
      <h2>{`${
        issues.length
      } Issues closed between the ${startDate.toLocaleDateString()} and the ${endDate.toLocaleDateString()}`}</h2>
    </div>
  );
};

export default FourthMetric;
