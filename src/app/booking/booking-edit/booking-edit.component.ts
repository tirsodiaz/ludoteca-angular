import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Booking } from '../model/Booking';
import { Customer } from 'src/app/customer/model/Customer';
import { Game } from 'src/app/game/model/Game';
import { BookingService } from '../booking.service';
import { CustomerService } from 'src/app/customer/customer.service';
import { GameService } from 'src/app/game/game.service';



@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit {

    booking: Booking; 
    games: Game[];
    customers: Customer[];
    errors: string;

    constructor(
        public dialogRef: MatDialogRef<BookingEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,       
        private bookingService: BookingService,
		private gameService: GameService,
        private customerService: CustomerService,
    ) { }

    ngOnInit(): void {
        if (this.data.booking != null) {
            this.booking = Object.assign({}, this.data.booking);
            this.booking.inicio = new Date(this.data.booking.inicio)
        }
        else {
            this.booking = new Booking();
        }

        this.customerService.getCustomers().subscribe(
            customers => {
                this.customers = customers;

                if (this.booking.customer != null) {
                    let customerFilter: Customer[] = customers.filter(customer => customer.id == this.data.booking.customer.id);
                    if (customerFilter != null) {
                        this.booking.customer = customerFilter[0];
                    }
                }
            }
        );

        this.gameService.getGames().subscribe(
            games => {
                this.games = games

                if (this.booking.game != null) {
                    let gameFilter: Game[] = games.filter(game => game.id == this.data.booking.game.id);
                    if (gameFilter != null) {
                        this.booking.game = gameFilter[0];
                    }
                }
            }
        );
    }

    onSave() {
        this.bookingService.saveBooking(this.booking).subscribe(
          result => {
            this.dialogRef.close();
          }, /* sacar ventana con el error del backend
          error: (errorResponse) => {
            this.snackbarService.error(errorResponse['message']);
          }, */
        );
    }  

    onClose() {
        this.dialogRef.close();
    }

}
