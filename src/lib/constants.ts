import { env } from '$env/dynamic/public';

const baseURL = env.PUBLIC_API_BASE_URL;
export const authBaseURL = env.PUBLIC_AUTH_BASE_URL;

export const paperDiscoverURL = baseURL + '/arxiv/discoverLocal';

export const searchURL = baseURL + '/arxiv/search';

export const baseBookmarkURL = `${baseURL}/bookmark`;
export const myBookmarkURL = `${baseBookmarkURL}/myBookmarks`;
export const bookmarkPaperURL = `${baseBookmarkURL}/paper`;

export const baseLikeURL = `${baseURL}/like`;
export const likePaperURL = `${baseLikeURL}/paper`;

export const baseCommentsURL = `${baseURL}/comment`;
export const paperCommentsURL = `${baseCommentsURL}/getPaperComments`;
export const trailingCommentsURL = `${baseCommentsURL}/getTrailingComments`;
export const likeCommentURL = `${baseCommentsURL}/likeComment`;
