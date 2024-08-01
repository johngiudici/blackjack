import { CardData } from "../../types";

import "./cardRow.css";

type CardRowProps = {
  data: CardData[]
}

const CardRow = (props: CardRowProps) => {
  return (
    <div className="cardRow">
      {
        props.data.map(d => {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={d.image} src={d.image} width={"110"} height={"155"} alt="card" />
          )
        })
      }
    </div>
  );
}

export default CardRow;
