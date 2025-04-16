<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let cart = data.cart;
</script>

<h1 class="text-xl">Get Cart Page</h1>

<table>
  <thead>
    <tr>
      <th>id</th>
      <th>userUuid</th>
      <th>cartCode</th>
      <th>cartItems</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{cart.id}</td>
      <td>{cart.userUuid}</td>
      <td>{cart.cartCode}</td>
      <td>
        <ul>
          <li>id: {cart.cartItems[0].id}</li>
          <li>skuCode: {cart.cartItems[0].skuCode}</li>
          <li>price: {cart.cartItems[0].price}</li>
          <li>quantity: {cart.cartItems[0].quantity}</li>
          <li>cartId: {cart.cartItems[0].cartId}</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
