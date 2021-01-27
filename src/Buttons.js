import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { numberOfPages, page, loading, nextBtn, prevBtn } = useGlobalContext();
  return (
    <div className="btn-container">
      <button disabled={loading} onClick={prevBtn}>
        prev
      </button>
      <p>
        {page + 1} of {numberOfPages}
      </p>
      <button disabled={loading} onClick={nextBtn}>
        next
      </button>
    </div>
  );
};

export default Buttons;
