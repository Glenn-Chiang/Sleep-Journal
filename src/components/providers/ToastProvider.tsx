"use client"

import React from "react"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export const ToastProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      {children}
      <ToastContainer position="top-center" />      
    </>
  )
}