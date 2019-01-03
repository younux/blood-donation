import { TestBed, inject } from '@angular/core/testing';

import { ModeratorGuardService } from './moderator-guard.service';

describe('ModeratorGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeratorGuardService]
    });
  });

  it('should be created', inject([ModeratorGuardService], (service: ModeratorGuardService) => {
    expect(service).toBeTruthy();
  }));
});
