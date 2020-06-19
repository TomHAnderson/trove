import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroveLayoutComponent } from './trove-layout.component';

describe('TroveLayoutComponent', () => {
  let component: TroveLayoutComponent;
  let fixture: ComponentFixture<TroveLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroveLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroveLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
