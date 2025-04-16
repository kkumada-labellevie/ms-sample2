import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const response = await event.fetch(`/api/get-to-cart/${event.params.cart_id}`);
  const cart = await response.json();

  return { cart };
};
