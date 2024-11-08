<script>
	import { Delete, DeleteIcon, Search, Trash, Trash2, Sparkles } from 'lucide-svelte';
	import Papers, { papersList } from '../../state/papers.svelte';
	import SearchState from '../../state/search_state.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import * as Select from '$lib/components/ui/select';

	let paperState = new Papers();
	let searchTerm = new SearchState();

	const models = [
		{ value: 'gemini', label: 'Gemini' },
		{ value: 'grok', label: 'Grok' }
	];

	const filters = [
		{ value: 'all', label: 'All' },
		{ value: 'title', label: 'Title' },
		{ value: 'author', label: 'Author' },
		{ value: 'abstract', label: 'Abstract' }
	];

	let value = $state('');

	const triggerContent = $derived(models.find((f) => f.value === value)?.label ?? 'Gemini');
	const triggerContentSearch = $derived(filters.find((f) => f.value === value)?.label ?? 'All');

	let isAIMode = $state(false);
</script>

<div
	class="absolute bottom-0 left-0 right-0 h-fit backdrop-blur-sm pb-4 m-auto
	w-full md:w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/5"
>
	{#if isAIMode == true}
		<div class="border h-fit px-2 p-2 backdrop-blur-md">
			<!-- Choose Model -->
			<div class="w-full flex justify-end items-center">
				<div class="pr-2 text-zinc-500 hover:text-black cursor-pointer">
					<Trash2 size={16} />
				</div>

				<Select.Root type="single" name="aiModels" bind:value>
					<Select.Trigger class="w-[100px]">
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Models</Select.GroupHeading>
							{#each models as model}
								<Select.Item value={model.value} label={model.label}>{model.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>

			<!-- Chats -->
			<div>
				<div class="bg-white w-fit px-2 py-1 rounded-xl border">Hey there</div>
			</div>
		</div>
	{:else}
		<!-- <div class="border h-fit px-2 p-2 backdrop-blur-md">
			<div class="w-full flex justify-end items-center">
				<Select.Root type="single" name="aiModels" bind:value>
					<Select.Trigger class="w-[90px] outline-none border-none py-0 px-2 hover:border-none">
						{triggerContentSearch}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Filters</Select.GroupHeading>
							{#each filters as filter}
								<Select.Item value={filter.value} label={filter.label}>{filter.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div> -->
	{/if}

	<div
		class="flex flex-col bg-transparent pt-3
	 
	 px-2 md:px-0 lg:px-0 xl:px-0 2xl:px-0"
	>
		<!-- Input Box -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="group flex border border-zinc-400 rounded-3xl bg-white">
			<!-- Input Box -->
			<div class="flex w-full items-center px-3 py-2 gap-x-2">
				<Search size={18} class="text-zinc-400" />
				<input
					type="text"
					class="w-full bg-white outline-none pb-1"
					placeholder={isAIMode == true ? `Chat with ${triggerContent} ...` : 'Search ...'}
					bind:value={searchTerm.searchTerm}
				/>
			</div>

			<div class="p-1 m-auto">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class={isAIMode == true
						? 'p-2 border border-zinc-400 bg-zinc-200 cursor-pointer text-black rounded-full'
						: 'p-2 border border-white hover:bg-zinc-200 cursor-pointer text-zinc-600 hover:text-black rounded-full'}
					onclick={() => (isAIMode = !isAIMode)}
				>
					<Sparkles size={17} />
				</div>
			</div>

			<!-- Search Button -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class={papersList.searching == true
					? 'rounded-tr-2xl rounded-br-2xl overflow-clip'
					: 'group/search group-hover:bg-zinc-700 rounded-tr-2xl rounded-br-2xl overflow-clip'}
				onclick={() => paperState.searchPapers(searchTerm.searchTerm)}
			>
				<div
					class={papersList.searching == true
						? 'px-9 h-full border-l flex items-center'
						: 'px-6 h-full border-l cursor-pointer group-hover/search:bg-black group-hover:text-white flex items-center'}
				>
					{#if papersList.searching == true}
						<Circle size="22" color="#000000" duration="1s" />
					{:else}
						<span> Search </span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
