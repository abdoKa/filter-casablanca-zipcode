import React from "react";

function SearchBox({ onChange, value, autoFocus }) {
  return (
    <div className="max-w-lg mx-auto flex items-center justify-center">
      <input
       autoFocus
        type="text"
        placeholder="Type your address..."
        className="w-full my-4 p-3 border-2 border-gray-500 rounded-[10px]"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default SearchBox;
