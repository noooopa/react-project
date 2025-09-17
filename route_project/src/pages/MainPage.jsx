import React from 'react'
import {Link} from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <Link to='/product'>Product</Link><br/>
            <Link to='/sales'>Sales</Link><br/>
            <Link to='/category'>Category</Link>
        </div>
    );
};

export default MainPage;