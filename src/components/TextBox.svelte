<script>
  export let props = {};
</script>

<style>
  .TextBox {
    border: 1px dashed #333;
    background: white;
    color: #333;
    font-size: 16px;
    padding: 20px 24px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    min-width: 400px;
  }
</style>

<div class="TextBox">
  <span>{@html props.value}</span>
</div>
