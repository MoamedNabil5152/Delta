import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seats-form',
  templateUrl: './seats-form.component.html',
  styleUrls: ['./seats-form.component.scss']
})
export class SeatsFormComponent implements OnInit {
 // email = new FormControl('', [Validators.required, Validators.email]);
  bookingSeat  : FormGroup

  constructor(private fb : FormBuilder , @Inject(MAT_DIALOG_DATA) public readonly data: any ,  public dialogRef: MatDialogRef<any> ) { }

  ngOnInit(): void {
   this.bookingSeat = this.fb.group({
      name : [ '' , Validators.required],
      email : [ '' , [Validators.required , Validators.email]],
      phone : [ '' , [Validators.required  , Validators.pattern(/^01[0125][0-9]{8}$/gm)]],

    })


    console.log(this.bookingSeat)


  }


  getNameErrorMessage() {
     if(this.bookingSeat.get('name').hasError('required')) {
      return 'You must enter a value';
   }
   return this.bookingSeat.get('name').hasError('required');
  }

  getErrorMessage() {
    if (this.bookingSeat.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.bookingSeat.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneErrorMessage() {
    if(this.bookingSeat.get('phone').hasError('required')) {
      return 'You must enter a value';
   }
   return this.bookingSeat.get('phone').hasError('pattern') ? 'Enter a valid phone Number' : '';
  }
  submitForm() {
    console.log(this.data)

    let bookingForm = {
      id : this.data.id,
      name : this.bookingSeat.value.name,
      phone  : this.bookingSeat.value.phone,
      email : this.bookingSeat.value.email,
      status : 'Unavailable',
      seatNum : this.data.seatNum,
      planId  :this.data.planId
    }
   let bookingData = {...this.data , ...bookingForm}
   console.log(this.data)
    this.dialogRef.close(bookingData)

  }
}
