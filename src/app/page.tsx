"use client"
import Image from "next/image";
import Navbar from "./components/navbar";
import ProgressBar from "./components/progressbar";
import Course from "./components/course";

export default function Home() {
  return (
    <>
      <Navbar />
      <ProgressBar />

      <div className="relative">
        <div className="bg-[#8DADF1] w-[7.5rem] h-[3rem] absolute top-[5rem] left-[10px] rounded-md">
        </div>
        <p className="text-4xl px-[10px] top-[5rem] relative z-10">Neked ajánljuk!</p>
        <div className="mt-[7rem]">
          <Course />
        </div>
      </div>
    </>
  );
}
