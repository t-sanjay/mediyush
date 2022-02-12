import { TestBed } from '@angular/core/testing';

import { SpinnerOverlayServiceService } from './spinner-overlay-service.service';

describe('SpinnerOverlayServiceService', () => {
  let service: SpinnerOverlayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerOverlayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
