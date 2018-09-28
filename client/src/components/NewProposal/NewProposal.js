import React from 'react';

const newProposal = (props) => {
    return (
        <div>
            <form onSubmit={(event) => {
                event.preventDefault()
                props.add(props.text)
            }}>
                Make a proposal: <input onChange={props.changed} value={props.text} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default newProposal;