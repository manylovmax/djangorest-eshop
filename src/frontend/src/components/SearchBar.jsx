import React from 'react';
import axios from 'axios';
import C from '../constants';
import FormContainer from './containers/FormContainer';

class SearchBar extends React.Component {
  state = {
    query: '',
    selectedValue: '',
    suggestions: [],
    currentFocus: -1
  };

  // getSuggestions = query =>
  //   fetch(`http://geoapisuggest/requests?query=${query}`)
  //     .then(response => response.json()) // parses response to JSON
  //     .catch(error => console.error(error));

  handleInputChange = e => {
    const newQuery = e.target.value;
    const nextState = {
      query: newQuery,
      selectedValue: newQuery,
      currentFocus: -1
    };
    if (newQuery.length > 2) {
      this.getSuggestions(newQuery).then(nextSuggestions => {
        nextState.suggestions = nextSuggestions;
        this.setState(nextState);
      });
    } else {
      nextState.suggestions = [];
      this.setState(nextState);
    }
  };

  handleKeyDown = e => {
    const { query, suggestions, currentFocus, selectedValue } = this.state;
    let nextFocus = currentFocus;
    let nextSelectedValue = selectedValue;

    if (!suggestions.length) return;

    switch (e.keyCode) {
      case 38: // UP key handler
        nextFocus = currentFocus > -1 ? currentFocus - 1 : currentFocus;
        if (nextFocus === -1) {
          nextSelectedValue = query;
        } else {
          nextSelectedValue = suggestions[nextFocus];
        }
        e.preventDefault();
        break;
      case 40: // DOWN key handler
        nextFocus = currentFocus + 1 < suggestions.length ? currentFocus + 1 : currentFocus;
        nextSelectedValue = suggestions[nextFocus];
        e.preventDefault();
        break;
      // case 27: // ESCAPE key handler
      //   console.log('ESCAPE');
      //   currentFocus = 0;
      //   this.hideSuggestions();
      //   e.preventDefault();
      //   break;
      default:
    }
    const nextState = {
      ...this.state,
      currentFocus: nextFocus,
      selectedValue: nextSelectedValue
    };
    this.setState(nextState);
  };

  handleClick = key => {
    const { suggestions } = this.state;
    const nextFocus = key;
    const nextSelectedValue = suggestions[nextFocus];

    const nextState = {
      ...this.state,
      currentFocus: nextFocus,
      selectedValue: nextSelectedValue
    };
    this.setState(nextState);
  };

  // postData = (data = {}) =>
  //   // Default options are marked with *
  //   fetch(C.API_URL, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, cors, *same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, same-origin, *omit
  //     headers: {
  //       'Content-Type': 'application/json; charset=utf-8',
  //       Accept: 'application/json; charset=utf-8',
  //       Authorization: `Token ${C.API_KEY}`
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrer: 'no-referrer', // no-referrer, *client
  //     body: JSON.stringify(data) // body data type must match "Content-Type" header
  //   })
  //     .then(response => response.json()) // parses response to JSON
  //     .catch(error => console.error(error));

  render() {
    const { handleInputChange, handleKeyDown, handleClick } = this;
    const { suggestions, currentFocus, selectedValue } = this.state;
    return (
      <FormContainer
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleClick={handleClick}
        suggestions={suggestions}
        currentFocus={currentFocus}
        query={selectedValue}
      />
    );
  }
}

export default SearchBar;