import React, { FC, ReactElement } from "react";
import Image from "next/image";

interface TitleProps {
  title?: ReactElement;
  description: string;
}
const Title: FC<TitleProps> = (props) => {
  const { title, description } = props;
  return (
    <div className="-space-y-2 flex flex-col mt-4 md:-mt-40 items-center justify-center md:items-start">
      {title ? (
        title
      ) : (
        <Image
          className="-ml-[30px]"
          src="/logo.svg"
          width={320}
          height={106}
          alt="Facebook logo"
        />
      )}
      <p className="font-sans font-medium text-[#1c1e21] text-center md:text-left text-[24px] lg:text-[28px] w-[400px] md:w-[350px] lg:w-[510px] leading-7 lg:leading-8">
        {description}
      </p>
    </div>
  );
};

export default Title;
