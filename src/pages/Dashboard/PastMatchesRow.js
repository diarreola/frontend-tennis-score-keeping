import React from 'react';

function PastMatchesRow({id, matchDate, matchName, matchPlayerA, matchPlayerB}) {
  console.log(matchName)
  return (
    <>
      <td>{matchName}</td>
      <td>{matchDate}</td>
      <td>{matchPlayerA}</td>
      <td>{matchPlayerB}</td>
    </>  
  );
}

export default PastMatchesRow;