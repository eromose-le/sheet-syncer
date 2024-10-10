import React from "react";
import { redirectToLogin } from "../utils/index.";

// Reusable LinkItem Component
interface LinkItemProps {
  href?: string;
  text: string;
  onClick: () => void;
}
const LinkItem = ({ href, text }: LinkItemProps) => (
  <a href={href} className="hover:underline">
    {text}
  </a>
);

const Footer = () => {
  // Language options array
  const languages = [
    "English (UK)",
    "Hausa",
    "Français (France)",
    "Português (Brasil)",
    "Español",
    "العربية",
    "Bahasa Indonesia",
    "Deutsch",
    "日本語",
    "Italiano",
    "हिन्दी",
  ];

  // Footer links array
  const links = [
    "Sign Up",
    "Log in",
    "Messenger",
    "Facebook Lite",
    "Video",
    "Places",
    "Games",
    "Marketplace",
    "Meta Pay",
    "Meta Store",
    "Meta Quest",
    "Ray-Ban",
    "Meta AI",
    "Instagram",
    "Threads",
    "Fundraisers",
    "Services",
    "Voting Information Centre",
    "Privacy Policy",
    "Privacy Centre",
    "Groups",
    "About",
    "Create ad",
    "Create Page",
    "Developers",
    "Careers",
    "AdChoices ▸",
    "Terms",
    "Help",
    "Contact uploading and non-users",
  ];

  return (
    <footer className="container-wrapper">
      <div className="text-[#737373] font-medium text-[12px] py-4">
        {/* Language Options */}
        <div className="flex font-sans flex-wrap justify-start items-center space-x-4 mt-4 mb-3">
          {languages.map((language, index) => (
            <LinkItem key={index} text={language} onClick={redirectToLogin} />
          ))}
          <button
            className="transition-ease hover:bg-gray-50 border px-2 w-[30px] h-[20px] flex items-center justify-center font-semibold text-[18px]"
            onClick={redirectToLogin}
          >
            +
          </button>
        </div>

        <div className="w-full border-t border-gray-200 mb-[10px]"></div>

        {/* Links Section */}
        <div className="flex flex-wrap font-medium text-left justify-start space-x-4 mb-4">
          {links.map((link, index) => (
            <LinkItem key={index} text={link} onClick={redirectToLogin} />
          ))}
        </div>

        {/* Copyright */}
        <div className="text-start font-medium text-gray-500">
          <span>Meta © 2024</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
