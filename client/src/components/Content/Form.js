import React from 'react'

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.castVote(this.candidateId.value, 2) 
      }}> 
      {/*TODOO USE SPECIFIED TOKEN AMOUNT INSTEAD OF 2*/}
        <div className='form-group'>
          <label>Select Candidate</label>
          <select ref={(input) => this.candidateId = input} className='form-control'>
            {this.props.candidates.map((candidate) => {
              return <option value={candidate.id} key={candidate.id}>{candidate.name}</option>
            })}
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>Vote</button>
        <hr />
      </form>
    )
  }
}

export default Form
