import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Hero } from '../../models/hero.entity';
import { MatSort } from '@angular/material/sort';

/**
 * List of heroes with pagination and actions
 */
@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent implements AfterViewInit, OnChanges {
  @Input() heroes: Hero[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Hero>;
  displayedColumns: string[];
  selectionModel: SelectionModel<Hero>;

  constructor() {
    this.dataSource = new MatTableDataSource<Hero>([]);
    this.displayedColumns = [
      'selected',
      'firstName',
      'lastName',
      'phoneNumber',
    ];
    this.selectionModel = new SelectionModel<Hero>(
      // Allow multiple selection
      true,
      // Initially selected entities
      [],
    );
  }

  /**
   * When an Input property changes, update the heroes property
   *
   * @param changes Input property details by property name
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.heroes) {
      this.dataSource.data = changes.heroes.currentValue;

      if (changes.heroes.currentValue && this.dataSource.sort === undefined) {
        // Heroes were undefined in ngAfterViewInit, so we couldn't initialize
        // sorting on an undefined value. Initialize sorting now
        this.initializeSorting(this.dataSource);
      }
    }
  }

  /**
   * Set up the MatTable's dataSource input.
   * Run AfterViewInit instead of OnInit because we're using ViewChild references.
   */
  ngAfterViewInit(): void {
    this.initializePagination(this.dataSource);

    if (this.heroes && this.dataSource.sort === undefined) {
      // Prevent trying to initialize sorting on an undefined data value since
      // MatSort will complain it cannot call slice on undefined
      this.initializeSorting(this.dataSource);
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
      this.selectionModel.select(...this.dataSource.data);
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

  /**
   * Initialize the Angular Material table data source with an instance of the
   * MatPaginator component used by the table to control what page of the data
   * is displayed. Page changes emitted by the MatPaginator will trigger an
   * update to the table's rendered data.
   *
   * Note that the data source uses the paginator's properties to calculate
   * which page of data should be displayed. If the paginator receives its
   * properties as template inputs, e.g. [pageLength]=100 or [pageIndex]=1, then
   * be sure that the paginator's view has been initialized before assigning it
   * to this data source.
   *
   * @param dataSource Angular Material table data source
   */
  private initializePagination(dataSource: MatTableDataSource<Hero>): void {
    dataSource.paginator = this.paginator;
  }

  /**
   * Initialize the Angular Material table data source with an instance of the
   * MatSort directive used by the table to control its sorting. Sort changes
   * emitted by the MatSort will trigger an update to the table's rendered data.
   *
   *
   * @param dataSource Angular Material table data source
   */
  private initializeSorting(dataSource: MatTableDataSource<Hero>): void {
    dataSource.sort = this.sort;

    /**
     * Configure the value to pass into the sorting function via the data
     * source's sortingDataAccessor. As of Angular 10, we can return the value
     * to use for a given sortHeader but cannot adjust the sorting algorithm itself.
     * Feature request: https://github.com/angular/components/issues/7226
     * Community component with multi-column sorting ability inspired by MatTable:
     * https://github.com/Maxl94/ngx-multi-sort-table
     */
    dataSource.sortingDataAccessor = (
      hero: Hero,
      sortHeaderId: string,
    ): string | number => {
      switch (sortHeaderId) {
        default:
          return hero[sortHeaderId];
      }
    };
  }
}
