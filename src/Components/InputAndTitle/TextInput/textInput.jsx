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
}) {
  return (
    <div>
      <label className="commonTextInputLabel" htmlFor={nameText}>
        {title}
        <span>{requiredValue ? "*" : ""}</span>
      </label>
      <input
        className={`commonTextInput ${noGrayBg ? "" : "gray_bg"}`}
        type={typeText ? typeText : "text"}
        id={nameText}
        name={nameText}
        required={requiredValue}
        placeholder={placeholderText}
        onCHange={onChangeFct}
        value={oneValue}
      />
    </div>
  );
}

export default TextInput;
