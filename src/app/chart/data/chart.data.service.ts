import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChartData} from './chart.data';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  getChartData(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>('./assets/api-data.json');
  }

}
