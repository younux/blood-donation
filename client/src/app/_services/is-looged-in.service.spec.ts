import { TestBed, inject } from '@angular/core/testing';

import { IsLoogedInService } from './is-looged-in.service';

describe('IsLoogedInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoogedInService]
    });
  });

  it('should be created', inject([IsLoogedInService], (service: IsLoogedInService) => {
    expect(service).toBeTruthy();
  }));
});
