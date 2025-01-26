import { TestBed } from '@angular/core/testing';

import { AfterMoveService } from './after-move.service';

describe('AfterMoveService', () => {
  let service: AfterMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfterMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
