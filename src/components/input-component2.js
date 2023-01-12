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
function Star({Q2, additionalComponents, handleChange, setAdditionalComponents, i}){
    return(
        <div key={"component"+i}>
            <label for="Q2">{Q2} #{i+2}</label><br/>
            <input onChange={event => {handleChange([i,event.target.value]);console.log(event.target.value)}} type="text" id="Q2" name="Q2"/><br/>
            <button type="button" onClick={()=> {setAdditionalComponents(additionalComponents-1);Array(additionalComponents).pop();}}>close</button>
        </div>
    )
}

export default function InputComponent({Q1, Q1O1, Q1O2, Q2,handleDataChange}){
    const [activeInput, setActiveInput] = useState(false);
    const [total, setTotal] = useState(0);
    const [value1, setValue1] = useState(0);
    const [additionalComponents, setAdditionalComponents] = useState(0);
    const [additionalValue, setAdditionalValue] = useState([]);

    //last thing to do is just add this value to the total, then that will automatically update everything I think
    const handleChange = input => {
        let items = additionalValue;
        items[input[0]] = input[1];
        setAdditionalValue(items)
    }

    useEffect(()=>{
        //just need to loop through additional values, add together and add to total 
    })

    useEffect(() => {
        setTotal(value1);
        console.log("Total: ", total)
    },[value1])


    useEffect(() => {
        handleDataChange(total);
    },[total])


    return (
        <InputDiv>
        <p>{Q1}</p>
            <ButtonDiv>
                <button type="button" onClick={() => setActiveInput(true)} className={activeInput? "active" : ""}>{Q1O1}</button>
                <button type="button" onClick={() => setActiveInput(false)} className={activeInput? "" : "active"}>{Q1O2}</button>
            </ButtonDiv>
            <br/>
            <div className={activeInput? "": "hide"}>
                <label for="Q2">{Q2} #1</label><br/>
                <input onChange={event => setValue1(parseInt(event.target.value))} type="text" id="Q2" name="Q2"/><br/>
            </div>
            {Array(additionalComponents).fill(additionalComponents).map((comp, i) => <Star Q2={Q2} i={i} handleChange={handleChange} additionalComponents={additionalComponents} setAdditionalComponents={setAdditionalComponents}/>)}
            <button onClick={() => setAdditionalComponents(additionalComponents+1)} className={activeInput? "": "hide"} type="button">Add {Q2}</button>
        </InputDiv>
    )}