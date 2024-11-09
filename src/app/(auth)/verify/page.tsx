import { SparklesCore } from '@/components/ui/sparkles'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import React from 'react'

const Page = () => {
    return (
        <div className=" relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md h-[100vh]">
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

            <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-16 mb-10">
                SpeakUpSafe
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
        </div>
    )
}

export default Page

const words = [
    {
        text: "Add",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "Your",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "/username",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "After /verify",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "in Above URL.",
        className: "text-blue-500 dark:text-blue-500",
    },
];