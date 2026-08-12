import { useState } from "react";
import gocabdriverlogo from "../assets/GoCab_Driverslogoo.png";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    setCaptainData({ email, password });
    console.log(captainData);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between max-w-md mx-auto h-screen">
      <div>
        <img src={gocabdriverlogo} className="w-20 mb-8" />

        <form onSubmit={submitHandler}>
          <label htmlFor="email" className="text-lg font-medium mb-2 block">
            What's your Email?
          </label>{" "}
          <input
            className="bg-[#eeeeee] px-4 py-2 mb-7 rounded w-full text-lg placeholder:text-base"
            type="email"
            id="email"
            autoComplete="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-lg font-medium mb-2 block">
            Enter Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            id="password"
            className="bg-[#eeeeee] px-4 py-2 mb-7 rounded w-full text-lg placeholder:text-base"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold cursor-pointer px-4 py-2 mb-7 rounded w-full ">
            Login
          </button>
        </form>
        <p className="text-center">
          Wanna Join?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register As A Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#ad4500] block text-center text-white font-semibold cursor-pointer px-4 py-2 mb-7 rounded w-full "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
