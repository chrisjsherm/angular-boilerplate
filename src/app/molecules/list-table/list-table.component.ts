import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Hero } from '../../models/hero.entity';
import { debounceTime } from 'rxjs/operators';

/**
 * List of heroes with pagination and actions
 */
@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent implements AfterViewInit, OnDestroy {
  @Input() heroes$: Observable<Hero[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<Hero>;
  displayedColumns: string[];
  selectionModel: SelectionModel<Hero>;

  private readonly heroes$DebounceMilliseconds = 100;
  private heroesSubscription: Subscription;

  constructor() {
    this.dataSource = new MatTableDataSource<Hero>([]);
    this.displayedColumns = ['selected', 'fullName', 'phoneNumber'];
    this.selectionModel = new SelectionModel<Hero>(true, []);
  }

  /**
   * Set up the MatTable's dataSource input.
   * Run AfterViewInit instead of OnInit because we're using ViewChild references.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.heroesSubscription = this.heroes$
      // Debounce to avoid value churn, especially on page load when clients
      // may be refreshing data
      .pipe(debounceTime(this.heroes$DebounceMilliseconds))
      .subscribe((heroes: Hero[]): void => {
        this.dataSource.data = heroes;
      });
  }

  /**
   * Unsubscribe from the heros$ Observable when Angular destroys the component
   */
  ngOnDestroy(): void {
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }

  /**
   * Do the number of selected heroes match the number of rows in the data set?
   *
   * @returns Whether all rows are selected
   */
  areAllSelected(): boolean {
    const selectedCount = this.selectionModel.selected.length;
    const rowCount = this.dataSource.filteredData.length;
    return selectedCount === rowCount;
  }

  /**
   * Select all rows in the data set if they are not all selected; otherwise,
   * clear the selection.
   */
  onSelectAllToggled(): void {
    if (this.areAllSelected()) {
      this.selectionModel.clear();
    } else {
      this.dataSource.data.forEach((row: Hero): void =>
        this.selectionModel.select(row),
      );
    }
  }

  /**
   * To improve performance, provide a trackBy function to the table similar to
   * Angular’s ngFor trackBy. This informs the table how to uniquely identify
   * rows to track how the data changes with each update.
   *
   * @param index Index of the hero in the dataSource.data array
   * @param hero Element in the dataSource.data array
   * @returns Value to track the element by
   */
  trackById(index: number, hero: Hero): string {
    return hero.id;
  }
}
