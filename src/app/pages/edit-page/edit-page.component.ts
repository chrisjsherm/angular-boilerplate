import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Hero } from '../../models/hero.entity';
import { AppState } from '../../redux/app-state.interface';
import { selectHeroById } from '../../redux/selectors/hero.selectors';
import { fetchEditPageData } from './redux/actions/fetch-edit-page-data.actions';
import { submitEditForm } from './redux/actions/submit-edit-form.actions';

/**
 * A view with form controls for editing a hero
 */
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  hero$: Observable<Hero>;
  editForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.hero$ = this.route.params.pipe(
      switchMap(
        (params: Params): Observable<Hero> => {
          return this.store.pipe(
            select<AppState, string, Hero>(selectHeroById, params.id),
          );
        },
      ),
      filter((hero: Hero): boolean => hero !== undefined),
      tap({
        next: (hero: Hero): void => {
          this.editForm = this.generateFormInstance(hero);
        },
      }),
    );
  }

  /**
   * Dispatch an action to retrieve the hero
   */
  ngOnInit(): void {
    this.store.dispatch(fetchEditPageData());
  }

  /**
   * On form submission, dispatch the submit Action with the form values
   *
   * @param id Id of the Hero to edit
   * @param editForm Angular FormGroup of editable properties
   */
  onSubmit(id: string, editForm: FormGroup): void {
    if (editForm.valid) {
      this.store.dispatch(
        submitEditForm({
          id,
          formValues: editForm.get('hero').value,
        }),
      );
    }
  }

  /**
   * Generate a form group with the hero's current values
   *
   * @param hero Hero instance whose values this form will be editing
   *
   * @returns Angular FormGroup we'll interact with in the HTML template
   */
  private generateFormInstance(hero: Hero): FormGroup {
    const { firstName, lastName, phoneNumber, avatarUrl } = hero;
    return this.formBuilder.group({
      hero: [
        {
          firstName,
          lastName,
          phoneNumber,
          avatarUrl,
        },
      ],
    });
  }
}
