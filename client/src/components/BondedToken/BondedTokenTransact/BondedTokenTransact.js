import React from 'react';

const bondedTokenTransact = (props) => {
    return (
        <div>
            <input type="text" placeholder="ACH" onChange={props.change}/>
            <button onClick={props.buy}>Buy</button>
            <button onClick={props.sell}>Sell</button>            
        </div>
    )
}

export default bondedTokenTransact;