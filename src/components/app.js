import React, { Component } from 'react';
import Immutable from 'immutable';
import * as firebasedb from '../firebasedb';

import NoteBar from './note_bar';
import Note from './note';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      id: 0,
    };
  }
  componentDidMount() {
    const updateNotes = newNotes => {
      this.setState({
        notes: Immutable.Map(newNotes),
      });
    };
    firebasedb.fetchNotes(updateNotes);
  }
  deleteNote(id) {
    firebasedb.deleteNote(id);
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }
  createNote(noteTitle) {
    const noteObject = {
      title: noteTitle,
      content: '',
      x: 0,
      y: 0,
      zIndex: 0,
      isEditing: false,
    };
    firebasedb.pushNote(noteObject);
    this.setState({
      id: this.state.i++,
      notes: this.state.notes.set(this.state.id, noteObject),
    });
  }
  editNote(id, isEditing) {
    firebasedb.updateNote(id, isEditing);
    this.setState({
      notes: this.state.notes.update(id, n => {
        return Object.assign({}, n, { isEditing });
      }),
    });
  }
  editNoteContent(id, content) {
    firebasedb.updateContent(id, content);
    this.setState({
      notes: this.state.notes.update(id, n => {
        return Object.assign({}, n, { content });
      }),
    });
  }
  moveNote(id, x, y) {
    firebasedb.moveNote(id, x, y);
    this.setState({
      notes: this.state.notes.update(id, n => {
        return Object.assign({}, n, { x }, { y });
      }),
    });
  }

  render() {
    return (
      <div>
        <NoteBar onCreateNote={noteTitle => this.createNote(noteTitle)} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          // perhaps you might return some jsx here :-)
          return (
            <Note key={id} note={note}
              deleteNote={
                () => this.deleteNote(id)
              }
              editNote={
                (isEditing) => this.editNote(id, isEditing)
              }
              editNoteContent={
                (content) => this.editNoteContent(id, content)
              }
              moveNote={
                (x, y) => this.moveNote(id, x, y)
              }
            />
          );
        })}
      </div>
    );
  }
}

export default App;
