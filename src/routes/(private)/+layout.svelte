<script lang="ts">
	import { ChevronDown, Moon, PanelBottom, PanelLeft, Sun, X } from '@lucide/svelte';
	import { untrack, type Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { twMerge } from 'tailwind-merge';
	import { browser } from '$app/env';
	import { clickOutside } from '#lib/attachments';
	import { A, Aside, Button, Div, Header, Main, Nav, Span } from '#lib/components';
	import { fade, fly, slide } from '#lib/transitions';

	type Route = {
		id: string;
		href: string;
		label: string;
	};

	type NavigationRoute = {
		type: 'route';
		label: string;
		href: string;
	};

	type NavigationFolder = {
		type: 'folder';
		label: string;
		path: string;
		children: NavigationItem[];
	};

	type NavigationItem = NavigationRoute | NavigationFolder;

	type Props = {
		data: {
			user: {
				id: string;
				username: string;
			} | null;
			routes: Route[];
		};
		children: Snippet;
	};

	// helpers
	const buildNavigation = (routes: Route[]): NavigationItem[] => {
		const navigation: NavigationItem[] = [];

		for (const route of routes) {
			const segments = route.href.split('/').filter(Boolean);

			let current = navigation;
			let path = '';

			for (let index = 0; index < segments.length; index++) {
				const segment = segments[index];
				const isRoute = index === segments.length - 1;

				path += `/${segment}`;

				if (isRoute) {
					current.push({
						type: 'route',
						label: route.label,
						href: route.href
					});

					continue;
				}

				let folder = current.find(
					(item): item is NavigationFolder => item.type === 'folder' && item.path === path
				);

				if (!folder) {
					folder = {
						type: 'folder',
						label: formatLabel(segment),
						path,
						children: []
					};

					current.push(folder);
				}

				current = folder.children;
			}
		}

		return sortNavigation(navigation);
	};
	const formatLabel = (value: string): string => {
		return value.replace(/[-_]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase());
	};
	const isFolderOpen = (path: string): boolean => openFolderPaths.has(path);
	const sortNavigation = (navigation: NavigationItem[]): NavigationItem[] => {
		for (const item of navigation) {
			if (item.type === 'folder') {
				sortNavigation(item.children);
			}
		}

		return navigation.sort((a, b) =>
			a.label.localeCompare(b.label, undefined, {
				sensitivity: 'base'
			})
		);
	};
	const toggleFolder = (path: string): void => {
		if (openFolderPaths.has(path)) {
			openFolderPaths.delete(path);
		} else {
			openFolderPaths.add(path);
		}
	};

	// $props()
	let { data, children }: Props = $props();

	// $state
	let isAsideVisible = $state(false);
	let isDarkMode = $state(false);
	const openFolderPaths = new SvelteSet<string>();

	// $derives
	const navigation = $derived(buildNavigation(data.routes));

	// $effects
	$effect(() => {
		untrack(() => {
			if (browser) {
				const savedDarkMode = localStorage.getItem('darkMode');

				if (savedDarkMode === null) {
					isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
				} else {
					isDarkMode = savedDarkMode === 'true';
				}
			}
		});
	});
	$effect(() => {
		document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
		if (browser) {
			localStorage.setItem('darkMode', String(isDarkMode));
		}
	});
</script>

<Div class="flex min-h-screen grow flex-col">
	<Main class="relative flex grow flex-col overflow-auto lg:order-2">
		{@render children()}

		<Button
			class="absolute top-0 left-0 h-full w-full backdrop-blur"
			isVisible={isAsideVisible}
			onclick={() => (isAsideVisible = false)}
			transition={[fade, { duration: 200 }]}
			variants={['ghost', 'square']}
		/>
	</Main>
	<Header
		class="sticky bottom-0 z-1 flex justify-between pt-[max(env(safe-area-inset-top),.25rem)] pr-[max(env(safe-area-inset-right),1rem)] pb-[max(env(safe-area-inset-bottom),.25rem)] pl-[max(env(safe-area-inset-left),1rem)] lg:top-0 lg:bottom-auto lg:order-1"
		variants={['card.base', 'button.variant.square']}
	>
		<Div class="flex grow items-center justify-between">
			<Button onclick={() => (isAsideVisible = !isAsideVisible)} variants={['ghost', 'icon']}>
				{#if !isAsideVisible}
					<PanelBottom class="lg:hidden" />
					<PanelLeft class="hidden lg:block" />
				{:else}
					<X />
				{/if}
			</Button>
			<Div class="flex items-center gap-2">
				<Button
					onclick={() => {
						isDarkMode = !isDarkMode;
						localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
					}}
					variants={['ghost', 'icon']}
				>
					{#if isDarkMode}
						<Moon />
					{:else}
						<Sun />
					{/if}
				</Button>
			</Div>
		</Div>
		{@render aside({
			classes: 'top-0 -translate-y-full h-[calc(100vh-6.5rem)] w-screen flex lg:hidden',
			transitionProps: { y: '100%' }
		})}
		{@render aside({
			classes: '-bottom-px h-[calc(100vh-3.5rem)] translate-y-full hidden lg:flex',
			transitionProps: { x: '-100%' }
		})}
	</Header>
</Div>

{#snippet aside({ classes, transitionProps })}
	<Aside class={twMerge('absolute left-0 p-0', classes)}>
		<Nav
			class="flex w-full min-w-xs flex-col gap-1 p-0"
			isVisible={isAsideVisible}
			transition={[fly, { duration: 200, opacity: 1, ...transitionProps }]}
			variants={['card.base', 'button.variant.square']}
		>
			<Div class="flex grow flex-col gap-1 overflow-y-auto p-3 pb-0">
				{#each navigation as item}
					{@render navigationItem(item)}
				{/each}
			</Div>
			<Div class="flex flex-col gap-1 p-3 pt-0">
				{@render navigationItem({ type: 'route', label: 'Sign Out', href: '/sign-out' })}
			</Div>
		</Nav>
	</Aside>
{/snippet}
{#snippet navigationItem(item)}
	{#if item.type === 'folder'}
		<Div class="flex flex-col gap-1">
			<Button
				class="flex items-center justify-between gap-4 font-semibold"
				onclick={() => toggleFolder(item.path)}
				variants={['ghost']}
			>
				<Span>
					{item.label}
				</Span>
				<ChevronDown
					class={twMerge(
						'size-4 transition duration-200',
						isFolderOpen(item.path) ? 'rotate-0' : '-rotate-90'
					)}
				/>
			</Button>

			<Div
				class="ml-3 flex flex-col gap-1 border-l border-gray-200 pl-3 dark:border-gray-700"
				isVisible={isFolderOpen(item.path)}
				transition={[slide, { duration: 200 }]}
			>
				{#each item.children as child}
					{@render navigationItem(child)}
				{/each}
			</Div>
		</Div>
	{:else}
		<A
			href={item.href}
			onclick={() => (isAsideVisible = false)}
			variants={['button.base', 'button.variant.ghost']}
		>
			{item.label}
		</A>
	{/if}
{/snippet}
