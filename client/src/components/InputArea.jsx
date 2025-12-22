import React from "react";

function InputArea(props) {
  return (
    <div className="form">
      <input
        onChange={props.HandleChange}
        type="text"
        value={props.InputText}
      />
      <button onClick={props.AddItem}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
