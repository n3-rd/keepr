<script lang="ts">
	import { SignedIn, SignedOut } from 'sveltefire';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { userStore } from 'sveltefire';
	import { getFirebaseContext } from 'sveltefire';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Modal from '@/components/Modal.svelte';
	import { getAuth, updateProfile } from 'firebase/auth';
	import { failure, success } from '@/helpers/Toast';
	const fireAuth = getAuth();

	const { auth, firestore, storage, rtdb, analytics } = getFirebaseContext();

	let dialogOpen = true;
	const user = userStore(auth);
	let displayNameExists: any = true;
	let username: string = '';

	$: {
		displayNameExists = $user?.displayName;
		console.log($user);
	}

	const saveDisplayName = async () => {
		try {
			await updateProfile(fireAuth.currentUser, { displayName: username });
			console.log('success');
			success('Display name saved');
			dialogOpen = false; // close the dialog
		} catch (error) {
			console.log(error);
			failure('Error saving display name');
		}
	};
</script>

<SignedIn let:user>
	<Modal open={!displayNameExists && dialogOpen}>
		<Dialog.Header>
			<Dialog.Title>Create display name</Dialog.Title>
			<Dialog.Description>
				create a display name for the app to use. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">Username</Label>
				<Input id="username" class="col-span-3" bind:value={username} />
			</div>
		</div>
		<Dialog.Footer>
			<Button
				on:click={() => {
					saveDisplayName();
				}}
				type="submit">Save changes</Button
			>
		</Dialog.Footer>
	</Modal>
	<nav class="flex items-center justify-between px-6">
		<div class="user">{user?.displayName}</div>
		<div class="settings">settings</div>
	</nav>
	<div class="px-6">
		<slot />
	</div>
</SignedIn>

<SignedIn let:signOut>
	<button on:click={signOut}>Sign Out</button>
</SignedIn>

<SignedOut>
	{#if browser}
		{goto('/auth/login')}
	{/if}
</SignedOut>
