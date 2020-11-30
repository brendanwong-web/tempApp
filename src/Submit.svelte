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
    padding: 0rem 1rem 1rem;
    text-align: center;
  }

  input {
    font-size: 1.2rem;
    border: 2px solid #278386;
    width: 100%;
    margin-top: 1rem;
  }

  h2 {
    color: rgb(56, 56, 56);
    font-size: 1.5rem;
  }
  h2 span {
    display: block;
    color: rgb(0, 0, 0);
    font-size: 1.8rem;
    margin: 0.7rem auto;
    padding: 0.7rem 1rem;
  }

  h2 span:first-child {
    background-color: rgb(252, 178, 178);
    border-radius: 7px;
  }

  h2 span:last-child {
    background-color: rgb(179, 193, 255);
    border-radius: 7px;
  }

  .submitter {
    margin: 2rem auto;
    margin-bottom: 0;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
  }

  .submitter select {
    flex: 1;
    text-align: center;
    border: 2px solid #278386;
    border-right: 0px solid transparent;
  }

  .submitter button {
    flex: 2;
    color: white;
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500; 
    background: #278386;
    padding: 0.5rem 0rem;
    font: inherit;
    outline: none;
    border: none;
  }

</style>
<Modal {visible} on:close={() => {visible = false}}>
  <h1>Submitted temperature!</h1>
</Modal>
<div class="container">
  {#if tempToday}
  <h2>Submitting <span>{tempToday.slice(0,2) + '.' + tempToday.slice(2)} °C</span> for <span>{inputtedDate ? inputtedDate : date}</span></h2>
  {/if}
  <label for="manual">Format: YYYY-MM-DD HH:MM</label>
  <input placeholder="Manual input" type='text' name="manual" bind:value={inputtedDate}>
  <div class="submitter">
    <select bind:value={tempToday} name="temp" id="temp">
      {#each randomTemps as temp}
        <option value="{temp}">{temp.slice(0,2) + '.' + temp.slice(2)}</option>
      {/each}
    </select>
    <button type="submit" on:click={submitTemp}>Submit</button>
  </div>
</div>