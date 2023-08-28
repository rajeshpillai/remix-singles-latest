import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

export let action: ActionFunction = async ({request}) => {
  
  
  // Delay to show browser is handling the pending state
  // Demo with <Form reloadDocument ... />
  
  await new Promise((res) => setTimeout(res, 1000));

  let formData = await request.formData();
  let email = formData.get("email");
  console.log({email});
  
  if (!email?.toString().endsWith(".com")) {
    return {
      error: "true",
      message: "Invalid Email!"
    }
  }
  // Simulate sending email
  setTimeout(() => {
    console.log("Email sent!");
  }, 500);

  return { subscription: true};
}
export default function Newsletter() {
  let actionData = useActionData();
  const navigation = useNavigation();
  //"idle" | "loading"  | "submitting" 

  console.log("navigation.state: ", navigation.state);
  let state = navigation.state;
  if (state == "submitting") {
    state = "submitting";
  } else if (actionData?.subscription) {
      state = "success";
  } else if (actionData?.error) {
      state = "error";
  } else {
      state = "idle";
  }

  // state =  actionData?.error ? "error" : state;

  console.log({state});
  return (
    <main>
      <Form   method = "post" aria-hidden={state === "success"}>
        <h2>Subscribe!</h2>
        <p>Don't miss any of the action!</p>
        <fieldset disabled ={state == "submitting"}>
          <input type="email" name="email" placeholder="you@example.com" />
          <button type="submit">
            {state === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </fieldset>
        <p id="error-message">
          {state === "error" ? actionData.message : <>&nbsp;</>}
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