import "./actionRow.css";

type ActionRowProps = {
  disabled: boolean
  onHit: () => void
  onStand: () => void
}

const ActionRow = (props: ActionRowProps) => {
  return (
    <div className="actionRow">
      <button className="hitButton" disabled={props.disabled} onClick={props.onHit}>
        Hit
      </button>
      <button className="standButton" disabled={props.disabled} onClick={props.onStand}>
        Stand
      </button>
    </div>
  )
}

export default ActionRow;
