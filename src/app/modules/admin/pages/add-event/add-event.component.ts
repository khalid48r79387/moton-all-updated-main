import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event/event.service';
import { Event } from 'src/app/core/interfaces/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  events: Event[] = [];
  posterPrefix: string = 'https://image.tmdb.org/t/p/w500';
  saveImg: string = '';

  addEventForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    details: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(private eventService: EventService) {}

  // get image added
  image: any;
  getImage(event: any) {
    this.image = event.target.files[0];
  }

  submitImageData() {
    let formData = new FormData();
    formData.set('image', this.image);
    this.eventService.uploadEventImage(formData).subscribe({
      next: (res) => {
        // console.log(res);
        this.saveImg = res.filename;
        // console.log(this.saveImg);
        // this.AddBook.setValue( value:this.fileName)

        this.addEventForm.patchValue({
          image: this.saveImg,
        });
      },
      error: (err) => {
        console.log('Error fetching Book data:', err);
      },
    });
  }

  handelAddEventFormSubmit(addEventForm: FormGroup) {
    if (addEventForm.valid) {
      const formData = addEventForm.value;

      // Add new category
      this.eventService.AddEvent(formData).subscribe({
        next: () => {
          alert('تم اضافة الفعالية بنجاح');
          this.ngOnInit(); // Refresh the list of categories
          addEventForm.reset(); // Reset the form
          this.image = null;
        },
        error: (err) => {
          console.log('Error adding category:', err);
          // Handle the error in a way that makes sense for your application
        },
      });
    }
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  // delete one category
  onDeleteEvent(id: string) {
    this.eventService.deleteEvent(id).subscribe({
      next: (res) => {
        alert('تم حذف الفعالية');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Error fetching category data:', err);
      },
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
