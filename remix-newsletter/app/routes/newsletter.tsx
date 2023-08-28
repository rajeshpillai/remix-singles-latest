import {Form, Link, useActionData} from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

export let action: ActionFunction = async ({request}) => {
  let formData = await request.formData();
  let email = formData.get("email");
  console.log({email});
  
  // Simulate sending email
  setTimeout(() => {
    console.log("Email sent!");
  }, 500);

  return { subscription: true};
}
export default function Newsletter() {
  let actionData = useActionData();
  let state = actionData?.subscription ? "success": actionData?.error ? "error" : "idle";
  console.log({state});
  return (
    <main>
      <Form  method = "post" aria-hidden={state === "success"}>
        <h2>Subscribe!</h2>
        <p>Don't miss any of the action!</p>
        <fieldset>
          <input type="email" name="email" placeholder="you@example.com" />
          <button type="submit">Subscribe</button>
        </fieldset>
      <p>
        {actionData?.error ? (
          actionData.message
          ): <>&nbsp;</>}
      </p>
      </Form>
      <div aria-hidden={state !== "success"}>
        <h2>You're subscribed!</h2>
        <p>Please check your email to confirm your subscription.</p>
        <Link to=".">Start over</Link>
      </div>
    </main>
  )
}