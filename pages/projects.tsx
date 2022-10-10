import { gql } from "@apollo/client";
import { useRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import apolloClient from "../context/apollo-client";

const Project = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [appState, setAppState] = useAppContext();

  const QUERY = gql`
    query {
      ${router.query.type}(login: "${appState.projectOwner}") {
        projectsV2(first: 20) {
          nodes {
            id
            title
            number
          }
        }
      }
    }
  `;

  useEffect(() => {
    async function fetchData() {
      const response = await apolloClient
        .query({
          query: QUERY,
          context: {
            headers: { authorization: `Bearer ${appState.githubToken}` },
          },
        })
        .catch((e) => {
          return undefined;
        });
      // You can await here
      if (response === undefined) {
        console.log("Auth Problem");
      }

      if (router.query.type === "user") {
        setProjects(response.data.user.projectsV2.nodes);
      } else {
        setProjects(response.data.organization.projectsV2.nodes);
      }
    }
    fetchData();
  }, [QUERY, appState.githubToken]);

  const handleChoice = (i) => {
    const project = projects[i];

    setAppState({
      ...appState,
      projectNumber: project.number,
      projectId: project.id,
      projectTitle: project.title,
    });

    router.push("/admin/dashboard/");
  };

  return (
    <main
      style={{
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className={"login-box p-3"}>
        <h1>Hi {appState.user}</h1>
        <h2>Choose your project</h2>
        <div className="list-group">
          <>
            {projects.map((project, i) => {
              return (
                <button
                  type="button"
                  key={project.id}
                  className="list-group-item list-group-item-action"
                  value={project.id}
                  onClick={(e) => handleChoice(i)}
                >
                  {project.title}
                </button>
              );
            })}
          </>
        </div>
      </div>
    </main>
  );
};

export default withRouter(Project);
