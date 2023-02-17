import React from 'react';
import './MatchCourt.css'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

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
        <Button variant="dark">39 ft. &times; 4.5ft (175.5 sq. ft.)</Button>
      </div>
      <div className="court__cell court__nml--left">
        <Button variant="dark">No Man's Land</Button>
      </div>
      <div className="court__cell court__ad--left">
        <Button variant="dark">Ad Court<br/>Left Service Box</Button>
      </div>
      <div className="court__cell court__ad--right">
        
        <Button variant="dark">21 ft. &times; 13.5 ft.<br/>(283.5 sq. ft.)</Button>
      </div>
      <div className="court__cell court__dc--left">
        
        <Button variant="dark">Deuce Court<br/>Left Service Box</Button>
      </div>
      <div className="court__cell court__dc--right">
        <Button variant="dark">21 ft. &times; 13.5 ft.<br/>(283.5 sq. ft.)</Button>
      </div>
      <div className="court__cell court__nml--right">
        <Button variant="dark">18 ft. &times; 27 ft.<br/>(486 sq. ft.)</Button>
      </div>
      <div className="court__cell court__alley--bottom-left">
        <Button variant="dark">bottom left</Button>
      </div>
      <div className="court__cell court__alley--bottom-right">
        <Button variant="dark">39 ft. &times; 4.5ft (175.5 sq. ft.)</Button>
      </div>
    </div>

  )
};

export default MatchCourt