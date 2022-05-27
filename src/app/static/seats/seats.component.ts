import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightService } from 'flight.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { SeatsFormComponent } from '../seats-form/seats-form.component';
export interface Seats {
  id: number
  status: string
  seatNum: number
  planId: number
  name?:string
  email?:string
  phone?:string
}

// id : this.data.id,
// name : this.bookingSeat.value.name,
// phone  : this.bookingSeat.value.phone,
// email : this.bookingSeat.value.email,
// status : 'Unavailable',
// seatNum : this.data.seatNum,
// planId  :this.data.id




export interface Trips {
  from: string
  to: string
  dateFrom: string
  dateTo: string
  planId: number
  tripId: number


}
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {
seats : any
trips : Trips[] = [];
AllSeats  : Seats[] = []
newBookingSeat:Trips[] = [];
  constructor(private flightService : FlightService , public dialog: MatDialog , public dialogRef: MatDialogRef<any> , @Inject(MAT_DIALOG_DATA) public readonly data: any , private modalService : ModalService) { }

  ngOnInit(): void {
    this.flightService.getProducts().subscribe((res)=>{
      this.trips = res.trips
      this.AllSeats = res.seats
      console.log(this.seats)
      console.log(this.data)
      this.seats = this.AllSeats.filter(elem=>elem.planId == this.data.planId)
      console.log(this.seats)

    })

  }
  openDialog(elem) {
    console.log(elem)

    this.dialog
    .open(SeatsFormComponent, {
      width: "600px",
      height: "400px",
      data : elem
    })
    .afterClosed()
    .subscribe((res) => {
      if(res) {
        this.newBookingSeat = res

        console.log('new Res',res)
        let index = this.seats.findIndex(
          (elem) => elem.id == res.id
        );
        this.seats[index] = res;
         //JSON.stringify(localStorage.setItem('seats' , this.seats))

      }

    });
  }
  closeDialog() {
    this.dialogRef.close(this.seats)
  }
  deleteTicket(index , elem) {
    let seat = {
      id : elem.id,
      status : 'Available',
      name : '',
      planId : elem.id,
      seatNum  : elem.seatNum,

    }
    this.seats[index] = seat
    console.log(this.seats)
  }


}
