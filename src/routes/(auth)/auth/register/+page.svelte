<script lang="ts">
	import { SignedOut } from 'sveltefire';
	import {
		createUserWithEmailAndPassword,
		signInWithPopup,
		GoogleAuthProvider
	} from 'firebase/auth';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { failure, success } from '@/helpers/Toast';
	import { getFirebaseErrorMessage } from '@/helpers/FirebaseErrors';

	let email: string = '';
	let password: string = '';
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<SignedOut let:auth>
		<Card.Root
			class="flex w-full flex-col items-center border-none px-8 py-4 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4"
		>
			<Card.Header class="flex flex-col gap-4 text-center">
				<Card.Title class="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
					>Register</Card.Title
				>
				<Card.Description class="text-sm sm:text-base md:text-lg"
					>Create an account</Card.Description
				>
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
								class="w-full sm:w-[20rem] md:w-[22rem] lg:w-[24rem]"
								bind:value={email}
							/>
						</div>
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<Label for="password">password</Label>
							<Input
								type="password"
								placeholder="password"
								name="password"
								class="w-full sm:w-[20rem] md:w-[22rem] lg:w-[24rem]"
								bind:value={password}
							/>
						</div>
					</div>

					<div class="buttons flex flex-col items-center gap-4">
						<Button
							type="submit"
							class="w-full"
							on:click={async (e) => {
								e.preventDefault();
								try {
									await createUserWithEmailAndPassword(auth, email, password);
									success('Account created successfully');
									goto('/');
								} catch (error) {
									const errorMessage = getFirebaseErrorMessage(error.code);
									failure(errorMessage);
								}
							}}>Register</Button
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
									success('Google Sign In Successful');
									goto('/');
								} catch (error) {
									const errorMessage = getFirebaseErrorMessage(error.code);
									failure(errorMessage);
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
					<div>already have an account?</div>
					<button
						type="button"
						class="text-secondary-500 w-36"
						on:click={() => {
							goto('/auth/login');
						}}
					>
						Sign in
					</button>
				</div>
			</Card.Footer>
		</Card.Root>
	</SignedOut>
</div>
