import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) { }

  addNewProfile(form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json, text/plain'
      })
    };
    return (this.http.post<any>('http://localhost:3030/addNewUser', form, httpOptions));
  }

  getAllProfiles(): Observable<Profile[]> {
    return (this.http.get<Profile[]>('http://localhost:3030/getAllProfiles'));
 }
}
