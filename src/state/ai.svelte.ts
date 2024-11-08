import { aiChatURL } from '$lib/constants';
import axios from 'axios';

export const papersList = $state({ loading: true, searching: false, papers: [] });

class AI {
	async askAI() {
		papersList.loading = true;
		const results = await axios.post(
			aiChatURL,
			{
				prompt: 'What are the titles',
				paperIDs: ['http://arxiv.org/abs/2102.12141v1', 'http://arxiv.org/abs/2305.04701v2'],
				aiModel: 'gemini-1.5-flash'
			},
			{
				withCredentials: true
			}
		);
		papersList.papers = results.data;
		papersList.loading = false;
	}
}

export default AI;
