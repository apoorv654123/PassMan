import "react-toastify/dist/ReactToastify.css";

import { Bounce, ToastContainer, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

import React from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef(null);
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  }
  
  useEffect(() => {
    getPasswords();
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

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})})
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Error: Password not Saved!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = async (id) => {
    let confirmation = confirm("Do you really want to delete this Password?");
    if (confirmation) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      await fetch("http://localhost:3000/", { method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id})})
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      toast("Password Deleted!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      <div className="p-3 md:py-1 md:px-44 md:mycontainer min-h-[90vh]">
        <h1 className="font-bold text-center text-3xl mt-5">
          <span className="text-blue-500">&lt;</span>Pass
          <span className="text-blue-500">MAN /&gt;</span>
        </h1>
        <p className="text-blue-500 text-lg text-center mb-3">
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
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-6">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-xl border w-full border-blue-500 p-4 py-1"
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative w-full md:w-2/3">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-xl border w-full border-blue-500 p-4 py-1"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
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
            <table className="table-auto w-full rounded-lg overflow-hidden my-2 mb-4">
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
                          {"*".repeat(item.password.length)}
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
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <img
                              className="w-[25px]"
                              src="icons/edit.gif"
                              alt="edit-icon"
                            />
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
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
