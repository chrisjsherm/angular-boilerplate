import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
  ) {
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
          formValues: createForm.get('hero').value,
        }),
      );
    }
  }

  /**
   * Generate a form group with controls for creating a new Hero
   */
  private generateFormInstance(): FormGroup {
    return this.formBuilder.group({
      hero: [],
    });
  }
}
