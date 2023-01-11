import React,{ useState, useEffect } from "react"
import styled from '@emotion/styled';

const InputDiv = styled.div`
width: 100%;
.hide {
    display: none;
}
div,p {
    margin: 5px;
}
input {
    border-style:solid;
    width: 95%;
    padding: 8px;
    border-radius: 4px;
}
`
const ButtonDiv = styled.div`
display: flex;
width: 500px;
button {
    width: 50%;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
    color: black;
    border: none;
    :hover {
        cursor: pointer;
    }
}
.active {
    background-color: #f97172;
    color: white;
}
`

export default function InputComponent({Q1, Q1O1, Q1O2, Q2, Q3, handleIncomeChange}){
    const [activeInput, setActiveInput] = useState(true);
    const [total, setTotal] = useState(0);
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    useEffect(() => {
        setTotal(value1 + value2);
        console.log(total)
    },[value1, value2])

    useEffect(() => {
        handleIncomeChange(total)
        console.log("Total: ",total)
    },[total])

    return (
        <InputDiv>
        <p>{Q1}</p>
            <ButtonDiv>
                <button type="button" onClick={() => setActiveInput(true)} className={activeInput? "active" : ""}>{Q1O1}</button>
                <button type="button" onClick={() => {setActiveInput(false); setValue2(0)}} className={activeInput? "" : "active"}>{Q1O2}</button>
            </ButtonDiv>
            <br/>
            <div>
                <label htmlFor="Q1">{Q2}</label><br/>
                <input onChange={event => setValue1(parseInt(event.target.value))} type="text" id="Q1" name="Q1"/><br/>
            </div>
            <br/>
            <div className={activeInput? "hide": ""}>
                <label htmlFor="Q2">{Q3}</label><br/>
                <input onChange={event => setValue2(parseInt(event.target.value))} type="text" id="Q2" name="Q2"/><br/>
            </div>
        </InputDiv>
    )}