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
			className="card mx-10 my-5 w-96 bg-base-100 shadow-xl "
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
							// console.log("Form Submitted");
							// router.reload();
						}}
					>
						<Form>
							<label
								htmlFor={id}
								className="hover: ... btn-primary btn-sm btn transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
							>
								View
							</label>

							<input type="checkbox" id={id} className="modal-toggle" />
							<label htmlFor={id} className="modal cursor-pointer">
								<label
									className="modal-box relative w-8/12 max-w-2xl"
									htmlFor=""
								>
									<h3 className="text-lg font-semibold">
										<Field
											id="heading"
											name="heading"
											placeholder="Heading"
											className="w-full bg-transparent text-2xl !outline-none "
										/>
									</h3>
									<p className="py-4">
										<Field
											as="textarea"
											id="message"
											name="message"
											placeholder="Message"
											className="h-24 w-full bg-transparent !outline-none"
										/>
									</p>
									<button
										className="hover: ... btn-primary btn-sm btn transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
										type="submit"
									>
										Edit
									</button>
								</label>
							</label>
						</Form>
					</Formik>

					<button
						className="hover: ... btn-error btn-sm btn transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
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
