import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenedToComponent } from './listened-to.component';

describe('ListenedToComponent', () => {
  let component: ListenedToComponent;
  let fixture: ComponentFixture<ListenedToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenedToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenedToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
