"use client";

import React, { useRef, useState } from 'react'
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
import { signinSchema as formSchema } from '@/schemas/signin-schema';
import Image from 'next/image';

import { SparklesCore } from "@/components/ui/sparkles";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Result } from 'postcss';
import { Loader } from 'lucide-react';


const Page = () => {
    const router = useRouter();
    const { toast } = useToast();
    // const usernameRef = useRef(null);
    // const passwordRef = useRef(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        let res = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password
        })

        if (res?.error) {
            if (res.error == "User is not verified.Please verify user") {
                router.push(`/verify/${values.username}`)
                toast({
                    variant: 'destructive',
                    title: "User not Verified",
                    description: res.error
                })
            }
            else {
                toast({
                    variant: 'destructive',
                    title: "Some error occurred",
                    description: res.error
                })
            }

        } else {
            // router.replace("/dashboard");
            //router.push('/dashboard')
            toast({
                title: "SignIn Successful",
                description: "User successfully signedin. \n If you are not redirected to Dashboard page, then please reload site",
            })
            router.refresh();
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
                <div className=' mx-auto mt-10 text-[#64748b] flex flex-col justify-center items-center w-full z-50'>
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
                                                <Input placeholder="username" {...field} />
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
                                                <Input placeholder="password" type='password' {...field} />
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

// {
//   "$schema": "https://ui.shadcn.com/schema.json",
//   "style": "default",
//   "rsc": true,
//   "tsx": true,
//   "tailwind": {
//     "config": "tailwind.config.ts",
//     "css": "src/app/globals.css",
//     "baseColor": "slate",
//     "cssVariables": true,
//     "prefix": ""
//   },
//   "aliases": {
//     "components": "@/components",
//     "utils": "@/lib/utils",
//     "ui": "@/components/ui",
//     "examples": "@/components/examples",
//     "blocks": "@/components/blocks"
//   }
// }
