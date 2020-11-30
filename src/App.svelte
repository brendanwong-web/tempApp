<script>
	import { auth, googleProvider } from './firebase';
	import { authState } from 'rxfire/auth';
	import temps from './temp-store';
	import Profile from './Profile.svelte';
	import Submit from "./Submit.svelte";
	import Display from "./Display.svelte";
	import Modal from './Modal.svelte';

	let user;
	let dates;
	let temperatures;
	let formatted = {};
	let itemIndex;
	let visible = false;

	const unsubscribe = authState(auth).subscribe(u => user = u);

	function login() {
			auth.signInWithPopup(googleProvider);
	}

	function deleteItem(event) {
		itemIndex = event.detail - 1;
		const unsubscribe = temps.subscribe(its => {
			if (Object.keys(its).length !== 0) {
				dates = Object.keys(its);
				temperatures = Object.values(its);
				dates.splice(itemIndex, 1);
				temperatures.splice(itemIndex, 1);
				console.log(dates);
				if (dates.length !== 0) {
					formatted = Object.assign(...dates.map((k, i) => ({[k]: temperatures[i]})));
					fetch(`https://temp-70e0d.firebaseio.com/${user.uid}/temps.json`, { 
					method: "PUT",
					body: JSON.stringify(formatted),
					headers: {'content-type': 'application/JSON'}
					}).then(res => {
					if(!res.ok) {
					throw new Error('error in res');
					}
					temps.setTemps(formatted);
					console.log('finally submitted');
					visible =true;
					}).catch(err => {
						console.log(err);
					}) 
				} else {
					fetch(`https://temp-70e0d.firebaseio.com/${user.uid}/temps.json`, { 
					method: "PUT",
					body: JSON.stringify([]),
					headers: {'content-type': 'application/JSON'}
					}).then(res => {
					if(!res.ok) {
					throw new Error('error in res');
					}
					temps.setTemps([]);
					console.log('finally submitted');
					visible = true;
					}).catch(err => {
						console.log(err);
					}) 

				}
			} 
		})
			unsubscribe();
	}
</script>
<style>

	.logo {
		width: 100%;
	}
	.logo img {
		width: 300px;
		height: auto;
	}
	.logoSign {
		width: 100%;
		margin: 5rem auto;
	}
	.logoSign img {
		width: 300px;
		height: auto;
	}
	section {
		text-align: center;
		padding: 1rem 1rem;
		margin: 0 auto;
	}

	#customBtn {
		margin: 2rem auto;
      display: flex;
	  align-items: center;
      background: white;
      color: #444;
      width: 245px;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px grey;
      white-space: nowrap;
    }
    #customBtn:hover {
      cursor: pointer;
    }

    div.icon {
      display: inline-block;
      vertical-align: middle;
      width: 60px;
      height: 60px;
	  padding-top: 10px;
	  margin-right: 8px;
	  margin-left: 8px;
    }

	.icon img {
		width: 45px;
		height: 45px;
	}
    div.buttonText {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      /* Use the Roboto font that is loaded in the <head> */
      font-family: 'Roboto', sans-serif;
    }

	.top {
		background-color: #f0c491bb;
		padding: 1rem 1rem;
		border-radius: 7px;
	}
</style>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
	<script src="https://apis.google.com/js/api:client.js"></script>
</svelte:head>
<Modal {visible} on:close={() => {visible = false}}>
	<h1>Deleted Temperature</h1>
</Modal>
<section>
	{#if user}
	<div class="top">
		<div class="logo">
			<img src='drawing.png' alt="logo">
		</div>
		<Profile {...user} />
	</div>
<!-- 			<button on:click={ () => auth.signOut() }>Logout</button> -->
			<Submit uid={user.uid} />
			<Display on:delete={deleteItem}/>
	{:else}
	<div class="logoSign">
		<img src='logo_new.png' alt="logo">
	</div>
		<div id="customBtn" on:click={login}>
		  <div class="icon">
			  <img src="google.png" alt='logo'>
		  </div>
		  <div class="buttonText">Sign in with Google</div>
		</div>
	{/if}
</section>
