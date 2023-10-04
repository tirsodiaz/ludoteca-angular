import { PageableRequest } from "../../core/model/page/PageableRequest";
import { Author } from "./Author";

export class AuthorPage {
    content: Author[];
    pageable: PageableRequest;
    totalElements: number;
    totalPages: number;
    first: boolean;
}