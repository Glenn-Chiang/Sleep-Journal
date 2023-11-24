"use client"

import { ErrorMessage } from "@/components/ErrorMessage";
import { SubmitButton } from "@/components/buttons";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleLogin = async () => {
    setIsPending(true)
    try {
      await signIn('google', {callbackUrl: '/'})
    } catch (error ){
      setError((error as Error).message)
      setIsPending(false)
    }
  }

  return (
    <main className=" flex flex-col sm:flex-row sm:gap-12 gap-8 justify-center items-center p-10 bg-white shadow rounded-xl w-full">
      <div className="flex justify-center">
        <Image
          src={"https://cdn-icons-png.flaticon.com/512/564/564272.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-40 h-40 sm:h-60 sm:w-60 "
        />
      </div>
      <div className="flex flex-col gap-4 items-center ">
        <h1 className="text-center text-sky-500 text-4xl font-medium">
          Sleep Journal
        </h1>
        <p className="">Monitor your sleep</p>

        {error && <ErrorMessage message={error}/>}

        <SubmitButton onClick={handleLogin} isPending={isPending}>
          <Image
            src={"https://google.com/favicon.ico"}
            alt=""
            width={20}
            height={20}
          />
          Continue with Google
        </SubmitButton>
      </div>
    </main>
  );
}
