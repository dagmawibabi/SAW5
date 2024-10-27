<script>
	import { Search } from 'lucide-svelte';
	import Papers from '../../state/papers.svelte';
	import SearchState from '../../state/search_state.svelte';

	let paperState = new Papers();
	let searchTerm = new SearchState();
</script>

<div class="absolute bottom-0 left-0 right-0 h-fit backdrop-blur-sm pb-4">
	<div
		class="flex flex-col m-auto bg-transparent pt-3
	 w-full md:2/5 lg:2/5 xl:2/5 2xl:2/5
	 px-2 md:px-0 lg:px-0 xl:px-0 2xl:px-0"
	>
		<!-- Input Box -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="group flex items-center border border-zinc-400 rounded-3xl bg-white">
			<div class="flex w-full items-center px-3 py-2 gap-x-2">
				<Search size={18} class="text-zinc-400" />
				<input
					type="text"
					class="w-full bg-white outline-none pb-1"
					placeholder={'Search'}
					bind:value={searchTerm.searchTerm}
				/>
			</div>

			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="group/search group-hover:bg-zinc-700 rounded-tr-2xl rounded-br-2xl overflow-clip"
				onclick={() => paperState.searchPapers(searchTerm.searchTerm)}
			>
				<div
					class="px-6 py-2 border-l cursor-pointer group-hover/search:bg-black group-hover:text-white"
				>
					<span> Search </span>
				</div>
			</div>
		</div>
	</div>
</div>
