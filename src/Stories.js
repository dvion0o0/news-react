import React from "react";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { stories, loading, remove } = useGlobalContext();
  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="stories">
      {stories.map((story) => {
        const { title, author, url, points, num_comments, objectID } = story;
        return (
          <article className="story" key={objectID}>
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by {author} | {num_comments} comments
            </p>
            <div>
              <a href={url} className="read-link" target="_blank">
                Read more
              </a>
              <button className="remove-btn" onClick={() => remove(objectID)}>
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
