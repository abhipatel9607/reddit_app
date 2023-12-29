import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubredditPopupComponent } from './create-subreddit-popup.component';

describe('CreateSubredditPopupComponent', () => {
  let component: CreateSubredditPopupComponent;
  let fixture: ComponentFixture<CreateSubredditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubredditPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubredditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
