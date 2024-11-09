"use client";
import ProfileLink from '@/components/dashboard/ProfileLink';
import { SparklesCore } from '@/components/ui/sparkles'
import React, { useEffect, useState } from 'react'

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { LiaUserSecretSolid } from 'react-icons/lia';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { MessageType } from '@/types/MessageType';
import { apiResponse } from '@/types/apiResponse';
import { useToast } from '@/hooks/use-toast';
import { funcType } from "@/types/deleteMsgsFuncType"
import { Loader } from 'lucide-react';



const Page = () => {
    const { data: session, status } = useSession()
    const [messages, setMessages] = useState<MessageType[]>([{
        createdAt: new Date(),
        message: "Hi Anonymous"
    }]);
    const { toast } = useToast()
    //  const [username, setUsername] = useState<string>(session?.user.username as string);
    const [isAcceptingMessages, setIsAcceptingMessages] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false);





    useEffect(() => {
        const getAllMsgs = async () => {
            try {
                let res = await axios.get<apiResponse>("/api/get-messages");

                if (res.data.messages) {
                    setMessages(res?.data.messages as MessageType[]);
                    toast({
                        title: "Messages fetched",
                        description: res.data.message
                    })
                }
            } catch (error) {
                let apiError = error as AxiosError<apiResponse>
                toast({
                    title: "Error fetching messages",
                    description: apiError?.response?.data?.message,
                    variant: "destructive"
                })
            }


        }

        getAllMsgs();
    }, [])

    useEffect(() => {
        if (status == 'authenticated' && session.user.isAcceptingMsgs != undefined) {
            setIsAcceptingMessages(session.user.isAcceptingMsgs)
        }
    }, [session, status])


    const toggleAcceptingMsgs = async () => {
        try {
            setIsLoading(true);
            let res = await axios.put<apiResponse>("/api/toggle-accepting-msgs");
            if (res.data.success) {
                setIsAcceptingMessages(res.data.isAcceptingMsgs as boolean);
                toast({
                    title: "Toggle successfully",
                    description: res.data.message
                })
            }
        } catch (error) {
            let apiError = error as AxiosError<apiResponse>

            toast({
                title: "Failed to Toggle Acceptiong Msgs",
                description: apiError?.response?.data.message
            })
        }

        setIsLoading(false);

    }





    const handleDeleteMsgs: funcType = async (id) => {
        try {
            setIsLoading(true);
            let res = await axios.delete<apiResponse>(`/api/delete-msg/${id}`);
            if (res.data.success) {
                let remainingMsgs = messages.filter((obj) => obj._id != id);
                setMessages(remainingMsgs);
                toast({
                    title: "Message deleted",
                    description: res.data.message
                })
            }
        } catch (error) {
            let apiError = error as AxiosError<apiResponse>
            toast({
                title: "Some error occurred",
                description: apiError.response?.data.message,
                variant: "destructive"
            })
        }

        setIsLoading(false);

    }


    return (
        <div className=" relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md ">
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

            <ProfileLink profileUrl={`/${session?.user.username}`} />

            {isLoading && <Loader className='animate-spin text-white h-28 w-28' />}

            {isAcceptingMessages ?
                <div className='z-[100] flex flex-col justify-center items-center text-slate-300 hover:text-slate-500 ' onClick={toggleAcceptingMsgs}>
                    <LiaUserSecretSolid className='h-16 w-16 ' />
                    <div className=''>Accepting Messages</div>
                </div> :
                <div className='z-[100] flex flex-col justify-center items-center text-slate-500 hover:text-slate-300 ' onClick={toggleAcceptingMsgs}>
                    <LiaUserSecretSolid className='h-16 w-16 ' />
                    <div className=''>Not Accepting Messages</div>
                </div>
            }


            <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-black w-full gap-20 flex-wrap">
                {messages.map((obj) => {
                    return <>
                        <Card title={obj.message} createdAt={obj.createdAt} handleDeleteMsgs={handleDeleteMsgs as funcType} id={obj._id as string} icon={<AceternityIcon />}>
                            <CanvasRevealEffect
                                animationSpeed={3}
                                containerClassName="bg-black"
                                colors={[
                                    [236, 72, 153],
                                    [232, 121, 249],
                                ]}
                                dotSize={2}
                            />
                            {/* Radial gradient for the cute fade */}
                            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
                        </Card>
                    </>
                })}

            </div>

        </div>
    )
}

