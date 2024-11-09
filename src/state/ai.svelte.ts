import { aiChatURL } from '$lib/constants';
import axios from 'axios';
import { selectedPapersList } from './selected_papers.svelte';
import { searchTerm } from './search_state.svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const conversationList = $state<{ conversation: any[] }>({
	conversation: []
});

class AI {
	async askAI(chosenModel: string) {
		let newMessage = {
			from: 'user',
			content: searchTerm.sendToAI
		};
		conversationList.conversation.push(newMessage);
		newMessage = {
			from: 'system',
			content: 'loading ...'
		};
		conversationList.conversation.push(newMessage);
		const results = await axios.post(
			aiChatURL,
			{
				prompt: searchTerm.sendToAI,
				papers: selectedPapersList.selectedPapers,
				aiModel: chosenModel
			},
			{
				withCredentials: true
			}
		);
		newMessage = {
			from: 'ai',
			content: results.data
		};
		conversationList.conversation.pop();
		conversationList.conversation.push(newMessage);
		return results;
	}
}

export default AI;
