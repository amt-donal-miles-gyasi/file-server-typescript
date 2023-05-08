import React from "react";
import { useState } from "react"

interface InputProps {
  name: string;
}

const Input = ({ name }: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="input-group mb-3 mt-10">
      <input  
        className="form-control" 
        type="text"
        placeholder="Search for file by name"
        name={name}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}

export default Input;
