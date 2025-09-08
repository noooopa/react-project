import React, {useState} from 'react';
import Employees from "./Employees.jsx";
import Register from "./Register.jsx";
import Update from "./Update.jsx";


const initialState = [
    {name: 'John', age: 35, job: 'frontend', language: 'React', pay: 400},
    {name: 'Peter', age: 28, job: 'backend', language: 'Java', pay: 500},
    {name: 'Sue', age: 38, job: 'publisher', language: 'JavaScript', pay: 400},
    {name: 'Susan', age: 40, job: 'pm', language: 'Python', pay: 600}
]

const controls = ["register", "update", "delete", "reset"]
const style ={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
}

const Main = () => {
    const [infos, setInfo] = useState(initialState);
    // date를 state로 변환해서 읽을 수 있게 만들어주는 과정

    const [clicked, setClicked] = useState("");
    const [ctrl, setCtrl] = useState();
    const getClickName = (n) => {
        setClicked(n);
    }
    const handleClick = () => {
        setCtrl(c);
    }
    const handleRegister = (emp) => {
        setInfo(prev => [...prev, emp]);
    }
    const handleUpdate = (emp) => {
        infos.map(info => (
            info.name === clicked ? emp : info
        ))
    }
    return (
        <>
            <div>
                <Employees infos={infos} getClickName={getClickName}/>
            </div>
            <button>
                {controls.map((control, index) => (
                    <button key={index} onClick={()=>handleClick()}>{control}</button>
                    ))}
            </button>
            <div>
                {ctrl==="register" && (<Register handleRegister={handleRegister}/>)}
                {ctrl==="update" && (
                    <Update
                        clicked={clicked}
                        infos={infos}
                        handleUpdate={handleUpdate}
                    />)
                }
            </div>

        </>
    );
};

export default Main;