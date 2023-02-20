import Router from "next/router";
import { v4 as uuidv4 } from "uuid";

const Hero = ({ name, auth }) => {
  return (
    <div className="p-10 w-full flex flex-col gap-3 sm:gap-0 sm:flex-row items-start sm:items-center justify-between">
      <p>
        Hi &apos;{name}&apos; <br /> Welcome to{" "}
        <span className="underline decoration-wavy">mylinkup</span>
      </p>
      <div
        className="bg-black text-white p-2 pl-4 pr-4 rounded cursor-pointer"
        onClick={() => {
          Router.push({
            pathname: "/newproject",
            query: { auth: auth, pid: uuidv4() },
          });
        }}
      >
        <p>Create new MylinkUp Page</p>
      </div>
    </div>
  );
};

export default Hero;
