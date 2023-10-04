import { PageableRequest } from "../../core/model/page/PageableRequest";
import { Booking } from "./Booking";

export class BookingPage {
    content: Booking[];
    pageable: PageableRequest;
    totalElements: number;
}