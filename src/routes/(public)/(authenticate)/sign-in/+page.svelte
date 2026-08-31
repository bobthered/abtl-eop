<script lang="ts">
	import { signIn } from '#lib/auth/auth.remote.ts';
	import {
		Button,
		Field,
		Fieldset,
		H1,
		Input,
		Label,
		Logo,
		RemoteFunctionForm
	} from '#lib/components';
</script>

<RemoteFunctionForm
	class="w-full max-w-xs"
	{fields}
	{header}
	remoteForm={signIn}
	submitButtonLabel="Sign In"
/>

{#snippet header()}
	<Logo class="mx-auto -mb-8 hidden dark:block" color="#fff" size={128} />
	<Logo class="mx-auto -mb-8 block dark:hidden" size={128} />
	<H1 class="mx-auto" variants={['h3.base']}>Welcome Back</H1>
{/snippet}
{#snippet fields()}
	<Fieldset>
		<Field>
			<Label>Username</Label>
			<Input {...signIn.fields.username.as('text')} required={true} />
		</Field>
		<Field>
			<Label>Password</Label>
			<Input {...signIn.fields._password.as('password')} required={true} />
		</Field>
	</Fieldset>
{/snippet}
