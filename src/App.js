import { useState } from 'react';
import './App.css';
import { TextField, Button } from '@mui/material';

function App() {

    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState();
    
    const getImage = async (e) => {
        setIsLoading(true);
        if (!(prompt.length > 10)) {
            alert("please add more description");
            setIsLoading(false);
            return
        }
        try {
            const backend_url = "http://localhost:8000/api/create";

            const response = await fetch(backend_url, {
                method: 'POST',
                body: JSON.stringify({
                    prompt: prompt,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                console.log("Response not okay");
                throw new Error(`Error! status: ${response.status}`);
                
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result, null, 4));
            console.log(result);
            setData(result);
        
        } catch (err) {
            setError(err.message);
            console.log(error);
        } finally {
            console.log("Set isLoading false");
            setIsLoading(false);
        }
        console.log("Done");
    }


    return (
        <div className="App">
            <h1 className='Title'>AI Image Generator Client</h1>
            <div className='Search-box'>
                <TextField className='Search-input' id="outlined-basic" label="Search" variant="outlined" onChange={event => setPrompt(event.target.value)} />
                <div className='Search-button'>
                        <Button className='Button' variant="contained" onClick={getImage} >Generate</Button>
                </div>
            </div>
            {isLoading && <h3 className='Loading'>Loading...</h3>}
            {data && (
                <div>
                    
                    <img className='Image' src={data.url} alt={prompt}/>
                </div>
            )}
        </div>
        
    );
}

export default App;
