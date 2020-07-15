import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { filter, take } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Hero } from '../../models/hero.entity';

/**
 * List of heroes with pagination and actions
 */
@UntilDestroy()
@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent implements AfterViewInit {
  private readonly allowMultiSelect = true;
  private readonly initialSelection = [];

  @Input() heroes$: Observable<Hero[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Hero>();
  displayedColumns = ['fullName', 'phoneNumber'];
  isDataSourceInitialized: boolean;
  selectionModel = new SelectionModel<Hero>(
    this.allowMultiSelect,
    this.initialSelection,
  );

  constructor() {}

  /**
   * Set up the MatTable's dataSource input.
   * Run AfterViewInit instead of OnInit because we're using ViewChild references.
   */
  ngAfterViewInit(): void {
    this.initializeDataSource();
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

  /**
   * Initialize the MatTableDataSource data and paginator properties
   */
  private initializeDataSource(): void {
    const heroesNotNull$ = this.heroes$.pipe(
      filter((heroes: Hero[]): boolean => heroes !== null),
      untilDestroyed(this),
    );

    heroesNotNull$.subscribe((heroes: Hero[]): void => {
      this.dataSource.data = heroes;
    });

    heroesNotNull$.pipe(take(1)).subscribe((): void => {
      this.dataSource.paginator = this.paginator;
      this.isDataSourceInitialized = true;
    });
  }
}
