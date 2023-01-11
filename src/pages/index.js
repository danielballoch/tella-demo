import React, {useEffect, useState} from "react"
import styled from '@emotion/styled';
import { useForm } from "react-hook-form"
import InputComponent from "../components/input-component";

const Wrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
max-width: 900px;
width: 100%;
margin: auto;
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
    const [serverState, setServerState] = useState({
        formSent: false,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

    async function onSubmit(data){
        fetch(`/api/test`, {
          method: `POST`,
          body: JSON.stringify({
            total_income: data.TotalIncome,
            total_liabilities: data.TotalLiabilities,
            deposit: data.Deposit,
        }),
          headers: {
            "content-type": `application/json`,
          },
        })
          .then(res => res.json())
          .then(body => {
            console.log(`response from API:`, body);
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
                    <label htmlFor="total_income">
                            <p>Deposit:</p>
                            <input 
                                type="text" 
                                name="total_income" 
                                required  
                                {...register("TotalIncome", { required: true, maxLength: 100 })} 
                            />
                    </label>
                    <label htmlFor="total_liabilities">
                        <p>Total Liabilities:</p>
                        <input 
                            type="text" 
                            name="total_liabilities" 
                            required
                            {...register("TotalLiabilities", { required: true, maxLength: 100})}
                        />
                    </label>
                    <label htmlFor="deposit">
                            <p>Deposit:</p>
                            <input 
                                type="text" 
                                name="deposit" 
                                required  
                                {...register("Deposit", { required: true, maxLength: 100 })} 
                            />
                    </label>
                    <button
                        type="submit"
                        data-sitekey="site_key"
                        data-callback='onSubmit'
                        data-action='submit'
                    ><b>Send</b></button>
                    
                </form>
            <form>
                <InputComponent 
                Q1="How many of you are buying the property?" 
                Q1O1="Just me" Q1O2="I'm buying with someone else" 
                Q2="What's your base salary/wages?(before tax)?"
                Q3="What's the second applicants base salary/wages?"/>
            </form> 
        </Wrapper>
    )
}
