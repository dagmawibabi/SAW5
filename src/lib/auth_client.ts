import { createAuthClient } from 'better-auth/svelte';
import { authBaseURL } from './constants';

export const authClient = createAuthClient({
	baseURL: authBaseURL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
