<script lang="ts">
	import { page } from '$app/stores';
	import EachComment from '../../../../components/each_comment.svelte';
	import Navigation from '../../../../components/navigation.svelte';
	import FeedSkeletons from '../../../../components/skeleton/feed_skeletons.svelte';
	import Comments from '../../../../state/comments.svelte';

	let commentsState = new Comments();
	commentsState.getTrailingComments($page.url.pathname.split('/').pop());
	$effect(() => {
		// commentsState.trailingCommentsLoading;
		commentsState.getTrailingComments($page.url.pathname.split('/').pop());
	});
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

			{#if commentsState.trailingCommentsLoading == false}
				<div class="pt-10">
					<EachComment comment={commentsState.rootComment} />
				</div>
			{/if}

			<div class="pt-10 flex flex-col gap-y-4 pb-3">
				{#if commentsState.trailingCommentsLoading == true}
					<FeedSkeletons />
				{:else if commentsState.trailingComments.length == 0}
					<div class="text-center pt-36 text-zinc-500 text-sm">
						<span> No replies, be the first to reply! </span>
					</div>
				{:else}
					<div class="pt-7 pb-2 text-zinc-600 font-semibold text-base">
						<span> Replies ... </span>
					</div>
					<!-- Replies -->
					<div>
						<div class="flex flex-col gap-y-5">
							{#each commentsState.trailingComments as comment}
								<EachComment {comment} />
							{/each}
						</div>
					</div>
				{/if}
			</div>
			<div class="h-56"></div>
		</div>
	</div>
</div>
