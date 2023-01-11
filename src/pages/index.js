import React, {useEffect, useState} from "react"
import styled from '@emotion/styled';
import { useForm } from "react-hook-form"
import InputComponent from "../components/input-component";
import InputComponent2 from "../components/input-component2"
import SingleInputComponent from "../components/single-input-component"

const Wrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
max-width: 900px;
width: 100%;
margin: 50px auto;
.sidebar {
    position: fixed;
    margin: 115px 0 0 800px;
    background-color: #e9e9ed;
    border-radius: 5px;
    width: 230px;
    max-height: 210px;
    padding: 20px;
    
    p {
        font-size: 17px;
    }
    .subp {
        font-size: 15px;
    }
}
`
const ButtonDiv = styled.div`
display: flex;
width: 500px;
button {
    width: 50%;
    margin: 5px;
}
`



export default function Index(){
    const [serverState, setServerState] = useState({formSent: false});
    

    const [totalLiabilities, setTotalLiabilities] = useState(0);
    const [deposit, setDeposit] = useState(0);
    const [canBorrow, setCanBorrow] = useState(0);
    const [propertyValue, setPropertyValue] = useState(0);

    const [baseIncome, setBaseIncome] = useState(0);
    const [additionalIncome, setAdditionalIncome] = useState(0);

    const [cardLiabilities, setCardLiabilities] = useState(0);
    const [loanLiabilities, setLoanLiabilities] = useState(0)

    //would need to create lists for state creation


    const handleBaseIncomeChange = input => {
        setBaseIncome(input);
        console.log("Base Income: ",input);
        
    }

    const handleDataChange1 = input => {
        console.log("Data1: ",input)
        setAdditionalIncome(input);
    }

    const handleDataChange2 = input => {
        console.log("Data2: ",input)
        setCardLiabilities(input);
    }

    const handleDataChange3 = input => {
        console.log("Data3: ",input)
        setLoanLiabilities(input);
    }

    useEffect(() => {
        console.log("TotalIncome: ", baseIncome + additionalIncome)
    },[baseIncome, additionalIncome])

    useEffect(() => {
        console.log(cardLiabilities,loanLiabilities)
        console.log("TotalLiabilities: ", cardLiabilities + loanLiabilities)
    },[cardLiabilities, loanLiabilities])


    const handleDepositChange = input => {
            setDeposit(input);
            console.log("Deposit: ",input);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

    async function onSubmit(data){
        fetch(`/api/test`, {
          method: `POST`,
          body: JSON.stringify({
            total_income: baseIncome+additionalIncome,
            total_liabilities: cardLiabilities+loanLiabilities,
            deposit: deposit,
        }),
          headers: {
            "content-type": `application/json`,
          },
        })
          .then(res => res.json())
          .then(body => {
            console.log(`response from API:`, body);
            setCanBorrow(body.result.borrowing);
            setPropertyValue(body.result.property);
          })
          .then(setServerState({formSent: true}))
      }
      console.log({ errors })
      useEffect(() => {
          if (serverState.formSent === true) {
            setTimeout(() => {
                setServerState({
                    formSent: false
                })
            }, 3000)
          }
      })
    return (
        <Wrapper>
                <form
                onSubmit={handleSubmit(onSubmit)}
                id="main-form"
                >
                    <h1>Calculator</h1>
                    <InputComponent 
                    handleIncomeChange={handleBaseIncomeChange}
                    Q1="How many of you are buying the property?" 
                    Q1O1="Just me" Q1O2="I'm buying with someone else" 
                    Q2="What's your base salary/wages?(before tax)?"
                    Q3="What's the second applicants base salary/wages?"
                    />
                    <InputComponent2
                    handleDataChange={handleDataChange1}
                    Q1="Do you have another source of income?" 
                    Q1O1="Yes" Q1O2="No" 
                    Q2="Other income"
                    />
                    <InputComponent2
                    handleDataChange={handleDataChange2}
                    Q1="Do you have any loans?" 
                    Q1O1="Yes" Q1O2="No" 
                    Q2="loan"
                    />
                    <InputComponent2
                    handleDataChange={handleDataChange3}
                    Q1="Do you have any credit cards?" 
                    Q1O1="Yes" Q1O2="No" 
                    Q2="credit card"
                    />
                    <SingleInputComponent
                    updateDeposit={handleDepositChange}
                    Q1="How much deposit do you have?"
                    />
                    <button
                        type="submit"
                        data-sitekey="site_key"
                        data-callback='onSubmit'
                        data-action='submit'
                    ><b>Send</b></button>
                 </form> 
                <div className="sidebar">
                    <p>Here's what you can borrow: <b>${canBorrow}</b></p>
                    <p className="subp">With your deposit of ${deposit} you could afford a property upto ${propertyValue}</p>
                    <p>Total Income <br/>${baseIncome+additionalIncome}</p>
                </div>
            
        </Wrapper>
    )
}
