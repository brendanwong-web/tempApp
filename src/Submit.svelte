<script>
  import temp from "./temp-store";
  import {onMount} from "svelte";
  import Modal from './Modal.svelte';
  let inputtedDate = undefined;
  let visible = false;
  onMount(() => {
    console.log('mounting');
    fetch(`https://temp-70e0d.firebaseio.com/${uid}/temps.json`)
    .then(res => {
      if(!res.ok) {
        throw new Error('error');
      }
      return res.json()
    }).then(data => {
        if (data) {
          temp.setTemps(data);
          console.log('set data');
        } else {
          console.log('new user');
        }
    }).catch(err => {
      console.log(err);
      })
  })
  export let uid;
  var today = new Date;
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+String(today.getMinutes()).padStart(2, "0");;
  let randomTemps = [
    "355", "356", "357", "358", "359", "360",
    "361", "362", "363", "364", "365", "366",
    "367", "368", "369", "370", "371", "372"
    ]
  let tempToday;
  let submitTemp = () => {
    fetch(`https://temp-70e0d.firebaseio.com/${uid}/temps.json`)
    .then(res => {
      if(!res.ok) {
        throw new Error('error');
      }
      return res.json()
    }).then(data => {
      if (data) {
        let formatted = {};
        var today = new Date;
        var key = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes();
        if (inputtedDate) {
          formatted[inputtedDate] = tempToday.slice(0,2) + '.' + tempToday.slice(2);
        } else {
          formatted[key] = tempToday.slice(0,2) + '.' + tempToday.slice(2);
        }
        let newFormatted = Object.assign(data, formatted);
        fetch(`https://temp-70e0d.firebaseio.com/${uid}/temps.json`, { 
          method: "PUT",
          body: JSON.stringify(newFormatted),
          headers: {'content-type': 'application/JSON'}
        }).then(res => {
        if(!res.ok) {
          throw new Error('error in res');
        }
        temp.setTemps(newFormatted);
        console.log('finally submitted');
        visible = true;
      }).catch(err => {
        console.log(err);
      }) 
      }
      else {
        var today = new Date;
        var key = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes();
        let formatted = {};
        if (inputtedDate) {
          formatted[inputtedDate] = tempToday.slice(0,2) + '.' + tempToday.slice(2);
        } else {
          formatted[key] = tempToday.slice(0,2) + '.' + tempToday.slice(2);
        }
        fetch(`https://temp-70e0d.firebaseio.com/${uid}/temps.json`, { 
          method: "PUT",
          body: JSON.stringify(formatted),
          headers: {'content-type': 'application/JSON'}
        }).then(res => {
        if(!res.ok) {
          throw new Error('error in res');
        }
        temp.setTemps(formatted);
        console.log('finally submitted');
        visible = true;
      }).catch(err => {
        console.log(err);
      }) 
      }
    }).catch(err => {
      console.log(err);
      })
   
  }
 
</script>
<style>
  .container {
    padding: 0rem 1rem 0rem;
    text-align: center;
  }

  input {
    font-size: 1.2rem;
    border: 2px solid #278386;
    width: 100%;
    margin-top: 1rem;
  }

  h2 {
    font-size: 1rem;
    text-align: center;
    color: rgba(61, 61, 61, 0.76);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  h2 span {
    font-weight: 700;
    display: block;
    color: rgb(0, 0, 0);
    font-size: 1.3rem;
    margin: 5px auto;
  }


  input {
    border-radius: 20px;
    margin: 0.5rem 0;
    padding-left: 1rem;
    font-size: 0.8rem;
  }

  .submitter {
    height: 1px;
    display: none;
    font-size: 1.5rem;
    justify-content: center;
    width: 90%;
    align-items: stretch;
  }

  select {
    width: 40%;
    margin-right: 1rem;
    font-size: 1rem;
    text-align: center;
    border-radius: 30px;
    background-color: rgba(141, 170, 204, 0.349);
    padding: 0.5rem 0 0.5rem 1.5rem;
    color: rgb(0, 0, 0);
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  #submit {
    color: rgb(0, 0, 0);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-weight: 600;
    flex: 3;
    font-size: 1rem;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .displayer {
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.2);
    border-left: 1px solid rgba(255,255,255,0.2);
    width: 100%;
}

</style>
<Modal {visible} on:close={() => {visible = false}}>
  <h1>Submitted temperature!</h1>
</Modal>
<div class="container">
  {#if tempToday}
  <div class="displayer">
    <h2>Temperature<span>{tempToday.slice(0,2) + '.' + tempToday.slice(2)} °C</span>Date<span>{inputtedDate ? inputtedDate : date}</span></h2>
    <select bind:value={tempToday} name="temp" id="temp">
      {#each randomTemps as temp}
        <option value="{temp}">{temp.slice(0,2) + '.' + temp.slice(2)}</option>
      {/each}
    </select>
    <button id="submit" type="submit" on:click={submitTemp}>Submit</button>
  </div>
  {/if}
  <div class="submitter">
    <select bind:value={tempToday} name="temp" id="temp">
      {#each randomTemps as temp}
        <option value="{temp}">{temp.slice(0,2) + '.' + temp.slice(2)}</option>
      {/each}
    </select>
  </div>
  <div class="displayer">
    <input placeholder="Manual input" type='text' name="manual" bind:value={inputtedDate}>
    <label for="manual">Format: YYYY-MM-DD HH:MM</label>
  </div>
</div>