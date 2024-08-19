"use client";
import Navbar from "../componetss/Navbar";
import Pricing from "../componetss/Pricing"
import Features from '../componetss/Features'
import { motion } from "framer-motion";
import React from "react";
const titleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};
export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div>
        <motion.h1
          className="text-6xl mt-10 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-400"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          transition={{ duration: 1 }}
        >
          Master Any Subject With AI
        </motion.h1>
        <p className="text-white text-2xl mt-5 text-center">
          Here to make studying fun with the power of AI to <br />{" "}
            master anysubject with minimal effort
        </p>
        <div className="flex justify-center items-center">
          <button className=" mt-5 bg-gradient-to-r from-purple-700 to to-blue-400 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Get Started
          </button>
        </div>
      </div>
      <div className="ml-32 mr-32 mt-28">
        <h1 className="text-4xl text-white text-center">Features</h1>
      <Features />
      </div>
      <div>
        <Pricing />
      </div>
    </div>
  );
}
