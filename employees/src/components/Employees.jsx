import React, {useState} from 'react';
import InfoTable from './infoTable.jsx';

const initialState = {
    name: '',
    age: '',
    job: '',
    language: '',
    pay: ''
}

const style ={
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
}


const Employees = ({infos}) => {

    const [info, setInfo] = useState(initialState);
    const [clicked, setClicked] = useState("");
    const handleClick = (n) => {
        setClicked(n);
        setInfo(infos.find(info => info.name === n));
    }

    return (
        <>
            <div style={style}>
                {infos.map((info, idx) => (
                    <button
                        key={idx}
                        onClick={() => {handleClick(info.name)}}>

                        {info.name}
                    </button>
                ))}
            </div>

            <InfoTable info={info}/>
        </>
    );
};

export default Employees;