import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzerepkorokComponent } from './szerepkorok.component';

describe('SzerepkorokComponent', () => {
  let component: SzerepkorokComponent;
  let fixture: ComponentFixture<SzerepkorokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzerepkorokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzerepkorokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
