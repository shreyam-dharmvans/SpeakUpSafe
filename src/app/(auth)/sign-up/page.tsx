"use client";

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { Input } from "@/components/ui/input"
import { z } from 'zod';
import { signupSchema as formSchema } from '@/schemas/signup-schmea';
import Image from 'next/image';

import { SparklesCore } from "@/components/ui/sparkles";
import axios, { AxiosError } from 'axios'
import { apiResponse } from '@/types/apiResponse';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

import { Loader } from 'lucide-react';
import { useDebounceCallback } from 'usehooks-ts'




const Page = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, setUsername] = useState('')
    const debounced = useDebounceCallback(setUsername, 3000)
    const [formDesc, setFormDesc] = useState<string>("Username must be unique.")


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })



    useEffect(() => {


        const checkUsernameUnique = async () => {
            try {
                let res = await axios.get<apiResponse>(`/api/check-username-unique?username=${username}`)
                setFormDesc(res.data.message);
            } catch (error) {
                let apiError = error as AxiosError<apiResponse>
                setFormDesc(apiError.response?.data.message as string);
            }

        }

        checkUsernameUnique();
    }, [username])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            setIsLoading(true);
            let result = await axios.post<apiResponse>("/api/signup", values);

            if (result.data.success) {
                router.push(`/verify/${values.username}`);
                toast({
                    title: "Signup Successfull",
                    description: `Please verify your email. \n Code has been sent to your email.`,
                })
            }



        } catch (error) {
            console.log("Error signing up : " + error);
            let axiosError = error as AxiosError<apiResponse>

            toast({
                title: "Some error occurred",
                description: axiosError.response?.data.message,
                variant: "destructive",
            })
        }

        setIsLoading(false);
        form.reset();

    }


    return (
        <>
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
                    <div className=' max-md:px-10 block'>
                        <Image
                            src="signinSvg.svg"
                            alt='Singin'
                            width={400}
                            height={400} />
                    </div>
                    <div className='mt-16 max-md:w-[80%] md:w-[30%]'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" {...field} onChange={(e) => {
                                                    field.onChange(e)
                                                    debounced(e.target.value);
                                                }} />
                                            </FormControl>
                                            <FormDescription>
                                                {formDesc}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                                                Username must be unique.
                                            </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="password" {...field} type='password' />
                                            </FormControl>
                                            {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
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

        </>

    )
}

export default Page
