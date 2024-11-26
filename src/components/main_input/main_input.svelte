<script lang="ts">
	import {
		Search,
		Trash2,
		Sparkles,
		Layers,
		Minimize,
		Maximize,
		ChevronsUpDown
	} from 'lucide-svelte';
	import Papers, { papersList } from '../../state/papers.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import * as Select from '$lib/components/ui/select';
	import { searchTerm } from '../../state/search_state.svelte';
	import AI, { conversationList } from '../../state/ai.svelte';
	import SelectedPapers, { selectedPapersList } from '../../state/selected_papers.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	const plugins = [gfmPlugin()];

	let paperState = new Papers();
	let selectedPapers = new SelectedPapers();
	let ai = new AI();

	const models = ['gemini-1.5-flash', 'grok-beta'];

	const filters = [
		{ value: 'all', label: 'All' },
		{ value: 'title', label: 'Title' },
		{ value: 'author', label: 'Author' },
		{ value: 'abstract', label: 'Abstract' }
	];

	let selectedModel: any = $state('');
	let selectedSearchFilter: any = $state('');

	const triggerContentSearch = $derived(
		filters.find((f) => f.value === selectedSearchFilter)?.label ?? 'All'
	);

	let isAIMode = $state(false);
	let currentModel = $state(models[0]);
	let minimizeConversation = $state(false);
</script>

<div
	class="no-scrollbar absolute bottom-0 left-0 right-0 h-fit backdrop-blur-md pb-4 m-auto rounded-tl-xl rounded-tr-xl border-t border-zinc-200
	w-full md:w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/5"
