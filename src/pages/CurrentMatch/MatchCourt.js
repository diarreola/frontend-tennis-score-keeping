import React from 'react';
import './MatchCourt.css'
import Button from 'react-bootstrap/Button';

// From this codepen: https://codepen.io/vtrpldn/pen/POKvZM
const MatchCourt = () => {
  const hi = () => {
    console.log('hi')
    alert('hi')
  };
  return (
    <div className="court__grid">
      <div className="court__cell court__alley--top-left" onClick={hi}>
        <Button variant="dark">Doubles Alley</Button>
      </div>
      <div className="court__cell court__alley--top-right">
        <Button variant="dark"></Button>
      </div>
      <div className="court__cell court__nml--left">
        <Button variant="dark"></Button>
      </div>
      <div className="court__cell court__ad--left">
        <Button variant="dark">Ad Court<br/></Button>
      </div>
      <div className="court__cell court__ad--right">
        
        <Button variant="dark"></Button>
      </div>
      <div className="court__cell court__dc--left">
        
        <Button variant="dark">Deuce Court<br/>Left Service Box</Button>
      </div>
      <div className="court__cell court__dc--right">
        <Button variant="dark"></Button>
      </div>
      <div className="court__cell court__nml--right">
        <Button variant="dark"></Button>
      </div>
      <div className="court__cell court__alley--bottom-left">
        <Button variant="dark">bottom left</Button>
      </div>
      <div className="court__cell court__alley--bottom-right">
        <Button variant="dark"></Button>
      </div>
    </div>

  )
};

export default MatchCourt