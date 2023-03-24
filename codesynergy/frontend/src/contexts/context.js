import { createContext, useState } from "react";


export const OpenSource = createContext({});


function Context({ children }) {
    const [data, setData] = useState();
  
    return (
      <OpenSource.Provider value={{ data, setData }}>
        {children}
      </OpenSource.Provider>
    );
  }


export default Context;