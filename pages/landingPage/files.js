import Card from "@/components/cards";

const Files = ({ pages }) => {
  return (
    <div className="w-full pt-10 sm:p-10">
      <p className="w-full flex justify-start-start sm:items-center sm:justify-center text-xl p-5 sm:p-0">
        Created by Developers
      </p>
      <div className=" flex flex-wrap items-center justify-start sm:justify-center gap-10 p-5">
        {pages?.map((item, index) => {
          return (
            <div key={index}>
              <Card data={item} key1={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Files;
