import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDFormControlComponent } from './md-form-control.component';

describe('MDFormControlComponent', () => {
  let component: MDFormControlComponent;
  let fixture: ComponentFixture<MDFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MDFormControlComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
