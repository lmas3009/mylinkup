import Head from "next/head";
import { useEffect, useState } from "react";
import Files from "./landingPage/files";
import Header from "./landingPage/header";
import Hero from "./landingPage/hero";
import { useSession } from "next-auth/react";
import Alert from "@/components/alert";
import instance from "@/utils/axios";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import Router from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const [authverify, setauthverify] = useState(false);
  const [pages, setpages] = useState([]);

  useEffect(() => {
    instance.post("/get-mediapage",{}).then((res) => {
      if (res.data.Status) {
        setpages(res.data.Result);
      }
    });

    if (status === "authenticated") {
      setauthverify(true);
      instance
        .post("/create-user", {
          UserId: uuidv4().toString(),
          Name: session?.user?.name,
          Email: session?.user?.email,
          Profile: session?.user?.image,
        })
        .then((res) => {
          if (res.data.Status === 200) {
            var ciphertext = CryptoJS.AES.encrypt(
              res.data.data[0]?._id,
              process.env.NEXTAUTH_SECRET
            ).toString();
            window.localStorage.setItem("mylinkup", ciphertext);
            setTimeout(() => {
              Router.push({
                pathname: "/home",
                query: { auth: ciphertext },
              });
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (status === "unauthenticated") {
      setauthverify(false);
    }
  },[status, session?.user?.name, session?.user?.email, session?.user?.image]);

  return (
    <>
      <Head>
        <title>MylinkUp</title>
        <meta
          name="description"
          content="mylinkup ( Single place to store all your social media links )"
        />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="poppins min-h-[100vh] flex flex-col justify-between">
        {authverify ? <Alert verify={true} /> : <></>}
        <div>
          <Header />
          <div className="bg h-[50vh] w-full flex items-center justify-center">
            <Hero />
          </div>
          <Files pages={pages}/>
        </div>
        <footer className="w-full flex items-center justify-center p-3 bg-black text-white">
          <p>&copy; mylinkup {new Date().getFullYear()}</p>
        </footer>
      </main>
    </>
  );
}
