<script generics="RemoteFormOutput" lang="ts">
	import { type Snippet } from 'svelte';
	import { type HTMLFormAttributes } from 'svelte/elements';
	import { theme as globalTheme, type Theme } from 'sveltewind/theme';
	import {
		noopTransition,
		Button,
		Circle,
		Div,
		Field,
		Fieldset,
		Form,
		Input,
		Label,
		P,
		Spinner
	} from '#lib/components';
	import type { TransitionProps } from '#lib/components/types';
	import { format } from '#lib/format';
	import { slide } from '#lib/transitions';
	import type { RemoteForm, RemoteFormInput } from '$app/server';

	// Types
	type Props = HTMLFormAttributes & {
		buttons?: Snippet;
		children?: Snippet;
		class?: string;
		element?: HTMLFormElement | null;
		enhance?: any;
		fields?: Snippet;
		header?: Snippet;
		isSubmitted?: boolean;
		issues?: Snippet;
		isVisible?: boolean;
		remoteForm: RemoteForm<RemoteFormInput, RemoteFormOutput>;
		submitButtonLabel?: string;
		theme?: Theme;
		transition?: TransitionProps;
		variants?: string[];
	};

	// $props
	let {
		buttons,
		children,
		class: className = '',
		element = $bindable(null),
		enhance = async (form) => {
			isSubmitted = true;
			try {
				if (await form.submit()) {
					form.element.reset();
				} else {
				}
			} catch (error) {}
			isSubmitted = false;
		},
		fields,
		header,
		isSubmitted = $bindable(false),
		issues,
		isVisible = $bindable(true),
		remoteForm,
		submitButtonLabel = 'Submit',
		theme = globalTheme,
		transition = [noopTransition, {}],
		variants = [],
		...restProps
	}: Props = $props();

	// $state

	// $derived
	const classes = $derived(theme.resolve('remoteFunctionForm', variants, className));
	const fieldNames = $derived(Object.keys(remoteForm.fields.value()));
</script>

<Form
	{...restProps}
	{...remoteForm.enhance(enhance)}
	bind:element
	class={classes}
	{isVisible}
	{transition}
>
	{#if children}
		{@render children()}
	{:else}
		{#if header}
			{@render header()}
		{/if}
		{#if fields}
			{@render fields()}
		{:else}
			<Fieldset>
				{#each fieldNames as fieldName}
					{@const field = remoteForm.fields[fieldName]}
					<Field>
						<Label>{format.camelCase.to.sentenceCase(fieldName)}</Label>
						<Input {...field} />
					</Field>
				{/each}
			</Fieldset>
		{/if}
		{#if issues}
			{@render issues()}
		{:else}
			<Div
				class="flex flex-col text-red-500"
				isVisible={(remoteForm.fields.allIssues() ?? []).length > 0 && !isSubmitted}
				transition={[slide, { duration: 200 }]}
			>
				{#each remoteForm.fields.allIssues() as issue}
					<P>{issue.message}</P>
				{/each}
			</Div>
		{/if}
		{#if buttons}
			{@render buttons()}
		{:else}
			<Button type="submit">
				{#if !isSubmitted}
					{submitButtonLabel}
				{:else}
					<Spinner class="mx-auto" />
				{/if}
			</Button>
		{/if}
	{/if}
</Form>
