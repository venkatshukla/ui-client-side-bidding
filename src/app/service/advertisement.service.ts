import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

const API_URL = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(
    private http: HttpClient
  ) { }

  public getAdFromAdversiter(advertiserId){
    return this.http.get(`${API_URL}advertiser/${advertiserId}/get-ad`);
  }
}
