<script lang="ts">
	import axios from 'axios';
	import { page } from '$app/stores';
	import Navigation from '../../../../components/navigation.svelte';
	import FeedSkeletons from '../../../../components/skeleton/feed_skeletons.svelte';
	import EachPaper from '../../../../components/each_paper.svelte';
	import EachComment from '../../../../components/each_comment.svelte';
	import Comments from '../../../../state/comments.svelte';
	import SkeletonPaper from '../../../../components/skeleton/skeleton_paper.svelte';
	import CommentSkeleton from '../../../../components/skeleton/comment_skeleton.svelte';
	import CommentsSkeleton from '../../../../components/skeleton/comments_skeleton.svelte';

	let commentsState = new Comments();

	commentsState.getPaperComments($page.url.pathname.split('/').pop());
</script>

<div class="h-screen overflow-scroll">
	<div class="relative h-full w-full">
		<div
			class="pt-6 m-auto h-screen
		w-full md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5
		px-3 md:px-0 lg:px-0 xl:px-0 2xl:px-0
		"
		>
			<Navigation />

			<div class="pt-10 flex flex-col gap-y-4 pb-3">
				{#if commentsState.loading == true}
					<SkeletonPaper withSummary={true} />

					<CommentsSkeleton />
				{:else}
					<!-- Paper -->
					<EachPaper paper={commentsState.paper} isReadingComments={true} />

					{#if commentsState.comments.length == 0}
						<div class="text-center pt-36 text-zinc-500 text-sm">
							<span> No comments, be the first to comment! </span>
						</div>
					{:else}
						<div class="pt-7 pb-2 text-zinc-600 font-semibold text-base">
							<span> Comments ... </span>
						</div>
						<!-- Comments -->
						<div>
							<div class="flex flex-col gap-y-5">
								{#each commentsState.comments as comment}
									<EachComment {comment} />
								{/each}
							</div>
						</div>
					{/if}
				{/if}
			</div>
			<div class="h-56"></div>
		</div>
	</div>
</div>
