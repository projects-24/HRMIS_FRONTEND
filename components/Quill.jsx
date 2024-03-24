import React from 'react'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'

import  ReactQuill  from 'react-quill';

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'direction': 'rtl' }],   // text direction

  ["image" , "video", "link"],

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

var textOnly = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

  ["image" , "video", "link"],

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }]
]
export default function QuillEdit({content, Change ,placeholder , plainText, theme, className}) {
  return (
    <div>
      <ReactQuill
      className={className}
    style={{ maxHeight:"300px", overflow:"auto"}}
    theme={theme ? theme : "snow"}
    defaultValue={content  ? content : ""}
    placeholder={placeholder}
    onChange={Change}
    modules={{ toolbar: !plainText ? toolbarOptions : textOnly}}
    /></div>
  )
}
