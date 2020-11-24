<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let visible;

</script>
<style>
    .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
    }

    .modal {
    position: fixed;
    top: 25vh;
    left: 10%;
    width: 80%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
    }

    h1 {
    padding: 1rem;
    margin: 0;
    border-bottom: 1px solid #ccc;
    font-family: 'Roboto Slab', sans-serif;
    }

    .content {
    padding: 1rem;
    }

    footer {
    padding: 1rem;
    }

    @media (min-width: 768px) {
    .modal {
        width: 40rem;
        left: calc(50% - 20rem);
    }
    }

</style>
{#if visible}
<div class="modal-backdrop">
</div>
<div class="modal">
    <div class="content">
        <slot></slot>
        <button on:click={() => {dispatch('close')}}>Close</button>
    </div>

</div>
{/if}