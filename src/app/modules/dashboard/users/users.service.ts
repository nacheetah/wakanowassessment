import { environment as env } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const base_url = env.apiUrl;
@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUserDetail(id: string): Observable<any> {
    return this.http.get(`${base_url}/${id}`);
  }

  public getUsers(): Observable<any> {
    return this.http.get(base_url);
  }
}
