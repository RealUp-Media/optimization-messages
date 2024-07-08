import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateContractsComponent } from './template-contracts.component';

describe('TemplateContractsComponent', () => {
  let component: TemplateContractsComponent;
  let fixture: ComponentFixture<TemplateContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
