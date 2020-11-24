<script>
  export let displayName;
  export let photoURL;
  export let uid;

  let name = displayName.split(' ')[0];
</script>
<style>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  h3 {
    text-transform: capitalize;
    color: #031316;
    font-size: 2.6rem;
    margin-bottom: 0.7rem;
  }

  img {
    width: 15vw;
    height: auto;
    border-radius: 7px;
    margin: 1rem 1rem;
  }

</style>


<div class="container">
  <img src={ photoURL } width="100" alt="user avatar">
  <h3>Hi { name }!</h3>
</div>
