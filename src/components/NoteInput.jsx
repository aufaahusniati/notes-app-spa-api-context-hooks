import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function NoteInput({ state, onTitleChange, onBodyInput }) {
  const { selectLanguage } = React.useContext(LocaleContext);
  return (
    <div className="add-new-page__input">
      <input
        className="add-new-page__input__title"
        placeholder={selectLanguage({ id: "Judul...", en: "Title..." })}
        value={state.title}
        onChange={onTitleChange}
        spellCheck="false"
      />
      <div
        className="add-new-page__input__body"
        contentEditable="true"
        data-placeholder={selectLanguage({
          id: "Tulis catatan...",
          en: "Take a note...",
        })}
        onInput={onBodyInput}
        spellCheck="false"
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
}

NoteInput.propTypes = {
  state: PropTypes.object.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onBodyInput: PropTypes.func.isRequired,
};

export default NoteInput;
