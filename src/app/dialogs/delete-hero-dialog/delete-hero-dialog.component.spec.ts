import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockComponents } from 'ng-mocks';
import { Hero } from '../../models/hero.entity';
import { AppState } from '../../redux/app-state.interface';
import { DeleteHeroDialogComponent } from './delete-hero-dialog.component';
import { submitDeleteHero } from './redux/delete-hero-dialog.actions';

describe('DeleteHeroDialogComponent', (): void => {
  let component: DeleteHeroDialogComponent;
  let fixture: ComponentFixture<DeleteHeroDialogComponent>;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(
    async (): Promise<void> => {
      await TestBed.configureTestingModule({
        declarations: [
          DeleteHeroDialogComponent,
          MockComponents(MatDialogContent, MatDialogActions),
        ],
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              id: '437ed73b-5a15-4056-bb80-c37b88095b82',
            },
          },
          {
            provide: MatDialogRef,
            useValue: {},
          },
          {
            provide: Store,
            useValue: jasmine.createSpyObj<Store<AppState>>('store', [
              'dispatch',
            ]),
          },
        ],
      }).compileComponents();
    },
  );

  beforeEach((): void => {
    store = TestBed.inject(Store) as jasmine.SpyObj<Store<AppState>>;
    fixture = TestBed.createComponent(DeleteHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the Action to delete the hero', (): void => {
    // Arrange
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button'),
    ).nativeElement;

    // Act
    button.click();

    // Assert
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      submitDeleteHero({
        hero: {
          id: '437ed73b-5a15-4056-bb80-c37b88095b82',
        } as Hero,
        closeDialog: (jasmine.any(Function) as unknown) as () => void,
      }),
    );
  });
});
