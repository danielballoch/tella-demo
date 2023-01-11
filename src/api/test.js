import fetch from "node-fetch"


export default async (req, res) => {
    console.log(req.body);
    let TotalIncome;
    let TotalLiabilities;
    let Deposit;
    if (req.body){
        TotalIncome = parseInt(req.body.total_income);
        TotalLiabilities = parseInt(req.body.total_liabilities);
        Deposit = parseInt(req.body.deposit);
    }
    
    const url = `https://test-api-self.vercel.app/calculate`;  
    let api_body = JSON.stringify({
        total_income: TotalIncome,
        total_liabilities: TotalLiabilities,
        deposit: Deposit,
    })
    let api_body2 = JSON.stringify({
        total_income: 150000,
        total_liabilities: 20000,
        deposit: 10000,
    })

    const options = {
    method: 'POST', 
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        }, 
        body: api_body
    }
    try{
        const contacts = await fetch(url, options)
        const response = await contacts.json()
        return res.status(200).json(response)
    } catch(err) {
        const error = JSON.stringify(err)
        console.log(err)
        return res.status(500).json(error)
  }
}