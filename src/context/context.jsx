import { createContext, useState } from "react";
import runChat from "../config/chat-bot.js";

export const Context = createContext();

const ContextProvider = (props)=>{


    const[input,setinput] = useState("");
    const[recentPrompt,setrecentPrompt] = useState("");
    const[prevPrompts,setprevPrompts] = useState([]);
    const[showResult,setshowResult] = useState(false);
    const[loading,setloading] = useState(false);
    const[resultData,setresultData] = useState("");

    const delayPara=(index , nextword) => {
        setTimeout(function(){
            setresultData(prev=>prev+nextword);
        },75*index)
    }

    const newchat = ()=>{
        setloading(false)
        setshowResult(false)
    }
    const onSent = async (prompt) =>{
       setresultData("")
       setloading(true)
       setshowResult(true)
       let response;
       if(prompt!==undefined){
        response = await runChat(prompt);
        setrecentPrompt(prompt)
        }else{
            setprevPrompts(prev=>[...prev,input])
            setrecentPrompt(input); 
             response = await runChat(input)
        }

      
       let responsearray = response.split("**");
       let newResponse ="";
       for(let i=0;i<responsearray.length;i++){
        if(i===0||i%2!==1){
            newResponse+=responsearray[i];
        }else{
            newResponse+="<b>"+responsearray[i]+"</b>";
        }
       }
       let newResponse2 = newResponse.split("*").join("</br>");
       let newResponseArray = newResponse2.split(" ");
       for(let i=0;i<newResponseArray.length;i++){
        const nextword = newResponseArray[i];
        delayPara(i,nextword+" ");
       }
       setloading(false)
       setinput("")

    }
    
    const contextValue = {
            prevPrompts,
            setprevPrompts,
            onSent,
            setrecentPrompt,
            recentPrompt,
            showResult,
            loading,
            resultData,
            input,
            setinput,
            newchat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}
export default ContextProvider