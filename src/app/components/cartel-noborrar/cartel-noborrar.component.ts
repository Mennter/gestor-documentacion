import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cartel-noborrar',
  templateUrl: './cartel-noborrar.component.html',
  styleUrls: ['./cartel-noborrar.component.scss']
})
export class CartelNoborrarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CartelNoborrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onSiClick() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
