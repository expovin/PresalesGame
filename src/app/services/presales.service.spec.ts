import { TestBed } from '@angular/core/testing';

import { PresalesService } from './presales.service';

describe('PresalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresalesService = TestBed.get(PresalesService);
    expect(service).toBeTruthy();
  });
});
