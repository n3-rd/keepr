<script lang="ts">
	import { SignedOut } from 'sveltefire';
	import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { failure } from '@/helpers/Toast';
	import { getFirebaseErrorMessage } from '@/helpers/FirebaseErrors';

	let email: string = '';
	let password: string = '';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<SignedOut let:auth>
		<Card.Root class="flex w-2/4 flex-col items-center px-8 py-4">
			<Card.Header class="flex flex-col gap-4">
				<Card.Title class="text-5xl font-bold">Sign In</Card.Title>
				<Card.Description class="text-md">Sign in to your account</Card.Description>
			</Card.Header>
			<Card.Content>
				<form class="flex flex-col gap-8">
					<div class="inputs flex flex-col gap-4">
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<Label for="email">Email</Label>
							<Input
								type="email"
								placeholder="email"
								name="email"
								class="w-[24rem]"
								bind:value={email}
							/>
						</div>
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<Label for="password">password</Label>
							<Input
								type="password"
								placeholder="password"
								name="password"
								class="w-[24rem]"
								bind:value={password}
							/>
						</div>
					</div>

					<div class="buttons flex flex-col items-center gap-4">
						<Button
							type="submit"
							class="w-36"
							on:click={async (e) => {
								e.preventDefault();
								try {
									await signInWithEmailAndPassword(auth, email, password);
									goto('/');
								} catch (error) {
									console.log(error);
									const errorMessage = getFirebaseErrorMessage(error.code);
									failure(errorMessage);
								}
							}}>Sign In</Button
						>

						<div>or</div>

						<Button
							type="button"
							class="flex w-36 gap-3"
							on:click={async (e) => {
								e.preventDefault();
								const provider = new GoogleAuthProvider();
								try {
									await signInWithPopup(auth, provider);
									goto('/');
								} catch (error) {
									console.log(error);
								}
							}}
						>
							<img src="/icons/google.svg" alt="google sign in" class="h-full" />
							<div class="text">Google</div>
						</Button>
					</div>
				</form>
			</Card.Content>
			<Card.Footer>
				<div class="flex flex-col items-center gap-4">
					<div>Don't have an account?</div>
					<button
						type="button"
						class="w-36"
						on:click={() => {
							goto('/auth/register');
						}}
					>
						Register
					</button>
				</div>
			</Card.Footer>
		</Card.Root>
	</SignedOut>
</div>
