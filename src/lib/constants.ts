const baseURL = 'http://localhost:6400';

export const authBaseURL = baseURL;
export const paperDiscoverURL = baseURL + '/arxiv/discoverLocal';

export const baseBookmarkURL = `${baseURL}/bookmark`;
export const myBookmarkURL = `${baseBookmarkURL}/myBookmarks`;
export const bookmarkPaperURL = `${baseBookmarkURL}/paper`;

export const baseLikeURL = `${baseURL}/like`;
export const likePaperURL = `${baseLikeURL}/paper`;

export const baseCommentsURL = `${baseURL}/comment`;
export const paperCommentsURL = `${baseCommentsURL}/getPaperComments`;
export const trailingCommentsURL = `${baseCommentsURL}/getTrailingComments`;
