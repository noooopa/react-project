import './App.css'
import Main from "./components/Main.jsx";
import {EmployeeProvider} from "./contexts/EmployeeContext.jsx";

function App() {
  return (
    <>
        <EmployeeProvider>
            <Main/>
        </EmployeeProvider>
    </>
  )
}

export default App
