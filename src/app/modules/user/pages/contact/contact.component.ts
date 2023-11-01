import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  successMessage: boolean = false;
  errorMessage: boolean = false;
  contactForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    message: new FormControl(null, [Validators.required]),
  });

  constructor(
    private title: Title,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Moton - contact');
    this.contactForm.valueChanges.subscribe((value) => {
      this.errorMessage = false;
      this.successMessage = false;
    });
  }

  handelContactForm(contactForm: FormGroup) {
    if (contactForm.valid) {
      console.log(contactForm.value);
      this.contactService
        .createNewContact(contactForm.value)
        .subscribe({
          next: (response) => {
            if (response.status === 'success') {
              this.contactForm.reset();
              this.successMessage = true;
            }
          },
          error: (err) => {
            this.errorMessage = true;
          },
        });
    }
  }
}
