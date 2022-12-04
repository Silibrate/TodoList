import React from "react";
import trashImg from '../images/trash.png';
import penImg from '../images/pen.png';
import Timer from "./Timer";
import checkMarkImg from '../images/checkMark.png';
import checkMarkGreen from '../images/checkMarkGreen.png';

const Actually = ({ deletePost, objectPost, hendelOpenPopup, setpostIfo, finish }) => {

  const newData = {
    finish: true
  }

  return (
    <div >
      {
        objectPost ? Object.entries(objectPost).map(([id, item]) => ({ ...item, id })).map((item) => {
          console.log('Создали карточку');
          return <div key={item.id} className={`actually ${item.finish ? 'actually__finish' : ''}`} >
            {< Timer
              time={item.time}
              item={item}
              complete={item.finish}
            />}
            <div className="actually__container">
              <img onClick={() => {
                if (item.finish) {
                  return false
                } else { finish(item, newData) }
              }}
                className={`actually__complete ${item.time === '00:00' ? 'actually__complete_false' : ''}`}
                src={item.finish ? checkMarkGreen : checkMarkImg} alt="complete" />
              {/* <img style={{ display: `${item.file ? 'block' : 'none'}` }} src={item.file} alt="file" /> */}
              <img onClick={() => deletePost(item.id)} className="actually__trash" src={trashImg} alt="trash" />
              <img style={{ display: `${item.time === '00:00' || item.finish === true ? 'none' : 'block'}` }}
                onClick={() => { hendelOpenPopup(); setpostIfo(item) }}
                className="actually__pen"
                src={penImg} alt="pen" />
              <h2 className="actually__title">{item.name}</h2>
              <p className="actually__text"> {item.text}</p>
            </div>
          </div>
        }) : <p className="actually__empty">Список дел пуст</p>
      }
    </div >
  );
}

export default Actually;