import fetch from "node-fetch"


export default async (req, res) => {
    const url = `https://test-api-self.vercel.app/calculate`;  
    let api_body = JSON.stringify({
        total_income: 150000,
        total_liabilities: 20000,
        deposit: 100000,
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