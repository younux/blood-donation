import { TestBed, inject } from '@angular/core/testing';

import { BloodCenterService } from './blood-center.service';

describe('BloodCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloodCenterService]
    });
  });

  it('should be created', inject([BloodCenterService], (service: BloodCenterService) => {
    expect(service).toBeTruthy();
  }));
});
