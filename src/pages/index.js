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
import {
	useAuthState,
	useSignInWithGoogle,
	useSignOut,
} from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

dayjs.extend(relativeTime);

const NotePage = () => {
	// Authentication
	const [user, userLoading, userError] = useAuthState(auth);
	const [signInWithGoogle] = useSignInWithGoogle(auth);
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
					<div className=" flex flex-row justify-around items-baseline">
						<p className="select-none text-transparent">Happy Easter</p>

						<Heading headingText={"My Note App"} />
						<button
							className="btn btn-error btn-outline"
							onClick={async () => {
								await signOut();
							}}
						>
							Log Out
						</button>
					</div>

					<div className="flex flex-col justify-around items-center">
						<input
							value={heading}
							onChange={addHeading}
							className="input input-bordered w-96 rounded-b-none !outline-none  "
							placeholder="Heading"
							// onFocus={() => {
							// 	setMessageOpen(true);
							// }}
							// onBlur={() => {
							// 	setMessageOpen(false);
							// }}
						/>
						{(messageOpen || heading.length > 0) && (
							<textarea
								value={text}
								onChange={addMessage}
								className="textarea textarea-bordered h-24 w-96 rounded-t-none !outline-none border-t-0"
								placeholder="Message"
							/>
						)}

						<button
							onClick={addNote}
							className="btn btn-primary mt-7 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ..."
						>
							Publish Note
						</button>
					</div>
					<div className="w-full flex flex-row justify-start gap-2 flex-wrap">
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
				<div className="grid place-items-center h-screen">
					<button
						className="btn btn-secondary gap-3"
						onClick={async () => {
							await signInWithGoogle();
						}}
					>
						<FcGoogle className="scale-125" />
						Sign-in with Google
					</button>
				</div>
			)}
		</>
	);
};

export default NotePage;
