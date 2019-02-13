import { TestBed } from '@angular/core/testing';

import { QrsService } from './qrs.service';

describe('QrsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrsService = TestBed.get(QrsService);
    expect(service).toBeTruthy();
  });
});
