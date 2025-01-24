import { TestBed } from '@angular/core/testing';

import { PossibleMovesService } from './possible-moves.service';

describe('PossibleMovesService', () => {
  let service: PossibleMovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PossibleMovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
