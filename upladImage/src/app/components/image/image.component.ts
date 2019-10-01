import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/services/upload-image.service';

const URL = 'http://localhost:3030/api/upload';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'image' });

  constructor(private imageServ: UploadImageService, private router: Router) { }

  insertNewUser(form: NgForm) {
    console.log(form.value);

    this.imageServ.addNewProfile(form.value).subscribe((data) => {
      console.log(' Success ..... ');
      this.router.navigate(['/']);
    }, (err) => {
      console.log(' Error ..... ');
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
  }

}
