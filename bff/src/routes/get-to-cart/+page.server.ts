import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const response = await event.fetch('/api/get-to-cart');
  const carts = await response.json();

  return { carts };
};
