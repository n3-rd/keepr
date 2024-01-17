<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	export let open: boolean;
</script>

<Dialog.Root {open}>
	<Dialog.Content>
		<slot />
	</Dialog.Content>
</Dialog.Root>
