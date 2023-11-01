import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { EventService } from 'src/app/core/services/event/event.service';
import * as moment from 'moment'; // add this 1 of 4
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventSubmitService } from 'src/app/core/services/event/event-submit.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services/storage/storage.service';
@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css'],
})
export class EventInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  event: any;
  id$ = this.route.params.pipe(map((params) => params['event']));
  subscribe: boolean = false;
  currentDate = moment(); // add this 2 of 4
  loggedIn: boolean = false;

  eventSubmissionForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
  });

  constructor(
    private eventService: EventService,
    private eventSubmitService: EventSubmitService,
    private toasterService: ToastrService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.id$.subscribe((id) => {
      if (!id) return;
      this.eventService.getSpecificEvent(id).subscribe((res) => {
        this.event = res.data;

        if (moment(this.currentDate).isBefore(this.event.date)) {
          this.subscribe = true;
        }
      });
    });

    this.loggedIn = this.storageService.isLoggedIn();
    console.log(this.loggedIn);
  }

  handelEventSubmissionForm(eventSubmissionForm: FormGroup) {
    if (eventSubmissionForm.valid) {
      this.eventSubmitService
        .eventFormSubmission(
          this.event._id,
          eventSubmissionForm.value
        )
        .subscribe({
          next: (response) => {
            this.toasterService.success(response.message);
          },
          error: (err) => console.log(err),
        });
    }
  }
}
