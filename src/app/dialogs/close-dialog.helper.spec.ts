import { Hero } from '../models/hero.entity';
import { closeDialog } from './close-dialog.helper';

describe(
  'Helper function that closes over a reference to the callback ' + 'function',
  (): void => {
    it('should call the callback function with the heroes parameter', (): void => {
      // Arrange
      const dialogRef = {
        close: jasmine.createSpy(),
      };

      // Act
      closeDialog(
        { id: '86522d3a-ca84-434c-bd65-e099a05038c7' } as Hero,
        dialogRef,
      )();

      // Assert
      expect(dialogRef.close).toHaveBeenCalledTimes(1);
    });
  },
);
