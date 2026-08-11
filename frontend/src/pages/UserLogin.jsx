import React from "react";
import gocablogo from "../assets/GoCab.png";
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <div className="p-7 flex flex-col justify-between">
      <div>
        <img src={gocablogo} className="w-18 mb-8" />

        <form>
          <h3 className="text-lg font-medium mb-2">What's your Email?</h3>
          <input
            className="bg-[#eeeeee] px-4 py-2 mb-7 rounded w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
          />
          <h3 className="text-lg font-medium mb-2">Enter your Email?</h3>
          <input
            type="email"
            className="bg-[#eeeeee] px-4 py-2 mb-7 rounded w-full text-lg placeholder:text-base"
            placeholder="Password"
            required
          />
          <button className="bg-[#111] text-white font-semibold cursor-pointer px-4 py-2 mb-7 rounded w-full ">
            Login
          </button>

          <p className="text-center">
            New Here? <Link className="text-blue-600">Create new account</Link>
          </p>
        </form>
      </div>
      <div>
        <button className="bg-[#10b461] text-white font-semibold cursor-pointer px-4 py-2 mb-7 rounded w-full ">
          Sign in as Captain
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
