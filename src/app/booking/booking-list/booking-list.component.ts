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
import { Pageable } from 'src/app/core/model/page/Pageable';

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

    
    let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: 'id',
            direction: 'ASC'
        }]
    }

    if (event != null) {
        pageable.pageSize = event.pageSize
        pageable.pageNumber = event.pageIndex;
    }

    this.bookingService.getBookings(null,null,pageable).subscribe(data => {
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
    let inicio = this.filterInicio;
    let fin = this.filterFin;
    let customerId = this.filterCustomer != null ? this.filterCustomer.id : null;

    let pageable : Pageable =  {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
          property: 'id',
          direction: 'ASC'
      }]
  }

    this.bookingService.getBookings(title, customerId, pageable).subscribe(data => {
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
  
  editBooking(booking: Booking) {
    const dialogRef = this.dialog.open(BookingEditComponent, {
      data: { booking: booking }
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