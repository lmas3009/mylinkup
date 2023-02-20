import Header from "../home/header";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import AlertLogout from "@/components/alert-logout";
import Router, { useRouter } from "next/router";
import instance from "@/utils/axios";
import Project from "./newproject";
import Head from "next/head";

const NewProject = () => {
  const { data: session, status } = useSession();
  const [userdata, setuserdata] = useState([]);
  const [logout, setlogout] = useState(false);
  const query = useRouter().query;

  useEffect(() => {
    if (status === "authenticated") {
      instance
        .post("/get-user", {
          Email: session.user.email,
        })
        .then((res) => {
          if (res.data.Status === 200) {
            setuserdata(res.data.Result[0]);
          }
        });
      Router.push({
        pathname: "/newproject",
        query: {
          auth: window.localStorage.getItem("mylinkup"),
          pid: query.pid,
        },
      });
    } else if (status === "unauthenticated") {
      Router.push("/");
    }
  }, [status, session, query.pid]);

  const setLogout = (e) => {
    setlogout(e);
  };
  return (
    <>
      <Head>
        <title>Create New project | MylinkUp</title>
        <meta
          name="description"
          content="mylinkup ( Single place to store all your social media links )"
        />
      </Head>
      <div className="poppins">
        {logout && <AlertLogout />}
        <Header setLogout={setLogout} profile={userdata?.Profile} />
        <Project query={query} profile={userdata?.Profile} />
      </div>
    </>
  );
};

export default NewProject;
