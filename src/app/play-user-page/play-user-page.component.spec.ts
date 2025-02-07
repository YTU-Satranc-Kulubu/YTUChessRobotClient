import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayUserPageComponent } from './play-user-page.component';

describe('PlayUserPageComponent', () => {
  let component: PlayUserPageComponent;
  let fixture: ComponentFixture<PlayUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayUserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
