import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Determines when Angular Material form controls show a validation message
 * when they are invalid. We apply this globally in AppModule.
 *
 * Documentation: https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  /**
   * Determine if the provided form control and form should show an error state
   *
   * @param control Form control to check for dirty and touched user interaction
   * @param form Form group to check for a submit
   * @returns Whether to display a validation message
   */
  public isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    return !!(
      control?.invalid &&
      (control.dirty || control.touched || form?.submitted)
    );
  }
}
