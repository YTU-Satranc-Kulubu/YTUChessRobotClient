import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityPlayersPageComponent } from './university-players-page.component';

describe('UniversityPlayersPageComponent', () => {
  let component: UniversityPlayersPageComponent;
  let fixture: ComponentFixture<UniversityPlayersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityPlayersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityPlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
