<script lang="ts">
	let props = $props();
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="group py-1" onclick={() => dispatch('click')}>
	<div
		class={props.isSelected == true
			? 'flex justify-start gap-x-2 border rounded-xl p-1 border-black cursor-pointer'
			: 'flex justify-start gap-x-2 border border-zinc-300 rounded-xl p-1 group-hover:border-black cursor-pointer'}
	>
		<div
			class={props.isSelected == true
				? 'border border-transparent flex items-center px-2 rounded-lg bg-black text-white'
				: 'border border-transparent flex items-center px-2 rounded-lg group-hover:bg-black group-hover:text-white'}
		>
			<props.icon size={18} />
		</div>
		<div class="flex flex-col">
			<span class="text-sm font-semibold"> {props.title}</span>
			<span class="text-xs"> {props.subTitle}</span>
		</div>
	</div>
</div>
