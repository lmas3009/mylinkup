import CustomAlert from "@/components/customAlert";
import instance from "@/utils/axios";
import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { MdOutlineDeleteSweep } from "react-icons/md";
import CryptoJS from "crypto-js";
import Router from "next/router";
import Link from "next/link";

const Project = ({ query, profile }) => {
  const [newmedia, setnewmedia] = useState([{ Url: "" }]);
  const [slug, setslug] = useState("");
  const [_alert, setalert] = useState(false);
  const [_save, setsave] = useState(false);
  const [loading, setloading] = useState(false);

  const isValidUrl = (urlString) => {
    var inputElement = document.createElement("input");
    inputElement.type = "url";
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {
      return true;
    }
  };

  const handleAddClick = () => {
    setsave(false);
    if (newmedia[newmedia.length - 1].Url === "") {
      alert("URL Should not be empty");
    } else {
      let verify = true;
      newmedia.forEach((element) => {
        if (isValidUrl(element.Url) === false) {
          verify = false;
        }
      });
      if (verify) {
        setnewmedia([...newmedia, { Url: "" }]);
      } else {
        alert("One of your URL is incorrect");
      }
    }
  };

  const handleSaveClick = () => {
    setloading(true);
    if (slug === "") {
      alert("Slug Name is empty");
      setloading(false);
    } else if (newmedia[newmedia.length - 1].Url === "") {
      alert("URL Should not be empty");
      setloading(false);
    } else {
      let verify = true;
      newmedia.forEach((element) => {
        if (isValidUrl(element.Url) === false) {
          verify = false;
        }
      });
      if (verify) {
        setnewmedia([...newmedia]);
        var bytes = CryptoJS.AES.decrypt(
          query?.auth,
          process.env.NEXTAUTH_SECRET
        );
        var uid = bytes.toString(CryptoJS.enc.Utf8);

        instance
          .post("/create-mediapage", {
            MediaId: query.pid,
            UserId: uid,
            Slug: slug,
            Data: newmedia,
            UserProfile: profile,
          })
          .then((res) => {
            setloading(false);
            if (res.data.Status === 200) {
              setloading(false);
              setalert(true);
            } else if (res.data.Status === 201) {
              alert(res.data.Result);
            } else {
              alert("Failed to Save");
            }
          });
      } else {
        alert("One of your URL is incorrect");
      }
    }
  };

  const handleRemoveClick = (index) => {
    setsave(false);
    const list = [...newmedia];
    list.splice(index, 1);
    setnewmedia(list);
  };

  const handleInputChange = (name, value, index) => {
    setsave(false);
    const list = [...newmedia];
    list[index][name] = value;
    setnewmedia(list);
  };

  useEffect(() => {
    if (query.pid === "") {
      Router.push({
        pathname: "/home",
      });
    }
    if (_alert) {
      setTimeout(() => {
        setalert(false);
        setsave(true);
      }, 2000);
    }
  });

  return (
    <div className="p-10 poppins">
      {_alert && <CustomAlert title={"Page Saved"} />}
      <div className="flex flex-wrap justify-between gap-5">
        <p>Create New Project</p>
        <div
          onClick={() =>
            _save ? Router.push("/p/" + slug) : handleSaveClick()
          }
          className="bg-slate-900 text-white p-1 pl-4 pr-4 text-sm rounded w-max cursor-pointer"
        >
          {_save ? (
            <p>Preview</p>
          ) : (
            <div className="w-full flex items-center gap-2">
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokwidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <></>
              )}
              Save
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <label>Slug Name</label>
        <input
          type="text"
          className="w-full p-2 border-2 border-black rounded text-sm"
          placeholder="https://mylinkup.vercel.app/{slugname}"
          onChange={(e) => setslug(e.target.value)}
        />
      </div>
      <div>
        {newmedia.map((x, i) => {
          return (
            <div
              className="w-full flex flex-col sm:flex-row items-start sm:items-end gap-2 mt-5"
              key={i}
            >
              <div className=" w-full sm:w-96">
                <p className="text-sm mb-1">URL</p>
                <input
                  type={"url"}
                  name="Url"
                  value={x.Url}
                  className="p-2 border-2 border-black bg-white text-black rounded text-sm w-full"
                  placeholder="Add your URL"
                  onChange={(e) => {
                    handleInputChange(
                      e.target.name,
                      e.target.value,
                      i,
                      e.target
                    );
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                {newmedia.length - 1 === i && (
                  <div
                    onClick={() => handleAddClick()}
                    className="w-max rounded-md bg-white text-black p-2 text-xl cursor-pointer"
                  >
                    <p className="text-sm">Add</p>
                  </div>
                )}
                {newmedia.length !== 1 && (
                  <div
                    onClick={() => handleRemoveClick(i)}
                    className="w-max rounded-md bg-white text-black p-2 text-xl cursor-pointer"
                  >
                    <p className="text-sm">Delete</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
