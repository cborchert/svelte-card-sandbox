<script>
  export let id;
  export let pos = { x: 0, y: 0 };
  export let setPos = () => {};
  export let handleStack = () => {};
  export let handlePop = () => {};
  export let subItems = [];

  let dragOffset = { x: 0, y: 0 };
  let isDragging = false;
  let isStacking = false;
  let isPopping = false;

  const handleDragEnd = (e) => {
    const { x, y } = e;
    const { x: dx, y: dy } = dragOffset;
    const newPos = { x: x + dx, y: y + dy };
    if (isPopping && subItems && subItems.length) {
      handlePop(newPos);
    } else if (!isStacking) {
      setPos(newPos);
    }
    isPopping = false;
    isDragging = false;
    isStacking = false;
  };

  const handleDragStart = (e) => {
    isDragging = true;
    if (e.metaKey && e.altKey && subItems && subItems.length) {
      // if the meta/cmd + alt/option key is pressed, we pop an item if possible
      isPopping = true;
    } else if (e.altKey) {
      isStacking = true;
      // if the alt/option key is pressed, we merge the stack if possible
      e.dataTransfer.setData("text/plain", id);
    }
    const { x: x0, y: y0 } = pos;
    const { x: x1, y: y1 } = e;
    dragOffset = { x: x0 - x1, y: y0 - y1 };
  };

  const handleDrop = (e) => {
    // send up the id of the draggable stacking on to us
    handleStack(e.dataTransfer.getData("text/plain"));
  };
</script>

<style>
  .Draggable {
    position: absolute;
    border: 2px solid transparent;
    cursor: move;
  }
  .isDragging {
    opacity: 0.1;
  }
  .isStack:not(.isPopping):after {
    content: attr(data-count);
    position: absolute;
    top: -5px;
    left: -5px;
    background: #eec;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
</style>

<div
  class="Draggable"
  class:isDragging
  class:isStack={subItems && subItems.length}
  class:isPopping
  style="top: {pos.y}px; left: {pos.x}px;"
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  on:drop|preventDefault={handleDrop}
  draggable="true"
  data-draggable-id={id}
  data-count={subItems && subItems.length}>
  <slot />
</div>
