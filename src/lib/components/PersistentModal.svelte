<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	export let open: boolean;
</script>

<Dialog.Root {open} onOutsideClick={() => event.preventDefault()} closeOnEscape={false}>
	<Dialog.Content>
		<slot />
	</Dialog.Content>
</Dialog.Root>

<style>
	:global([data-dialog-close]) {
		display: none;
	}
</style>
