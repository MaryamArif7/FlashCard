"use client";

import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="relative bg-black  border border-transparent dark:bg-white dark:border-white/[0.2] shadow-input flex justify-center space-x-4 px-8 py-6">
      <Link href="/" className="text-white dark:text-black hover:text-white dark:hover:text-black">
        Home
      </Link>

      <Link href="/Contact" className="text-white dark:text-black hover:text-white dark:hover:text-black">
        Contact
      </Link>
     
      <Link href="/dashboard" className="text-white dark:text-black hover:text-white dark:hover:text-black">
        Dashboard
      </Link>

      <SignedIn>
        
        <UserButton />
      </SignedIn>

      <SignedOut>
        
        <Link href="/sign-in" className="text-white dark:text-black hover:text-white dark:hover:text-black">
          Login
        </Link>
        <Link href="/sign-up" className="text-white dark:text-black hover:text-white dark:hover:text-black">
          Sign Up
        </Link>
      </SignedOut>
    </nav>
  );
}
