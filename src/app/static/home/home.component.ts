import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FlightService } from "flight.service";
import { Seats, SeatsComponent } from "../seats/seats.component";
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexGrid,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexStroke,
  ApexLegend,
  ApexResponsive,
  ApexTooltip,
  ApexFill,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { ModalService } from "src/app/core/services/modal.service";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  labels: string[];
  title: ApexTitleSubtitle;
};

export interface Trips {
  from: string
  to: string
  dateFrom: string
  dateTo: string
  planId: number
  tripId: number
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})

export class HomeComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  constructor(private flightService :FlightService , public dialog: MatDialog ,private  _snackBar: MatSnackBar ,  private modalService : ModalService ){
    this.chartOptions = {
      series: [{
        data: [{
          x: 'category A',
          y: 10
        }, {
          x: 'category B',
          y: 18
        }, {
          x: 'category C',
          y: 13
        }]
      }],
      colors: ["#4d8af0"],
      grid: {
        borderColor: "rgba(77, 138, 240, .1)",

        padding: {
          bottom: 0
        }
      },

      chart: {
        redrawOnParentResize: true ,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
           animateGradually: {
               enabled: false,
               delay: 5
           },
           dynamicAnimation: {
               enabled: false,
               speed: 350
           }
      },


        type: 'bar',
        height: '320',
        parentHeightOffset: 0
      },

      yaxis : {
        labels : {
          style : {
            fontWeight : '800',
            fontSize : '13px'
          }
        }
      },

      xaxis: {
        type: 'category',
        categories: [],


      },
    };
  }
  selectedValue: string;
  selectedValue2  :string;
  selectedCar: string;
  seatsCompleted  :boolean = false;
  enableSearch : boolean = true;
  enableToSelect : boolean = true
  trips  :Trips[] = [];
  filteredTrips : Trips[] = [];
  mixedSeatStatus  : Seats[] = []
  seats : Seats[] = []
  newchart  :any = []
  chartData  :any = []
  fromVal : any = ''
  toVal : any = ''
  planId  :any

  From = [
    {value: 'cairo', viewValue: 'Cairo'},
  ];
  to = [
    {value: 'sharm elshiekh', viewVal: 'Sharm Elshiekh' , planId : 1},
    {value: 'Aswan', viewVal: 'Aswan' ,  planId : 2},
  ];



  ngOnInit(): void {



    // this.to.filter(elem=>elem.viewValue !== )
    this.flightService.getProducts().subscribe((res)=>{
      this.trips = res.trips
      this.seats = res.seats

      // console.log(this.trips)

    })
  }
  selectFrom(elem) {
    this.fromVal = elem.value
    console.log(this.fromVal)
    this.enableToSelect = false
  }
  selectTo(elem , id) {
    this.planId = id
    this.toVal = elem.value
    console.log(this.toVal)
    this.enableSearch = false
  }
  searchTrips() {
    this.filteredTrips = [];
    this.filteredTrips =  this.trips.filter((elem : Trips)=> elem.to == this.toVal )
   console.log(this.filteredTrips)

   let filteredSeats =  this.seats.filter(elem=>elem.planId == this.planId)
    this.chartData = []
   filteredSeats.forEach(elem=>{
    this.chartData.push(elem.seatNum)
   })
   let modiefiedObj = {
     name : 'Seat' ,
     data : this.chartData
   }

   this.chartOptions.series = [modiefiedObj]

  }
  openDialog(elem) {
    this.dialog
    .open(SeatsComponent, {
      width: "800px",
      height: "600px",
      data : elem
    })
    .afterClosed()
    .subscribe((res) => {
     this.mixedSeatStatus = res
     console.log(this.mixedSeatStatus)
   let UnavailableStatus =  this.mixedSeatStatus.filter(elem=>elem.status == 'Unavailable')
   let availableStatus =  this.mixedSeatStatus.filter(elem=>elem.status == 'Available')
 if(this.mixedSeatStatus.length == UnavailableStatus.length) {
  //  this.seatsCompleted = true
  let getPlanId;
  for(let i = 0 ; i <UnavailableStatus.length ; i++) {
    getPlanId = UnavailableStatus[i].planId
  }
 let AvailablePlanes =  this.to.filter(elem=>elem.planId !== getPlanId)
 this.to = []
 this.to = AvailablePlanes

 }

 console.log(availableStatus)
 console.log(UnavailableStatus)

  this.newchart = []
 availableStatus.forEach(element => {
  this.newchart.push(element.seatNum)
 });

 let modiefiedObj = {
  name : 'Seat' ,
  data : this.newchart
}
console.log(modiefiedObj)
this.chartOptions = {
  series: [modiefiedObj],
  colors: ["#4d8af0"],
  grid: {
    borderColor: "rgba(77, 138, 240, .1)",

    padding: {
      bottom: 0
    }
  },

  chart: {
    redrawOnParentResize: true ,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
       animateGradually: {
           enabled: false,
           delay: 5
       },
       dynamicAnimation: {
           enabled: false,
           speed: 350
       }
  },


    type: 'bar',
    height: '320',
    parentHeightOffset: 0
  },

  yaxis : {
    labels : {
      style : {
        fontWeight : '800',
        fontSize : '13px'
      }
    }
  },

  xaxis: {
    type: 'category',
    categories: [],


  },
};



    });
  }
}
