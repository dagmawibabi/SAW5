/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { paperCommentsURL, trailingCommentsURL } from '$lib/constants';

class Comments {
	paper: any = $state();
	comments: any[] = $state([]);
	loading: boolean = $state(true);

	rootComment: any = $state();
	trailingComments: any[] = $state([]);
	trailingCommentsLoading: boolean = $state(true);

	async getPaperComments(extractedID?: string) {
		this.loading = true;
		const results = await axios.post(
			paperCommentsURL,
			{
				extractedID: extractedID
			},
			{
				withCredentials: true
			}
		);
		this.paper = results.data['paper'];
		this.comments = results.data['comments'];
		this.loading = false;
	}

	async getTrailingComments(commentID?: string) {
		this.trailingCommentsLoading = true;
		this.trailingComments = [];
		this.rootComment = {};
		const results = await axios.post(
			trailingCommentsURL,
			{
				commentID: commentID?.toString()
			},
			{
				withCredentials: true
			}
		);
		console.log('here');
		this.rootComment = results.data['rootComment'];
		this.trailingComments = results.data['comments'];
		this.trailingCommentsLoading = false;
		// console.log(results.data);
	}
}

export default Comments;
