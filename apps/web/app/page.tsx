import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { buttonVariants } from "@/components/ui/button"

import { options } from "./api/auth/[...nextauth]/options"

export default async function Home() {
  return (
    <div className="px-28 py-14 mt-12 flex flex-col">
      <div className="flex justify-center gap-96">
        <div className="w-96 flex flex-col gap-2">
          <span className="text-white text-8xl font-light font-['Helvetica Neue'] uppercase">
            Vaccines
          </span>
          <span className="text-white text-8xl font-light font-['Helvetica Neue'] uppercase">
            for a
          </span>
          <span className="text-white text-8xl font-light font-['Helvetica Neue'] uppercase italic">
            brighter
          </span>
          <span className="text-white text-8xl font-light font-['Helvetica Neue'] uppercase italic">
            tomorrow
          </span>
        </div>
        <div className="flex-col justify-end items-start gap-5 flex">
          <div className="text-white text-2xl font-normal font-['Helvetica Neue'] w-64">
            Safe, efficient, and rewarding vaccine storage with DePIN and IoT on
            Solana.
          </div>
          <Link
            href="/auth"
            className={buttonVariants({ className: "font-bold" })}
          >
            <span className="font-bold">GET STARTED</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M7 7H17V17"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 17L17 7"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="h-9  pb-1 py-2 bg-white shadow border border-zinc-900 justify-start items-start gap-2.5 inline-flex w-screen mt-32 -translate-x-28">
        <div className="text-black font-normal text-sm font-['Helvetica Neue'] uppercase whitespace-nowrap overflow-x-hidden">
          fortifying wellness • fortifying wellness • fortifying wellness •
          fortifying wellness • fortifying wellness • fortifying wellness •
          fortifying wellness • fortifying wellness • fortifying wellness •
        </div>
      </div>
    </div>
  )
}
