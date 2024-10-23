/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { paperCommentsURL, trailingCommentsURL } from '$lib/constants';

class Comments {
	paper: any = $state();
	comments: any[] = $state([]);
	loading: boolean = $state(true);

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
		const results = await axios.post(
			trailingCommentsURL,
			{
				commentID: commentID?.toString()
			},
			{
				withCredentials: true
			}
		);

		this.trailingComments = results.data;
		this.trailingCommentsLoading = false;
		console.log(results.data);
	}
}

export default Comments;
