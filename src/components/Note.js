import dayjs from "dayjs";
import { toast } from "react-hot-toast";

const Note = ({ heading, message, createdAt, setObjState }) => {
	const deleteNote = async (createdAt) => {
		toast.error("Your data is permanently with us ;).");
	};
	return (
		<div className="card w-96 mx-10 my-5 bg-base-100 shadow-xl" key={createdAt}>
			<div className="card-body">
				<h1 className="card-title">{heading}</h1>
				<p>{message}</p>
				<p>Created {dayjs(createdAt).fromNow(true)} ago</p>
				<div className="card-actions justify-end">
					<button
						className="btn btn-sm btn-error"
						onClick={() => {
							deleteNote(createdAt);
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
