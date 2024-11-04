<script lang="ts">
	import Navigation from '../../components/navigation.svelte';
	import EachPaper from '../../components/each_paper.svelte';
	import Bookmarks from '../../state/bookmarks.svelte';
	import FeedSkeletons from '../../components/skeleton/feed_skeletons.svelte';

	let bookmarksState = new Bookmarks();
	bookmarksState.myBookmarks();
</script>

<div class="h-screen overflow-scroll">
	<div class="relative h-full w-full">
		<div
			class="pt-6 m-auto h-screen
		w-full md:w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/5
		px-3 md:px-0 lg:px-0 xl:px-0 2xl:px-0
		"
		>
			<Navigation />

			<div class="pt-7 pb-5 pl-3 text-zinc-600 font-semibold text-base">
				<span> Bookmarks ... </span>
			</div>

			<div class="">
				<div class="flex flex-col gap-y-5">
					{#if bookmarksState.loading == true}
						<!-- Display Skeletons if loading -->
						<FeedSkeletons />
					{:else if bookmarksState.papers.length <= 0 && bookmarksState.loading == false}
						<!-- Empty state, if no papers are found after loading -->
						<div class="text-center pt-56">No papers found.</div>
					{:else}
						<!-- Once loading is false, display actual papers -->
						<div class="flex flex-col gap-y-5">
							{#each bookmarksState.papers as eachPaper}
								<EachPaper paper={eachPaper} />
							{/each}
						</div>
					{/if}
				</div>
			</div>
			<div class="h-56"></div>
		</div>
	</div>
</div>
