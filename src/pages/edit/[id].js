import { doc, updateDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";
import { db } from "../../../firebase";

const EditNotePage = () => {
	const router = useRouter();
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
		<Formik
			initialValues={{
				heading: value.heading,
				message: value.message,
			}}
			onSubmit={async (editValue) => {
				const docRef = doc(db, "notes", router?.query?.id ?? "-");
				await updateDoc(docRef, {
					heading: editValue.heading,
					message: editValue.message,
				});
				toast.success("Note edited successfully!");
				router.push(`/note/${router?.query?.id}`);
			}}
		>
			<Form>
				<label htmlFor="heading">Heading</label>
				<Field id="heading" name="heading" placeholder="Jane" />

				<label htmlFor="message">Message</label>
				<Field id="message" name="message" placeholder="Doe" />
				<button className="btn btn-sm"
                 type="submit">Edit</button>
			</Form>
		</Formik>
	);
};

export default EditNotePage;
