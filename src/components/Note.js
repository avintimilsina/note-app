import dayjs from "dayjs";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { db } from "../../firebase";

const Note = ({ heading, message, createdAt, id }) => {
	const deleteNote = async (id) => {
		await deleteDoc(doc(db, "notes", id));
	};
	return (
		<div className="card w-96 mx-10 my-5 bg-base-100 shadow-xl" key={createdAt}>
			<div className="card-body">
				<h1 className="card-title overflow-hidden">{heading}</h1>
				<p className="overflow-hidden">{message}</p>
				<p>Created {dayjs(createdAt).fromNow(true)} ago</p>

				<div className="card-actions justify-between">
					<Link className="btn btn-sm" href={`/note/${id}`}>
						View More
					</Link>
					<Link className="btn btn-sm btn-primary" href={`/edit/${id}`}>
						Edit
					</Link>
					<button
						className="btn btn-sm btn-error"
						onClick={() => {
							deleteNote(id);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Note;
