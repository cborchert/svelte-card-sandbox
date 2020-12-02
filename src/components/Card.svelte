<script>
  export let props = {};
  export let setProps = () => {};
  const flip = () => setProps({ ...props, flipped: !props.flipped });
  const symbols = {
    hearts: "♥️",
    diamonds: "♦️",
    clubs: "♣️",
    spades: "♠️",
  };
</script>

<style>
  .Card {
    background: white;
    width: 100px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
    color: black;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;
    font-weight: bold;
  }
  .Card > span {
    text-decoration: underline;
  }
  .hearts,
  .diamonds {
    color: red;
  }
  .Card:after,
  .Card:before {
    display: block;
    position: absolute;
    font-size: 16px;
    content: attr(data-display-value);
  }

  .Card:before {
    top: 5px;
    left: 5px;
  }

  .Card:after {
    bottom: 5px;
    right: 5px;
    transform: rotate(180deg);
  }

  .flipped:before,
  .flipped:after,
  .flipped > span {
    display: none;
  }

  .flipped {
    background-image: linear-gradient(
        45deg,
        rgba(255, 0, 0, 0.1) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 0, 0, 0.1) 50%,
        rgba(255, 0, 0, 0.1) 75%,
        transparent 75%,
        transparent
      ),
      linear-gradient(
        -45deg,
        rgba(255, 0, 0, 0.1) 15%,
        transparent 15%,
        transparent 50%,
        rgba(255, 0, 0, 0.1) 50%,
        rgba(255, 0, 0, 0.1) 65%,
        transparent 65%,
        transparent
      );
    background-size: 20px 20px;
  }
</style>

<div
  class="Card {props.suit}"
  class:flipped={props.flipped}
  on:click={flip}
  data-display-value={`${symbols[props.suit]} ${props.value}`}>
  <span>{props.value}</span>
</div>
