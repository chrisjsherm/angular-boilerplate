import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Hero } from '../../models/hero.entity';
import { AppState } from '../../redux/app-state.interface';
import { closeDialog } from '../close-dialog.helper';
import { submitDeleteHero } from './redux/delete-hero-dialog.actions';

/**
 * Confirm deletion of a hero
 */
@Component({
  selector: 'app-delete-hero-dialog',
  templateUrl: './delete-hero-dialog.component.html',
  styleUrls: ['./delete-hero-dialog.component.scss'],
})
export class DeleteHeroDialogComponent {
  hero: Hero;

  constructor(
    @Inject(MAT_DIALOG_DATA) hero: Hero,
    private dialogReference: MatDialogRef<DeleteHeroDialogComponent, Hero>,
    private store: Store<AppState>,
  ) {
    this.hero = {
      ...hero,
    };
  }

  /**
   * Dispatch the Action submit delete hero
   *
   * @param hero Hero to delete
   */
  onSubmit(hero: Hero): void {
    this.store.dispatch(
      submitDeleteHero({
        hero,
        closeDialog: closeDialog(hero, this.dialogReference),
      }),
    );
  }
}
