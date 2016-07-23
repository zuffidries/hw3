import React, { Component } from 'react';


// eslint-disable-next-line react/prefer-stateless-function
class NoteBar extends Component {
  constructor(props) {
    super(props);
    this.state = { noteTitle: '' };
    this.onTypeTitle = this.onTypeTitle.bind(this);
    this.onSubmitNote = this.onSubmitNote.bind(this);
  }
  onTypeTitle(event) {
    console.log(this.state.noteTitle);
    this.setState({ noteTitle: event.target.value });
    // this.props.onSearchChange(this.state.searchterm);
  }
  onSubmitNote(event) {
    console.log(event.target.value);
    this.props.onCreateNote(this.state.noteTitle);
    // revert title bar to empty title
    this.setState({ noteTitle: '' });
  }
  render() {
    return (
      <div id="notebar">
        <input onChange={this.onTypeTitle} value={this.state.noteTitle} />
        <input onClick={this.onSubmitNote} type="submit" value="Submit" />
      </div>
    );
  }
}

export default NoteBar;
