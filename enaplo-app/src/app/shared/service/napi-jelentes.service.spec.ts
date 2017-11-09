import { TestBed, inject } from '@angular/core/testing';

import { NapiJelentesService } from './napi-jelentes.service';

describe('NapiJelentesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NapiJelentesService]
    });
  });

  it('should be created', inject([NapiJelentesService], (service: NapiJelentesService) => {
    expect(service).toBeTruthy();
  }));
});
