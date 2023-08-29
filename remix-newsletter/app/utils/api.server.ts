import {store} from "../../db/store";

const Api = {
  users: { 
    all: async function () {
      const resp = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await resp.json();
      return data;
    },
    "insert": async function (values) {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",  
      body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      });

      const data = await resp.json();
      console.log("store: ", store);
      store.users.push(data);
      return data;
    },
    "delete": async function (values) {
      console.log("DELETING ", values);
      let userId = values.id;
      const users = store.users.filter(u =>  u.id != userId);
      console.log(users);
      store.users = users;
      return values;
    }
  }
}

export {Api};