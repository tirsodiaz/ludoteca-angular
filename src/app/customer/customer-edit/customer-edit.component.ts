import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../customer.service';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customer : Customer;

  constructor(
    public dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    if (this.data.customer != null) {
      //en el .open() escribimos en el atributo customer de data. Aquí asignamos desde data en el atributo de la clase
      //this.customer = this.data.customer; actualiza también el listado
      this.customer = Object.assign({}, this.data.customer); //copia para no actualizar el listado
    }
    else {
      this.customer = new Customer();
    }
  }

  onSave() {
    //console.log(this.customer.name.length);
    //alert(this.customer.name.length);
    if (this.customer.name!="" && this.customer.name.length>0) {
      this.customerService.saveCustomer(this.customer).subscribe(result => {
        this.dialogRef.close();
      });  
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
