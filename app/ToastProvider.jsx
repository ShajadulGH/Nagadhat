"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

export default function ToastProvider({ children }) {
  const [position, setPosition] = useState("bottom-right"); // Default position for desktop

  useEffect(() => {
      if (window.innerWidth < 768) {
        setPosition("top-right"); // Mobile position
      } else {
        setPosition("bottom-right"); // Desktop position
      }
    },[])
    
    return (
        <>
            <ToastContainer autoClose={700} position={position}  />
            {children}
        </>
    );
}
