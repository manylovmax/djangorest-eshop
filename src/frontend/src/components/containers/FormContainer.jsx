import React from 'react';
import Suggestion from '../InputSuggestion';
import Input from '../Input';

const FormContainer = ({
  handleInputChange = f => f,
  handleKeyDown = f => f,
  handleClick = f => f,
  suggestions,
  currentFocus,
  query
}) => (
  <form className="autocomplete-form" onSubmit={e => e.preventDefault()}>
    <div className="autocomplete">
      <Input placeholder="Поиск" type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} value={query} />
      <div className="autocomplete-items">
        {suggestions.map((item, key) => (
          <Suggestion
            title={item}
            key={key}
            isActive={currentFocus === key}
            onClick={() => handleClick(key)}
          />
        ))}
      </div>
    </div>
  </form>
);

export default FormContainer;