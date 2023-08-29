const Api = {
  users: { 
    all: async function () {
      const resp = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await resp.json();
      return data;
    }
  }
}

export {Api};