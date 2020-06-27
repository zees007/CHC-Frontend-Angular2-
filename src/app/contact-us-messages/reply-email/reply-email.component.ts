import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmailreplyService} from '../../shared/services/emailreply.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ContactService} from '../../shared/services/contact.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reply-email',
  templateUrl: './reply-email.component.html',
  styleUrls: ['./reply-email.component.scss']
})
export class ReplyEmailComponent implements OnInit, OnDestroy  {

  emailReplyForm: FormGroup;
  messages;
  subscription: Subscription;
  selectedEmail;

  constructor(private emailReplyService: EmailreplyService, private fb: FormBuilder,  private dialog: MatDialog, private contactService: ContactService) {
    this.emailReplyForm = this.fb.group({
      message: new FormControl('', Validators.required),
      email: new FormControl(this.selectedEmail, Validators.required),
      subject: new FormControl('', Validators.required)
    });

    console.log(this.messages);

  }

  ngOnInit(): void {
    this.subscription = this.contactService.getMessage().subscribe(message => this.selectedEmail = message);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  replyEmail() {

    const sendEmailData = this.emailReplyForm.value;
    console.log(sendEmailData);
    sendEmailData.email = this.selectedEmail
    const formData = new FormData();
    formData.append('sendEmailData', sendEmailData);
    this.emailReplyService.replyEmailOfQuery(sendEmailData)
      .subscribe((response) => {
          console.log(response);
        },
        (error => {
            console.log('exception occurred..!');
            this.dialog.closeAll();
          }
        ));
  }
}
