/* eslint-disable @typescript-eslint/no-explicit-any */
// import { paperDiscoverURL } from '$lib/constants';
// import axios from 'axios';

class SelectedPapers {
	selectedPapers: any[] = $state([]);
	selectedPapersID: any[] = $state([]);

	selectPaper(paper: any) {
		if (this.selectedPapersID.includes(paper['extractedID']) == true) {
			// Unselect
			this.selectedPapersID = this.selectedPapersID.filter((id) => id !== paper['extractedID']);
			this.selectedPapers = this.selectedPapers.filter(
				(paper) => paper['extractedID'] !== paper['extractedID']
			);
		} else {
			// Select
			this.selectedPapersID.push(paper['extractedID']);
			this.selectedPapers.push(paper);
		}

		console.log(this.selectedPapersID);
		console.log(this.selectedPapersID.length);
	}
}

export default SelectedPapers;
