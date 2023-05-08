import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingEditComponent } from './booking-edit/booking-edit.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    BookingEditComponent,
    BookingListComponent
],
imports: [
    CommonModule,
    MatTableModule,
    MatIconModule, 
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
],
providers: [
    {
        provide: MAT_DIALOG_DATA,
        useValue: {},
    },
    
]
})
export class BookingModule { }
