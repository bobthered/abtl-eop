import { type ThemeObject } from 'sveltewind/theme';

import { twMerge } from 'tailwind-merge';

const defaults = {
	background: {
		input: 'bg-gray-50 dark:bg-gray-950',
		primary: 'bg-primary-500'
	},
	borderRadius: {
		input: 'rounded-md'
	},
	cursor: {
		pointer: 'cursor-pointer',
		text: 'cursor-text'
	},
	flex: {
		column: 'flex flex-col',
		row: 'flex flex-row'
	},
	gap: {
		sm: 'gap-2',
		md: 'gap-4',
		lg: 'gap-6',
		xl: 'gap-8',
		'2xl': 'gap-10',
		'3xl': 'gap-12'
	},
	outline: {
		focus: 'focus:outline-primary-500',
		hover: 'hover:outline-primary-500',
		input: 'outline outline-gray-200 dark:outline-gray-700',
		none: 'outline-none',
		primary: 'outline outline-primary-500'
	},
	padding: {
		base: 'p-6',
		input: 'px-6 py-3'
	},
	ring: {
		input: 'ring-3 ring-transparent',
		focus: 'focus:ring-primary-500/30'
	},
	transition: 'transition duration-200'
};

const theme: ThemeObject = {
	a: { base: '' },
	aside: { base: '' },
	button: {
		base: twMerge(
			defaults.background.primary,
			defaults.borderRadius.input,
			defaults.cursor.pointer,
			defaults.outline.focus,
			defaults.outline.hover,
			defaults.outline.primary,
			defaults.padding.input,
			defaults.ring.input,
			defaults.ring.focus,
			defaults.transition,
			'text-white'
		),
		variants: {
			ghost: twMerge('bg-transparent', 'outline-transparent', 'text-current'),
			icon: twMerge('px-3'),
			square: twMerge('rounded-none')
		}
	},
	card: {
		base: twMerge(
			defaults.background.input,
			defaults.borderRadius.input,
			defaults.outline.input,
			defaults.padding.base
		)
	},
	field: { base: twMerge(defaults.flex.column) },
	fieldset: { base: twMerge(defaults.flex.column, defaults.gap.md) },
	form: { base: twMerge(defaults.flex.column, defaults.gap.xl) },
	h1: { base: 'font-semibold text-5xl' },
	h2: { base: 'font-semibold text-4xl' },
	h3: { base: 'font-semibold text-3xl' },
	h4: { base: 'font-semibold text-2xl' },
	h5: { base: 'font-semibold text-xl' },
	h6: { base: 'font-semibold text-lg' },
	header: { base: '' },
	input: {
		base: twMerge(
			defaults.background.input,
			defaults.borderRadius.input,
			defaults.outline.focus,
			defaults.outline.hover,
			defaults.outline.input,
			defaults.padding.input,
			defaults.ring.input,
			defaults.ring.focus,
			defaults.transition
		)
	},
	nav: { base: '' }
};

export default theme;

export { theme };
