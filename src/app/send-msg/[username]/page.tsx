"use client";
import { SparklesCore } from '@/components/ui/sparkles'
import React, { useState } from 'react'
import { PinContainer } from "@/components/ui/3d-pin";
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { LiaUserSecretSolid } from 'react-icons/lia';

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { apiResponse } from '@/types/apiResponse';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

const Page = () => {
    let { username } = useParams()
    let { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleOnClick = () => {
        let baseUrl = `${window.location.protocol}//${window.location.host}`;
        navigator.clipboard.writeText(baseUrl + "/send-msg/" + `${username}`);
        // navigator.clipboard.writeText(`/${username}`);
        toast({
            title: "Copied",
            description: "Url copied to clipboard"
        })

    }

    const placeholders = [
        "I admire how hardworking you are. Keep it up!",
        "You always manage to brighten up my day!",
        "If you could change one thing about the world, what would it be?",
        "I wish I had the courage to tell you this face-to-face.",
        "You’re doing amazing, even when it doesn’t feel like it.",
        "You don’t know me, but I really appreciate your kindness."
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>, val: string) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            let res = await axios.post<apiResponse>(`/api/send-msg/${username}`, { message: val });
            if (res.data.success) {
                toast({
                    title: "Message Sent",
                    description: res.data.message
                })
            }
        } catch (error) {
            let apiError = error as AxiosError<apiResponse>
            toast({
                title: "Some Error occurred",
                description: apiError?.response?.data.message,
                variant: 'destructive'
            })
        }

        setIsLoading(false);
        console.log("submitted");
    };


    return (
        <div className="h-[100rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md ">
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

            <div className='mt-28'>
                <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-16">
                    Mr Anonymous
                </h2>

                <div className="text-sm">
                    <TypewriterEffectSmooth words={words} className="text-sm " />
                </div>

                <div onClick={handleOnClick} className="h-[40rem] w-full flex items-center justify-center">
                    <PinContainer
                        title={`/${username}`}
                        href=''
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[15rem] text-center">
                            <h3 className="none hover:block max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                                {/* Profile Link */}
                            </h3>
                            <div className="text-base !m-0 !p-0 font-normal">
                                <span className="text-slate-500 ">
                                    Reciever&apos;s Profile Link
                                </span>
                            </div>
                            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                        </div>
                    </PinContainer>
                </div>
            </div>

            <div className='z-[100] flex flex-col justify-center items-center text-slate-300 hover:text-slate-300 '>
                <LiaUserSecretSolid className='h-16 w-16 ' />
                {/* <div className=''>Accepting Messages</div> */}
            </div>

            {isLoading && <Loader className='animate-spin text-white h-28 w-28' />}


            <div className="h-[40rem] flex flex-col justify-center w-full items-center px-4">
                {/* <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-16">
                    Mr Anonymous
                </h2> */}
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>




        </div>
    )
}

export default Page


const words = [
    {
        text: "Take a",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "stand",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "against",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "bullying and",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
        text: "harassment.",
        className: "text-blue-500 dark:text-blue-500",
    },
];