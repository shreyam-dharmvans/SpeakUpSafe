import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";

export const Footer = () => {
    return (
        <div className='bg-black mx-auto flex flex-col justify-center items-center'>
            <div className="h-[1px] w-[70%] text-white mb-10 bg-white"></div>
            <div className="text-white flex items-center mb-4 bg-black">
                <div><FaRegCopyright className="text-slate-600 mr-2" /></div>
                <div className="text-slate-600">AM Feeds 2024, All Rights Reserved</div>
            </div>
        </div>
    )
}
