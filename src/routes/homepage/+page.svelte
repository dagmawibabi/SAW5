<script lang="ts">
	import Papers from '../../state/papers.svelte';
	import EachPaper from '../../components/each_paper.svelte';
	import Footer from '../../components/footer.svelte';
	import Navigation from '../../components/navigation.svelte';
	import FeedSkeletons from '../../components/skeleton/feed_skeletons.svelte';
	import SearchState from '../../state/search_state.svelte';

	let paperState = new Papers();
	paperState.discoverPapers();
	let searchState = new SearchState();
	$effect(() => {
		console.log(searchState.searchTerm);
	});
</script>

<div
	class="pt-6 m-auto
		w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5
		px-3 md:px-0 lg:px-0 xl:px-0 2xl:px-0
		"
>
	<!-- Title and Profile -->
	<Navigation />

	{searchState.searchTerm}

	<div class="pt-10 flex flex-col gap-y-4 pb-3">
		{#if paperState.loading === true}
			<FeedSkeletons />
		{:else}
			{#each paperState.papers as eachPaper}
				<EachPaper paper={eachPaper} />
			{/each}
		{/if}
	</div>

	<div class="h-16"></div>

	<div class="text-center text-xs">
		<span> Showing {paperState.papers.length} Papers.</span>
	</div>

	<!-- Footer -->
	<div class="pt-56 pb-96">
		<Footer />
	</div>
</div>
