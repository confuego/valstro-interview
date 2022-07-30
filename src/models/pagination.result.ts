export interface PaginationResult<T> {
	count: number;
	next: string;
	previous: string;
	results: T[];
}