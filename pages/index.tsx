import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import apolloClient from "../context/apollo-client";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const VERIFY_TOKEN = gql`
  query {
    viewer {
      login
    }
  }
`;

interface Values {
  githubtoken: string;
  login: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const [appState, setAppState] = useAppContext();

  return (
    <div
      style={{
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <div className={"login-box p-3"}>
          <h1 className="display-6 mb-3">Login</h1>
          <Formik
            initialValues={{
              githubtoken: "",
              owner: "",
              picked: "",
            }}
            onSubmit={async (formsData, { setSubmitting, resetForm }) => {
              const response = await apolloClient
                .query({
                  query: VERIFY_TOKEN,
                  context: {
                    headers: {
                      authorization: `Bearer ${formsData.githubtoken}`,
                    },
                  },
                })
                .catch((e) => {
                  return undefined;
                });

              if (response === undefined) {
                console.log("Bad credentials");
              } else {
                setAppState({
                  ...appState,
                  githubToken: formsData.githubtoken,
                  projectOwner: formsData.owner,
                  user: response.data.viewer.login,
                });
                router.push({
                  pathname: "/projects",
                  query: { type: formsData.picked },
                });
              }
            }}
          >
            <Form>
              <div className="mb-3">
                <Field
                  className="form-control"
                  id="githubtoken"
                  name="githubtoken"
                  placeholder="GitHub Token"
                  aria-describedby="tokenHelp"
                />
              </div>

              <div className="mb-3">
                <Field
                  className="form-control"
                  id="owner"
                  name="owner"
                  placeholder="Owner of the project"
                />
              </div>

              <div>
                <label>
                  <Field
                    className="form-control"
                    type="radio"
                    name="picked"
                    value="user"
                  />
                  User
                </label>

                <label>
                  <Field
                    className="form-control"
                    type="radio"
                    name="picked"
                    value="organization"
                  />
                  Organization
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                Get all project
              </button>
            </Form>
          </Formik>
        </div>
      </main>
    </div>
  );
};

export default Home;
