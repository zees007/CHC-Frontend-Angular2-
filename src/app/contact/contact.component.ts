import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ContactService} from '../shared/services/contact.service';
import {Contact} from '../shared/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  contact: Contact = new Contact('', '', '', '');

  constructor( private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      message: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmitContactForm(formData) {
    console.log(formData)
    this.contactService.postMessage(formData)
      .subscribe(response => {
        location.href = 'https://mailthis.to/confirm'
        console.log(response);
      }, error => {
        console.warn(error.responseText)
        console.log({ error });
      });

    this.contactService.submitQueryForm(formData)
      .subscribe((response) => {
          console.log(response);
        },
        (error => {
            console.log('exception occurred..!');
          }
        ));
  }


}
