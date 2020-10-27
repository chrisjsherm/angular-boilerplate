import { Hero } from '../models/hero.entity';

/**
 * Close over the dialog reference and call 'close' when executing the callback
 *
 * @param hero Hero to pass to the 'close' callback function
 * @param dialogReference Dialog reference with a 'close' function
 *
 * @returns Callback function 'close' from the dialog reference
 */
export function closeDialog(
  hero: Hero,
  dialogReference: { close: (heroes: Hero) => void },
): () => void {
  return (): void => dialogReference.close(hero);
}
