import React from "react";

const Footer = () => {
  return (
    <div className="bg-purple-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full">
      <div className="logo font-bold text-xl">
        <span className="text-blue-500">&lt;</span>Pass
        <span className="text-blue-500">MAN /&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with
        <img className="w-7 h-7 mx-1" src="icons/heart.png" alt="heart" /> by
        Apoorv
      </div>
    </div>
  );
};

export default Footer;
