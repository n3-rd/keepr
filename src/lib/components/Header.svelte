<script lang="ts">
	import { sync } from '@/helpers/tools';
	import { Cog, LogOut, RefreshCcw } from 'lucide-svelte';
	import { SignedIn } from 'sveltefire';
	export let displayName: string | null | undefined;
	export let userImageUrl: string | null | undefined;
</script>

<SignedIn let:signOut>
	<nav class="flex items-center justify-between border-b border-b-primary-300 bg-white px-6 py-3">
		<div class="user flex items-center gap-3">
			{#if userImageUrl}
				<div class="user-image">
					<img src={userImageUrl} alt="user avatar" class="h-10 w-10 rounded-full" />
				</div>
			{:else}
				<div class="user-image h-10 w-10 rounded-full bg-field-500"></div>
			{/if}
			<div class="user-name font-semibold">{displayName}</div>
		</div>
		<div class="actions flex items-center gap-5">
			<button
				on:click={() => {
					sync();
				}}
				class="text-primary-500 hover:text-primary-600"
			>
				<RefreshCcw size="2em" />
			</button>
			<a href="/settings" class="text-primary-500 hover:text-primary-600">
				<Cog size="2em" />
			</a>
			<button on:click={signOut} class="text-primary-500 hover:text-primary-600">
				<LogOut size="2em" />
			</button>
		</div>
	</nav>
</SignedIn>
