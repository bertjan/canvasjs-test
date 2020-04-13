import {TestBed} from '@angular/core/testing';

import {ChartDataService} from './chart.data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ChartService', () => {
  let service: ChartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule]});
    service = TestBed.inject(ChartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
