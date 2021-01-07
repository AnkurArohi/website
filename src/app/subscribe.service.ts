import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  
  mailChimpEndpoint = 'https://gmail.us7.list-manage.com/subscribe/post-json?u=79f423929a2b70a622fde12eb&id=ab5894d5ca';  constructor(
    private http: HttpClient
  ) { }  subscribeToList(data: { firstName: string; lastName: string; email: string; }) {
    const params = new HttpParams()
      .set('FNAME', data.firstName)
      .set('LNAME', data.lastName)
      .set('EMAIL', data.email)

      .set('79f423929a2b70a622fde12eb_ab5894d5ca', '');    const mailChimpUrl = `${this.mailChimpEndpoint}&${params.toString()}`;
    return this.http.jsonp(mailChimpUrl, 'c')
    
  }
}