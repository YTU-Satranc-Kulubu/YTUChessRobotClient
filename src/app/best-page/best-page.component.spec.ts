import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPageComponent } from './best-page.component';

describe('BestPageComponent', () => {
  let component: BestPageComponent;
  let fixture: ComponentFixture<BestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
