import { Component, SimpleChange, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatHeaderRowDef, MatRowDef, MatTable } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { MockComponents, MockDirectives } from 'ng-mocks';
import { Hero } from '../../models/hero.entity';
import { ListTableComponent } from './list-table.component';

/**
 * Test component for setting ListTableComponent @Input() heroes property
 */
@Component({
  selector: 'app-host-component',
  template: ` <app-list-table [heroes]="heroes"></app-list-table> `,
})
class HostForListTableComponent {
  @ViewChild(ListTableComponent) listTableComponent: ListTableComponent;

  heroes = [
    {
      id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
      firstName: 'George',
      lastName: 'Washington',
      fullName: 'George Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    },
    {
      id: '26bbe379-b165-4ccf-b993-aefff76b4790',
      firstName: 'John',
      lastName: 'Wayne',
      fullName: 'John Wayne',
      phoneNumber: '(210) 555-5555',
      avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
    },
  ];
}

describe('ListTableComponent', (): void => {
  let hostComponent: HostForListTableComponent;
  let hostFixture: ComponentFixture<HostForListTableComponent>;
  let listTableComponent: ListTableComponent;

  beforeEach(
    waitForAsync((): void => {
      TestBed.configureTestingModule({
        declarations: [
          HostForListTableComponent,
          ListTableComponent,
          MockComponents(MatSpinner, MatCheckbox),
          MockDirectives(
            MatHeaderRowDef,
            MatRowDef,
            MatTable,
            MatFormField,
            MatLabel,
          ),
        ],
      }).compileComponents();
    }),
  );

  beforeEach((): void => {
    hostFixture = TestBed.createComponent(HostForListTableComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    listTableComponent = hostComponent.listTableComponent;
  });

  it('should create', (): void => {
    expect(hostComponent).toBeTruthy();
    expect(listTableComponent).toBeTruthy();
  });

  describe('OnChanges', (): void => {
    it(
      'should not update the dataSource when ngChanges does not have a heroes ' +
        'property',
      (): void => {
        // Arrange
        const heroes = listTableComponent.dataSource.data;

        // Act
        listTableComponent.ngOnChanges({});

        // Expect
        expect(listTableComponent.dataSource.data).toBe(heroes);
      },
    );

    it(
      'should not initialize sorting when the currentValue of heroes is ' +
        'undefined',
      (): void => {
        // Arrange
        listTableComponent.dataSource.sort = undefined;

        // Act
        listTableComponent.ngOnChanges({
          heroes: {
            currentValue: undefined,
          } as SimpleChange,
        });
        hostFixture.detectChanges();

        expect(listTableComponent.dataSource.sort).toBeUndefined();
      },
    );
  });

  describe('AfterViewInit', (): void => {
    it(
      'should initialize sorting when the dataSource does not have a value for ' +
        'its sort property and heroes has a value',
      (): void => {
        // Arrange
        listTableComponent.sort = new MatSort();

        // Assert
        expect(listTableComponent.dataSource.sort).toBeUndefined();

        // Act
        listTableComponent.ngAfterViewInit();

        // Assert
        expect(listTableComponent.dataSource.sort).toBeDefined();
      },
    );

    it('should not initialize sorting if heroes does not have a value', (): void => {
      // Arrange
      hostComponent.heroes = undefined;
      hostFixture.detectChanges();

      // Assert
      expect(listTableComponent.dataSource.sort).toBeUndefined();

      // Act
      listTableComponent.ngAfterViewInit();

      // Assert
      expect(listTableComponent.dataSource.sort).toBeUndefined();
    });
  });

  describe('Hide table data property', (): void => {
    it('should determine the table data is not hidden', (): void => {
      expect(listTableComponent.hideTableData).toBeFalse();
    });

    it('should determine the table data is hidden when heroes are undefined', (): void => {
      // Arrange
      hostComponent.heroes = undefined;
      hostFixture.detectChanges();

      // Assert
      expect(listTableComponent.hideTableData).toBeTrue();
    });

    it('should determine the table data is hidden when heroes are null', (): void => {
      // Arrange
      hostComponent.heroes = null;
      hostFixture.detectChanges();

      // Assert
      expect(listTableComponent.hideTableData).toBeTrue();
    });

    it(
      'should determine the table data is hidden when the heroes list is ' +
        'empty',
      (): void => {
        // Arrange
        hostComponent.heroes = [];
        hostFixture.detectChanges();

        // Assert
        expect(listTableComponent.hideTableData).toBeTrue();
      },
    );
  });

  describe('Filter', (): void => {
    it('should filter the data according to the filter input value', (): void => {
      // Arrange
      const filterInput: HTMLInputElement = hostFixture.debugElement.query(
        By.css('input'),
      ).nativeElement;

      // Act
      filterInput.value = 'Ge';
      const eKeyPress = new KeyboardEvent('keyup', {
        key: 'e',
      });
      filterInput.dispatchEvent(eKeyPress);
      hostFixture.detectChanges();

      // Assert
      expect(listTableComponent.dataSource.filteredData).toEqual([
        {
          id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
          firstName: 'George',
          lastName: 'Washington',
          fullName: 'George Washington',
          phoneNumber: '(703) 111-1111',
          avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        },
      ]);
    });
  });

  describe('Are all selected', (): void => {
    it(
      "should determine all rows are selected when the selection model's " +
        "selected length property equals the length of the data source's filtered " +
        'data length property',
      (): void => {
        // Arrange
        listTableComponent.dataSource.data.forEach((row: Hero): void =>
          listTableComponent.selectionModel.select(row),
        );

        // Act
        const result = listTableComponent.areAllSelected();

        // Assert
        expect(result).toBe(true);
        expect(listTableComponent.selectionModel.selected.length).toBe(2);
      },
    );

    it(
      "should determine not all rows are selected when the selection model's " +
        "selected length property does not equal the length of the data source's " +
        'filtered data length property',
      (): void => {
        // Arrange
        const matchingHero = listTableComponent.dataSource.data.find(
          (hero: Hero): boolean =>
            hero.id === '63631a44-0776-40cc-979a-fc7564230c0b',
        );
        listTableComponent.selectionModel.select(matchingHero);

        // Act
        const result = listTableComponent.areAllSelected();

        // Assert
        expect(result).toBe(false);
        expect(listTableComponent.selectionModel.selected.length).toBe(1);
      },
    );
  });

  describe('Toggle selected', (): void => {
    it('should start with no heroes selected', (): void => {
      // Assert
      expect(listTableComponent.selectionModel.selected.length).toBe(0);
    });

    it('should toggle all heroes to selected if none are already selected', (): void => {
      // Arrange
      expect(listTableComponent.dataSource.data.length).toBe(2);
      expect(listTableComponent.selectionModel.selected.length).toBe(0);

      // Act
      listTableComponent.onSelectAllToggled();

      // Assert
      expect(listTableComponent.selectionModel.selected.length).toBe(2);
    });

    it('should toggle all heroes to selected if some are already selected', (): void => {
      // Arrange
      expect(listTableComponent.dataSource.data.length).toBe(2);
      listTableComponent.selectionModel.select(
        listTableComponent.dataSource.data[0],
      );
      expect(listTableComponent.selectionModel.selected.length).toBe(1);

      // Act
      listTableComponent.onSelectAllToggled();

      // Assert
      expect(listTableComponent.selectionModel.selected.length).toBe(2);
    });

    it('should toggle all heroes to unselected if all are already selected', (): void => {
      // Arrange
      expect(listTableComponent.dataSource.data.length).toBe(2);
      listTableComponent.selectionModel.select(
        ...listTableComponent.dataSource.data,
      );
      expect(listTableComponent.selectionModel.selected.length).toBe(2);

      // Act
      listTableComponent.onSelectAllToggled();

      // Assert
      expect(listTableComponent.selectionModel.selected.length).toBe(0);
    });
  });

  describe('Track by id', (): void => {
    it('should return the id property of the hero parameter', (): void => {
      // Act
      const id = listTableComponent.trackById(0, {
        id: 'caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf',
      } as Hero);

      // Assert
      expect(id).toBe('caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf');
    });
  });

  describe('Sorting', (): void => {
    it('should initialize the dataSource sort property on ngAfterViewInit', (): void => {
      // Arrange
      listTableComponent.sort = new MatSort();

      // Act
      listTableComponent.ngAfterViewInit();

      // Assert
      expect(listTableComponent.dataSource.sort).toBe(listTableComponent.sort);
    });

    it('should sort the data by full name descending ', (): void => {
      // Arrange
      listTableComponent.sort = new MatSort();
      listTableComponent.ngAfterViewInit();
      const sortingDataAccessorSpy = spyOn(
        listTableComponent.dataSource,
        'sortingDataAccessor',
      ).and.callThrough();
      listTableComponent.sort.sort({
        id: 'fullName',
        start: 'asc',
        disableClear: false,
      });

      // Assert
      expect(sortingDataAccessorSpy).toHaveBeenCalledTimes(2);
      expect(sortingDataAccessorSpy).toHaveBeenCalledWith(
        {
          id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
          firstName: 'George',
          lastName: 'Washington',
          fullName: 'George Washington',
          phoneNumber: '(703) 111-1111',
          avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
        },
        'fullName',
      );
      expect(sortingDataAccessorSpy).toHaveBeenCalledWith(
        {
          id: '26bbe379-b165-4ccf-b993-aefff76b4790',
          firstName: 'John',
          lastName: 'Wayne',
          fullName: 'John Wayne',
          phoneNumber: '(210) 555-5555',
          avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
        },
        'fullName',
      );
      expect(
        listTableComponent.dataSource.sortingDataAccessor(
          {
            id: '26bbe379-b165-4ccf-b993-aefff76b4790',
            firstName: 'John',
            lastName: 'Wayne',
            fullName: 'John Wayne',
            phoneNumber: '(210) 555-5555',
            avatarUrl: 'https://avatar.com/jwayne/profile.jpg',
          },
          'fullName',
        ),
      ).toBe('WayneJohn');
    });

    it('should sort the data by the same property as the matColumnDef value', (): void => {
      expect(
        listTableComponent.dataSource.sortingDataAccessor(
          {
            id: 'db3ee04b-05be-4403-9d48-807fb29717ec',
            firstName: 'George',
            lastName: 'Washington',
            fullName: 'George Washington',
            phoneNumber: '(703) 111-1111',
            avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
          },
          'phoneNumber',
        ),
      ).toBe('(703) 111-1111');
    });
  });

  describe('Template', (): void => {
    it('should show the spinner when heroes are undefined', (): void => {
      // Arrange
      hostComponent.heroes = undefined;
      hostFixture.detectChanges();
      const spinner: HTMLElement = hostFixture.debugElement.query(
        By.directive(MatSpinner),
      ).nativeElement;

      // Assert
      expect(spinner).toBeDefined();
    });

    it('should show the empty message when heroes is empty', (): void => {
      // Arrange
      hostComponent.heroes = [];
      hostFixture.detectChanges();
      const empty: HTMLElement = hostFixture.debugElement.query(By.css('div'))
        .nativeElement;

      // Assert
      expect(empty.innerText).toBe('No heroes');
    });

    it('should show the heroes table when there are heroes', (): void => {
      // Arrange
      const table: HTMLElement = hostFixture.debugElement.query(By.css('table'))
        .nativeElement;

      // Assert
      expect(table).toBeDefined();
    });
  });
});
