/* eslint-disable @next/next/no-img-element */
import { MdOutlineOpenInNew } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import Link from "next/link";
import instance from "@/utils/axios";
import Router from "next/router";

const CardP = ({ data, key1 }) => {
  const DeleteData = (slug) => {
    const _delete = confirm("Warning! You are able to delete your page");
    if (_delete) {
      instance
        .delete("/delete-mediapage", {
          params: { Slug: slug },
        })
        .then((res) => {
          if (res.data.Status === 200) {
            Router.reload();
          }
        });
    }
  };

  return (
    <div
      className="h-max w-max border-2 border-black rounded p-5 flex items-center justify-between gap-20"
      key={key1}
    >
      <div className="flex items-center gap-2">
        <img
          className="h-10 w-10 bg-black rounded-full"
          src={data?.UserProfile}
          alt="profile"
        ></img>
        <p>{data?.Slug}</p>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="text-xl cursor-pointer"
          onClick={() => DeleteData(data?.Slug)}
        >
          <FiDelete />
        </span>
        <Link href={"/p/" + data?.Slug} target={"_blank"}>
          <span className="text-xl font-bold">
            <MdOutlineOpenInNew />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CardP;
