import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTableComponent } from './list-table.component';
import { Hero } from '../../models/hero.entity';
import { MockComponents, MockDirectives } from 'ng-mocks';
import { MatTable, MatHeaderRowDef, MatRowDef } from '@angular/material/table';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';

describe('ListTableComponent', (): void => {
  let component: ListTableComponent;
  let fixture: ComponentFixture<ListTableComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [
        ListTableComponent,
        MockComponents(MatSpinner, MatCheckbox),
        MockDirectives(MatHeaderRowDef, MatRowDef, MatTable),
      ],
    }).compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(ListTableComponent);
    component = fixture.componentInstance;

    const heroes: Hero[] = [
      {
        id: 'caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf',
        lastName: 'Zebra',
      } as Hero,
      {
        id: '63631a44-0776-40cc-979a-fc7564230c0b',
        lastName: 'Caboose',
      } as Hero,
    ];

    // Trigger onChanges manually so we don't have to create a wrapper component
    component.heroes = heroes;
    component.ngOnChanges({
      heroes: {
        currentValue: heroes,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: (): boolean => true,
      },
    });

    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  describe('OnChanges', (): void => {
    it(
      'should not update the dataSource when ngChanges does not have a heroes ' +
        'property',
      (): void => {
        // Arrange
        const heroes = component.dataSource.data;

        // Act
        component.ngOnChanges({});

        // Expect
        expect(component.dataSource.data).toBe(heroes);
      },
    );

    it(
      'should not initialize sorting when the currentValue of heroes is ' +
        'undefined',
      (): void => {
        // Arrange
        component.dataSource.sort = undefined;

        // Act
        component.ngOnChanges({
          heroes: {
            currentValue: undefined,
          } as SimpleChange,
        });
        fixture.detectChanges();

        expect(component.dataSource.sort).toBeUndefined();
      },
    );
  });

  describe('AfterViewInit', (): void => {
    it(
      'should initialize sorting when the dataSource does not have a value for its' +
        'sort property and heroes does have a value',
      (): void => {
        // Arrange
        component.sort = new MatSort();

        // Assert
        expect(component.dataSource.sort).toBeUndefined();

        // Act
        component.ngAfterViewInit();

        // Assert
        expect(component.dataSource.sort).toBeDefined();
      },
    );

    it('should not initialize sorting heroes does not have a value', (): void => {
      // Arrange
      component.heroes = undefined;

      // Assert
      expect(component.dataSource.sort).toBeUndefined();

      // Act
      component.ngAfterViewInit();

      // Assert
      expect(component.dataSource.sort).toBeUndefined();
    });
  });

  describe('Are all selected', (): void => {
    it(
      "should determine all rows are selected when the selection model's " +
        "selected length property equals the length of the data source's filtered data " +
        'length property',
      (): void => {
        // Arrange
        component.dataSource.data.forEach((row: Hero): void =>
          component.selectionModel.select(row),
        );

        // Act
        const result = component.areAllSelected();

        // Assert
        expect(result).toBe(true);
        expect(component.selectionModel.selected.length).toBe(2);
      },
    );

    it(
      "should determine not all rows are selected when the selection model's " +
        "selected length property does not equal the length of the data source's " +
        'filtered data length property',
      (): void => {
        // Arrange
        const matchingHero = component.dataSource.data.find(
          (hero: Hero): boolean =>
            hero.id === '63631a44-0776-40cc-979a-fc7564230c0b',
        );
        component.selectionModel.select(matchingHero);

        // Act
        const result = component.areAllSelected();

        // Assert
        expect(result).toBe(false);
        expect(component.selectionModel.selected.length).toBe(1);
      },
    );
  });

  describe('Toggle selected', (): void => {
    it('should start with no heroes selected', (): void => {
      // Assert
      expect(component.selectionModel.selected.length).toBe(0);
    });

    it('should toggle all heroes to selected if none are already selected', (): void => {
      // Arrange
      expect(component.dataSource.data.length).toBe(2);
      expect(component.selectionModel.selected.length).toBe(0);

      // Act
      component.onSelectAllToggled();

      // Assert
      expect(component.selectionModel.selected.length).toBe(2);
    });

    it('should toggle all heroes to selected if some are already selected', (): void => {
      // Arrange
      expect(component.dataSource.data.length).toBe(2);
      component.selectionModel.select(component.dataSource.data[0]);
      expect(component.selectionModel.selected.length).toBe(1);

      // Act
      component.onSelectAllToggled();

      // Assert
      expect(component.selectionModel.selected.length).toBe(2);
    });

    it('should toggle all heroes to unselected if all are already selected', (): void => {
      // Arrange
      expect(component.dataSource.data.length).toBe(2);
      component.selectionModel.select(...component.dataSource.data);
      expect(component.selectionModel.selected.length).toBe(2);

      // Act
      component.onSelectAllToggled();

      // Assert
      expect(component.selectionModel.selected.length).toBe(0);
    });
  });

  describe('Track by id', (): void => {
    it('should return the id property of the hero parameter', (): void => {
      // Act
      const id = component.trackById(0, {
        id: 'caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf',
      } as Hero);

      // Assert
      expect(id).toBe('caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf');
    });
  });

  describe('Sorting', (): void => {
    it('should initialize the dataSource sort property on ngAfterViewInit', (): void => {
      // Arrange
      component.sort = new MatSort();

      // Act
      component.ngAfterViewInit();

      // Assert
      expect(component.dataSource.sort).toBe(component.sort);
    });

    it('should use the custom sortingDataAccessor', (): void => {
      // Arrange
      component.sort = new MatSort();
      component.ngAfterViewInit();
      const sortingDataAccessorSpy = spyOn(
        component.dataSource,
        'sortingDataAccessor',
      ).and.callThrough();

      // Act
      component.sort.sort({
        id: 'lastName',
        start: 'asc',
        disableClear: false,
      });

      // Assert
      // Call twice, once for each Hero
      expect(sortingDataAccessorSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Template', (): void => {
    it('should show the spinner when heroes are undefined', (): void => {
      // Arrange
      component.heroes = undefined;
      fixture.detectChanges();
      const spinner: HTMLElement = fixture.debugElement.query(
        By.directive(MatSpinner),
      ).nativeElement;

      // Assert
      expect(spinner).toBeDefined();
    });

    it('should show the empty message when heroes is empty', (): void => {
      // Arrange
      component.heroes = [];
      component.ngOnChanges({
        heroes: {
          currentValue: [],
          previousValue: [
            {
              id: 'caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf',
              lastName: 'Zebra',
            } as Hero,
            {
              id: '63631a44-0776-40cc-979a-fc7564230c0b',
              lastName: 'Caboose',
            } as Hero,
          ],
          firstChange: false,
          isFirstChange: (): boolean => false,
        },
      });
      fixture.detectChanges();
      const empty: HTMLElement = fixture.debugElement.query(By.css('span'))
        .nativeElement;

      // Assert
      expect(empty.innerText).toBe('No heroes');
    });

    it('should show the heroes table when there are heroes', (): void => {
      // Arrange
      const table: HTMLElement = fixture.debugElement.query(By.css('table'))
        .nativeElement;

      // Assert
      expect(table).toBeDefined();
    });
  });
});
