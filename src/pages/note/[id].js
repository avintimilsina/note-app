import dayjs from "dayjs";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-hot-toast";
import Link from "next/link";

dayjs.extend(relativeTime);

const NoteContent = () => {
	const router = useRouter();
	console.log(router.query.id);
	const [value, loading, error] = useDocumentData(
		doc(db, "notes", router?.query?.id ?? "-"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	if (loading) {
		return <h1>Loading..</h1>;
	}
	if (error) {
		return <h1>Error</h1>;
	}
	if (!loading && !error && !value) {
		router.push("/");
		toast.error("Note not Found!", { id: "no-note" });
		return <h1>Loading..</h1>;
	}
	return (
		<div>
			<h1 className="card-title overflow-hidden">{value.heading}</h1>
			<p>{value.message}</p>
			<p>Created {dayjs(value.createdAt?.seconds * 1000).fromNow(true)} ago</p>
			<Link
				className="btn btn-sm btn-primary"
				href={`/edit/${router?.query?.id}`}
			>
				Edit
			</Link>
			<button
				className="btn btn-sm btn-error"
				onClick={async () => {
					await deleteDoc(doc(db, "notes", router?.query?.id)).then(() => {
						toast.success("Note Deleted Successfully!", { id: "no-note" });
					});
				}}
			>
				Delete
			</button>
		</div>
	);
};

export default NoteContent;
