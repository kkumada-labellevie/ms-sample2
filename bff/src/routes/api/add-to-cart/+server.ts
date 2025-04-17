import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const body = await request.json();

  const response = await fetch('http://ms1-app:3000/add-to-cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return json({
    success: true,
  });
}
