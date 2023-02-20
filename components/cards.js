/* eslint-disable @next/next/no-img-element */
import { MdOutlineOpenInNew } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import Link from "next/link";
import instance from "@/utils/axios";
import Router from "next/router";
import Image from "next/image";

const Card = ({ data, key1 }) => {
  return (
    <div
      className="h-max w-max border-2 border-black rounded p-5 flex items-center justify-between gap-20"
      key={key1}
    >
      <div className="flex items-center gap-2">
        <Image
          alt="profile"
          src={data?.UserProfile}
          height={50}
          width={50}
          className="h-10 w-10 bg-black rounded-full"
        />
        <p>{data?.Slug}</p>
      </div>
      <div className="flex items-center gap-2">
        <Link href={"/p/" + data?.Slug} target={"_blank"}>
          <span className="text-xl font-bold">
            <MdOutlineOpenInNew />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
