import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorSearchComponent } from './creator-search.component';

describe('CreatorSearchComponent', () => {
  let component: CreatorSearchComponent;
  let fixture: ComponentFixture<CreatorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
