import Heading from "@/components/Heading";
import Note from "@/components/Note";
import Loading from "@/components/UI/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	addDoc,
	collection,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore";
import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase";
import LoginPage from "./login";

dayjs.extend(relativeTime);

const NotePage = () => {
	// Authentication
	const [user, userLoading, userError] = useAuthState(auth);
	const [signOut] = useSignOut(auth);
	const [values, loading, error, snapshot] = useCollectionData(
		query(collection(db, "notes"), where("user", "==", user?.uid ?? "-")),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	//Render message box
	const [messageOpen, setMessageOpen] = useState(true);
	// Input Note
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
			user: user?.uid,
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

	if (loading || userLoading) {
		return <Loading serverMessage={"Loading..."} />;
	}
	if (error || userError) {
		return <Loading serverMessage={"Error..."} />;
	}
	return (
		<>
			{user ? (
				<>
					<div className=" flex flex-row items-baseline justify-around">
						<p className="select-none text-transparent">Happy Easter</p>
						<Heading headingText={"ENGRAVE"} />
						<button
							className="btn-outline btn-error btn  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
							onClick={async () => {
								await signOut();
							}}
						>
							Log Out
						</button>
					</div>

					<div className="flex flex-col items-center justify-around">
						<input
							value={heading}
							onChange={addHeading}
							className="input-bordered input w-96 rounded-b-none !outline-none  "
							placeholder="Heading"
						/>
						{(messageOpen || heading.length > 0) && (
							<textarea
								value={text}
								onChange={addMessage}
								className="textarea-bordered textarea h-24 w-96 rounded-t-none border-t-0 !outline-none"
								placeholder="Message"
							/>
						)}

						<button
							onClick={addNote}
							className="hover: ... btn-primary btn mt-7 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
						>
							Publish Note
						</button>
					</div>
					<div className="flex w-full flex-row flex-wrap justify-start gap-2">
						{snapshot?.docs.map((user) => (
							<Note
								key={user.id}
								id={user.id}
								heading={user.data().heading}
								message={user.data().message}
								createdAt={user.data().createdAt?.seconds * 1000}
							/>
						))}
					</div>
				</>
			) : (
				<LoginPage />
			)}
		</>
	);
};

export default NotePage;
