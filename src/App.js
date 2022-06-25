import Wrapper from "./components/Wrapper";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import Button from "./components/Button"; 

import {useState} from 'react'

const btnValues = [
  [7,8,9,"C"],
  [4,5,6,"-"],
  [1,2,3,"+"],
  [0,"/","X","="]
]

function App() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0}
  );

  const numHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if(calc.num.toString().length <10){

      setCalc({
        
        ...calc,
        num:
          calc.num === 0 && value === 0 ? 0:
          Number(calc.num + value),
        res: !calc.sign ? 0: calc.res,
      })
    }
  }

  const equalHandler = () => {
    if(calc.num && calc.sign) {
      const math = (a,b,sign) => 
        sign === "+" ? a+b:
        sign === "-" ? a-b:
        sign === "/" ? a/b:
        a*b;
      ;

      setCalc({
        ...calc,
        num: 0,
        sign: "",
        res: calc.num === 0 && calc.sign === "/" ? "Err": math(Number(calc.res), Number(calc.num),calc.sign),
      })
    }
  }

  const operatorHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      num: 0, 
      res: !calc.res && calc.num ? calc.num : calc.res
    })

  }

  const resetHandler = () => {
    setCalc({
      ...calc,
      num: 0,
      sign: "",
      res: 0,
    })
  }

  return (
    <Wrapper>
      <Display value={calc.num ? calc.num: calc.res}></Display>
      <Keypad> 
          {
            btnValues.flat().map((num, i) => {
              return (
                <Button 
                  key={i}
                  number={num}
                  isOperation={isNaN(num)}
                  onClick={
                    num ==="C" ? resetHandler:
                    num ==="/" || num === "+" || num ==="-" || num==="X" ? operatorHandler:
                    num === "=" ? equalHandler:
                    numHandler
                  }
                />
              );
            })
          }
      </Keypad>
    </Wrapper>
  );
}

export default App;
