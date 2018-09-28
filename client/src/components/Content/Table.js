import React from 'react'

class Table extends React.Component {
  render() {
    console.log(this.props.candidates);
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody >
          {this.props.candidates.map((candidate) => {
            return(
              <tr key={candidate.id}>
                <th>{candidate.id.toNumber()}</th>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount.toFixed([3])}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Table
