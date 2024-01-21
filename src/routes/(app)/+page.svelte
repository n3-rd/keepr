<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import Write from '@/components/Write.svelte';
</script>

<Tabs.Root value="write" class="w-[400px]">
	<Tabs.List class="my-4">
		<Tabs.Trigger value="write">Write</Tabs.Trigger>
		<Tabs.Trigger value="calender">Calender</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="write">
		<Write />
	</Tabs.Content>
	<Tabs.Content value="calender">Change your calender here.</Tabs.Content>
</Tabs.Root>
