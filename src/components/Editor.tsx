import React, { useState } from "react";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <div className="App">
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default MyEditor;
