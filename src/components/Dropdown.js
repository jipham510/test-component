import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.css";
import SelectIcon from './assets/select-icon.svg';

export default function Dropdown(props) {
  const {
    options,
    selected,
    title,
    handleSelected,
    multiple = false,
    width = "100%",
  } = props;
  const optionsRef = useRef();
  const inputRef = useRef();
  const [optionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutside = inputRef.current && optionsRef.current &&
        !inputRef.current.contains(e.target) && !optionsRef.current.contains(e.target);

      if (clickedOutside) setOptionsVisible(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [inputRef, optionsRef])

  const selectedEmpty = () => !selected || selected.length === 0;
  const selectedText = () => selected.map((select) => select.label).join(", ");

  function handleClearSelected() {
    handleSelected([]);
    if (!multiple) setOptionsVisible(false);
  }

  function handleSelect(item) {
    if (!multiple) {
      const newSelected = item ? [item] : [];
      handleSelected(newSelected);
      setOptionsVisible(false);
      return;
    }

    const alreadySelected = isSelected(item);
    if (alreadySelected) {
      const newSelected = [...selected].filter(select => select.value !== item.value);
      handleSelected(newSelected);
      return;
    } 

    handleSelected([...selected, item]);
  }

  function isSelected(item) {
    if (!item || selectedEmpty()) return false;
    return selected.some(select => select.value === item.value);
  }  

  return (
    <div
      className={`${styles.wrapper} ${optionsVisible && styles.open}`}
      style={{ width }}
    >
      <input
        className={`${styles.inputElement} ${
          !selectedEmpty() && styles.filled
        }`}
        readOnly
        ref={inputRef}
        onClick={() => setOptionsVisible(true)}
        value={selectedText()}
      />
      <div className={styles.floatingLabel}>{title}</div>
      <div className={styles.selectIcon}>
        <img src={SelectIcon} className={styles.arrowIcon} alt="arrow" />
      </div>
      {optionsVisible && (
        <ul className={styles.options} ref={optionsRef}>
          {multiple && (
            <li
              className={`${styles.optionItem} ${styles.italic}`}
              onClick={() => handleSelected(options)}
            >
              Select All
            </li>
          )}
          <li
            className={`${styles.optionItem} ${styles.italic}`}
            onClick={handleClearSelected}
          >
            {multiple ? "Clear Selected" : "None"}
          </li>

          {options.map((option) => (
            <li
              className={`
                ${styles.optionItem} 
                ${isSelected(option) && styles.optionItemSelected}`}
              onClick={() => handleSelect(option)}
              key={option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.prototypes = {
  options: PropTypes.array.isRequired,
  handleSelected: PropTypes.func.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  width: PropTypes.string,
};