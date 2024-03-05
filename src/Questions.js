import cats from "./cats.js";
import {useState ,useRef, useEffect} from "react";


function Card(props) {   
    let initStyle = "cardy-questions";
    let clickedStyle = "cardy-questions-clicked";

    const timesClicked = useRef(0)

    if (timesClicked.current !== 0 || props.id-props.data.id === 0) {
        initStyle = clickedStyle;
    }

    const nestedHandleClick = (e) => {
        timesClicked.current++;
        props.handleClick(e)
    }
    

    return (
        <div>
            <div id={props.id} className= {initStyle}  onClick={e => {return nestedHandleClick(e)}}>
                <h5 className="card-points">{props.points}</h5>
            </div>
        </div>
    );
}

// function QuestionScreen(props) {
//     console.log("Id: " + props.id)
//     console.log("Double Points: " + props.double_points)
//     return (
//         <div className="question-screen">
//             <h5 className="question">{props.question}</h5>
//             {props.id -2 === 0 && <img src="../q2.png" alt="" className="question-img"/>}
//             <ol className="answers">
//                 {props.answers.map((answer) => <li type="a">{answer}</li>)} 
//             </ol>
//             <button className="back-button" onClick={props.handleClick}>Back</button>
//         </div>
//     );
// }

function QuestionScreen(props) {
    const screenStyle = props.double_points ? "double-question-screen" : "question-screen";

    return (
        <div className={screenStyle}>
            <h5 className="question">{props.question}</h5>
            {props.id === 7 && <img src="../Q7.png" alt="" className="question-img"/>}
            {props.id === 8 && <img src="../Q8.png" alt="" className="question-img"/>}
            {props.id === 12 && <img src="../Q12.png" alt="" className="question-img"/>}
            {props.id === 19 && <img src="../Q19.png" alt="" className="question-img"/>}
            <ol className="answers">
                {props.answers.map((answer, index) => (
                    <li key={index} type="a">
                        {answer}
                    </li>
                ))}
            </ol>
            <button className="back-button" onClick={props.handleClick}>
                Back
            </button>
        </div>
    );
}


export default function Questions() {
    const [data, setData] = useState({question: null, answers: null ,id: null, double_points: false})
    const allData = []
    cats.map((cat) => cat.map((card) => allData.push(card)));

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * allData.length);
        console.log(randomIndex);
        // Directly update double_points status within allData
        allData[randomIndex-1].double_points = true;
        // No need to create a new array or set state here if we're not displaying questions immediately
    }, []);

    function handleQuesClick(event) {
        const id = parseInt(event.currentTarget.id, 10); // Ensure `id` is a number
        const selectedCard = allData.find(card => card.id === id); // Find the clicked card by id
        if (selectedCard) {
            // Now `selectedCard.double_points` will accurately reflect the double points status
            setData({ 
                question: selectedCard.question, 
                answers: selectedCard.answers, 
                id: id, 
                double_points: selectedCard.double_points 
            });
        }
    }
    
    function handleBackClick() {
        setData({question: null, answers: null ,id: null})
    }

    const catMap = cats.map((cat) => {
        const cardMap = cat.map((card) => <Card points={card.points} id={card.id} handleClick={handleQuesClick} data={data}/>);
        return (
            <div className="ques">
                {cardMap}
            </div>
        );
    })


    return (
    <div className="questions">
        <div className="ques-thingy">
            {catMap}
        </div>
        {data.id && <QuestionScreen question={data.question} answers={data.answers} handleClick={handleBackClick} id={data.id} double_points = {data.double_points}/>}
    </div>
    )
}