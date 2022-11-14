import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:7169/api/';
  private currentUseroSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUseroSource.asObservable();

  constructor(private http : HttpClient) { }

  login(model : any){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) =>{
        const user = response;
        if (user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUseroSource.next(user);
        }
      })
    )
  }

  register(model : any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user : User)=> {
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUseroSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user:User)
  {
    this.currentUseroSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUseroSource.next(null);
  }
}
