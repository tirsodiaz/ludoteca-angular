import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../model/Customer';
import { CustomerService } from '../customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['id', 'name', 'action'];
  errorMessage: String;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      customers => this.dataSource.data = customers
    );
    this.errorMessage="";
  }

  createCustomer() {    
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  }
  
  editCustomer(customerr: Customer) {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      data: { customer: customerr }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteCustomer(customer: Customer) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar customer", description: "Atención si borra el customer se perderán sus datos.<br> ¿Desea eliminar el customer?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.deleteCustomer(customer.id).subscribe(result => {
          this.ngOnInit();
        },
          error => {
            //alert(error.error), console.error(error.error),
            this.errorMessage = error.error;
        }); 
      }
    });
  }
}
