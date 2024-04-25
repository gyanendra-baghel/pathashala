import { createContext, useState } from "react";
import runChat from "../utils/chat-bot.js";

export const ChatBotContext = createContext();

const ChatBotProvider = (props) => {


    const [input, setinput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultData, setresultData] = useState("");

    const delayPara = (index, nextword) => {
        setTimeout(function () {
            setresultData(prev => prev + nextword);
        }, 10 * index)
    }

    const newchat = () => {
        setloading(false)
        setshowResult(false)
    }
    const onSent = async (prompt) => {
        setresultData("")
        setloading(true)
        setshowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setrecentPrompt(prompt)
        } else {
            setprevPrompts(prev => [...prev, input])
            setrecentPrompt(input);
            response = await runChat(input)
        }


        let responsearray = response.split("");
        for (let i = 0; i < responsearray.length; i++) {
            let data = responsearray[i];
            delayPara(i, data);
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
        <ChatBotContext.Provider value={contextValue}>
            {props.children}
        </ChatBotContext.Provider>
    );
}
export default ChatBotProvider