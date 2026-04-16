import { useState, useRef, useEffect, useContext } from "react";
import "./addPost.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [tag] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, sethashtags] = useState([]);

  const titleRef = useRef(null);
  const tagsRef = useRef(null);
  const contentRef = useRef(null);

  const navigate = useNavigate();
  const { userId } = useContext(LoginContext);

  const generatePostId = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  useEffect(() => {
    if (titleRef.current) {
      if (title === "") {
        titleRef.current.classList.add("empty");
      } else {
        titleRef.current.classList.remove("empty");
      }
    }
  }, [title]);

  useEffect(() => {
    if (tagsRef.current) {
      if (tag === "") {
        tagsRef.current.classList.add("empty");
      } else {
        tagsRef.current.classList.remove("empty");
      }
    }
  }, [tag]);

  useEffect(() => {
    if (contentRef.current) {
      if (content === "") {
        contentRef.current.classList.add("empty");
      } else {
        contentRef.current.classList.remove("empty");
      }
    }
  }, [content]);

  const handleTitleInput = (e) => {
    setTitle(e.currentTarget.innerText);
  };

  const handleTagsInput = (e) => {
    if (
      e.currentTarget.innerText[e.currentTarget.innerText.length - 1] === "#" &&
      e.currentTarget.innerText.length > 1
    ) {
      const inputData = e.currentTarget.innerText
        .split(/[^A-Za-z0-9]+/)
        .filter(Boolean)
        .map((el) => (el = `#${el}`));

      sethashtags(inputData);

      e.currentTarget.innerText = inputData.join(" ") + " ";

      const range = document.createRange();
      const sel = window.getSelection();

      range.selectNodeContents(e.currentTarget);
      range.collapse(false);

      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const handleContentInput = (e) => {
    setContent(e.currentTarget.innerText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Please add a title");
      return;
    }

    if (content.trim() === "") {
      alert("Please add content");
      return;
    }

    const postData = {
      postKey: generatePostId(),
      userID: userId || "anonymous",
      date: new Date().toISOString(),
      title: title,
      body: content,
      tags: hashtags.length > 0 ? hashtags : [],
      comments: [],
    };

    try {
      const response = await fetch("http://localhost:3002/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        alert("Something went wrong");
      }

      const responsePosts = await fetch(
        `http://localhost:3002/users/${userId}`,
      );
      const userPosts = await responsePosts.json();

      const updatedPosts = [...(userPosts.posts || []), postData.postKey];

      const response2 = await fetch(`http://localhost:3002/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posts: updatedPosts }),
      });
      if (!response2.ok) {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="add-post-container">
      <form className="add-post-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Post</h2>

        <div
          ref={titleRef}
          className="editor-title"
          contentEditable="true"
          onInput={handleTitleInput}
          suppressContentEditableWarning={true}
          data-placeholder="Title"
        ></div>

        <div
          ref={tagsRef}
          className="editor-tags"
          contentEditable="true"
          onInput={handleTagsInput}
          suppressContentEditableWarning={true}
          data-placeholder="Enter the tag name and then press # to make it as valid hashtag"
        ></div>

        <div
          ref={contentRef}
          className="editor-content"
          contentEditable="true"
          onInput={handleContentInput}
          suppressContentEditableWarning={true}
          data-placeholder="What's on your mind?"
        ></div>

        <div className="form-actions">
          <button
            type="button"
            className="submit-btn"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            <i className="fas fa-paper-plane"></i> Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
