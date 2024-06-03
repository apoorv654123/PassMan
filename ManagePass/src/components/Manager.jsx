import { useEffect, useRef, useState } from "react";

import React from "react";

const Manager = () => {
  const ref = useRef(null);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/visibility_off.png")) {
      ref.current.src = "icons/visibility.png";
    } else {
      ref.current.src = "icons/visibility_off.png";
    }
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="mycontainer">
        <h1 className="font-bold text-center text-3xl">
          <span className="text-blue-500">&lt;</span>Pass
          <span className="text-blue-500">MAN /&gt;</span>
        </h1>
        <p className="text-blue-500 text-lg text-center">
          Own a Password Manager
        </p>

        <div className="text-black flex flex-col items-center p-4 gap-6">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-xl border w-full border-blue-500 p-4 py-1"
            placeholder="Enter website URL"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full justify-between gap-6">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-xl border w-full border-blue-500 p-4 py-1"
              placeholder="Enter Username"
              type="text"
              name="username"
              id=""
            />
            <div className="relative w-2/3">
              <input
                value={form.password}
                onChange={handleChange}
                className="rounded-xl border w-full border-blue-500 p-4 py-1"
                placeholder="Enter Password"
                type="text"
                name="password"
                id=""
              />
              <span
                className="absolute right-2 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  className="w-7"
                  ref={ref}
                  src="icons/visibility.png"
                  alt="visible"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 rounded-full bg-purple-500 hover:bg-purple-400 px-5 py-2 text-white w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold py-2">Your Passwords</h2>
          {passwordArray.length === 0 ? (<div> No Passwords to Show </div>):(
          <table class="table-auto w-full rounded-lg overflow-hidden">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
              </tr>
            </thead>
            <tbody className="bg-purple-200">
              <tr>
                <td className="py-2 border border-white text-center w-20">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className="py-2 border border-white text-center w-20">Malcolm Lockyer</td>
                <td className="py-2 border border-white text-center w-20">1961</td>
              </tr>
              <tr>
                <td className="py-2 border border-white text-center w-20">Witchy Woman</td>
                <td className="py-2 border border-white text-center w-20">The Eagles</td>
                <td className="py-2 border border-white text-center w-20">1972</td>
              </tr>
              <tr>
                <td className="py-2 border border-white text-center w-20">Shining Star</td>
                <td className="py-2 border border-white text-center w-20">Earth, Wind, and Fire</td>
                <td className="py-2 border border-white text-center w-20">1975</td>
              </tr>
            </tbody>
          </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
