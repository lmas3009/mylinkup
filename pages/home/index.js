import Header from "./header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import AlertLogout from "@/components/alert-logout";
import instance from "@/utils/axios";
import Hero from "./hero";
import CardP from "@/components/card-p";
import CryptoJS from "crypto-js";
import Head from "next/head";

export async function getServerSideProps(context) {
  var bytes = CryptoJS.AES.decrypt(
    context.query.auth,
    process.env.NEXTAUTH_SECRET
  );
  var uid = bytes.toString(CryptoJS.enc.Utf8);
  return { props: { uid: uid } };
}

const Home = (props) => {
  const { data: session, status } = useSession();
  const [logout, setlogout] = useState(false);
  const [userdata, setuserdata] = useState([]);
  const [PagesData, setPagesData] = useState([]);
  const query = useRouter().query;
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    if (status === "authenticated") {
      instance
        .post("/get-user", {
          Email: session.user.email,
        })
        .then((res) => {
          if (res.data.Status === 200) {
            setloading(false);
            setuserdata(res.data.Result[0]);
            instance
              .post("/get-mediapage", {
                getId: "true",
                UserId: props.uid,
              })
              .then((res) => {
                if (res.data.Status === 200) {
                  setPagesData(res.data.Result);
                }
              });
          }
        });

      Router.push({
        pathname: "/home",
        query: { auth: window.localStorage.getItem("mylinkup") },
      });
    } else if (status === "unauthenticated") {
      Router.push("/");
    }
  }, [status, session, props.uid]);

  const setLogout = (e) => {
    setlogout(e);
  };

  return (
    <>
      <Head>
        <title>Home | MylinkUp</title>
        <meta
          name="description"
          content="mylinkup ( Single place to store all your social media links )"
        />
      </Head>
      <div className="poppins">
        {loading ? (
          "Loading"
        ) : (
          <div>
            {logout && <AlertLogout />}
            <Header setLogout={setLogout} profile={userdata?.Profile} />
            <Hero name={userdata?.Name} auth={query.auth} />
            <div className="p-10">
              <p className="text-2xl">Your MylinkUp pages</p>
              <div className="flex flex-wrap gap-10 mt-10">
                {PagesData.map((item, index) => {
                  return (
                    <div key={index}>
                      <CardP data={item} key1={index} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
