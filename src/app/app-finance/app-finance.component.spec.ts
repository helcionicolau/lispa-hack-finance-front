import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFinanceComponent } from './app-finance.component';

describe('AppFinanceComponent', () => {
  let component: AppFinanceComponent;
  let fixture: ComponentFixture<AppFinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppFinanceComponent]
    });
    fixture = TestBed.createComponent(AppFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
