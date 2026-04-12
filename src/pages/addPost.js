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
    <div class="add-post-container">
      <form class="add-post-form">
        <h2 class="form-title">Create Post</h2>

        <div
          class="editor-title"
          contenteditable="true"
          data-placeholder="Title"
        ></div>

        <div
          class="editor-tags"
          contenteditable="true"
          data-placeholder="Tags (e.g., #technology, #coding)"
        ></div>

        <div
          class="editor-content"
          contenteditable="true"
          data-placeholder="What's on your mind?"
        ></div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">
            <i class="fas fa-paper-plane"></i> Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
