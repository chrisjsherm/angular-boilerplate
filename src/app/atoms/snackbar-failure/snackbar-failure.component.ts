import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { SnackbarSourceEvent } from '../../models/snackbar-source.enum';

/**
 * Snackbar message displayed when unsuccessfully acting upon a Hero
 */
@Component({
  selector: 'app-snackbar-failure',
  templateUrl: './snackbar-failure.component.html',
  styleUrls: ['./snackbar-failure.component.scss'],
})
export class SnackbarFailureComponent {
  readonly SnackbarSource = SnackbarSourceEvent;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public snackbarSource: SnackbarSourceEvent,
    private snackBarRef: MatSnackBarRef<SnackbarFailureComponent>,
  ) {}

  /**
   * Call the snackbar dismiss method
   */
  onDismiss(): void {
    this.snackBarRef.dismiss();
  }
}
