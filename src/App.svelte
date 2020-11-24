<script>
	import { auth, googleProvider } from './firebase';
	import { authState } from 'rxfire/auth';
	import Profile from './Profile.svelte';
	import Submit from "./Submit.svelte";
	import Display from "./Display.svelte";

	let user;

	const unsubscribe = authState(auth).subscribe(u => user = u);

	function login() {
			auth.signInWithPopup(googleProvider);
	}
</script>
<style>
	section {
		text-align: center;
		padding: 1rem 1rem;
		margin: 0 auto;
	}

	#customBtn {
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
</style>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
	<script src="https://apis.google.com/js/api:client.js"></script>
</svelte:head>
<section>
	{#if user}
			<Profile {...user} />
<!-- 			<button on:click={ () => auth.signOut() }>Logout</button> -->
			<hr>
			<Submit uid={user.uid} />
			<Display />
	{:else}
		<div id="customBtn" on:click={login}>
		  <div class="icon">
			  <img src="google.png" alt='logo'>
		  </div>
		  <div class="buttonText">Sign in with Google</div>
		</div>
	{/if}
	</section>
