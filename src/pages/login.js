import Loading from "@/components/UI/Loading";
import React from "react";
import {
	useAuthState,
	useSignInWithGoogle,
	useSignOut,
} from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const LoginPage = () => {
	const [user, loading, error] = useAuthState(auth);
	const [signInWithGoogle] = useSignInWithGoogle(auth);
	const [signOut] = useSignOut(auth);
	console.log(user);
	if (loading) {
		return <Loading serverMessage={"Loading..."} />;
	}
	if (error) {
		return <Loading serverMessage={"Error..."} />;
	}
	return (
		<div className="grid place-items-center h-screen">
			<button
				className="btn btn-primary"
				onClick={async () => {
					await signInWithGoogle();
				}}
			>
				{" "}
				Sign-in with Google
			</button>
			<button
				className="btn btn-primary"
				onClick={async () => {
					await signOut();
				}}
			>
				Log Out
			</button>
			<p>
				<img src={user?.photoURL} alt={user?.displayName}></img>
				{user?.displayName}
			</p>
		</div>
	);
};

export default LoginPage;
