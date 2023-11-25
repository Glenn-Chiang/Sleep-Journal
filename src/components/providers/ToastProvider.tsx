"use client";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const ToastProvider = () => {
  return <ToastContainer position="top-center" />;
};
