import Heading from "@/components/Heading";
import Note from "@/components/Note";
import InputField from "@/components/UI/InputField";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);

const NotePage = () => {
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
	return (
		<>
			<Heading headingText={"My Note App"} />
			<div className="flex flex-row justify-around items-center">
				<InputField value={heading} onChange={addHeading} />
				<InputField value={text} onChange={addMessage} />

				<button onClick={addNote} className="btn btn-primary">
					Publish Note
				</button>
			</div>
			<div className="w-full flex flex-row justify-start gap-2 flex-wrap">
				{objState.map((user) => (
					<Note
						key={user.createdAt}
						heading={user.heading}
						text={user.message}
						createdAt={user.createdAt}
						deleteNote={deleteNote}
						setObjState={setObjState}
					/>
				))}
			</div>
		</>
	);
};

export default NotePage;
