import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailPageComponent } from './send-mail-page.component';

describe('SendMailPageComponent', () => {
  let component: SendMailPageComponent;
  let fixture: ComponentFixture<SendMailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
