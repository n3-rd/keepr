<script lang="ts">
	import * as Card from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="flex h-screen w-screen items-center justify-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>Settings</Card.Title>
			<Card.Description>Change preferences</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</div>
