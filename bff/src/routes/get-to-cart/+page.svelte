<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const carts = data.carts;
</script>

<h1 class="text-xl mb-4">Get Carts Page</h1>

<table class="border">
  <thead>
    <tr class="border">
      <th class="border p-4">id</th>
      <th class="border p-4">userUuid</th>
      <th class="border p-4">cartCode</th>
      <th class="border p-4">cartItems</th>
    </tr>
  </thead>
  <tbody>
    {#each carts as cart}
      <tr class="border">
        <td class="border p-4">{cart.id}</td>
        <td class="border p-4">{cart.userUuid}</td>
        <td class="border p-4">{cart.cartCode}</td>
        <td class="border p-4">
          {#each cart.cartItems as cartItems}
            <div class="flex flex-col gap-4">
              <ul class="bg-gray-100 p-4">
                <li>id: {cartItems.id}</li>
                <li>skuCode: {cartItems.skuCode}</li>
                <li>price: {cartItems.price}</li>
                <li>quantity: {cartItems.quantity}</li>
                <li>cartId: {cartItems.cartId}</li>
              </ul>
            </div>
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
