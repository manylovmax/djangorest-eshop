import React from 'react';

const Suggestion = ({ title, isActive, onClick = f => f }) => (
  <div className={isActive ? 'autocomplete-active' : ''} onClick={onClick}>
    {title}
  </div>
);

export default Suggestion;