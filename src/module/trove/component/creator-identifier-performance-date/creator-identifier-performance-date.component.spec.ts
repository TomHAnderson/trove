import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorIdentifierPerformanceDateComponent } from './creator-identifier-performance-date.component';

describe('CreatorIdentifierPerformanceDateComponent', () => {
  let component: CreatorIdentifierPerformanceDateComponent;
  let fixture: ComponentFixture<CreatorIdentifierPerformanceDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorIdentifierPerformanceDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorIdentifierPerformanceDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
