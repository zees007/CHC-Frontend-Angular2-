import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ContactService} from '../shared/services/contact.service';
import {Registration} from '../shared/models/registration.model';
import {Contact} from '../shared/models/contact.model';
import {AddNewFacultyPopupComponent} from '../about/faculty/add-new-faculty-popup/add-new-faculty-popup.component';
import {ReplyEmailComponent} from './reply-email/reply-email.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-us-messages',
  templateUrl: './contact-us-messages.component.html',
  styleUrls: ['./contact-us-messages.component.scss']
})
export class ContactUsMessagesComponent implements OnInit {

  contactUsQueries: any = [];
  searchText: string;


  constructor(private contactService: ContactService, private dialog: MatDialog) {

  }

  ngOnInit(): void {


    this.contactService.refreshNeeded.subscribe(() => {
      this.getAllContactMsgList();
    });

    this.getAllContactMsgList();
  }

  private getAllContactMsgList(){
    const resp = this.contactService.getAllMessages();
    resp.subscribe((data) => this.contactUsQueries = data);
  }


  deleteContactUsQuery(id){
    const index  = this.contactUsQueries.map(x => x.id).indexOf(Contact);
    return this.contactService.retireMessageContact(id).subscribe(res => {
      this.contactUsQueries.splice(index, 1);
      console.log('Feedback deleted!');
    });
  }

  // sendMessage(): void {
  //   // send message to subscribers via observable subject
  //
  // }


  openEmailReplyPopup(email) {
    this.contactService.sendMessage(email as string);
    // console.log(this.selectedEmail);
    const dialogRef = this.dialog.open(ReplyEmailComponent, {
      width: '500px',
      height: '400px'
      // data: items
    });
    dialogRef.afterClosed();
  }
}
