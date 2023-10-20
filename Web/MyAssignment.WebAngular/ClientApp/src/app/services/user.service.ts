import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ConfigurationsService } from '../shared/configurations.service';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _endpointUrl: string = "/api/User";
  get EndpointUrl() { return this.configurationsService.baseUrl + this._endpointUrl; }

  constructor(
    private configurationsService: ConfigurationsService,
    private http: HttpClient
  ) {
  }


  login(data: Login): Observable<Login> {
    return this.http.post<Login>(this.EndpointUrl + '/authenticate', JSON.stringify(data), this.getRequestHeadersWithoutAccessToken()).pipe(
      tap(data => console.log('create: ' + JSON.stringify(data))),
      catchError(error => {
        return this.handleError(error);
      }));
  }

  registration(data: User): Observable<User> {
    return this.http.post<User>(this.EndpointUrl + '/registration', JSON.stringify(data), this.getRequestHeadersWithoutAccessToken()).pipe(
      tap(data => console.log('create: ' + JSON.stringify(data))),
      catchError(error => {
        return this.handleError(error);
      }));
  }

  protected handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  protected getRequestHeadersWithoutAccessToken(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return { headers: headers };
  }

}
