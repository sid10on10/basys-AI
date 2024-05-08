import { useState, useEffect } from 'react'

export default function Home() {
    const [date, setDate] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([])

    async function getDataFromAPI(){
        try {
            let res = await fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${date}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Control-Allow-Origin': '*'
                }
            })
            if (res.status == 200){
                let response = await res.json()
                setData(response.data)
                setLoaded(true)
            }else{
                console.log(res)
            }
            return 
        } catch (error) {
            console.log(error)
        }
        
    }

    return (<main>
        <div style={{ justifyContent: 'center', marginTop: '200px' }}>
            <div style={{ display: 'flex', gap: '40px' }}>
                <input data-testid="app-input" value={date} onChange={(event)=>{
                    setDate(event.target.value)
                }}/>
                <button data-testid="submit-button" onClick={getDataFromAPI} style={{ backgroundColor: 'Green' }}>Submit</button>
            </div>
            <div>
                {loaded && data.length > 0 && (
                    data.map((item, index)=>{ 
                        return <ul key={index} data-testid="stock-data">
                            <li>Open: {item.open}</li>
                            <li>Close: {item.close}</li>
                            <li>High: {item.high}</li>
                            <li>Low: {item.low}</li>
                        </ul>
                    })
                )}
                {loaded && data.length == 0 && (
                    <div data-testid="no-result">
                        No Results Found
                    </div>
                )}
            </div>
            
        </div>
    </main>)

}