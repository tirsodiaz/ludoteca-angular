import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.component.html',
  styleUrls: ['./dialog-elements-example-dialog.component.scss']
})
export class DialogElementsExampleDialogComponent implements OnInit {

  title : string;
  description : string;
  description2 : string;

  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
    this.description2 = this.data.description2;
  }

  onClose() {
    this.dialogRef.close(true);
  }
}
