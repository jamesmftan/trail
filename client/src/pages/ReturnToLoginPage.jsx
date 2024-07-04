import React, { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ReturnToLoginPage = () => {
  const [showDisconnected, setShowDisconnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisconnected(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const returnLoginPage = () => {
    navigate("/");
  };

  if (!showDisconnected) return <LoadingPage />;

  return (
    <div className="bg-slate-950 justify-center flex flex-col items-center h-screen gap-5 p-8">
      <p className="text-xl text-center text-slate-200 font-normal tracking-tight leading-loose">
        YOU'VE BEEN DISCONNECTED, RETURN TO LOGIN PAGE.
      </p>
      <button
        className="text-white bg-slate-700 hover:bg-slate-950 shadow-lg rounded-md border-2 border-slate-200 justify-center flex flex-row items-center gap-1.5 px-5 py-1.5 transition-all duration-300"
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
