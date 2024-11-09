import React from 'react'
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal2,
} from "@tabler/icons-react";
import { LiaUserSecretSolid } from "react-icons/lia";


import { FaCheck } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

export const Header = () => {
    return (
        <div className='flex items-center max-md:justify-between '>
            <div className='text-white md:fixed md:left-16 max-md:mr-3'>
                <LiaUserSecretSolid className='h-16 w-16 text-slate-300' />
            </div>
            <FloatingDock
                mobileClassName="md:translate-y-20" // only for demo, remove for production
                items={links}
            />
        </div>
    )
}

const links = [
    {
        title: "Home",
        icon: (
            <IconHome className="h-full w-full text-white" />
        ),
        href: "/",
    },

    {
        title: "Dashboard",
        icon: (
            <IconTerminal2 className="h-full w-full text-white" />
        ),
        href: "/dashboard",
    },
    {
        title: "SignUp",
        icon: (
            <IconNewSection className="h-full w-full text-white" />
        ),
        href: "/sign-up",
    },
    {
        title: "SignIn",
        icon: (
            <IconExchange className="h-full w-full text-white" />
        ),
        href: "/sign-in",
    },

    {
        title: "Verify",
        icon: (
            // <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            <FaCheck className="h-full w-full text-white" />
        ),
        href: "/verify",
    },
    {
        title: "Logout",
        icon: (
            // <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            <IoMdLogOut className="h-full w-full text-white" />
        ),
        href: "/api/auth/signout",
    },
];
