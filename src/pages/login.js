import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const LoginPage = () => {
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	return (
		<section class="background-image-full bg-gray-50">
			<div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				<a
					href="#"
					class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						class="mr-2 h-10 w-8"
						className="h-20 w-20 "
						src="logo.svg"
						alt="logo"
					/>
					<span className="better-font size text-4xl">ENGRAVE</span>
				</a>
				<div class="w-full rounded-lg bg-slate-50 shadow-2xl shadow-slate-500	 md:mt-0 lg:max-w-md xl:p-0">
					<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
							Sign in to your Google account
						</h1>

						<button
							className="btn-primary btn w-full "
							onClick={async () => {
								await signInWithGoogle();
							}}
						>
							<svg
								class="mr-2 -ml-1 h-4 w-4"
								aria-hidden="true"
								focusable="false"
								data-prefix="fab"
								data-icon="google"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 488 512"
							>
								<path
									fill="currentColor"
									d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
								></path>
							</svg>
							Sign in with Google
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoginPage;
