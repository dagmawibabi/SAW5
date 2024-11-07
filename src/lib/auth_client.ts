import { createAuthClient } from 'better-auth/svelte';
import { authBaseURL } from './constants';
// import { multiSessionClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: authBaseURL,
	disableCSRFTokenCheck: true
	// plugins: [multiSessionClient()]
});

export const { signIn, signUp, signOut, useSession } = authClient;
