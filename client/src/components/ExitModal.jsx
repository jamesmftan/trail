import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const ExitModal = ({ exitModalClick }) => {
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
  };
  return (
    <div className="bg-slate-700 bg-opacity-50 justify-center flex flex-row items-center mx-auto fixed inset-0 z-[60] gap-10 pt-3 pb-3 pl-8 pr-8 lg:pl-10 lg:pr-10">
      <div className="bg-white backdrop-blur-3xl rounded-lg shadow-lg justify-between flex flex-col min-w-48 w-96 max-w-96 min-h-48 h-48 max-h-48">
        <div className="text-slate-700 font-normal justify-center flex flex-col items-center h-full gap-3 p-5">
          <p className="tracking-tight leading-loose">
            Are you sure you want to leave?
          </p>
          <div className="flex flex-row gap-5">
            <button
              className="text-white bg-slate-500 hover:bg-slate-900 shadow-lg rounded-md border-2 border-slate-200 px-5 py-1.5 transition-all duration-300"
              onClick={exitModalClick}
            >
              Cancel
            </button>
            <button
              className="text-white bg-red-500 hover:bg-red-900 shadow-lg rounded-md border-2 border-slate-200 px-5 py-1.5 transition-all duration-300"
              onClick={logOut}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
