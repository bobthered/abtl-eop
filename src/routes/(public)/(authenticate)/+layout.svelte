<script lang="ts">
	import { Div, Main, Source, Video } from '#lib/components';

	type Props = {
		children: Snippet;
	};

	// $props()
	let { children }: Props = $props();
</script>

<Div class="flex min-h-screen flex-col lg:flex-row">
	<Main
		class="flex grow items-center justify-center pt-[calc(env(safe-area-inset-top)+(var(--spacing)*4))] pr-[calc(env(safe-area-inset-right)+(var(--spacing)*4))] pb-[calc(env(safe-area-inset-bottom)+(var(--spacing)*4))] pl-[calc(env(safe-area-inset-left)+(var(--spacing)*4))]"
	>
		{@render children()}
	</Main>
	<Div class="hidden overflow-hidden lg:block lg:w-96">
		<Video autoplay class="h-full w-full object-cover" loop muted playsinline>
			<Source src="https://www.pexels.com/download/video/29040258/" type="video/mp4" />
		</Video>
	</Div>
</Div>
