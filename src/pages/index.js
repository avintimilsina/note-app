import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Note = () => {
	const [objState, setObjState] = useState([]);
	const addNote = () => {
		if (heading === "") {
			toast.error("No Heading found");
			return;
		}
		if (text === "") {
			toast.error("No Message found");
			return;
		}
		setObjState(function (objState) {
			return [
				...objState,
				{ heading: heading, message: text, createdAt: Date.now() },
			];
		});
		setText("");
		setHeading("");
	};
	const [text, setText] = useState("");
	const addMessage = (e) => {
		setText(e.target.value);
	};

	const [heading, setHeading] = useState("");
	const addHeading = (e) => {
		setHeading(e.target.value);
	};
	const deleteNote = (createdAt) => {
		setObjState(function (objState) {
			return objState.filter((note) => note.createdAt != createdAt);
		});
	};
	return (
		<>
			<div className="flex flex-row justify-center">
				<div className="text-3xl font-bold text-center my-7 card w-96 mx-10bg-base-100 shadow-xl  ">
					<h1 className="p-5 better-font text-5xl text-green-700">
						My Note App
					</h1>
				</div>
			</div>
			<div className="flex flex-row justify-around items-center">
				<div>
					<label className="label">
						<span className="label-text text-xl">Heading</span>
					</label>
					<input
						value={heading}
						onChange={addHeading}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div>
					<label className="label">
						<span className="label-text text-xl">Message</span>
					</label>
					<input
						value={text}
						onChange={addMessage}
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<button onClick={addNote} className="btn btn-primary">
					Publish Note
				</button>
			</div>
			<div className="w-full flex flex-row justify-start gap-2 flex-wrap">
				{objState.map((user) => (
					<div
						className="card w-96 mx-10 my-5 bg-base-100 shadow-xl"
						key={user.createdAt}
					>
						<div className="card-body">
							<h1 className="card-title">{user.heading}</h1>
							<p>{user.message}</p>
							<p>Created {dayjs(user.createdAt).fromNow(true)} ago</p>
							<div className="card-actions justify-end">
								<button
									className="btn btn-sm btn-error"
									onClick={() => {
										deleteNote(user.createdAt);
									}}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Note;
