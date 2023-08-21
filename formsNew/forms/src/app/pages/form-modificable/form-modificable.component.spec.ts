import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModificableComponent } from './form-modificable.component';

describe('FormModificableComponent', () => {
  let component: FormModificableComponent;
  let fixture: ComponentFixture<FormModificableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModificableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModificableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
