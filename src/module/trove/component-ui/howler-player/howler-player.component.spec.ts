import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowlerPlayerComponent } from './howler-player.component';

describe('HowlerPlayerComponent', () => {
  let component: HowlerPlayerComponent;
  let fixture: ComponentFixture<HowlerPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowlerPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowlerPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
