import React, { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { PulseBeams } from "../components/PulseBeams";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ReturnToLoginPage = () => {
  const [showDisconnected, setShowDisconnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisconnected(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const returnToLoginPage = () => {
    navigate("/");
  };

  if (!showDisconnected) return <LoadingPage />;

  return (
    <div className="bg-slate-950 justify-center flex flex-col items-center h-screen gap-5 p-8">
      <p className="text-xl text-center text-slate-200 font-normal tracking-tight leading-loose">
        YOU'VE BEEN DISCONNECTED, RETURN TO LOGIN PAGE.
      </p>
      <button
        className="text-white bg-slate-700 hover:bg-slate-950 shadow-lg rounded-md border-2 border-slate-200 justify-center flex flex-row items-center gap-1.5 px-5 py-1.5 z-50 transition-all duration-300"
        onClick={returnToLoginPage}
      >
        Login Page
        <span>
          <ArrowRight size={20} strokeWidth={2} />
        </span>
      </button>
      <div className="absolute inset-0 flex items-center justify-center">
        <PulseBeams />
      </div>
    </div>
  );
};

export default ReturnToLoginPage;
