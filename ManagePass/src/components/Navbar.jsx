import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-purple-800 text-white">
      <div className="mycontainer flex justify-between items-center px-8 md:px-14 h-12 py-8">
        <div className="logo font-bold text-xl">
          <span className="text-blue-500">&lt;</span>Pass
          <span className="text-blue-500">MAN /&gt;</span>
        </div>

        <a href="https://github.com/apoorv654123/PassMan" target="_blank"><button className="bg-white text-black ring-black ring-[2px] rounded-full flex gap-4 justify-center mx-2 items-center py-1 px-1 md:px-2">
          <img className="w-7 p-0" src="icons/github.svg" alt="github logo" />
          GitHub
        </button></a>
      </div>
    </nav>
  );
};

export default Navbar;
