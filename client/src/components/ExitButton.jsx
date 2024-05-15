import React, { useState } from "react";
import ExitModal from "./ExitModal";
import { LogOut } from "lucide-react";

const ExitButton = () => {
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const exitModalClick = () => {
    setExitModalOpen(!exitModalOpen);
  };
  return (
    <>
      <button
        className="text-red-500 bg-slate-200 bg-opacity-20 backdrop-blur-3xl shadow-lg rounded-md border-2 border-white border-opacity-50 justify-center flex flex-row items-center fixed top-5 right-5 z-50 gap-3 lg:gap-5 px-3 py-2 transition-all duration-300 hover:scale-90"
        onClick={exitModalClick}
      >
        <LogOut />
      </button>
      {exitModalOpen && <ExitModal exitModalClick={exitModalClick} />}
    </>
  );
};

export default ExitButton;
