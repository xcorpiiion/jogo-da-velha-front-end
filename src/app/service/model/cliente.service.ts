import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../storage.service';
import {API_CONFIG} from '../../const/api.config';
import {Cliente} from '../../model/cliente';
import {Game} from '../../model/game';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private storage: StorageService) {
  }

  findByEmail(email: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/email`, {
      params: {
        email
      }
    });
  }

  findById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  blockSquareGame(): Observable<Game> {
    return this.http.get<Game>(`${API_CONFIG.baseUrl}/clientes/blockSquare`);
  }

  save(cliente: Cliente): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, cliente, {
      observe: 'response',
      responseType: 'text'
    });
  }

  testConnection(testForm: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes/testConnection`, testForm, {
      observe: 'response',
      responseType: 'text'
    });
  }

  play(playForm: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes/play`, playForm, {
      observe: 'response',
      responseType: 'text'
    });
  }

  buttonNumber(buttonNumber: string): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes/buttonNumber`, buttonNumber, {
      observe: 'response',
      responseType: 'text'
    });
  }

  update(cliente: Cliente, id: string): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/clientes/edit/${id}`, cliente, {
      observe: 'response',
      responseType: 'text'
    });
  }

  isLogged(): Observable<boolean> {
    return this.http.get<boolean>(`${API_CONFIG.baseUrl}/clientes/logged`);
  }

  isAllowed(): Observable<boolean> {
    return this.http.get<boolean>(`${API_CONFIG.baseUrl}/clientes/allowed`);
  }

  firstToPlay(): Observable<Game> {
    return this.http.get<Game>(`${API_CONFIG.baseUrl}/clientes/firstToPlay`);
  }
}
