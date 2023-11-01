import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/event/event.service';
import { Event } from 'src/app/core/interfaces/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}
  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (response: any) => {
        this.events = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
