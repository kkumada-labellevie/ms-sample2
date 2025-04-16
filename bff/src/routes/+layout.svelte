<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav class="flex flex-col gap-2 mb-10">
  <h2 class="text-lg">Nonavigation</h2>
  <a href="/" class="text-blue-700 underline hover:no-underline">Home</a>
  <a href="/add-to-cart" class="text-blue-700 underline hover:no-underline">Add cart</a>
  <a href="/get-to-cart" class="text-blue-700 underline hover:no-underline">Get carts</a>
  <a href="/get-to-cart/1" class="text-blue-700 underline hover:no-underline">Get cart ( /get-to-cart/[id] )</a>
</nav>

{@render children()}
