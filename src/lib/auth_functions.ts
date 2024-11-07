import { goto } from '$app/navigation';
import { authClient, signIn, signUp } from './auth_client';

export const handleSignIn = async (email: string, password: string) => {
	await signIn.email(
		{
			email: email,
			password: password,
		},
		{
			onError(context) {
				alert(context.error.message);
			},
			onSuccess() {
				goto("/homepage");
			}
		}
	);
};

export const handleSignUp = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string
) => {
	await signUp.email({
		email: email,
		password: password,
		name: `${firstName} ${lastName}`,
		fetchOptions: {
			onError(context) {
				alert(context.error.message);
			},
			onSuccess() {
				goto("/homepage")
			}
		}
	});
};

export const handleForgetPassword = async (email: string) => {
	await authClient.forgetPassword(
		{
			email: email,
			redirectTo: '/auth/reset_password'
		},
		{
			onSuccess() {
				alert('Password reset link sent to your email');
				goto('/');
			},
			onError(context) {
				alert(context.error.message);
			}
		}
	);
};

export const handleResetPassword = async (password: string) => {
	await authClient.resetPassword({
		newPassword: password,
		fetchOptions: {
			onSuccess() {
				window.location.href = '/auth/sign_in';
			},
			onError(context) {
				alert(context.error.message);
			}
		}
	});
};

export const handleLogout = async () => {
	await authClient.signOut()
	goto('/');
};
