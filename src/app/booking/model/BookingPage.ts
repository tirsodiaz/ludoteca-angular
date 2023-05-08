import { Pageable } from "../../core/model/page/Pageable";
import { Booking } from "./Booking";

export class BookingPage {
    content: Booking[];
    pageable: Pageable;
    totalElements: number;
}