>
	{#if isAIMode == true}
		<div
			class={minimizeConversation == true
				? 'no-scrollbar min-h-10 max-h-10 overflow-clip p-2'
				: 'no-scrollbar min-h-10 max-h-[600px] overflow-clip p-2'}
		>
			<!-- AI Options -->
			<div class="w-full flex justify-between items-center pb-2">
				<!-- Selected Papers -->
				<Popover.Root>
					<Popover.Trigger class="bg-transparent"
						><div
							class="text-zinc-500 flex items-center gap-x-2 text-xs hover:text-black cursor-pointer"
						>
							<Layers size={14} />
							<span>{selectedPapersList.selectedPapers.length} papers selected</span>
						</div></Popover.Trigger
					>
					<Popover.Content
						class="w-80 border drop-shadow p-1 text-sm bg-transparent backdrop-blur-lg "
					>
						<div class="grid gap-4">
							<div class="space-y-1">
								{#each selectedPapersList.selectedPapers as eachSelectedPaper}
									<div class="flex items-center border rounded-sm">
										<!-- svelte-ignore a11y_click_events_have_key_events -->
										<!-- svelte-ignore a11y_no_static_element_interactions -->
										<div
											class="pl-1 text-zinc-500 hover:text-black cursor-pointer"
											onclick={() => selectedPapers.selectPaper(eachSelectedPaper)}
										>
											<Trash2 size={14} />
										</div>
										<div class="px-2 py-1 text-xs">
											<span> {eachSelectedPaper['title']} </span>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</Popover.Content>
				</Popover.Root>

				<!-- Choose Model -->
				<Popover.Root>
					<Popover.Trigger class="bg-transparent"
						><div
							class="text-zinc-500 flex items-center gap-x-2 text-xs hover:text-black cursor-pointer"
						>
							<span> {currentModel} </span>
							<ChevronsUpDown size={14} />
						</div></Popover.Trigger
					>
					<Popover.Content
						class="w-30 border drop-shadow p-1 text-sm bg-transparent backdrop-blur-lg "
					>
						<div class="grid space-y-1">
							{#each models as eachModel}
								<div class="flex items-center border rounded-sm">
									<!-- svelte-ignore a11y_click_events_have_key_events -->
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<div
										class="pl-1 text-zinc-500 hover:text-black cursor-pointer"
										onclick={() => (currentModel = eachModel)}
									>
										<div class="px-2 py-1 text-xs">
											<span> {eachModel} </span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</Popover.Content>
				</Popover.Root>

				<!-- Clear Conversation -->
				<div class="pr-2 text-zinc-500 cursor-pointer flex items-center gap-2">
					<Trash2
						size={14}
						class="hover:text-black"
						onclick={() => (conversationList.conversation = [])}
					/>
					{#if minimizeConversation == true}
						<Maximize
							size={14}
							class="hover:text-black"
							onclick={() => (minimizeConversation = !minimizeConversation)}
						/>
					{:else}
						<Minimize
							size={14}
							class="hover:text-black"
							onclick={() => (minimizeConversation = !minimizeConversation)}
						/>
					{/if}
				</div>
			</div>

			<!-- Chats -->
			<div
				class={conversationList.conversation.length > 0
					? 'no-scrollbar pb-24 overflow-scroll max-h-[580px]'
					: 'no-scrollbar pb-0'}
			>
				{#each conversationList.conversation as eachMessage}
					<div
						class={eachMessage.from == 'user'
							? 'no-scrollbar w-full flex justify-end py-1'
							: 'no-scrollbar w-full flex justify-start py-1'}
					>
						<div
							class={eachMessage.from == 'system'
								? 'no-scrollbar animate-pulse bg-white max-w-[80%] px-3 py-1 rounded-xl border text-xs'
								: 'no-scrollbar bg-white max-w-[80%] px-3 py-1 rounded-xl border text-xs'}
						>
							<Markdown md={eachMessage['content']} {plugins} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<!-- <div class="border h-fit px-2 p-2 backdrop-blur-md">
			<div class="w-full flex justify-end items-center">
				<Select.Root type="single" name="aiModels" bind:value={selectedSearchFilter}>
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

	<!-- Main Input Box -->
	<div class="no-scrollbar flex flex-col bg-transparent pt-2 px-2">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="group flex border border-zinc-400 rounded-3xl bg-white overflow-clip">
			<!-- Input Box -->
			<div class="flex w-full items-center px-3 py-2 gap-x-2">
				{#if isAIMode == true}
					<Sparkles size={18} class="text-zinc-400" />
					<input
						type="text"
						class="w-full bg-white outline-none pb-1"
						placeholder={`Chat with ${currentModel} ...`}
						bind:value={searchTerm.sendToAI}
					/>
				{:else}
					<Search size={18} class="text-zinc-400" />
					<input
						type="text"
						class="w-full bg-white outline-none pb-1"
						placeholder="Search ..."
						bind:value={searchTerm.searchTerm}
					/>
				{/if}
			</div>

			<!-- AI Toggle -->
			<div class="p-1 m-auto">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class={isAIMode == true
						? 'p-2 border border-zinc-400 bg-zinc-200 cursor-pointer text-black rounded-full'
						: 'p-2 border border-white hover:bg-zinc-200 cursor-pointer text-zinc-500 hover:text-black rounded-full'}
					onclick={() => (isAIMode = !isAIMode)}
				>
					<Sparkles size={14} />
				</div>
			</div>

			<!-- Search Button -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class={papersList.searching == true
					? 'rounded-tr-2xl rounded-br-2xl overflow-clip'
					: 'group/search group-hover:bg-zinc-200'}
				onclick={() => {
					isAIMode == true
						? ai.askAI(currentModel)
						: paperState.searchPapers(searchTerm.searchTerm);
				}}
			>
				<div
					class={papersList.searching == true
						? 'w-20 h-full flex items-center justify-center border-l'
						: 'w-20 h-full flex items-center justify-center border-l cursor-pointer group-hover/search:bg-black group-hover/search:text-white '}
				>
					{#if papersList.searching == true}
						<Circle size="22" color="#000000" duration="1s" />
					{:else}
						<span> {isAIMode == true ? 'Send' : 'Search'} </span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
