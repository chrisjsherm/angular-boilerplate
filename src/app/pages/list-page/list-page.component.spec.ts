import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageComponent } from './list-page.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app-state.interface';
import { fetchListPageData } from './redux/actions/fetch-list-page-data.actions';
import { MockComponent } from 'ng-mocks';
import { ListTableComponent } from '../../molecules/list-table/list-table.component';
import { of } from 'rxjs';

describe('ListPageComponent', (): void => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj<Store<AppState>>('store', [
            'dispatch',
            'pipe',
          ]),
        },
      ],
      declarations: [ListPageComponent, MockComponent(ListTableComponent)],
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store<AppState>>;
  }));

  beforeEach((): void => {
    store.pipe.and.returnValue(of([]));

    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the action to fetch data', (): void => {
    // Assert
    expect(store.dispatch).toHaveBeenCalledWith(fetchListPageData());
  });

  it(
    'should unsubscribe from the heroesSubscription input when the component gets ' +
      'destroyed',
    (): void => {
      // Arrange
      const heroesSubscriptionSpy = spyOn(
        component['heroesSubscription'],
        'unsubscribe',
      );

      // Act
      component.ngOnDestroy();

      // Assert
      expect(heroesSubscriptionSpy).toHaveBeenCalledTimes(1);
    },
  );

  it(
    'should not unsubscribe from the heroesSubscription input when the component ' +
      'gets destroyed if the subscription property is not set',
    (): void => {
      // Arrange
      const heroesSubscriptionSpy = spyOn(
        component['heroesSubscription'],
        'unsubscribe',
      );

      // Act
      component['heroesSubscription'] = undefined;
      component.ngOnDestroy();

      // Assert
      expect(heroesSubscriptionSpy).not.toHaveBeenCalled();
    },
  );
});
