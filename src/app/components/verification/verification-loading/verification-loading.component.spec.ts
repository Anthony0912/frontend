import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationLoadingComponent } from './verification-loading.component';

describe('VerificationLoadingComponent', () => {
  let component: VerificationLoadingComponent;
  let fixture: ComponentFixture<VerificationLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
