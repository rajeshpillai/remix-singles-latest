import { useEffect, useRef } from "react";
import {Form, Link, useActionData, useLoaderData, useNavigation} from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

export async function loader() {
  return [
    {
      id: +new Date(), 
      firstName: "Rajesh",
      lastName: "Pillai"
    },
  ]
}

export let action: ActionFunction = async ({request}) => {
  return { subscription: true};
}
export default function Newsletter() {
  const people = useLoaderData();
  return (
    <main>
      <h1>People</h1>
      { people.length ? (
        <ul>
          {people.map(p => (
            <li key={p.id}>{p.firstName} {p.lastName}</li>
          ))}
        </ul> 
      ) : (
        <h2>No one around here!</h2>
      )}
    </main>
  );
}