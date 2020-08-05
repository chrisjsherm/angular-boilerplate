import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPageComponent } from './detail-page.component';
import { AppState } from '../../redux/app-state.interface';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { fetchDetailPageData } from './redux/actions/fetch-detail-page-data.actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { cold } from 'jasmine-marbles';

describe('DetailPageComponent', (): void => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialState: AppState = {
    heroes: [
      {
        id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
        firstName: 'George',
        lastName: 'Washington',
        phoneNumber: '(703) 111-1111',
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
      },
      {
        id: '26bbe379-b165-4ccf-b993-aefff76b4790',
        firstName: 'John',
        lastName: 'Wayne',
        phoneNumber: '(210) 555-5555',
        avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
      },
    ],
  };

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'db3ee04b-05be-4403-9d48-807fb29717ec' }),
          },
        },
      ],
      declarations: [DetailPageComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the fetch heroes action', (): void => {
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(fetchDetailPageData());
  });

  it('should subscribe to teh store for the hero matching the route parameter', (): void => {
    expect(component.hero$).toBeObservable(
      cold('(-n)', {
        n: initialState.heroes[0],
      }),
    );
  });

  it('should update the view with the hero matching the route parameter', (): void => {
    // Arrange
    const hero: HTMLElement = fixture.debugElement.query(By.css('pre'))
      .nativeElement;

    // Assert
    expect(JSON.parse(hero.innerText.trim())).toEqual(initialState.heroes[0]);
  });
});
