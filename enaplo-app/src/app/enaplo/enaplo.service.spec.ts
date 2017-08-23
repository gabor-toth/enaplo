import { TestBed, inject } from '@angular/core/testing';

import { EnaploService } from './enaplo.service';

describe('EnaploService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnaploService]
    });
  });

  it('should be created', inject([EnaploService], (service: EnaploService) => {
    expect(service).toBeTruthy();
  }));
});
