import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCreatorComponent } from './favorite-creator.component';

describe('FavoriteCreatorComponent', () => {
  let component: FavoriteCreatorComponent;
  let fixture: ComponentFixture<FavoriteCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
