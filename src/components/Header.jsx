import React from "react";
import '../index.css';

const Header = ({ sendPost, setValueSubtitle, setValueTitle, valueSubtitle, valueTitle, setValueTime, valueTime, setFile, handleSubmitFile, file }) => {

  /*   const postFile = () => {
      const formData = new FormData();
      formData.append('file', file);
    } */

  return (
    <div className="header">
      <h1 className="header__title">Create ToDo</h1>
      <form onSubmit={(e) => { e.preventDefault(); sendPost(); handleSubmitFile(); }} className="header__form" action="submit">
        <input  accept="image/*,.png,.jpg,.gif,.web" onChange={e => setFile(e.target.files[0])} className="header__input" type="file" />
        <input required minLength='2' value={valueTitle} onChange={e => setValueTitle(e.target.value)} className="header__input" placeholder="Заголовок" type="text" />
        <input required minLength='2' value={valueSubtitle} onChange={e => setValueSubtitle(e.target.value)} className="header__input" placeholder="Текст" type="text" />
        <input required value={valueTime} className="header__input" onChange={e => setValueTime(e.target.value)} type="time" />
        <button className="header__button" type="submit">Создать</button>
      </form>
    </div >
  );
}

export default Header;