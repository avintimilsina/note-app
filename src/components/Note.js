import dayjs from "dayjs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { db } from "../../firebase";

const Note = ({ heading, message, createdAt, id }) => {
	const deleteNote = async (id) => {
		await deleteDoc(doc(db, "notes", id));
	};

	return (
		<div
			className="card w-96 mx-10 my-5 bg-base-100 shadow-xl "
			key={createdAt}
		>
			<div className="card-body ">
				<h1 className="card-title overflow-hidden">{heading}</h1>
				<p className="overflow-hidden">{message}</p>
				<p>Created {dayjs(createdAt).fromNow(true)} ago</p>

				<div className="card-actions justify-between">
					<Formik
						initialValues={{
							heading: heading,
							message: message,
						}}
						onSubmit={async (editValue) => {
							console.log("hello");
							const docRef = doc(db, "notes", id);
							await updateDoc(docRef, {
								heading: editValue.heading,
								message: editValue.message,
							});
							toast.success("Note edited successfully!");
							console.log("Form Submitted");
							// router.reload();
						}}
					>
						<Form>
							<label
								htmlFor={id}
								className="btn btn-sm btn-primary transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover: duration-300 ..."
							>
								View
							</label>

							<input type="checkbox" id={id} className="modal-toggle" />
							<label htmlFor={id} className="modal cursor-pointer">
								<label
									className="modal-box relative w-8/12 max-w-2xl"
									htmlFor=""
								>
									<h3 className="font-semibold text-lg">
										<Field
											id="heading"
											name="heading"
											placeholder="Heading"
											className="bg-transparent w-full !outline-none text-2xl "
										/>
									</h3>
									<p className="py-4">
										<Field
											as="textarea"
											id="message"
											name="message"
											placeholder="Message"
											className="bg-transparent w-full !outline-none h-24"
										/>
									</p>
									<button
										className="btn btn-sm btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ..."
										type="submit"
									>
										Edit
									</button>
								</label>
							</label>
						</Form>
					</Formik>

					<button
						className="btn btn-sm btn-error transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover: duration-300 ..."
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
