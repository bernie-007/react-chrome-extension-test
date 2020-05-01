/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import App from "./App";

import "./content.css";

class Main extends React.Component {
    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                       
                      //  return (
                      //     <div className={'my-extension'}>
                      //          <h1>Hello world - My first Extension</h1>
                      //     </div>
                      //  )
                      return <App document={document} window={window}/> 
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);


app.style.display = "none";

let modal = document.querySelector(".extModal");
modal.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        console.log('icon click');
        toggle();
      }
   }
);

function toggle(){
  
  if(modal.style.display === "none"){
    modal.style.display = "block";
  }else{
    modal.style.display = "none";
  }
  //  if(app.style.display === "none"){
  //    app.style.display = "block";
  //  }else{
  //    app.style.display = "none";
  //  }
}
