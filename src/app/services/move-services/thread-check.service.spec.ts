import { TestBed } from '@angular/core/testing';

import { ThreadCheckService } from './thread-check.service';

describe('ThreadCheckService', () => {
  let service: ThreadCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
