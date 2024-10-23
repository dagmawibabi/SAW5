/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { myBookmarkURL } from '$lib/constants';

class Bookmarks {
	papers: any[] = $state([]);
	loading: boolean = $state(true);

	reset() {
		this.papers = [];
	}

	async myBookmarks() {
		this.loading = true;
		const results = await axios.get(myBookmarkURL, {
			withCredentials: true
		});
		this.papers = results.data;
		this.loading = false;
	}
}

export default Bookmarks;
