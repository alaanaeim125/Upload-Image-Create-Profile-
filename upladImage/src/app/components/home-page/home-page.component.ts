import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/Profile';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  profiles: Profile[];
  constructor(private serv: UploadImageService) { }

  ngOnInit() {
    this.serv.getAllProfiles().subscribe(data => this.profiles = data);
  }


}
