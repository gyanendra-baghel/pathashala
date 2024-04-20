import React ,{ useContext } from "react";
import { assets } from "../../assets/assets"
import { Context } from "../../context/context";
import Markdown from 'react-markdown'

function Chat() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setinput,
    input,
    newchat
  } = useContext(Context);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSent();
  }


  return (
    <>
    <div className="MainBox">
      <div className="Center">
        <div className="nav">
          <img className="logo" src={assets.name_logo_icon} alt="" />
          <div onClick={()=>newchat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
      </div>
        </div>
        <div className="result-container">
          {!showResult ? <>
            <div className="greet">
              <p ><span>Hello, Student.</span></p>
              <p>How can i help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Create a PowerPoint Presentation on Evolution of Ai.</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Create a beautiful message for wishing birthday.</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Write a Programme to Find Largest elements in Array.</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </> :
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <div>{recentPrompt}</div>
              </div>
             
                <div className="result-data">
                  <img src={assets.logo_icon} alt="" />
                  <div> {loading ?
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                    : <Markdown>{resultData}</Markdown>
                  }</div>
                </div>
              </div>
            
          }
        </div>

        <div className="main-bottom">
          <form className="search-box" onSubmit={handleSubmit}>
            <input onChange={(e) => setinput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
            <div className="imagesection">
              <img src={assets.mic_icon} alt="" />
              {input ?
                <button type="submit" className="submit-btn">
                  <img src={assets.send_icon} alt="" />
                </button> : null}
            </div>
          </form>
          <p className="bottom-info">
            Chat-bot is work according to their store data
          </p>
        </div>
      </div>
    </div>
    
    </> 
  ); 

}

export default Chat