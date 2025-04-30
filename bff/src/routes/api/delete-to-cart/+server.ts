import { json } from '@sveltejs/kit';

export async function DELETE({ request }) {
  const body = await request.json();

  const response = await fetch('http://ms1-app:3000/delete-to-cart', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if(!response.ok) {
    return json({
      success: false,
    });
  }else {
    return json({
      success: true,
    });
  }
}
