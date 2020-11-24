<script>
  import temps from './temp-store';
  import {onMount} from 'svelte';
  let dates;
  let temperatures;

  onMount(() => {
      const unsubscribe = temps.subscribe(its => {
      dates = Object.keys(its);
      temperatures = Object.values(its);
      dates.unshift('Date:');
      temperatures.unshift('Temperature:');
    });
  })

</script>
<style>
  .container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1rem 1rem;
    margin: 0 1rem;
    border: 2px solid rgb(10, 166, 172);
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid grey;
  }

</style>
<div class="container">
  {#if dates && temperatures}
  {#each dates as date, i} 
  <div class="item">
    <h1>{date}</h1>
    <h2>{temperatures[i]}</h2>
  </div>
  {/each}
{/if}
</div>

