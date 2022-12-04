import React, { useEffect, useMemo, useState } from "react";
import Actually from './Actually';
import Header from './Header';
import PopupСhange from './PopupСhange';
import api from "../utils/api";
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes, listAll, getMetadata } from "firebase/storage";
import { storage } from "../index";

function App() {

  const [postInfo, setpostIfo] = useState({});
  const [objectPost, setObjectPost] = useState({});
  const [valueSubtitle, setValueSubtitle] = useState('');
  const [valueTitle, setValueTitle] = useState('');
  const [valueTime, setValueTime] = useState('')
  const [open, setOpen] = useState(false);
  const [rerender, setRerender] = useState(0);
  const [file, setFile] = useState(null);
  const imageLisrRef = ref(storage, 'images/');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [allDataFile, setAllDataFile] = useState('')

  const handleSubmitFile = () => {
    if (!file) return;
    const fileRef = ref(storage, `images/${valueTitle}`);
    uploadBytes(fileRef, file).then((res) => {
      alert('Картинка загружина')
      console.log(res)
    })
  }

  let post = {
    name: valueTitle,
    text: valueSubtitle,
    time: valueTime,
    finish: false,
  };

  // Получаем все посты из БД
  useEffect(() => {
    api.getInitialActually()
      .then((post) => {
        console.log('получаем посты')
        setObjectPost(post);
      })
      .catch((err) => {
        console.log(err);
      });

    listAll(imageLisrRef).then(async (res) => {
      res.items.forEach((item) => {
        getMetadata(item).then((name) => {
          setFileName(name.fullPath.split('/')[1])
        })
        getDownloadURL(item).then((url) => {
          setFileUrl(url)
        })
      })
    })

  }, [rerender])



  //Запизывает в БД.
    const writeActually = (data) => {
      api.createActually(data)
        .then(() => setRerender(rerender + 1))
        .catch((err) => console.log(err));
      console.log('Запизывает в БД')
    }

  //Отправляет в БД все что написано в inputs
  const sendPost = () => {
    writeActually(post);
    setValueTitle('');
    setValueSubtitle('');
    setValueTime('');
    console.log('Отправляет в БД все что написано в inputs')
  }

  //Удаляем пост
  const deletePost = (data) => {
    api.deleteActually(data)
      .then(() => setRerender(rerender - 1))
      .catch((err) => console.log(err));
    console.log('Пост удален')
  }

  //Обновляем пост 
  const updateActually = (data, post) => {
    api.updateActually(data, post)
      .then(() => setRerender(rerender + 1))
      .catch((res) => console.log(res))
    console.log('Обновили пост');
  }

  //Завершаем дело
  const finish = (data, newData) => {
    console.log('data =', data,)
    api.updateActuallyFinish(data, newData)
      .then((res) => setRerender(rerender + 1))
      .catch((err) => console.log(err));
    console.log('Дело завершино');
  }

  const hendelOpenPopup = () => {
    setOpen(true)
  }

  const hendelClosePopup = () => {
    setOpen(false)
  }

  return (
    <>
      <Header
        handleSubmitFile={handleSubmitFile}
        file={file}
        setFile={setFile}
        setValueTime={setValueTime}
        sendPost={sendPost}
        setValueSubtitle={setValueSubtitle}
        setValueTitle={setValueTitle}
        valueSubtitle={valueSubtitle}
        valueTitle={valueTitle}
        valueTime={valueTime}
      />
      <Actually
        file={file}
        finish={finish}
        setpostIfo={setpostIfo}
        deletePost={deletePost}
        objectPost={objectPost}
        hendelOpenPopup={hendelOpenPopup}
      />

      <PopupСhange
        postInfo={postInfo}
        open={open}
        updateActually={updateActually}
        hendelOpenPopup={hendelOpenPopup}
        hendelClosePopup={hendelClosePopup}
      />
    </>
  );
}

export default App;
