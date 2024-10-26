/* eslint-disable @typescript-eslint/no-explicit-any */
import { paperDiscoverURL, searchURL } from '$lib/constants';
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

	async searchPapers(searchTerm?: string) {
		this.loading = true;
		// Todo uncomment when implementing advanced search
		const newSearch = {
			startIndex: 0,
			maxResults: 5,
			searchFilter: {
				ti: '',
				au: '',
				abs: '',
				co: '',
				jr: '',
				cat: '',
				rn: '',
				id: '',
				all: searchTerm
			},
			sortBy: 'relevance',
			sortOrder: 'ascending'
		};
		const results = await axios.post(searchURL, newSearch, {
			withCredentials: true
		});
		this.papers = results.data;
		console.log(this.papers[0]['title'] + 'hmmm');
		this.loading = false;
	}
}

export default Papers;
