import {Component, Input, OnInit} from '@angular/core';
import {GallaryService} from '../../shared/services/gallary.service';
import {Gallary} from '../../shared/models/gallary.model';
import {RegisterServiceService} from '../../shared/services/register-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-gallary-contents',
  templateUrl: './gallary-contents.component.html',
  styleUrls: ['./gallary-contents.component.scss']
})
export class GallaryContentsComponent implements OnInit {

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  public gallery: any = [];
  adminLoginStatus$: Observable<boolean>;

  constructor(private gallaryService: GallaryService,
              private registerService: RegisterServiceService) { }

  ngOnInit(): void {

    // for hiding the Gallery delete/add icon. only visible to admin login
    this.adminLoginStatus$ = this.registerService.isAdminLoggedIn;

    this.gallaryService.refreshNeeded.subscribe(() => {
       this.getAllGallery();
    });

    this.getAllGallery();
  }

  private getAllGallery(){
    const resp = this.gallaryService.getAllGalleryItems();
    resp.subscribe((data) => this.gallery = data);
    console.log(resp);
  }

  deleteGallary(data) {
    const index = this.gallery.map(x => x.id).indexOf(data.id);
    return this.gallaryService.retireGallery(data.id).subscribe(res => {
      this.gallery.splice(index, 1);
      console.log('Gallary deleted!');
      alert('Gallary Deleted successfully..!');
    });
  }
}
