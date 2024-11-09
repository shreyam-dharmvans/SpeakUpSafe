'use client';
import React, { useEffect } from "react";


import { Hero } from "@/components/home/Hero";
import { MovingMsgCards } from "@/components/home/MovingMsgCards";
import { SparklesCore } from "@/components/ui/sparkles";



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 bg-black ">
      <div className="h-[70rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md ">
        <div className="w-full absolute inset-0 h-[100%]">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>



        <div className="w-full mx-auto rounded-md h-[100vh] overflow-hidden mt-56 flex flex-col items-center juatify-center">
          <Hero />
        </div>

        <MovingMsgCards />


      </div>



    </main>
  );
}

