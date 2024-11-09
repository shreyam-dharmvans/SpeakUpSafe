import React from 'react'
import { Vortex } from "@/components/ui/vortex";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export const Hero = () => {
    return (
        <Vortex
            backgroundColor="black"
            className="flex items-center flex-col  px-2 md:px-10 py-4 w-full h-full"
        >
            <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-16 mb-10">
                Speak Up Safe
            </h2>
            {/* <p className="text-white text-sm md:text-2xl  mt-2 text-center">
            Share your thoughts without a trace<br />Where your feedback stays, but your identity fades.
          </p> */}
            <div className="text-sm">
                <TypewriterEffectSmooth words={words} className="text-sm" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
              Order now
            </button>
            <button className="px-4 py-2  text-white ">Watch trailer</button> */}
            </div>
        </Vortex>
    )
}

const words = [
    {
        text: "Where",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "your",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "identity",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "remains a",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "SECRET.",
        className: "text-blue-500 dark:text-blue-500",
    },
];
