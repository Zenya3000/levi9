import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnenewComponent } from './onenew.component';

describe('OnenewComponent', () => {
  let component: OnenewComponent;
  let fixture: ComponentFixture<OnenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
