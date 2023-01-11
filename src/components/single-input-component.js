import React,{ useState } from "react"
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

export default function InputComponent({Q1, updateDeposit}){
    return (
        <InputDiv>
            <br/>
            <div>
                <label for="Q1">{Q1}</label><br/>
                <input onChange={event => updateDeposit(event.target.value)} type="text" id="Q1" name="Q1"/><br/>
            </div>
        </InputDiv>
    )}