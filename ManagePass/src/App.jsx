import "./App.css";

import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[83vh]">
        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
