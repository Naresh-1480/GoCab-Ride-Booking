import { useState } from "react";
import gocablogo from "../assets/GoCab.png";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    setUserData({
      name: {
        firstName,
        lastName,
      },
      email,
      password,
    });
    console.log(userData);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <div className="p-7 flex flex-col justify-between max-w-md mx-auto h-screen">
        <div>
          <img src={gocablogo} className="w-20 mb-5" />

          <form onSubmit={submitHandler}>
            <label htmlFor="name" className="text-base font-medium mb-2 block">
              What's your Name?
            </label>{" "}
            <div className="flex gap-4 mb-7">
              <input
                className="bg-[#eeeeee] px-4 py-2  rounded w-1/2 text-base placeholder:text-sm"
                type="text"
                id="name"
                placeholder="FirstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="bg-[#eeeeee] px-4 py-2 rounded w-1/2 text-base placeholder:text-sm"
                type="text"
                placeholder="LastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <label htmlFor="email" className="text-base font-medium mb-2 block">
              What's your Email?
            </label>{" "}
            <input
              className="bg-[#eeeeee] px-4 py-2 mb-7 rounded w-full text-base placeholder:text-sm"
              type="email"
              id="email"
              autoComplete="email"
              placeholder="email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="text-base font-medium mb-2 block"
            >
              Enter Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              id="password"
              className="bg-[#eeeeee] px-4 py-2 mb-7 rounded w-full text-base placeholder:text-sm"
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
            Already Have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login Here
            </Link>
          </p>
        </div>
        <div>
          <p className="font-['Roboto'] text-[#595959] text-[11px] font-normal leading-3.5">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
