import { useEffect, useRef } from "react";
import {Form, Link, useActionData, useLoaderData, useNavigation} from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { Api } from "~/utils/api.server";

import {store} from "../../db/store";

export async function loader() {
  // return [
  //   {
  //     id: +new Date(), 
  //     firstName: "Karna",
  //     lastName: "P"
  //   },
  //   {
  //     id: +new Date(), 
  //     firstName: "Arjun",
  //     lastName: "P"
  //   },
  // ]

  // const resp = await fetch('https://jsonplaceholder.typicode.com/users')
  // const data = await resp.json();

  if (store.users.length == 0) {
    const data = await Api.users.all();
    store.users = data;
  }
  return store.users;
}

export let action: ActionFunction = async ({request}) => {
  let formData = await request.formData();
  // let values = Object.fromEntries(formData);

  let {_action, ...values} = Object.fromEntries(formData);
  
  if (_action === "create") {
    const data = await Api.users.insert(values);
    console.log("response: ", data);
    return { success: true, data};
  }

  if (_action === "delete") {
    return await Api.users.delete(values);
  }
}

export default function People() {
  const people = useLoaderData();

  const navigation = useNavigation();
  let busy = navigation.state;

  return (
    <div>
      <h1>People</h1>
      { people.length ? (
        <ul>
          {people.map(p => (
            <li key={p.id}>{p.name} ({p.username}) { " "}
              <Form method="post" 
                style={{display: "inline"}}>
                <input type="hidden" name="id" value={p.id} />
                <button 
                  type="submit" aria-label="delete" name="_action" 
                  className="btn-sm"
                  value="delete">
                  x
                </button>
              </Form>
            </li>
          ))}
          <li>
            <Form method="post">
              <input type="text" name="name" /> {" "}
              <input type="text" name="username" /> {" "}
              <button className="btn-sm" type="submit" 
                name="_action" value="create">
                  { busy =="submitting" ? "Adding..." : "Add"}
              </button>
            </Form>
          </li>
        </ul> 
      ) : (
        <h2>No one around here!</h2>
      )}
    </div>
  );
}