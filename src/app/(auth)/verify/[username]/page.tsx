"use client";

import { SparklesCore } from '@/components/ui/sparkles'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { useToast } from '@/hooks/use-toast';

import { verifySchema as FormSchema } from '@/schemas/verify-schema';
import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { apiResponse } from '@/types/apiResponse';
import { Loader } from 'lucide-react';



function InputOTPForm() {

    const { toast } = useToast()
    const { username } = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        try {
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            })

            setIsLoading(true);

            let res = await axios.post<apiResponse>("/api/verify-code", {
                username,
                verifyCode: data.pin
            })



            if (res.data.message == "User is verified successfully") {
                router.push("/sign-in");
                toast({
                    title: "Verification successfull",
                    description: res.data.message
                })
            }
        } catch (error) {
            let apiError = error as AxiosError<apiResponse>
            console.log("Error verifying code : " + error);
            toast({
                title: "Some error occurred",
                description: apiError.response?.data.message,
                variant: 'destructive'
            })

        }

        setIsLoading(false)

    }

    return (
        <div className="h-[55rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md ">
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
            <div className=' mx-auto mt-32 text-[#64748b] flex flex-col justify-center items-center w-full z-50'>
                {isLoading && <Loader className='animate-spin text-white h-28 w-28' />}
                <div className='max-md:px-10'>
                    <Image
                        src="/verifyLogo.svg"
                        alt='Singin'
                        width={400}
                        height={400} />
                </div>
                <div className='mt-16 w-[40%] flex flex-col items-center justify-center z-[70]'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 flex flex-col items-center text-white">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Code</FormLabel>
                                        <FormControl className=''>
                                            <InputOTP maxLength={8} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                    <InputOTPSlot index={6} />
                                                    <InputOTPSlot index={7} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Please enter the Verification code sent to your email.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>

        </div>

    )
}

export default InputOTPForm;
