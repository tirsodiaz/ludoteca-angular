import { SortPage } from './SortPage';

export class PageableRequest {
    pageNumber: number;
    pageSize: number;
    sort: SortPage[];
}