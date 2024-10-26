/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { likeCommentURL } from '$lib/constants';
// import Bookmarks from './bookmarks.svelte';

class EachComment {
	comment: any = $state();
	likeCount: number = $state(0);
	isLiked: boolean = $state(false);
	// isBookmarked: boolean = $state(false);

	constructor(comment: any) {
		this.comment = comment;
		this.likeCount = this.comment['likeCount'];
		this.isLiked = this.comment['isLiked'];
		// this.isBookmarked = this.paper['isBookmarked'];
	}

	// async bookmarkPaper() {
	// 	this.isBookmarked = !this.isBookmarked;
	// 	const bookmarksState = new Bookmarks();
	// 	bookmarksState.myBookmarks();
	// 	await axios.post(
	// 		bookmarkPaperURL,
	// 		{
	// 			paperID: this.paper['id']
	// 		},
	// 		{
	// 			withCredentials: true
	// 		}
	// 	);
	// 	// console.log(this.paper['isBookmarked']);
	// }

	async likeComment() {
		this.isLiked = !this.isLiked;
		if (this.isLiked == true) {
			this.likeCount += 1;
		} else {
			this.likeCount -= 1;
		}
		const response = await axios.post(
			likeCommentURL,
			{
				commentID: this.comment['_id']
			},
			{
				withCredentials: true
			}
		);
		this.comment = response.data;
		this.likeCount = this.comment['likeCount'];
		this.isLiked = this.comment['isLiked'];
	}
}

export default EachComment;
