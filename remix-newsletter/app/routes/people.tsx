import { useEffect, useRef } from "react";
import {Form, Link, useActionData, useLoaderData, useNavigation, useFetcher} from "@remix-run/react";
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

  //await new Promise((res) => setTimeout(res, Math.random() * 2000));

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

  console.log("_action: ", _action);
  
  if (_action === "create") {
    const data = await Api.users.insert(values);
    //console.log("response: ", data);
    return { success: true};
  }

  if (_action === "delete") {
    // Added delay to see the opacity effect
    try {
      throw new Error("Kaboom!!!");
      //await new Promise((res) => setTimeout(res, Math.random() * 2000));
      const result = await Api.users.delete(values);
      return result;
    } catch(e) {
      return { error: true}
    }
  }
}

export default function People() {
  const people = useLoaderData();

  const navigation = useNavigation();
  let busy = navigation.state; // Other UI side effects (including clicking delete button)

  // Fix UI state for adding
  let isAdding = navigation.state === "submitting" &&
    navigation.formData.get("_action") === "create";


  let formRef = useRef();
  let nameRef = useRef();

  useEffect(() => {
    // If submission done and back to idle
    if (!isAdding) {
      formRef.current.reset();
      nameRef.current?.focus();
    }
  }, [isAdding])

  console.log("navigation.formData.id: ", isAdding, navigation.state, navigation.formData?.get("_action"),  navigation.formData?.get("id"));
  return (
    <div>
      <h1>People</h1>
      { people.length ? (
        <ul>
          {people.map(person => (
            <PersonItem person = {person} key={person.id} />
          ))}
          <li>
            <Form ref={formRef} method="post">
              <input ref={nameRef} type="text" name="name" /> {" "}
              <input type="text" name="username" /> {" "}
              <button className="btn-sm" type="submit" 
                name="_action" value="create" disabled={isAdding}>
                  { isAdding  ? "Adding..." : "Add"}
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

function PersonItem({person}) {
  let fetcher = useFetcher();

  // let navigation = useNavigation();
  // let isDeleting = navigation.formData?.get("id") == person.id ;
  let isDeleting = fetcher.formData?.get("id") == person.id ;

  return <li hidden={isDeleting}
    // style={{
    //   opacity: isDeleting ? 0.25 : 1,
    // }}
    key={person.id}>
    {person.name} ({person.username}) { " "}
    <fetcher.Form method="post" 
      style={{display: "inline"}}>
      <input type="hidden" name="id" value={person.id} />
      <button 
        type="submit" aria-label="delete" name="_action" 
        className="btn-sm"
        value="delete">
        x
      </button>
    </fetcher.Form>
  </li>
}