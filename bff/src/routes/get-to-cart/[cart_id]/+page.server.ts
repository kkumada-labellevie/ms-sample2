import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const response = await fetch(`http://ms2-app:3000/get-to-cart/${params.cart_id}`);
  const cart = await response.json();
  return { cart };
};
