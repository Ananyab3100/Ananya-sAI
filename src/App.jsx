import { useState } from 'react'

import './App.css';
import axios from 'axios';
import ParticlesComponent from './components/Particle';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const[loading, setLoading] = useState(false);
  
  const generateAnswer = async() =>{
    setLoading(true); 
   try{
   const response = await axios({
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD6v5G4_c4JbgFXQcj8gd7QbKVGCOuJuJo",
    method : "post",
    data: {
      "contents": [{
        "parts":[{"text": question}]
        }]
    }
   });
   
   setAnswer(response.data.candidates[0].content.parts[0].text)
  }
  catch(error){
    console.error("Error generating answer:", error);
  }
  finally {
    setLoading(false);  // Set loading to false after receiving the answer
  }
  
  
  }

  return (
    <>
    <ParticlesComponent/>
      
      <div className="relative flex flex-col items-center justify-center">
      <div className="flex flex-col items-center max-w-2xl">
      <p className="font-fira-code my-5 text-white text-5xl">Ananya's AI</p>
      
      <textarea className="font-fira-code  bg-neutral-300 text-neutral-950 " value={question} onChange={(e) => setQuestion(e.target.value)} cols="30" rows="10"></textarea>

      <button className="font-fira-code bg-transparent border-white text-white font-bold py-2 px-4 rounded my-4" onClick={generateAnswer}>Generate answer</button>
      </div>
      <div className="text-white font-fira-code max-w-5xl mt-4 text-center">
          {loading ? "Loading..." : (<div className="text-yellow-100 font-fira-code max-w-5xl">{answer}</div>)}  {/* Conditionally show "Loading..." */}
        </div>
      
      </div>
     
    </>
  )
}

export default App
