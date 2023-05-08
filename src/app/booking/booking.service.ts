import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from './model/Booking';
//import { BOOKING_DATA } from './model/mock-bookings';
import { Pageable } from '../core/model/page/Pageable';
import { BookingPage } from './model/BookingPage';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

    constructor(
        private http: HttpClient
    ) { }

    /*
    getBookings(title?: String, customerId?: number): Observable<Booking[]> {            
        //return of(BOOKING_DATA); 
        return this.http.get<Booking[]>(this.composeFindUrl(title, customerId));
    }
    getBookings(pageable: Pageable): Observable<BookingPage> {
        //return of(BOOKING_DATA);
        return this.http.post<BookingPage>('http://localhost:8080/booking', {pageable:pageable});
    }
    */
    getBookings(title?: String, customerId?: number, pageable?: Pageable): Observable<BookingPage> {
        //return of(BOOKING_DATA);
        return this.http.post<BookingPage>(this.composeFindUrl(title, customerId), {pageable:pageable});
    }    

    private composeFindUrl(title?: String, customerId?: number) : string {
        let params = '';

        if (title != null) {
            params += 'titulo='+title;
        }

        if (customerId != null) {
            if (params != '') params += "&";
            params += "idCustomer="+customerId;
        }

        let url = 'http://localhost:8080/booking'

        if (params == '') return url;
        else return url + '?'+params;
    }

    saveBooking(booking: Booking): Observable<void> {
        //return of(null);
        let url = 'http://localhost:8080/booking';

        if (booking.id != null) {
            url += '/'+booking.id;
        }

        return this.http.put<void>(url, booking);
    }

    deleteBooking(idBooking : number): Observable<void> {
      //return of(null);
      return this.http.delete<void>('http://localhost:8080/booking/'+idBooking);
  }    
}