export default Page



const Card = ({
    title,
    icon,
    children,
    createdAt,
    handleDeleteMsgs,
    id
}: {
    title: string;
    createdAt: Date;
    handleDeleteMsgs: funcType;
    id: string
    icon: React.ReactNode;
    children?: React.ReactNode;
}) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border group/canvas-card  border-white/[0.2]  max-w-sm mx-10 p-4 sticky bg-black"
        >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white " />

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="">
                <div className=" group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200
                 bg-black text-white text-lg font-bold">
                    <div className=''>{title}</div>
                    <div className='text-slate-500 text-sm'>{new Date(createdAt).toISOString().substring(0, 9)}</div>
                </div>
                <h2 className="text-white text-xl opacity-0 group-hover/canvas-card:opacity-100  z-10 mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 flex flex-col items-center justify-center">
                    <button onClick={() => { handleDeleteMsgs(id) }}>Delete</button>
                    <AceternityIcon />
                </h2>
            </div>
        </div>
    );
};

const AceternityIcon = () => {
    return (
        // <svg
        //     width="66"
        //     height="65"
        //     viewBox="0 0 66 65"
        //     fill="none"
        //     xmlns="http://www.w3.org/2000/svg"
        //     className="h-10 w-10 text-white group-hover/canvas-card:text-white "
        // >
        //     <path
        //         d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        //         stroke="currentColor"
        //         strokeWidth="15"
        //         strokeMiterlimit="3.86874"
        //         strokeLinecap="round"
        //         style={{ mixBlendMode: "darken" }}
        //     />
        // </svg>

        <LiaUserSecretSolid className='h-16 w-16 text-slate-300' />
    );
};

const Icon = ({ className, ...rest }: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};




// <Card title="Nisha is Munni Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, error. Voluptatum, placeat quos minus magnam aspernatur obcaecati explicabo, laborum numquam qui deleniti consequatur? Dolorem neque rerum nobis tempora eaque aliquid.

// " icon={<AceternityIcon />}>
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>
//                 <Card title="Munni is Aditi" icon={<AceternityIcon />}>
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>
//                 <Card title="Munni is Aditi" icon={<AceternityIcon />}>
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>
//                 <Card title="Munni is Aditi" icon={<AceternityIcon />}>
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>
//                 <Card title="Munni is Aditi" icon={<AceternityIcon />}>
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>
//                 <Card title="Nisha is Munni Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, error. Voluptatum, placeat quos minus magnam aspernatur obcaecati explicabo, laborum numquam qui deleniti consequatur? Dolorem neque rerum nobis tempora eaque aliquid.
// Commodi fugiat maiores reiciendis. Atque quam quae consequuntur ratione voluptates nobis molestias sapiente Nisha is Munni Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, error. Voluptatum, placeat quos minus magnam aspernatur obcaecati explicabo, laborum numquam qui deleniti consequatur? Dolorem neque rerum nobis tempora eaque aliquid.
// Commodi fugiat maiores reiciendis. Atque quam quae consequuntur ratione voluptates nobis molestias sapiente
// " icon={<AceternityIcon />}>
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>
//                 <Card title="Munni is Aditi" icon={<AceternityIcon />}>
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>
//                 <Card title="Munni is Aditi" icon={<AceternityIcon />}>
//                     <CanvasRevealEffect
//                         animationSpeed={3}
//                         containerClassName="bg-black"
//                         colors={[
//                             [236, 72, 153],
//                             [232, 121, 249],
//                         ]}
//                         dotSize={2}
//                     />
//                     {/* Radial gradient for the cute fade */}
//                     <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
//                 </Card>