import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app-state.interface';
import { submitCreateForm } from './redux/actions/submit-create-form.actions';

/**
 * A view with form controls for creating a hero
 */
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent {
  createForm: FormGroup;

  constructor(private store: Store<AppState>) {
    this.createForm = this.generateFormInstance();
  }

  /**
   * On form submission, dispatch the submit Action with the form values
   *
   * @param createForm Angular FormGroup of Hero properties
   */
  onSubmit(createForm: FormGroup): void {
    if (createForm.valid) {
      this.store.dispatch(
        submitCreateForm({
          formValues: createForm.value,
        }),
      );
    }
  }

  /**
   * Generate a form group with controls for creating a new Hero
   */
  private generateFormInstance(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      avatarUrl: new FormControl('', [Validators.required]),
    });
  }
}
