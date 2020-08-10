import { Factory, ModelInstance, Server } from 'miragejs';
import { name, phone, image } from 'faker';
import { Hero } from '../../../app/models/hero.entity';

/**
 * Generate fake data for a Hero
 */
export const factory = Factory.extend({
  firstName: (): string => name.firstName(),
  lastName: (): string => name.lastName(),
  phoneNumber: (): string => phone.phoneNumber(),
  avatarUrl: (): string => image.avatar(),

  afterCreate(hero: ModelInstance<Hero>, server: Server): void {
    hero.update({
      fullName: `${hero.firstName} ${hero.lastName}`,
    });
  },
});
