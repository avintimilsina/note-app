import React from "react";

const Heading = ({ headingText }) => {
	return (
		<div className="flex flex-row justify-center">
			<div className="text-3xl font-bold text-center my-7 card w-96 mx-10bg-base-100 shadow-xl  ">
				<h1 className="p-5 better-font text-5xl text-green-700">
					{headingText}
				</h1>
			</div>
		</div>
	);
};

export default Heading;
