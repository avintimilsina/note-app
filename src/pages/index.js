import Heading from "@/components/Heading";
import Note from "@/components/Note";
import InputField from "@/components/UI/InputField";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase";

dayjs.extend(relativeTime);

const NotePage = () => {
	const [values, loading, error] = useCollectionData(collection(db, "notes"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	const addNote = async () => {
		if (heading === "") {
			toast.error("No Heading found");
			return;
		}
		if (text === "") {
			toast.error("No Message found");
			return;
		}
		await addDoc(collection(db, "notes"), {
			heading: heading,
			message: text,
			createdAt: serverTimestamp(),
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
	if (loading) {
		return <h1>Loading..</h1>;
	}
	if (error) {
		return <h1>Error</h1>;
	}

	return (
		<>
			<Heading headingText={"My Note App"} />
			<div className="flex flex-row justify-around items-center">
				<InputField value={heading} onChange={addHeading} label={"Heading"} />
				<InputField value={text} onChange={addMessage} label={"Message"} />

				<button onClick={addNote} className="btn btn-primary">
					Publish Note
				</button>
			</div>
			<div className="w-full flex flex-row justify-start gap-2 flex-wrap">
				{values.map((user) => (
					<Note
						key={user.heading}
						heading={user.heading}
						message={user.message}
						createdAt={user.createdAt?.seconds * 1000}
					/>
				))}
			</div>
		</>
	);
};

export default NotePage;
