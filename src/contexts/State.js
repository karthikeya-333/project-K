import React, { createContext, useState } from "react";
import kContext from "./Context";



function State(props) {
  
  
 
  return (
    <kContext.Provider value={{}}>
      {props.children}

    </kContext.Provider>
  )
}

export default State;
