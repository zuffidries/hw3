import React from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';


// function based "dumb" component with no state
const Note = (props) => {
  const onStartDrag = (e, ui) => {
    props.moveNote(ui.x, ui.y);
  };
  const onDrag = (e, ui) => {
    props.moveNote(ui.x, ui.y);
  };
  const onStopDrag = (e, ui) => {
    props.moveNote(ui.x, ui.y);
  };
  const onDeleteNote = () => {
    props.deleteNote();
  };
  const onEditNote = () => {
    props.editNote(true);
  };
  const onSaveEdit = () => {
    props.editNote(false);
  };
  const onEditContent = (event) => {
    props.editContent(event.target.value);
  };
  const renderNotes = () => {
    if (props.note.isEditing) {
      return (
        <div className="note">
          <div className="titleBar">
            <div>{props.note.title}</div>
            <i onClick={onDeleteNote} className="fa fa-trash" />
            <i onClick={onSaveEdit} className="fa fa-check" />
            <i className="fa fa-arrows" />
            <div className="noteContent" onChange={onEditContent} />
          </div>
        </div>
      );
    }
    return (
      <div className="note">
        <div className="titleBar">
          <div>{props.note.title}</div>
          <i onClick={onDeleteNote} className="fa fa-trash" />
          <i onClick={onEditNote} className="fa fa-pencil" />
          <i className="fa fa-arrows" />
          <div className="noteContent" onChange={onEditContent} />
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(props.note.content || '') }} />
        </div>
      </div>
    );
  };
  return (
    <div>
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: props.note.x, y: props.note.y }}
        onStart={onStartDrag}
        onDrag={onDrag}
        onStop={onStopDrag}
      >
        <div>
          {renderNotes()}
        </div>
      </Draggable>
    </div>
  );
};


export default Note;
