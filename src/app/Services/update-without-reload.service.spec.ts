import { TestBed } from '@angular/core/testing';

import { UpdateWithoutReloadService } from './update-without-reload.service';

describe('UpdateWithoutReloadService', () => {
  let service: UpdateWithoutReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateWithoutReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
