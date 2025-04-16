import { json } from '@sveltejs/kit';

export async function GET() {
  const response = await fetch('http://ms2-app:3000/get-to-cart');
  const data = await response.json();

  return json(data);
}
