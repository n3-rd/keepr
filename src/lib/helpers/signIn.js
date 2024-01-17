import { signInWithEmailAndPassword } from 'firebase/auth';

/**
 * @param {string} email
 * @param {string} password
 * @param {import("firebase/auth").Auth} auth
 */
export async function signIn(email, password, auth) {
	return signInWithEmailAndPassword(auth, email, password);
}
