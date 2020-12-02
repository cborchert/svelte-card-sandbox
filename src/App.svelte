<script>
  import { v4 as uuid } from "uuid";

  import Draggable from "./components/Draggable.svelte";
  import Card from "./components/Card.svelte";
  import Textbox from "./components/Textbox.svelte";
  import Stack from "./components/Stack.svelte";
  import DragArea from "./components/DragArea.svelte";

  import getCards from "./helpers/getCards.js";

  let items = [
    {
      id: uuid(),
      pos: { x: 200, y: 200 },
      component: Stack,
      stackable: true,
      items: getCards()
        .map((card) => ({
          id: uuid(),
          component: Card,
          stackable: true,
          props: { ...card, flipped: true },
        }))
        .sort(() => 0.5 - Math.random()),
    },
    {
      id: uuid(),
      component: Textbox,
      stackable: true,
      pos: { x: 0, y: 0 },
      props: {
        value:
          "drag to move an item<br/>opt/alt + drag to add an item to a stack<br/>opt/alt + meta/cmd + drag to remove the top item from a stack<br /><br />click a single card to flip it<br/><br />Sorry, no mobile.",
      },
    },
  ];

  const createSetPos = (id) => (pos) => {
    const newItem = items.find((item) => item.id === id);
    if (!newItem) return;

    items = [
      ...items.filter((item) => item.id !== id),
      { ...newItem, pos: { ...pos } },
    ];
  };

  const createPropsSetter = (id) => (props) => {
    items = [
      ...items.map((item) =>
        item.id === id ? { ...item, props: { ...props } } : item
      ),
    ];
  };

  const createHandleStack = (id) => (targetId) => {
    if (!id || !targetId || id === targetId) return;

    // trying to merge items id and targetId
    // where targetId is incoming and id is base
    const incomingItem = items.find((item) => item.id === targetId);
    const baseItem = items.find((item) => item.id === id);

    if (!incomingItem || !baseItem) return;
    if (!incomingItem.stackable || !baseItem.stackable) return;

    // create a stack from the base item if the base item isn't already a stack
    let newStack =
      baseItem.component === Stack
        ? { ...baseItem, id: uuid() }
        : {
            id: uuid(),
            pos: { ...baseItem.pos },
            component: Stack,
            stackable: true,
            items: [baseItem],
          };

    if (incomingItem.component === Stack) {
      // if the incoming item is a stack, merge
      newStack.items = [...newStack.items, ...incomingItem.items];
    } else {
      // add the incoming item to the stack
      newStack.items = [...newStack.items, incomingItem];
    }

    // add the new stack to the items, removing the previous items
    items = [
      ...items.filter((item) => item.id !== id && item.id !== targetId),
      newStack,
    ];
  };

  const createHandlePop = (id) => (pos) => {
    const baseItem = items.find((item) => item.id === id);
    if (
      baseItem.component === Stack &&
      baseItem.items &&
      baseItem.items.length
    ) {
      const newSubItems = [...baseItem.items];
      const newItem = { ...newSubItems.pop(), id: uuid(), pos: { ...pos } };
      const newBaseItem =
        newSubItems.length > 1
          ? { ...baseItem, items: newSubItems, id: uuid() }
          : { ...newSubItems[0], id: uuid(), pos: { ...baseItem.pos } };

      items = [...items.filter((item) => item.id !== id), newBaseItem, newItem];
    } else {
      createSetPos(id)(pos);
    }
  };
</script>

<style>
  .stackedItem:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<DragArea>
  {#each items as { id, pos, component, props, items: subItems }}
    <Draggable
      {id}
      {pos}
      setPos={createSetPos(id)}
      handleStack={createHandleStack(id)}
      handlePop={createHandlePop(id)}
      {subItems}>
      <svelte:component
        this={component}
        setProps={createPropsSetter(id)}
        {props}
        {subItems}>
        {#if component === Stack && subItems}
          {#each subItems as subItem}
            <div class="stackedItem">
              <svelte:component
                this={subItem.component}
                setProps={createPropsSetter(subItem.id)}
                props={subItem.props} />
            </div>
          {/each}
        {/if}
      </svelte:component>
    </Draggable>
  {/each}
</DragArea>
