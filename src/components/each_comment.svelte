<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { CalendarDays, Frame, User, MessageCircle } from 'lucide-svelte';

	import moment from 'moment';
	import Comments from '../state/comments.svelte';

	let {
		comment
	}: {
		comment: any;
	} = $props();

	// Readable Time
	const timestamp = comment['createdAt'];
	const readableTime = moment(timestamp).format('MMM Do YYYY');

	//
	let commentsState = new Comments();
</script>

<div class="group flex gap-x-3 cursor-pointer">
	<div class="pt-2">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Avatar.Root
					class="border border-zinc-300 group-hover:border-black drop-shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out"
				>
					<Avatar.Image src={comment['commenter']['image']} />
					<Avatar.Fallback
						class="text-zinc-500 group-hover:text-black cursor-pointer transition-all duration-300 ease-in-out"
					>
						{comment['commenter']['name'][0]}
					</Avatar.Fallback>
				</Avatar.Root>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<!-- Profile -->
					<DropdownMenu.Item>
						<div class="flex flex-col text-center">
							<div class="flex items-center text-xs gap-x-1">
								<User size={12} />
								<span class="pb-[1px]">
									{comment['commenter']['name']}
								</span>
							</div>
							<div class="flex items-center text-xs">
								<CalendarDays size={12} />
								<span class="pl-1">
									{readableTime}
								</span>
							</div>
							<div class="flex flex-col">
								<!-- <span class="text-xs">
									{comment['commenter']['email']}
								</span> -->
							</div>
						</div>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div
		class="flex items-center gap-x-3 bg-white overflow-scroll border border-zinc-300 group-hover:border-black text-zinc-600 group-hover:text-black rounded-xl drop-shadow-md hover:drop-shadow-lg py-3 pr-4 cursor-pointer transition-all duration-300 ease-in-out"
	>
		<div>
			<div class="pb-1 text-sm pl-4">
				<span> {comment['comment']}</span>
			</div>
			<div class="pl-2">
				<div class="flex gap-x-2 text-xs">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="w-fit flex items-center gap-x-1 px-2 py-1 border border-transparent rounded-xl hover:bg-zinc-200 hover:text-black transition-all duration-200 ease-in-out"
						onclick={() => commentsState.getTrailingComments(comment['_id'])}
					>
						<MessageCircle size={12} />
						<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Comments </span>
					</div>
					<div class="flex gap-x-4">
						<div class="flex items-center gap-x-1">
							<User size={12} />
							<span class="pb-[1px]">
								{comment['commenter']['name']}
							</span>
						</div>
						<div class="flex items-center">
							<CalendarDays size={12} />
							<span class="pl-1">
								{readableTime}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
