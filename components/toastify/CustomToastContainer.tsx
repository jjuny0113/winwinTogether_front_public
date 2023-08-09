"use client"
import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "./style.css";

const CustomToastContainer = (): JSX.Element => (
  <div style={{ fontSize: "14px", lineHeight: 1.5 }}>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      transition={Slide}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      hideProgressBar
    />
  </div>
);

export default CustomToastContainer;
