<script>
  export let displayName;
  export let photoURL;
  export let uid;

  let name = displayName.split(' ')[0];
  let surname = displayName.split(' ')[1];
</script>
<style>
  .container {
    width: 100%;
    height: fit-content;
    padding: 1rem 2rem;
  }

  p {
    display: block;
    font-weight: 600;
    color: #424242;
    margin: 0.2rem 0;
  }
  

  h3 {
    text-transform: capitalize;
    color: #031316;
    font-size: 1.5rem;
    display: inline;
    font-weight: 700;
    margin: 0;
  }

</style>


<div class="container">
  <p>Welcome,</p>
  <h3>{ name } </h3>
  <h3>{ surname } </h3>
</div>
