'use client';
import React from 'react'

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { Toaster } from "@/components/ui/toaster"

const Wrapper = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <div className="max-md:mt-10  md:absolute md:top-10 left-[590px] flex justify-center z-50">
                <Header />
            </div>
            {children}

            <Toaster />

            <Footer />
        </>
    )
}

export default Wrapper