import gocablogo from "../assets/GoCab.png";
import { ArrowRight } from "lucide-react";
import gocabbg from "../assets/GoCabBg.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div
        className="h-screen w-full max-w-md mx-auto flex pt-8 justify-between flex-col bg-red-400 bg-cover bg-center"
        style={{ backgroundImage: `url(${gocabbg})` }}
      >
        <img src={gocablogo} className="w-18 ml-8" />
        <div className="bg-white py-4 px-4 pb-6">
          <h2 className="text-xl font-bold">Get Started with GoCab</h2>
          <Link
            to="/login"
            className="w-full bg-black text-white py-3 inline-block rounded mt-4 relative"
          >
            <span className="block text-center">Continue</span>
            <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
