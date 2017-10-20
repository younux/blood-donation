import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationStatusEmitterService } from './authentication-status-emitter.service';

describe('AuthenticationStatusEmitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationStatusEmitterService]
    });
  });

  it('should be created', inject([AuthenticationStatusEmitterService], (service: AuthenticationStatusEmitterService) => {
    expect(service).toBeTruthy();
  }));
});
