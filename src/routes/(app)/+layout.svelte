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
	import PersistentModal from '@/components/PersistentModal.svelte';
	import { getAuth, updateProfile } from 'firebase/auth';
	import { failure, success } from '@/helpers/Toast';
	import Header from '@/components/Header.svelte';
	const fireAuth = getAuth();

	const { auth, firestore, storage, rtdb, analytics } = getFirebaseContext();

	let dialogOpen = true;
	const user = userStore(auth);
	let displayNameExists: any = true;
	let username: string = '';
	let displayName: string | null | undefined;
	let photoURL: string | null | undefined = $user?.photoURL || '';

	$: {
		displayNameExists = $user?.displayName;
		console.log($user);
		displayName = $user?.displayName;
		photoURL = $user?.photoURL;
	}

	const saveDisplayName = async () => {
		try {
			await updateProfile(fireAuth.currentUser, { displayName: username });
			displayName = username;
			success('Display name saved');
			dialogOpen = false; // close the dialog
		} catch (error) {
			failure('Error saving display name');
		}
	};
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<SignedIn let:user>
	<PersistentModal open={!displayNameExists && dialogOpen}>
		<form>
			<Dialog.Header>
				<Dialog.Title>Create display name</Dialog.Title>
				<Dialog.Description>
					create a display name for the app to use. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Username</Label>
					<Input id="username" class="col-span-3" bind:value={username} on:keyup. />
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
		</form>
	</PersistentModal>
	<Header {displayName} userImageUrl={user?.photoURL} />
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
