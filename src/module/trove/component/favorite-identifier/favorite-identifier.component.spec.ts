import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteIdentifierComponent } from './favorite-identifier.component';

describe('FavoriteIdentifierComponent', () => {
  let component: FavoriteIdentifierComponent;
  let fixture: ComponentFixture<FavoriteIdentifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteIdentifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
