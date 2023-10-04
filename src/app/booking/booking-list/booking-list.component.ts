import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from '../model/Booking';
import { Customer } from 'src/app/customer/model/Customer';
import { Game } from 'src/app/game/model/Game';
import { BookingService } from '../booking.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { GameService } from 'src/app/game/game.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingEditComponent } from '../booking-edit/booking-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { PageEvent } from '@angular/material/paginator';
import { PageableRequest } from 'src/app/core/model/page/PageableRequest';
import * as moment from 'moment-timezone';
import 'moment/locale/es';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 2;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Booking>();
  displayedColumns: string[] = ['id','game.title','customer.name','inicio','fin','action'];

  customers: Customer[];
  games: Game[];
  bookings: Booking[]; 
  filterTitle: string;
  filterCustomer: Customer;
  filterInicio: Date;
  filterFin: Date;


  constructor(
    private bookingService: BookingService,
    private customerService: CustomerService,
    private gameService: GameService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    
    let pageableRequest : PageableRequest =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: 'id',
            direction: 'ASC'
        }]
    }

    if (event != null) {
      pageableRequest.pageSize = event.pageSize
      pageableRequest.pageNumber = event.pageIndex;
    }

    this.bookingService.getBookings(null,null,null,null,pageableRequest).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });
    
    
    this.customerService.getCustomers().subscribe(customers => 
      this.customers = customers
    );

    this.gameService.getGames().subscribe(games => 
      this.games = games
    );

  } 

  onCleanFilter(): void {
    this.filterTitle = null;
    this.filterInicio = null;
    this.filterFin = null;
    this.filterCustomer = null;

    this.onSearch();
  }

  onSearch(): void {

    let title = this.filterTitle;
    let inicio:String = null;
    let fin:String = null;

    if (typeof this.filterInicio != "undefined"){
      inicio = moment.tz(new Date(this.filterInicio), 'Europe/Madrid').format();
      alert(new Date(this.filterInicio).toISOString());
      console.log(new Date(this.filterInicio).toISOString());
    } 
    if (typeof this.filterFin != "undefined"){
      fin = moment.tz(new Date(this.filterFin), 'Europe/Madrid').format();
    } 
    
    let customerId = this.filterCustomer != null ? this.filterCustomer.id : null;

    let pageableRequest : PageableRequest =  {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
          property: 'id',
          direction: 'ASC'
      }]
  }
    /*
    var madrid = moment.tz(new Date(), "Europe/Madrid");
    var london = madrid.clone().tz("Europe/London");
    var newYork= madrid.clone().tz("America/New_York");
    alert("newYork "+ newYork.format());  
    alert("london " + london.format());
    alert("madrid " + madrid.format());

    let mydateString: string = moment.tz(new Date(), 'Europe/Madrid').subtract(2,'y').format()
    alert(mydateString = moment().locale('es').format('LLLL')); //moment.locale('es');
    alert(moment('2023-10-23 00:00:00', 'YYYY-MM-DD', 'es'));
    alert(moment(new Date(), 'YYYY-MM-DD HH:mm:SS', 'es'));
       
    alert(moment.tz(new Date(), 'Europe/Madrid').format('YYYY-MM-DDTHH:mm:SS z'));    
    alert(moment.tz(new Date(), 'Europe/Madrid').format());
  
    mydateString = new Date("1938-10-11T01:00:00").toISOString();
    console.log(mydateString);
    alert(mydateString);
    */

    const str = '21-07-2024 04:24:37';
    const [dateComponents, timeComponents] = str.split(' ');    
    console.log(dateComponents); // 👉️ "21-07-2024"
    console.log(timeComponents); // 👉️ "04:24:37" 👇️
    
    const [day, month, year] = dateComponents.split('-');
    const [hours, minutes, seconds] = timeComponents.split(':');
    
    const date1 = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);    
    console.log(date1);  // 👉️ Sun Jul 21 2024 04:24:37

    const str2 = '24-09-2023 09:44:21';
    const date2 = moment(str2, 'DD-MM-YYYY hh:mm:ss').toDate();
    console.log(date2); // 👉️ 24-09-2023T07:44:21 GMT+0200

    
    this.bookingService.getBookings(title, customerId, inicio, fin, pageableRequest).subscribe(data => {
    //this.bookingService.getBookings(title, customerId, "1938-10-11T02:00:00.000+02:00","1938-10-15T01:00:00.000+02:00", pageableRequest).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });    
  }
  

  createBooking() {    
    const dialogRef = this.dialog.open(BookingEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  }
  
  editBooking(bookingg: Booking) {
    const dialogRef = this.dialog.open(BookingEditComponent, {
      data: { booking: bookingg }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteBooking(booking: Booking) {  
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar booking", description: "Atención si borra la reserva se perderán sus datos.<br> ¿Desea eliminar la reserva?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.deleteBooking(booking.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }
}