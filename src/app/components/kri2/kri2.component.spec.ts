import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kri2Component } from './kri2.component';

describe('Kri2Component', () => {
  let component: Kri2Component;
  let fixture: ComponentFixture<Kri2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Kri2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kri2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
