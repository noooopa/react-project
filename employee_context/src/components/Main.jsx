import React from 'react';
import Employees from "./Employees.jsx";
import Register from "./Register.jsx";
import Update from "./Update.jsx";
import useEmployeeContext from "../contexts/EmployeeContext.jsx";

const style = {
    width: "60%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap:"10px",
    padding:"20px",
}
const Main = () => {
    const {controls, ctrl, handleClick} = useEmployeeContext();
    return (
        <>
            <div>
                <Employees/>
            </div>
            <div style={style}>
                {controls.map((control, index) => (
                    <button key={index} onClick={()=>handleClick(control)}>{control}</button>
                ))}
            </div>
            <div>
                {ctrl==="register" && (<Register/>)}
                {ctrl==="update" && (
                    <Update/>)
                }
            </div>
        </>
    );
};
export default Main;