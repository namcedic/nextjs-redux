export interface User {
	id: string;
	email: string;
}

export interface DecodeUser {
	sub: string;
	email: string;
}