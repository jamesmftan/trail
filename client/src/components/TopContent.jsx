import React from "react";
import { LogOut } from "lucide-react";

const TopContent = ({ logOut }) => {
  return (
    <div className="text-black text-center font-normal bg-slate-200 opacity-[80%] backdrop-blur-3xl justify-center flex flex-row items-center rounded-md border-2 border-white fixed top-5 right-5 z-50 gap-3 lg:gap-5 pt-2 pb-2 pl-5 pr-5">
      <button onClick={logOut}>
        <LogOut color="red" />
      </button>
    </div>
  );
};

export default TopContent;
