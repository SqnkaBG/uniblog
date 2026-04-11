import { useState, useRef, useEffect } from "react";
import "./addPost.css";

//took the Facebook logic for div that can be edited by a user
const AddPost = () => {
  const [text, setText] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      if (text === "") {
        editorRef.current.classList.add("empty");
      } else {
        editorRef.current.classList.remove("empty");
      }
    }
  }, [text]);

  const handleInput = (e) => {
    setText(e.currentTarget.innerText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    console.log("Post content:", text);
    setText("");
    if (editorRef.current) {
      editorRef.current.innerText = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <label>Create Post</label>

      <div
        ref={editorRef}
        className="facebook-editor"
        contentEditable="true"
        onInput={handleInput}
        suppressContentEditableWarning={true}
        data-placeholder="What's on your mind?"
      ></div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Post
        </button>
      </div>
    </form>
  );
};

export default AddPost;
