<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<nav class="flex flex-col gap-2 mb-10">
  <h2 class="text-lg">Navigation</h2>
  <ul>
    <li>
      <a href="/" class="text-blue-700 underline hover:no-underline">Home</a>
    </li>
    <li>
      <a href="/add-to-cart" class="text-blue-700 underline hover:no-underline">Add cart</a>
    </li>
    <li>
      <a href="/delete-to-cart" class="text-blue-700 underline hover:no-underline">Delete cart</a>
    </li>
    <li>
      <a href="/get-to-cart" class="text-blue-700 underline hover:no-underline">Get carts</a>
    </li>
    <li>
      <a href="/get-to-cart/1" class="text-blue-700 underline hover:no-underline">Get cart</a>
    </li>
  </ul>
</nav>

{@render children()}
