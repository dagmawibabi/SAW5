<script lang="ts">
	import Papers, { papersList } from '../../state/papers.svelte';
	import EachPaper from '../../components/each_paper.svelte';
	import Footer from '../../components/footer.svelte';
	import Navigation from '../../components/navigation.svelte';
	import FeedSkeletons from '../../components/skeleton/feed_skeletons.svelte';

	let paperState = new Papers();
	paperState.discoverPapers();
</script>

<div
	class="pt-6 m-auto
		w-full md:w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/5
		px-3 md:px-0 lg:px-0 xl:px-0 2xl:px-0
		"
>
	<!-- Title and Profile -->
	<Navigation />

	<!-- Paper List -->
	<div class="pt-10 flex flex-col gap-y-4 pb-3">
		{#if papersList.loading === true || papersList.searching === true}
			<FeedSkeletons />
		{:else}
			{#each papersList.papers as eachPaper}
				<EachPaper paper={eachPaper} />
			{/each}
		{/if}
	</div>

	<!-- Space -->
	<div class="h-16"></div>

	<!-- Paper Count -->
	<div class="text-center text-xs">
		<span> Showing {papersList.papers.length} Papers.</span>
	</div>

	<!-- Footer -->
	<div class="pt-56 pb-96">
		<Footer />
	</div>
</div>
