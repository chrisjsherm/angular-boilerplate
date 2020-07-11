import { Factory } from 'miragejs';
import { name, phone, random } from 'faker';

/**
 * Generate fake data for a Hero
 */
export const factory = Factory.extend({
  firstName: (): string => name.firstName(),
  lastName: (): string => name.lastName(),
  phoneNumber: (): string => phone.phoneNumber(),
  avatarUrl: (): string => random.image(),
});
