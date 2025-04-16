<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav class="flex flex-col gap-2 mb-10">
  <h2 class="text-lg">Nonavigation</h2>
  <a href="/" class="text-blue-700 underline hover:no-underline">Home</a>
  <a href="/add-to-cart" class="text-blue-700 underline underline hover:no-underline">Add Cart</a>
  <a href="/get-to-cart" class="text-blue-700 underline underline hover:no-underline">Get Cart</a>
</nav>

{@render children()}
