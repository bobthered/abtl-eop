<script lang="ts">
	import { Div } from '#lib/components';

	// $props()
	let { children } = $props();
</script>

<Div class="flex flex-col p-6">
	{@render children()}
</Div>
