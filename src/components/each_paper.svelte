<script lang="ts">
	import axios from 'axios';
	import moment from 'moment';
	import {
		Frame,
		CalendarDays,
		ExternalLink,
		User,
		Bookmark,
		BookmarkCheck,
		Download,
		Link2,
		Sparkles,
		Scroll,
		Heart,
		MessageCircle
	} from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { toast } from 'svelte-sonner';
	import EachPaper from '../state/each_paper.svelte';
	import SelectedPapers, { selectedPapersList } from '../state/selected_papers.svelte';

	// Paper
	let { paper, isReadingComments }: { paper: any; isReadingComments?: boolean } = $props();
	let eachPaperState = new EachPaper(paper);

	// Readable Time
	const timestamp = paper['published'];
	const readableTime = moment(timestamp).format('MMM Do YYYY');

	// Function to handle download
	async function handleDownload(paper: any) {
		console.log('downloading...');
		const response = await axios({
			url: paper['pdfLink'],
			method: 'GET',
			responseType: 'blob'
		});

		console.log(response.data);
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', paper['id'].split('/').pop() + '.pdf');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// Function to copy to clipboard
	function copyToClipboard(type: string, paper: any) {
		let whatToCopy: string;

		const copyMap: any = {
			All: () =>
				`ID: ${paper['id']}\nPublished Date: ${readableTime}\n\nTitle: ${paper['title']}\n\nAuthors: ${paper['authors'].join(', ')}\n\nSummary: ${paper['summary']}\n\nPDF Link: ${paper['pdfLink']}`,
			ID: () => paper['id'],
			Title: () => paper['title'],
			Authors: () => paper['authors'].join(', '),
			'PDF Link': () => paper['pdfLink'],
			Summary: () => {
				const sentences = paper['summary'].split('. ');
				return sentences.slice(0, 1).join('. ') + (sentences.length > 2 ? '...' : '');
			},
			'Published Date': () => readableTime
		};

		whatToCopy = copyMap[type] ? copyMap[type]() : '';

		// Copy to Clipboard
		navigator.clipboard.writeText(type === 'Summary' ? paper['summary'] : whatToCopy);

		// Show Toast
		toast.success(`Copied ${type} Successfully!`, {
			description: whatToCopy
		});
	}

	//
	let selectedPapersState = new SelectedPapers();
	let isReadingSummary = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="group no-scrollbar" onclick={() => selectedPapersState.selectPaper(paper)}>
	<div
		class={selectedPapersList.selectedPapersID.includes(paper['extractedID']) == true ||
		isReadingComments == true
			? 'no-scrollbar relative flex flex-col bg-white overflow-scroll border border-black text-black rounded-xl drop-shadow-xl py-3 cursor-pointer transition-all duration-300 ease-in-out'
			: 'no-scrollbar relative flex flex-col bg-white overflow-scroll border border-zinc-300 group-hover:border-black text-zinc-600 group-hover:text-black rounded-xl drop-shadow-xl py-3 cursor-pointer transition-all duration-300 ease-in-out'}
	>
		<div class="px-4">
			<!-- Date and ID -->
			<div class="flex justify-between items-center pb-1">
				<div class="flex gap-x-4">
					<div class="flex items-center text-xs">
						<CalendarDays size={12} />
						<span class="pl-1">
							{readableTime}
						</span>
					</div>

					<div class="flex items-center text-xs">
						<Frame size={12} />
						<span class="pl-1 pb-[1px]">
							{paper['extractedID']}
						</span>
					</div>

					<!-- {#each selectedPapersState.selectedPapersID as id}
						{id}
					{/each} -->
				</div>
				<!-- <div class={$isBookmarked ? 'w-2 h-2 rounded-full bg-emerald-300' : ''}></div> -->
			</div>

			<!-- Title -->
			<a
				href={paper['pdfLink']}
				target="_blank"
				rel="noopener noreferrer"
				download
				class={selectedPapersList.selectedPapersID.includes(paper['extractedID']) == true ||
				isReadingComments == true
					? 'group/title font-semibold text-black transition-all duration-300 ease-in-out'
					: 'group/title font-semibold text-zinc-500 group-hover:text-black transition-all duration-300 ease-in-out '}
			>
				<span class="hover:underline underline-offset-4 decoration-zinc-400 decoration-1">
					{paper['title']}
				</span>
				<div class="hidden group-hover/title:inline-block">
					<ExternalLink size={12} />
				</div>
			</a>

			<!-- Authors -->
			<div class="no-scrollbar flex gap-x-1 items-center overflow-scroll pt-1 pb-2">
				<User size={12} />
				{#each paper['authors'] as eachAuthor}
					<div class="no-scrollbar w-fit text-xs italic linc pb-[1px]">
						<span>
							{eachAuthor},
						</span>
					</div>
				{/each}
			</div>

			<!-- Interactions -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="pt-1 flex gap-x-2 text-xs
			justify-between md:justify-start lg:justify-start xl:justify-start 2xl:justify-start
			"
			>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="w-fit flex items-center gap-x-2 px-2 py-1 border border-transparent rounded-2xl hover:bg-zinc-200 hover:text-black transition-all duration-200 ease-in-out"
					onclick={() => eachPaperState.likePaper()}
				>
					<Heart
						size={15}
						fill={eachPaperState.isLiked == true ? 'red' : 'white'}
						class={eachPaperState.isLiked == true ? 'text-red-500' : ''}
					/>
					<span class="flex pb-[2px]">
						{eachPaperState.likes}
					</span>
				</div>

				<a href="/comments/paper/{paper['extractedID']}">
					<div
						class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:bg-zinc-200 hover:text-black transition-all duration-200 ease-in-out"
					>
						<MessageCircle size={15} />
						<span class="flex pl-1">
							{eachPaperState.commentCount}
						</span>
					</div>
				</a>

				<div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:bg-zinc-200 hover:text-black transition-all duration-200 ease-in-out"
					onclick={() => (isReadingSummary = !isReadingSummary)}
				>
					<Scroll size={14} />
					<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Summary </span>
				</div>

				<div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:bg-zinc-200 hover:text-black transition-all duration-200 ease-in-out"
				>
					<Download size={15} />
					<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Download </span>
				</div>

				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:bg-zinc-200 hover:text-black transition-all duration-200 ease-in-out"
					onclick={() => eachPaperState.bookmarkPaper()}
				>
					<Bookmark
						size={15}
						fill={eachPaperState.isBookmarked == true ? 'lightGreen' : 'white'}
						class={eachPaperState.isBookmarked == true ? 'text-emerald-500' : ''}
					/>

					<span class="hidden md:flex lg:flex xl:flex 2xl:flex">
						{eachPaperState.isBookmarked ? 'Unbookmark' : 'Bookmark'}
					</span>
				</div>

				<div>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<div
								class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:bg-zinc-200 hover:text-black transition-all duration-200 ease-in-out"
							>
								<Link2 size={15} />
								<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Copy </span>
							</div>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('All', paper);
									}}>All</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('ID', paper);
									}}>ID</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('Title', paper);
									}}>Title</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('Authors', paper);
									}}>Authors</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('PDF Link', paper);
									}}>PDF Link</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('Summary', paper);
									}}>Summary</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('Published Date', paper);
									}}>Published Date</DropdownMenu.Item
								>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</div>

		<!-- Summary -->
		<div class="px-3">
			<div
				class={isReadingSummary == true || isReadingComments
					? 'pt-3 text-sm transition-all duration-300 ease-in-out'
					: 'hidden'}
			>
				<div class="pt-3 text-sm transition-all duration-300 ease-in-out">
					<div
						class="border border-zinc-300 rounded-lg rounded-bl-md rounded-br-md pt-2 pb-3 px-3 drop-shadow-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
					>
						<div class="flex items-center gap-x-1 text-xs text-zinc-600 pb-1">
							<Scroll size={12} />
							<span class="pb-[2.5px]"> Summary </span>
						</div>
						<span class="text-zinc-800">
							{paper['summary']},
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
