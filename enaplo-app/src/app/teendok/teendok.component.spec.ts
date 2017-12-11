import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendokComponent } from './teendok.component';

describe('TeendokComponent', () => {
  let component: TeendokComponent;
  let fixture: ComponentFixture<TeendokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
