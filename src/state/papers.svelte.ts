import { paperDiscoverURL, searchURL } from '$lib/constants';
import axios from 'axios';

export const papersList = $state({ loading: true, searching: false, papers: [] });

class Papers {
	async discoverPapers() {
		papersList.loading = true;
		const results = await axios.get(paperDiscoverURL, {
			withCredentials: true
		});
		papersList.papers = results.data;
		papersList.loading = false;
	}

	async searchPapers(searchTerm: string) {
		if (searchTerm?.trim().length > 1) {
			papersList.loading = true;
			papersList.searching = true;

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
			papersList.papers = results.data;
			papersList.loading = false;
			papersList.searching = false;
		}
	}
}

export default Papers;
