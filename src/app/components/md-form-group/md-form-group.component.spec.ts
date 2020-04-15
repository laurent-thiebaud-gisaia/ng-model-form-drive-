import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDFormGroupComponent } from './md-form-group.component';

describe('MDFormGroupComponent', () => {
  let component: MDFormGroupComponent;
  let fixture: ComponentFixture<MDFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MDFormGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
