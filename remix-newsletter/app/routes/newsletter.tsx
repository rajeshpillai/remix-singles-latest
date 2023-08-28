import { useEffect, useRef } from "react";
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

  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  // For first time mounting
  const mounted = useRef<boolean>(false);

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

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    // Select only if already mounted
    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    if (state === "success") {
      successRef.current?.focus();
    }

    mounted.current = true;
  }, [state]);

  return (
    <main>
      <Form   method = "post" aria-hidden={state === "success"}>
        <h2>Subscribe!</h2>
        <p>Don't miss any of the action!</p>
        <fieldset disabled ={state == "submitting"}>
          <input ref={inputRef} type="email" 
             aria-label="Email address"
             aria-describedby="error-message"
            name="email" placeholder="you@example.com" 
            />
          <button type="submit">
            {state === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </fieldset>
        <p id="error-message">
          {state === "error" ? actionData.message : <>&nbsp;</>}
        </p>
      </Form>
      <div aria-hidden={state !== "success"}>
        <h2 ref={successRef} tabIndex={-1}>
          You're subscribed!
        </h2>
        <p>Please check your email to confirm your subscription.</p>
        <Link to=".">Start over</Link>
      </div>
    </main>
  )
}