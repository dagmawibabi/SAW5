/* eslint-disable @typescript-eslint/no-explicit-any */
// import { paperDiscoverURL } from '$lib/constants';
// import axios from 'axios';

export const selectedPapersList = $state<{ selectedPapers: any[]; selectedPapersID: any[] }>({
	selectedPapers: [],
	selectedPapersID: []
});

class SelectedPapers {
	selectPaper(paper: any) {
		if (selectedPapersList.selectedPapersID.includes(paper['extractedID']) == true) {
			console.log('unselecting');
			console.log(paper['extractedID']);
			// Unselect
			selectedPapersList.selectedPapersID = selectedPapersList.selectedPapersID.filter(
				(id) => id !== paper['extractedID']
			);
			selectedPapersList.selectedPapers = selectedPapersList.selectedPapers.filter(
				(paper) => paper['extractedID'] !== paper['extractedID']
			);
		} else {
			// Select
			selectedPapersList.selectedPapersID.push(paper['extractedID']);
			selectedPapersList.selectedPapers.push(paper);
		}

		// console.log(selectedPapersList.selectedPapersID);
		// console.log(selectedPapersList.selectedPapersID.length);
	}
}

export default SelectedPapers;
