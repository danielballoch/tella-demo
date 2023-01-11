import React,{ useState } from "react"
import styled from '@emotion/styled';

const InputDiv = styled.div`
.hide {
    display: none;
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
}
.active {
    background-color: #fe3745;
    color: white;
}
`

export default function InputComponent({Q1, Q1O1, Q1O2, Q2, Q3}){
    const [activeInput, setActiveInput] = useState(true);
    return (
        <InputDiv>
        <p>{Q1}</p>
            <ButtonDiv>
                <button type="button" onClick={() => setActiveInput(true)} className={activeInput? "active" : ""}>{Q1O1}</button>
                <button type="button" onClick={() => setActiveInput(false)} className={activeInput? "" : "active"}>{Q1O2}</button>
            </ButtonDiv>
            <div>
                <label for="Q1">{Q2}</label><br/>
                <input type="text" id="Q1" name="Q1"/><br/>
            </div>
            <div className={activeInput? "": "hide"}>
                <label for="Q2">{Q3}</label><br/>
                <input type="text" id="Q2" name="Q2"/><br/>
            </div>
        </InputDiv>
    )}