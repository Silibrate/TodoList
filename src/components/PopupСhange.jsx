import { useState } from 'react';
import closeImg from '../images/close.png';

const PopupСhange = ({ open, hendelClosePopup, updateActually, postInfo }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const newPost = {
    name: title,
    text: subtitle
  }

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    hendelClosePopup();
  }

  function handleSubmit(Event) {
    Event.preventDefault();
    updateActually(postInfo, newPost);
    console.log('Отправил!')
    resetForm();
  }

  return (
    <div onClick={() => { resetForm() }} className={`popup ${open ? 'popup__open' : ''} `}>
      <div className="popup__container">
        <div onClick={(e) => e.stopPropagation()} className="popup__content">
          <img className='popup__close' onClick={() => { resetForm() }} src={closeImg} alt="Close" />
          <h2 className="popup__title">Изменить задачу</h2>
          <form className="popup__form" action="submit" onSubmit={handleSubmit}>
            <input minLength={2} required onChange={e => setTitle(e.target.value)} value={title} className="popup__input" placeholder="Изменить заголовок" type="text" />
            <input minLength={2} required onChange={e => setSubtitle(e.target.value)} value={subtitle} className="popup__input" placeholder="Изменить текст" type="text" />
            <button type="submit" className="popup__button btn btn-1 hover-filled-slide-down"><span>Изменить</span></button>
          </form>
        </div>
      </div>
    </div >
  );
}

export default PopupСhange;