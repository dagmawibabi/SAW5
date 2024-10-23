<script lang="ts">
	import Title from '../../components/title.svelte';
	import AuthCards from '../../components/auth_cards.svelte';
	import LongButton from '../../components/long_button.svelte';
	import { LogIn, UserPlus } from 'lucide-svelte';

	let selectedButton = $state('x');
	function selectButton(label: string) {
		selectedButton = label;
	}
</script>

<div class="mx-auto max-w-sm">
	<Title />
	<div class="pt-4">
		<AuthCards
			icon={LogIn}
			title={'Login'}
			subTitle={'If you already have an account, log in'}
			on:click={() => selectButton('login')}
			isSelected={selectedButton === 'login'}
		/>
		<AuthCards
			icon={UserPlus}
			title={'Sign Up'}
			subTitle={'Create an account and join ScholArxiv'}
			on:click={() => selectButton('sign up')}
			isSelected={selectedButton === 'sign up'}
		/>
	</div>
	<a
		href={selectedButton === 'login'
			? 'auth/sign_in'
			: selectedButton === 'sign up'
				? 'auth/sign_up'
				: ''}
	>
		<LongButton label={'Continue'} />
	</a>
</div>
