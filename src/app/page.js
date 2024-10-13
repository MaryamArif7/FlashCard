"use client";
import Navbar from "../componetss/Navbar";
import Pricing from "../componetss/Pricing";
import Features from "../componetss/Features";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";  
import React from "react";

const titleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function Home() {
  const router = useRouter(); 

  const navigateToGenerate = () => {
    router.push("/generate");          
  };

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
          Here to make studying fun with the power of AI to <br />
          master any subject with minimal effort
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={navigateToGenerate}
            className="mt-5 bg-gradient-to-r from-purple-700 to-blue-400 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
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
      <footer className="bg-black text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-purple-500 transition duration-300">Home</a>
                </li>
                <li>
                  <a href="/" className="hover:text-purple-500 transition duration-300">About</a>
                </li>
                <li>
                  <a href="/" className="hover:text-purple-500 transition duration-300">Services</a>
                </li>
                <li>
                  <a href="/" className="hover:text-purple-500 transition duration-300">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="hover:text-purple-500 transition duration-300">Facebook</a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-500 transition duration-300">Twitter</a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-500 transition duration-300">Instagram</a>
                </li>
                <li>
                  <a href="/" className="hover:text-purple-500 transition duration-300">LinkedIn</a>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">&copy; 2024 QuickCards All rights reserved.</p>
              <p className="text-sm">QuickCards</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
