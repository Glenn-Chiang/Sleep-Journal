"use client"

import React from "react"

export const Modal = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center blur bg-slate-500/50">
      <section className="rounded-xl shadow bg-white flex flex-col gap-4 ">
        {children}
      </section>
    </div>
  )
}