import React from 'react'
import { PinContainer } from "@/components/ui/3d-pin";
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { useToast } from '@/hooks/use-toast';

const ProfileLink = ({ profileUrl }: { profileUrl: string }) => {
    const { toast } = useToast()

    const handleOnClick = () => {
        console.log("clicked")
        let baseUrl = `${window.location.protocol}//${window.location.host}`;
        navigator.clipboard.writeText(baseUrl + "/send-msg" + profileUrl);
        toast({
            title: "Copied",
            description: "Url copied to clipboard"
        })
    }


    return (
        <div className='mt-40'>
            <h2 className="text-white text-2xl md:text-6xl font-bold text-center mt-24">
                Mr Anonymous
            </h2>

            <div className="text-sm">
                <TypewriterEffectSmooth words={words} className="text-sm " />
            </div>

            <div onClick={handleOnClick} className="h-[40rem] w-full flex items-center justify-center">
                <PinContainer
                    title={profileUrl}
                    href=''
                >
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[15rem] text-center">
                        <h3 className="none hover:block max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            {/* Profile Link */}
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                                Click card to copy your profile link.
                            </span>
                        </div>
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                    </div>
                </PinContainer>
            </div>
        </div>
    )
}

export default ProfileLink

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
