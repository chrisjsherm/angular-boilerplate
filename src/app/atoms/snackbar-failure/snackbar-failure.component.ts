import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarSourceEvent } from '../../models/snackbar-source.enum';

/**
 * Snackbar message displayed when unsuccessfully acting upon a Hero
 */
@Component({
  selector: 'app-snackbar-failure',
  templateUrl: './snackbar-failure.component.html',
  styleUrls: [],
})
export class SnackbarFailureComponent {
  readonly SnackbarSource = SnackbarSourceEvent;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public snackbarSource: SnackbarSourceEvent,
  ) {}
}
