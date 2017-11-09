import { TestBed, inject } from '@angular/core/testing';

import { ValueListsService } from './value-lists.service';

describe('ValueListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueListsService]
    });
  });

  it('should be created', inject([ValueListsService], (service: ValueListsService) => {
    expect(service).toBeTruthy();
  }));
});
