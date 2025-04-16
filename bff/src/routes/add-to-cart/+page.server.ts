import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    const response = await event.fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userUuid: formData.get('userUuid'),
        cartCode: formData.get('cartCode'),
        quantity: formData.get('quantity'),
        sku: {
          skuCode: formData.get('skuCode'),
          price: formData.get('price'),
        },
      }),
    });

    const data = await response.json();

    return {
      success: true,
    };
  },
};
