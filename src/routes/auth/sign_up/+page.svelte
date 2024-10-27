<script lang="ts">
	import { handleSignIn, handleSignUp } from '$lib/auth_functions';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import BetterAuthRemark from '../../../components/remarks/better_auth_remark.svelte';

	let email = $state('');
	let password = $state('');
	let firstName = $state('');
	let lastName = $state('');
</script>

<div class="h-screen flex flex-col justify-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Create Account</Card.Title>
			<Card.Description>Fill in your details to create an account.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="max@example.com"
						required
						bind:value={email}
					/>
				</div>
				<div class="gap-2 flex">
					<div>
						<Label for="name">First Name</Label>
						<Input id="name" placeholder="First Name" required bind:value={firstName} />
					</div>
					<div>
						<Label for="name">Last Name</Label>
						<Input id="name" placeholder="Last Name" required bind:value={lastName} />
					</div>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
					</div>
					<Input id="password" type="password" required bind:value={password} />
				</div>
				<Button
					type="button"
					class="w-full"
					on:click={() =>
						handleSignUp(firstName.trim(), lastName.trim(), email.trim(), password.trim())}
				>
					Sign Up
				</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?{' '}
				<a href="/auth/sign_up" class="hover:underline underline-offset-4"> Sign In </a>
			</div>
		</Card.Content>
	</Card.Root>
	<BetterAuthRemark />
</div>
