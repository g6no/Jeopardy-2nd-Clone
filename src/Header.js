import './styles.css';

function Card(props) {
    return (
        <div className="cardy">
            <h5 className="card-title">{props.title}</h5>
        </div>
    );
}

let cards = [
    {title: "Engineering"},
    {title: "Geography"},
    {title: "لغة عربية"},
    {title: "أنت وحظك"},
    {title: "Society Questions"}
]

const cardMap = cards.map((card) => <Card title={card.title} />);
console.log(cardMap);
export default function Header() {
    return (
        <div className="header">
            {cardMap}
        </div>
    )
}