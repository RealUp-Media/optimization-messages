import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemploHypeauditorComponent } from './ejemplo-hypeauditor.component';

describe('EjemploHypeauditorComponent', () => {
  let component: EjemploHypeauditorComponent;
  let fixture: ComponentFixture<EjemploHypeauditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjemploHypeauditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemploHypeauditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
