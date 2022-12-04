class Api {

  constructor(config, formData) {
    this.url = config.url;
    this.headers = config.headers;
    this.formData = formData;
  }

  handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  updateActually(oldData, newPost) {
    const id = oldData.id;
    return fetch(this.url + `/actually/` + id + '.json', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newPost.name,
        text: newPost.text,
      })
    })
      .then(this.handleResponse)
  }

  updateActuallyFinish(oldData, newData) {
    console.log('в Запросе апи updateActuallyFinish')
    const id = oldData.id;
    return fetch(this.url + `/actually/` + id + '.json', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        finish: newData.finish,
      })
    })
      .then(this.handleResponse)
  }

  updateActuallyTimer(oldData, newData) {
    const id = oldData.id;
    return fetch(this.url + `/actually/` + id + '.json', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        time: newData.time,
      })
    })
      .then(this.handleResponse)
  }

  getInitialActually() {
    return fetch(this.url + `/actually.json`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(this.handleResponse)
  }

  createActually(data) {
    return fetch(this.url + `/actually.json`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        text: data.text,
        time: data.time,
        finish: data.finish,
      })
    })
      .then(this.handleResponse)
  }



  deleteActually(data) {
    const id = data;
    return fetch(this.url + `/actually/` + id + '.json', {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify({ id }),
    })
      .then(this.handleResponse)
  }
}

const config = {
  url: 'https://todotest-c9a5d-default-rtdb.firebaseio.com',
  headers: {
    'Content-Type': 'application/json/image/jpeg/png',
  }
}

const api = new Api(config)

export default api

