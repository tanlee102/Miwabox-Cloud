import React, { useEffect, useState } from 'react';

const DropDownDot = ({options, indexOption = 0, setIndexOption = null, zIndex = '2', isTop=false}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option, index) => {
    if(setIndexOption){
      setIndexOption(index);
    }
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (options.length > 0 && !selectedOption) {
      setSelectedOption(options[indexOption]);
    }
  }, []);

  return (
    <div className="dropdown dropdown-dot" style={{ zIndex: zIndex }}>
      <button className="dropdown-toggle" onClick={handleToggleDropdown}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Options Menu</title><path fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd" d="M9 18C10.1046 18 11 17.1046 11 16C11 14.8954 10.1046 14 9 14C7.89543 14 7 14.8954 7 16C7 17.1046 7.89543 18 9 18ZM18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16ZM25 16C25 17.1046 24.1046 18 23 18C21.8954 18 21 17.1046 21 16C21 14.8954 21.8954 14 23 14C24.1046 14 25 14.8954 25 16Z"></path></svg>
      </button>
      {isOpen && (
        <div className={`dropdown-menu ${isTop ? "top" : ""}`}>
            <svg width="24" height="8" viewBox="0 0 24 8" class="Dropdown-triangle" fill="none" xmlns="http://www.w3.org/2000/svg"><title>icon</title><path fill="#ffffff" d="M10.3359 1.1094C11.3436 0.437601 12.6564 0.437601 13.6641 1.1094L24 8L3.05823e-09 8L10.3359 1.1094Z"></path></svg>
            <ul>
                {options.map((option, index) => (
                    <li
                    key={index}
                    className={selectedOption === option ? '' : ''}
                    onClick={() => handleOptionSelect(option, index)}
                    >
                    {option}
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownDot;