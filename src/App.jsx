import "primereact/resources/themes/lara-light-pink/theme.css";
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import Header from "./components/header";
import List from "./components/list";
import { createContext, useState } from "react";

export const FilterContext = createContext();


function App() {
  const [filter, setFilter] = useState("")

  return (
    <>
      <FilterContext.Provider value={{filter, setFilter}}>
        <Header />
        <List />

      </FilterContext.Provider>
    </>
  )
}

export default App
