import React, { useState, useEffect } from "react";

const ImageSearch = ({ searchText }) => {
  const [text, setText] = useState("");

  // Handle search when typing
  useEffect(() => {
    if (text) {
      searchText(text); // Trigger search as the user types
    }
  }, [text, searchText]);

  // Handle form submit or button click
  const handleSubmit = (e) => {
    e.preventDefault();
    searchText(text); // Trigger search when user submits the form
  };

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            onChange={(e) => setText(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search Image Term..."
            value={text}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageSearch;
