import { useEffect, useRef } from "react";
import {Form, Link, useActionData, useLoaderData, useNavigation} from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

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

  const resp = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await resp.json();

  return data;
}

export let action: ActionFunction = async ({request}) => {
  return { subscription: true};
}
export default function Newsletter() {
  const people = useLoaderData();
  return (
    <div>
      <h1>People</h1>
      { people.length ? (
        <ul>
          {people.map(p => (
            <li key={p.id}>{p.name} ({p.username})</li>
          ))}
        </ul> 
      ) : (
        <h2>No one around here!</h2>
      )}
    </div>
  );
}