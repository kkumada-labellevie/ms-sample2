import { json } from '@sveltejs/kit';

export async function GET(request) {
  const response = await fetch(`http://ms2-app:3000/get-to-cart/${request.params.cart_id}`);
  const data = await response.json();

  return json(data);
}
