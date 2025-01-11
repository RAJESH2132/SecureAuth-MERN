import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const Header = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center px-4 mt-20 text-center text-gray-800">
      <img
        src={assets.header_img}
        className="mb-6 rounded-full w-36 h-36"
        alt=""
      />
      <h1 className="flex items-center gap-2 mb-2 text-xl font-medium sm:text-3xl">
        Hey {userData ? userData.name : "Developer"}!
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="" />
      </h1>
      <h2 className="mb-4 text-3xl font-semibold sm:text-5xl">
        Welcome to our app
      </h2>
      <p className="max-w-md mb-8">
        Let&apos;s start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
