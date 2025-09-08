import React, {createContext, useContext, useMemo, useState} from 'react';

const initialState = [
    {name: "John", age: 35, job: "frontend", language: "React", pay: 400},
    {name: "Peter", age: 28, job: "backend", language: "Java", pay: 500},
    {name: "Sue", age: 38, job: "publisher", language: "JavaScript", pay: 400},
    {name: "Susan", age: 40, job: "pm", language: "python", pay: 600},
]

const EmployeeContext = createContext();

export const EmployeeProvider = ({children}) => {

    const [infos, setInfos] = useState(initialState);
    const [clicked, setClicked] = useState('');
    const [ctrl, setCtrl] = useState("");
    // 배열, 객체를 선언할 때 useMemo 훅을 사용
    const controls = useMemo(()=>(["register", "update", "delete", "reset"]),[]);

    const getClickName = (n) => {
        setClicked(n);
    }
    const handleClick = (c) => {
        if(c==="delete"){
            setInfos(prev=>prev.filter(info=>info.name !== clicked));
            setClicked('');
            setCtrl('')
            return;
        }
        if(c==="reset"){
            setInfos(initialState);
            setClicked('');
            setCtrl('');
            return;
        }
        setCtrl(c);
    }
    const handleRegister = (emp) => {
        if(infos.some(info => info.name === emp.name)){
            return alert("이미 존재하는 이름입니다. 다른 이름을 사용하세요!!!")
        }
        setInfos(prev => [...prev, emp]);
        setClicked(emp.name);
    }
    const handleUpdate = (emp) => {
        console.log("update", emp);
        emp && setInfos(prev => (prev.map(info=>(
            info.name === clicked ? emp : info
        ))))
    }
    // 배열, 객체를 선언할 때 useMemo 훅을 사용
    const value = useMemo(()=>({controls, infos, clicked, ctrl, getClickName, handleClick, handleRegister, handleUpdate}),
        [controls, infos, clicked, ctrl, getClickName, handleClick, handleRegister, handleUpdate]);
    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
};

const useEmployeeContext = () => {
    const context = useContext(EmployeeContext);
    return context;
}
export default useEmployeeContext;