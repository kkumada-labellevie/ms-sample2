import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const response = await fetch('http://ms2-app:3000/get-to-cart');
  const carts = await response.json();
  return { carts };
};
