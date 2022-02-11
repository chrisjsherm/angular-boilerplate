import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HeroFormValues } from './models/hero-form-values.interface';

/**
 * Custom form control for Hero properties. Enables us to use the same component
 * for both create and edit pages.
 */
@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HeroFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: HeroFormComponent,
      multi: true,
    },
  ],
})
export class HeroFormComponent
  implements ControlValueAccessor, Validator, OnDestroy {
  formGroup: FormGroup;
  isDisabled: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      avatarUrl: ['', Validators.required],
    });

    this.subscriptions.push(
      // Any time this form changes, indicate the change upstream and mark as touched
      this.formGroup.valueChanges.subscribe((value: HeroFormValues): void => {
        this.onChange(value);
        this.onTouched();
      }),
    );
  }

  /**
   * A callback method that performs clean-up, invoked immediately
   * before Angular destroys the component
   */
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * The registered callback function called when a change event occurs on the
   * form control. The `registerOnChange` method performs the registration.
   * Any implementation here gets overwritten upon registration.
   */
  onChange = (value: HeroFormValues): void => {};

  /**
   * The registered callback function called when a blur event occurs on the
   * form control. The `registerOnTouched` method performs the registration.
   * Any implementation here gets overwritten upon registration.
   */
  onTouched = (): void => {};

  /**
   * Registers a callback function the forms API calls on initialization to
   * update the form model when values propagate from the view to the model
   *
   * @param fn Function to call when the control value changes
   */
  registerOnChange(fn: (value: HeroFormValues) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function the forms API calls on initialization to
   * update the form control on blur, also known as "touched"
   *
   * @param fn Function to call when touched
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Function the forms API calls when the control status changes to or from
   * 'DISABLED'. Depending on the status, it enables or disables the appropriate
   * DOM element
   *
   * @param isDisabled Whether to disable the DOM elements that constitute this
   *   form control
   */
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  /**
   * Callback to determine the validity of the custom form control
   *
   * @returns Map of validation errors or null if the form control is valid
   */
  validate(): ValidationErrors | null {
    if (this.formGroup.valid) {
      return null;
    }

    return {
      firstName: this.formGroup.get('firstName').errors,
      lastName: this.formGroup.get('lastName').errors,
      phoneNumber: this.formGroup.get('phoneNumber').errors,
      avatarUrl: this.formGroup.get('avatarUrl').errors,
    };
  }

  /**
   * Writes a new value to the DOM elements that constitute this form control.
   * The forms API calls this method to write to the view when programmatic
   * changes from model to view occur.
   *
   * @param value New value for the form control
   */
  writeValue(value: HeroFormValues): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
    }
  }
}
