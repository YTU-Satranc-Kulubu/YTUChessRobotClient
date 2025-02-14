import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitiesPageComponent } from './universities-page.component';

describe('UniversitiesPageComponent', () => {
  let component: UniversitiesPageComponent;
  let fixture: ComponentFixture<UniversitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversitiesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
