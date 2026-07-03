import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo, VeiculosAPI } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private urlVehicle = 'http://localhost:3000/vehicle';
  private urlVehicleData = 'http://localhost:3000/vehicleData';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(this.urlVehicle);
  }

  getVehicleData(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.urlVehicleData);
  }
}