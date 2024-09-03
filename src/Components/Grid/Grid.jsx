 import { useState } from "react";
import Card from "../Card/Card"
import isWinner from "../../helpers/checkwinner";
import './Grid.css';

function Grid({numberOfCards}){
    const[board,setBoard]= useState(Array(numberOfCards).fill(""));
    const[turn,setTurn]=useState(true); //Agr turn ki value true h to O if false -> X ,
    //i.e-> True =>O, false =>X
    const[winner,setWinner] = useState(null);
  
    function play(index){
        if(turn == true){
            board[index]="O";
        }else{
            board[index]="X";
        }
        const win = isWinner(board, turn ? "O" :"X");
        if(win){
            setWinner(win);
        }
        setBoard([...board]); //Ek new array bnani pdegi or purane board ke sare element ko unpack krna pdega
        setTurn(!turn);

    }
    function reset(){
        setTurn(true)
        setWinner(null)
        setBoard(Array(numberOfCards).fill(""))
    }

    return(
        <div className="grid-wrapper">
            {
                winner &&( // Shortcircuiting ->Manlo Winner ki value null h, agr phle value hi false h dusro ko evaluate hi nhi krega, Agr phli value truthy h sudri value ko return krdega
                    <>
                        <h1 className="turn-highlight">Winner is {winner}</h1>
                        <button className="reset" onClick={reset}  >Reset Game</button>
                    </>
                )
            }
            <h1 className="turn-highlight">
            Current turn :{(true) ? 'O' : 'X'}
            </h1>
            <div className="grid">
            {board.map((el ,idx) => <Card gameEnd={winner ? true : false}   key={idx} onPlay={play} player={el} index={idx}   />)}

        </div>
        </div>

        
    );
}

export default Grid;
/**
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */