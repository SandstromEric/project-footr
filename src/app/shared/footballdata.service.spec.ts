import { TestBed, inject } from '@angular/core/testing';

import { FootballdataService } from './footballdata.service';

describe('FootballdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootballdataService]
    });
  });

  it('should be created', inject([FootballdataService], (service: FootballdataService) => {
    expect(service).toBeTruthy();
  }));
});
