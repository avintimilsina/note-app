import Image from "next/image";
import React from "react";

const Heading = ({ headingText }) => {
    return (
        <div className="flex flex-row justify-center">
            <div className=" card mx-10 my-7 w-96 bg-base-100 text-center text-3xl font-bold  shadow-xl">
                <a href="#" class=" flex items-center  justify-center">
                    <p className="better-font size px-4 text-5xl">{headingText}</p>
                    <Image height={100} width={100} src="logo.svg" alt="logo" />
                </a>
            </div>
        </div>
    );
};

export default Heading;
