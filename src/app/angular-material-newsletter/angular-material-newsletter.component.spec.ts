import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMaterialNewsletterComponent } from './angular-material-newsletter.component';

describe('AngularMaterialNewsletterComponent', () => {
  let component: AngularMaterialNewsletterComponent;
  let fixture: ComponentFixture<AngularMaterialNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularMaterialNewsletterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMaterialNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
