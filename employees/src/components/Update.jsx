import React, {useEffect, useState} from 'react';

const initialState = {
    name: '',
    age: '',
    job: '',
    language: '',
    pay: ''
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
}

const labelStyle = {
    marginBottom: '10px',
    display: 'flex',
    dlexDirection: 'column',
    fontWight: 'bold',
    color: '#333',
}

const inputStyle = {
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
}

const Update = ({clicked, infos, handleUpdate}) => {
    const[employee, setEmployee] = useState(initialState);

    useEffect(() => {
        clicked && infos && setEmployee(infos.find(info => info.name === clicked))
    }, [infos, clicked])
    const handleChange = e => {
        // console.log(e.target);
        const {name, value} = e.target;
        setEmployee(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = e => {
        e.preventDefault();
        handleUpdate(employee);
    }

    return (
        <>
            <form>
                <label onSubmit={handleSubmit}>
                    이름
                    <input type="text" name="name" value={employee.name} onChange={handleChange} required/>
                </label>
                <label>
                    나이
                    <input type="text" name="age" value={employee.age} onChange={handleChange} required/>
                </label>
                <label>
                    직업
                    <input type="text" name="job" value={employee.job} onChange={handleChange} required/>
                </label>
                <label>
                    언어
                    <input type="text" name="language" value={employee.language} onChange={handleChange} required/>
                </label>
                <label>
                    급여
                    <input type="text" name="pay" value={employee.pay} onChange={handleChange} required/>
                </label>
                <button>제출</button>
            </form>
        </>
    );
};

export default Update;