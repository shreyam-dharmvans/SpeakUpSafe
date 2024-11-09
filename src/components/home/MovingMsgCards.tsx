import React from 'react'
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export const MovingMsgCards = () => {
    return (
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-none dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden mt-[20px]">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
    )
}

// const testimonials = [
//     {
//         quote:
//             "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
//         name: "Charles Dickens",
//         title: "A Tale of Two Cities",
//     },
//     {
//         quote:
//             "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
//         name: "William Shakespeare",
//         title: "Hamlet",
//     },
//     {
//         quote: "All that we see or seem is but a dream within a dream.",
//         name: "Edgar Allan Poe",
//         title: "A Dream Within a Dream",
//     },
//     {
//         quote:
//             "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
//         name: "Jane Austen",
//         title: "Pride and Prejudice",
//     },
//     {
//         quote:
//             "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
//         name: "Herman Melville",
//         title: "Moby-Dick",
//     },
// ];

const testimonials = [
    {
        quote: "You may not realize it, but you inspire others with your actions every day.",
        name: "Anonymous"
    },
    {
        quote: "I wanted to thank you for being there when I needed someone to talk to. It meant the world.",
        name: "Anonymous"
    },
    {
        quote: "You're stronger than you think. Keep pushing through, the best is yet to come.",
        name: "Anonymous"
    },
    {
        quote: "I've always admired your kindness and generosity. You make the world a better place.",
        name: "Anonymous"
    },
    {
        quote: "Your ability to stay positive, even in difficult situations, is truly remarkable.",
        name: "Anonymous"
    },
];

