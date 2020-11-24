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

	button {
    color: white;
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500; 
    background: #278386;
    padding: 2rem 2rem;
		font: inherit;
		font-size: 3rem;
    outline: none;
		border: none;
		border-radius: 7px;
	}
</style>


<section>
	{#if user}
			<Profile {...user} />
<!-- 			<button on:click={ () => auth.signOut() }>Logout</button> -->
			<hr>
			<Submit uid={user.uid} />
			<Display />
	{:else}
		<button on:click={login}>
			Signin with Google
		</button>
	{/if}
	</section>
