"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import Marquee from "react-fast-marquee"

import { buttonVariants } from "@/components/ui/button"

import { options } from "./api/auth/[...nextauth]/options"

export default function Home() {
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

      <div className="h-9 pb-1 py-2 bg-white shadow border border-zinc-900 justify-start items-start gap-2.5 inline-flex w-[98.5vw] mt-32 -translate-x-28 overflow-x-hidden">
        {/* <div className="text-black font-normal text-sm font-['Helvetica Neue'] uppercase whitespace-nowrap overflow-x-hidden">
          fortifying wellness • fortifying wellness • fortifying wellness •
          fortifying wellness • fortifying wellness • fortifying wellness •
          fortifying wellness • fortifying wellness • fortifying wellness •
        </div> */}
        <Marquee
          className="text-black font-normal text-sm font-['Helvetica Neue'] uppercase whitespace-nowrap overflow-x-hidden"
          autoFill
        >
          <p className="mr-1">fortifying wellness •</p>
        </Marquee>
      </div>

      <div className="grid grid-cols-2 grid-rows-7 mt-24 w-full">
        <div className="col-span-1 row-span-3 pr-6 pl-6 justify-center items-center border-r">
          <div className="px-3 py-2 rounded-full border border-white border-opacity-25 justify-start items-start gap-2.5 inline-flex">
            <div className="text-blue-300 text-xs font-normal font-['Helvetica Neue'] uppercase italic">
              features
            </div>
          </div>
          <div className="text-white text-[3rem] leading-none font-light font-['Helvetica Neue'] uppercase mt-6 mb-8">
            built for speed, security and transparency
          </div>
        </div>
        <div className="col-span-1 row-span-2 pl-6 flex py-6">
          <div className="flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="text-white text-opacity-40 text-4xl font-normal font-['Helvetica Neue'] lowercase">
              01.
            </div>
            <div className="text-white text-2xl font-normal font-['Helvetica Neue'] uppercase mt-2">
              temperature monitoring
            </div>
            <div className="text-white text-xl font-normal font-['Helvetica Neue']">
              Temperature of the environment in which the vaccines are stored is
              monitored to ensure optimal storage conditions
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-5 pl-6 justify-center items-stretch flex border-t pt-6">
          <div className="flex-col justify-center items-end gap-2.5 inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="385"
              height="384"
              viewBox="0 0 385 384"
              fill="none"
            >
              <path
                d="M191.891 382C296.765 382 381.782 296.934 381.782 192C381.782 87.0659 296.765 2 191.891 2M191.891 382C87.017 382 2 296.934 2 192M191.891 382C245.216 382 288.445 296.934 288.445 192C288.445 87.0659 245.216 2 191.891 2M191.891 382C138.565 382 95.3361 296.934 95.3361 192C95.3361 87.0659 138.565 2 191.891 2M2 192C2 87.0659 87.017 2 191.891 2M2 192H385M72.8067 42.2542C72.8067 42.2542 198.863 100.22 310.975 42.2542M310.975 341.746C310.975 341.746 184.918 283.78 72.8067 341.746"
                stroke="white"
                stroke-width="4"
              />
            </svg>
          </div>
        </div>
        <div className="col-span-1 row-span-2 pl-6 border-t flex border-r py-6">
          <div className="flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="text-white text-opacity-40 text-4xl font-normal font-['Helvetica Neue'] lowercase">
              02.
            </div>
            <div className="text-white text-2xl font-normal font-['Helvetica Neue'] uppercase mt-2">
              authenticity
            </div>
            <div className="text-white text-xl font-normal font-['Helvetica Neue']">
              Blockchain based vaccine tracking ensures authenticity of vaccines
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-2 pl-6 border-t flex border-r py-6">
          <div className="flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="text-white text-opacity-40 text-4xl font-normal font-['Helvetica Neue'] lowercase">
              03.
            </div>
            <div className="text-white text-2xl font-normal font-['Helvetica Neue'] uppercase mt-2">
              reward system
            </div>
            <div className="text-white text-xl font-normal font-['Helvetica Neue']">
              Distributors are rewarded for successful storage of vaccines
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
