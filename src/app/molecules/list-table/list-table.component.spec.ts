import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTableComponent } from './list-table.component';
import { Hero } from '../../models/hero.entity';
import { of } from 'rxjs';
import { MockComponents, MockDirectives } from 'ng-mocks';
import { MatTable, MatHeaderRowDef, MatRowDef } from '@angular/material/table';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatCheckbox } from '@angular/material/checkbox';

describe('ListTableComponent', (): void => {
  let component: ListTableComponent;
  let fixture: ComponentFixture<ListTableComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [
        ListTableComponent,
        MockComponents(MatTable, MatSpinner, MatCheckbox),
        MockDirectives(MatHeaderRowDef, MatRowDef),
      ],
    }).compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(ListTableComponent);
    component = fixture.componentInstance;
    component.heroes$ = of([
      {
        id: 'caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf',
      } as Hero,
      {
        id: '63631a44-0776-40cc-979a-fc7564230c0b',
      } as Hero,
    ]);
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  describe('are all selected', (): void => {
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

  describe('toggle selected', (): void => {
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

  describe('track by id', (): void => {
    it('should return the id property of the hero parameter', (): void => {
      // Act
      const id = component.trackById(0, {
        id: 'caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf',
      } as Hero);

      // Assert
      expect(id).toBe('caa3a7ab-60d4-47e3-8ea8-ebe38d1ea4cf');
    });
  });
});
