<script lang="ts">
  import type { PageProps } from './$types';

  let { form }: PageProps = $props();
</script>

<h1 class="text-xl mb-4">Delete Cart Page</h1>

<form class="flex flex-col gap-4 pr-8" method="POST" novalidate>
  {#if form?.success != null}
    {#if form?.success}
      <p class="text-red-950 font-bold mb-4">Cart has been deleted!</p>
    {:else}
      <p class="text-red-950 font-bold mb-4">削除対象のカートが存在しません!</p>
    {/if}
  {/if}

  <label class="flex items-center gap-2">
    <span class="w-[120px]">cartId</span>
    <input class="flex-1" type="text" name="cartId" value="1">
  </label>
  <button class="w-[200px] bg-blue-500 text-white transition-all cursor-pointer p-2 m-auto hover:bg-blue-700" type="submit">DELETE</button>
</form>

