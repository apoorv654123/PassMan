import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

import React from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef(null);
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to Clipboard!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: "Bounce"
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/visibility_off.png")) {
      ref.current.src = "icons/visibility.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/visibility_off.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
  };

  const deletePassword = () => {
    // setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
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
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-xl border w-full border-blue-500 p-4 py-1"
                placeholder="Enter Password"
                type="password"
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
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold py-2">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div> No Passwords to Show </div>
          ) : (
            <table className="table-auto w-full rounded-lg overflow-hidden">
              <thead className="bg-purple-500 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-20">
                        <span className="flex justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="w-6 h-6 mt-[2px] relative right-0 cursor-pointer"
                            src="icons/copy.gif"
                            alt="copy-icon"
                          />
                        </span>
                      </td>
                      <td className="py-2 border border-white text-center w-20">
                        <span className="flex justify-center">
                          {item.username}
                          <img
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="w-6 h-6 mt-[2px] relative right-0 cursor-pointer"
                            src="icons/copy.gif"
                            alt="copy-icon"
                          />
                        </span>
                      </td>
                      <td className="py-2 border border-white text-center w-20">
                        <span className="flex justify-center">
                          {item.password}
                          <img
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className="w-6 h-6 mt-[2px] relative right-0 cursor-pointer"
                            src="icons/copy.gif"
                            alt="copy-icon"
                          />
                        </span>
                      </td>
                      <td className="py-2 border border-white text-center w-20">
                        <span className="flex justify-center items-center gap-5">
                          <span className="cursor-pointer" onClick={() => {editPassword(item.id)}}>
                            <img
                              className="w-[25px]"
                              src="icons/edit.gif"
                              alt="edit-icon"
                            />
                          </span>
                          <span className="cursor-pointer" onClick={() => {editPassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
