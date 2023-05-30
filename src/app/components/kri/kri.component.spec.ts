import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KriComponent } from './kri.component';

describe('KriComponent', () => {
  let component: KriComponent;
  let fixture: ComponentFixture<KriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
