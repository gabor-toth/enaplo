import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnaploComponent } from './enaplo.component';

describe('EnaploComponent', () => {
  let component: EnaploComponent;
  let fixture: ComponentFixture<EnaploComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnaploComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnaploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
