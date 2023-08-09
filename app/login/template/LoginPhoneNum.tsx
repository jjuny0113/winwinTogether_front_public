"use client"
import React from "react";
import LoginForm from "../components/LoginPhoneNum/LoginForm";
import Logo from "../components/LoginPhoneNum/Logo";
import Resend from "../components/AuthNumber/Resend";

const LoginPhoneNum = () => {
  return (
    
      <div className="flex flex-col gap-16">
        <Logo />
        <LoginForm />
      </div>
    
  );
};

export default LoginPhoneNum;
