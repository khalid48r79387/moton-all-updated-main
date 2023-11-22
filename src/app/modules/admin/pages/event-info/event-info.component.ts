import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event/event.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {

  constructor(private EventService: EventService) {}

  ngOnInit(): void {
    this.getAllEvents();
  }


  events: any[] = [];
  getAllEvents() {
    this.EventService.getAllEvents().subscribe({
      next: (res) => {
        this.events =[];
        let test  = res.data
                
        for(let i=0 ; i< test.length ; i++){
          if(test[i].form.length > 0){
            this.events.push(test[i]);
          }
        }  
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}
