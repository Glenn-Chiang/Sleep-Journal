"use client"

import React from "react"

export const Modal = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-40 flex justify-center items-center backdrop-blur-sm bg-slate-500/50 p-4">
      <section className="rounded-xl shadow bg-white flex flex-col gap-4 p-4 w-full sm:w-3/4">
        {children}
      </section>
    </div>
  )
}