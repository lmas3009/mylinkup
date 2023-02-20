/* eslint-disable @next/next/no-img-element */
import instance from "@/utils/axios";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { BiWindowOpen } from "react-icons/bi";
import Header from "./header";

export async function getServerSideProps(context) {
  let result = [];
  let user = [];
  const id = context.query.id;
  await instance
    .post("/get-mediapage", {
      getP: "true",
      Slug: id,
    })
    .then(async (res) => {
      if (res.data.Status === 200) {
        result.push(res.data.Result[0]);
        await instance
          .post("/get-user", {
            getUser: "true",
            UserId: res.data.Result[0]?.UserId,
          })
          .then((res) => {
            if (res.data.Status === 200) {
              user.push(res.data.Result[0]);
            }
          });
      }
    });
  return { props: { result: result, user: user } };
}

const Preview = ({ result, user }) => {
  const query = useRouter().query;

  return (
    <>
      <Head>
        <title>{query.id} | MylinkUp Page</title>
        <meta
          name="description"
          content="mylinkup ( Single place to store all your social media links )"
        />
        <script async defer src="https://analytics.umami.is/script.js" data-website-id="0e9ee61e-c00c-4310-8179-15c20d2dca40"></script>
      </Head>
      <div className=" poppins">
        <Header/>
        <div className="p-5 sm:p-10">
        <div className="flex items-center gap-2">
          <img
            className="h-14 w-14 bg-black rounded-full"
            src={
              Object.keys(user).length > 0
                ? user[0]?.Profile
                : "https://t3.ftcdn.net/jpg/04/84/88/76/360_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg"
            }
            alt="Profile"
          ></img>
          <div>
            <p>
              @{Object.keys(user).length > 0 ? user[0]?.Name : "404 Not Found"}
            </p>
            <p className="text-xs">
              CreatedAt: {"  "}
              {Object.keys(result).length > 0
                ? result[0]?.CreatedAt.split("T")[0]
                : "404 Not Found"}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-10">
          {Object.keys(result).length > 0
            ? result[0]?.Data.map((item, index) => {
                const hostname = new URL(item.Url).hostname;
                const domain = hostname.split(".").slice(-2).join(".");
                const name = domain.split(".")[0];
                return (
                  <div
                    className="h-16 w-72 bg-slate-900 text-white rounded flex items-center justify-between p-5"
                    key={index}
                  >
                    <p>
                      {name.charAt(0).toUpperCase() +
                        name.slice(1).toLowerCase()}{" "}
                      Page
                    </p>
                    <Link href={item.Url} target={"_blank"}>
                      <span className="text-xl">
                        <BiWindowOpen />
                      </span>
                    </Link>
                  </div>
                );
              })
            : "aaa"}
        </div>
        <footer className="w-full flex sm:items-center sm:justify-center text-sm mt-20">
          <p>
            Made using{" "}
            <span
              className="underline decoration-wavy cursor-pointer"
              onClick={() => Router.push("/")}
            >
              MylinkUp
            </span>
          </p>
        </footer>
        </div>
      </div>
    </>
  );
};

export default Preview;
