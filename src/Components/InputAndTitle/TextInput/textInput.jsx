import "./style_textInput.css";

function TextInput({
  title,
  typeText,
  nameText,
  onChangeFct,
  oneValue,
  placeholderText,
  requiredValue,
  noGrayBg,
  outlineNone,
}) {
  return (
    <div>
      <label className="commonTextInputLabel" htmlFor={nameText}>
        {title}
        <span>{requiredValue ? "*" : ""}</span>
      </label>
      <input
        className={`commonTextInput ${noGrayBg ? "" : "gray_bg"} ${
          outlineNone ? "outline-none" : " "
        }`}
        type={typeText ? typeText : "text"}
        id={nameText}
        name={nameText}
        required={requiredValue}
        placeholder={placeholderText}
        onChange={onChangeFct}
        value={oneValue}
      />
    </div>
  );
}

export default TextInput;
