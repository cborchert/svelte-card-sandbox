<script>
  export let props = {};
</script>

<style>
  .Textbox {
    border: 1px dashed #333;
    background: white;
    color: #333;
    font-size: 16px;
    padding: 20px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    min-width: 400px;
  }
</style>

<div class="Textbox">
  <span>{@html props.value}</span>
</div>
