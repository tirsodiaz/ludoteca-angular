import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from './model/Booking';
//import { BOOKING_DATA } from './model/mock-bookings';
import { PageableRequest } from '../core/model/page/PageableRequest';
import { BookingPage } from './model/BookingPage';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

    constructor(
        private http: HttpClient
    ) { }

    getAllBookings(): Observable<Booking[]> {            
        //return of(BOOKING_DATA); 
        return this.http.get<Booking[]>(this.composeFindUrl(null, null));
    }
    /*
    getBookings(title?: String, customerId?: number): Observable<Booking[]> {            
        //return of(BOOKING_DATA); 
        return this.http.get<Booking[]>(this.composeFindUrl(title, customerId));
    }
    getBookings(pageableRequestt: PageableRequest): Observable<BookingPage> {
        //return of(BOOKING_DATA);
        return this.http.post<BookingPage>('http://localhost:8080/booking', {pageableRequest:pageableRequestt});
    } 
    */  
    getBookings(title?: String, customerId?: number, inicio?: String, fin?: String, pageableRequestt?: PageableRequest): Observable<BookingPage> {
        //return of(BOOKING_DATA);
        return this.http.post<BookingPage>(this.composeFindUrl(title, customerId, inicio, fin), {pageableRequest:pageableRequestt});
    }    

    private composeFindUrl(title?: String, customerId?: number, inicio?: String, fin?: String) : string {
        let params = '';

        if (title != null) {
            params += 'titulo='+title;
        }

        if (customerId != null) {
            if (params != '') params += "&";
            params += "idCustomer="+customerId;
        }

        if (inicio != null) {
            if (params != '') params += "&";
            params += "inicio="+inicio;
        }

        if (fin != null) {
            if (params != '') params += "&";
            params += "fin="+fin;
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