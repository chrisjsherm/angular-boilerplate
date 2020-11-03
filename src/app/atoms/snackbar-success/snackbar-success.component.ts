import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { SnackbarSourceEvent } from '../../models/snackbar-source.enum';

/**
 * Snackbar message displayed when successfully acting upon a Hero
 */
@Component({
  selector: 'app-snackbar-success',
  templateUrl: './snackbar-success.component.html',
  styleUrls: ['./snackbar-success.component.scss'],
})
export class SnackbarSuccessComponent {
  readonly SnackbarSource = SnackbarSourceEvent;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public snackbarSource: SnackbarSourceEvent,
    private snackBarRef: MatSnackBarRef<SnackbarSuccessComponent>,
  ) {}

  /**
   * Call the snackbar dismiss method
   */
  onDismiss(): void {
    this.snackBarRef.dismiss();
  }
}
