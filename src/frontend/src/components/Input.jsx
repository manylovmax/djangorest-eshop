import React from 'react';

const Input = props => (
  <div>
    <label htmlFor={props.name} className="form-label">
      {props.title}
    </label>
    <input
      className="form-input"
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  </div>
);

export default Input;