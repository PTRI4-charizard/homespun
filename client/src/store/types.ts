export interface User {
	name: string;
}

export interface FeedItem {
	offerer: string;
	skill: string;
	description: string;
	contactInfo: string;
}

export interface photo {
	photo: string;
}

export interface photos {
	photos: photo[];
}

export interface Store {
	skills: string[];
	feedItems: FeedItem;
	// currentUser: User,
}
