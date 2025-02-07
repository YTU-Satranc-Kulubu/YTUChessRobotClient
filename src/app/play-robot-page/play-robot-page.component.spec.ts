import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayRobotPageComponent } from './play-robot-page.component';

describe('PlayRobotPageComponent', () => {
  let component: PlayRobotPageComponent;
  let fixture: ComponentFixture<PlayRobotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayRobotPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayRobotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
