import React from "react";

const Heading = ({ headingText }) => {
	return (
		<div className="flex flex-row justify-center">
			<div className="mx-10bg-base-100 card my-7 w-96 text-center text-3xl font-bold shadow-xl  ">
				<h1 className="better-font p-5 text-5xl">{headingText}</h1>
			</div>
		</div>
	);
};

export default Heading;
