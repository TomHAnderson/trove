import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifierListComponent } from './identifier-list.component';

describe('IdentifierListComponent', () => {
  let component: IdentifierListComponent;
  let fixture: ComponentFixture<IdentifierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
