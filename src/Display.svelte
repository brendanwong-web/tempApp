<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import temps from './temp-store';
  import {onMount} from 'svelte';
  let dates;
  let temperatures;
  let times;
  let dateFixed;

  let getTime = (d) => {
    let list;
    list = d.split(' ');
    return list[1]
  }  
  let getDate = (d) => {
    let list;
    list = d.split(' ');
    return list[0]
  }  
  onMount(() => {
      const unsubscribe = temps.subscribe(its => {
      dates = Object.keys(its);
      times = dates.map(getTime);
      dateFixed = dates.map(getDate);
      times.unshift('Time: ');
      temperatures = Object.values(its);
      dateFixed.unshift('Date:');
      temperatures.unshift('Temp:');
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
    background: rgba(255, 255, 255, 0.13);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(7px);
    border-radius: 20px;
    border-top: 1px solid rgba(255,255,255,0.2);
    border-left: 1px solid rgba(255,255,255,0.2);
    color: rgba(2, 4, 20, 0.89);
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid grey;
  }

  .item h2{
    font-size: 16px;
  }
  .item h2 {
    flex: 1;
    justify-content: start;
    text-align: left;
  }
  .right {
    justify-content: space-between;
    flex: 1;
    display: flex;
  }
  .right h2 {
    text-align: right;
  }

  button {
    background: white;
    border: none;
    outline: none;
    font-size: 1rem;
    padding-top: 12px;
    color: red;
    font-weight: 700;
  }
</style>
<div class="container">
  {#if dates && temperatures}
  {#each dateFixed as date, i} 
  <div class="item">
    <h2 id="date">{date}</h2>
    <div class="right">
      <h2>{times[i]}</h2>
      <h2>{temperatures[i]}</h2>
    </div>
    {#if i !== 0}
<!--     <button on:click={()=>{dispatch('delete', i)}}>X</button> -->
    {/if}
  </div>
  {/each}
{/if}
</div>

