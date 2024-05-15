import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ReturnToLoginPage = () => {
  const navigate = useNavigate();

  const returnLoginPage = () => {
    navigate("/");
  };
  return (
    <div className="bg-green-800 justify-center flex flex-col items-center h-screen gap-5 pt-3 pb-3 pl-8 pr-8 lg:pl-10 lg:pr-10">
      <p className="text-xl text-center text-slate-200 font-normal tracking-tight leading-loose">
        You've been Disconnected, return to Login page.
      </p>
      <button
        className="text-slate-700 hover:text-slate-200 bg-slate-200 hover:bg-slate-900 shadow-lg rounded-md border-2 border-slate-300 justify-center flex flex-row items-center gap-1.5 px-5 py-1.5 transition-all duration-300"
        onClick={returnLoginPage}
      >
        Login Page
        <span>
          <ArrowRight size={20} strokeWidth={2} />
        </span>
      </button>
    </div>
  );
};

export default ReturnToLoginPage;
