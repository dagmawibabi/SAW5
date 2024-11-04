<script>
	import { Search } from 'lucide-svelte';
	import Papers, { papersList } from '../../state/papers.svelte';
	import SearchState from '../../state/search_state.svelte';
	import { Circle } from 'svelte-loading-spinners';

	let paperState = new Papers();
	let searchTerm = new SearchState();
</script>

<div class="absolute bottom-0 left-0 right-0 h-fit backdrop-blur-sm pb-4">
	<div
		class="flex flex-col m-auto bg-transparent pt-3
	 w-full md:w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/5
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
					placeholder={'Search'}
					bind:value={searchTerm.searchTerm}
				/>
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
