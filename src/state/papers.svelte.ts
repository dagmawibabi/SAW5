/* eslint-disable @typescript-eslint/no-explicit-any */
import { paperDiscoverURL } from '$lib/constants';
import axios from 'axios';

class Papers {
	papers: any[] = $state([]);
	loading: boolean = $state(true);

	reset() {
		this.papers = [];
	}

	async discoverPapers() {
		this.loading = true;
		const results = await axios.get(paperDiscoverURL, {
			withCredentials: true
		});
		this.papers = results.data;
		this.loading = false;
	}
}

export default Papers;
