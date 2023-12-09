import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Credentials } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'http://127.0.0.1:5000';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.checkToken();
  }

  async login(credentials: Credentials): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.apiURL}/login`, credentials).toPromise();
      const token = response.token;
      localStorage.setItem('token', token);
      this.loggedIn.next(true);
      this.router.navigate(['/app']);
      return true; // Login bem-sucedido
    } catch (error) {
      console.error(error);
      return false; // Erro no login
    }
  }

  // logout(): void {
  //   this.http.post<any>(`${this.apiURL}/auth/logout`, {}).subscribe(
  //     () => {
  //       localStorage.removeItem('token');
  //       this.loggedIn.next(false);
  //       this.router.navigate(['/login']);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }

  private checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp >= currentTime) {
          this.loggedIn.next(true);
        } else {
          this.loggedIn.next(false);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        this.loggedIn.next(false);
      }
    } else {
      this.loggedIn.next(false);
    }
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
