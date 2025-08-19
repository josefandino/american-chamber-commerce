import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextOnlyComponent } from './input-text-only.component';

describe('InputTextOnlyComponent', () => {
  let component: InputTextOnlyComponent;
  let fixture: ComponentFixture<InputTextOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextOnlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
