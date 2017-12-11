import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeallitasokComponent } from './beallitasok.component';

describe('BeallitasokComponent', () => {
  let component: BeallitasokComponent;
  let fixture: ComponentFixture<BeallitasokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeallitasokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeallitasokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
