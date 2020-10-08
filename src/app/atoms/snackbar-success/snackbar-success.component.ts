import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarSourceEvent } from '../../models/snackbar-source.enum';

/**
 * Snackbar message displayed when successfully acting upon a Hero
 */
@Component({
  selector: 'app-snackbar-success',
  templateUrl: './snackbar-success.component.html',
  styleUrls: [],
})
export class SnackbarSuccessComponent {
  readonly SnackbarSource = SnackbarSourceEvent;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public snackbarSource: SnackbarSourceEvent,
  ) {}
}
