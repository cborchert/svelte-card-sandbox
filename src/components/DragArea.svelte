<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    border: 1px dotted black;
    background: #063;
  }
</style>

<div on:dragover|preventDefault on:drop|preventDefault>
  <slot />
</div>
