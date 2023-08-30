# Steps for the demo
## Newsletter demo
- Build a new remix app
- Create a newsletter form with CSS and aria for animation (routes/newsletter.tsx)
- Add reloadDocument in the <Form reloadDocument... /> to demonstrate server side state
- Add email validation
- Add temp delay
- useNavigation (useTransition hook)
  - Show disabling form on submitting
- Focus management
  - useRef
  - aria for accessibility
  - tabIndex -1 (focus via code and not when actually tabbing)

## Loading data into components
- Create a people route (routes/people.tsx)
- Load hardcoded data
- Load from API (json typicode)
- Wrapper for loader
- 
## Data mutations with form + action
- Add <Form>
- Add form submit 
- Abstract DB (in-memory) (show demo by disabling JS about:config in firefox)

## Multiple Forms and Single Button Mutations
- Add a delete button

## Pending UI
- Show pending UI (other button side effect)
let busy = navigation.state; 

 <button className="btn-sm" type="submit" 
      name="_action" value="create">
        { busy =="submitting" ? "Adding..." : "Add(Bad)"}
    </button>
- Fix Pending UI state
 let isAdding = navigation.state === "submitting" &&
  navigation.formData.get("_action") === "create";
  <button className="btn-sm" type="submit" 
    name="_action" value="create" disabled={isAdding}>
      { isAdding  ? "Adding..." : "Add"}
  </button>
 
## Clearing inputs after submission
- Clear and set focus (browser does automatically)
- 

## Concurrent mutations without causing navigation(useFetcher)
- Fade UI on delete (Problem:  Delete multiple items, the effect gets cancelled as form navigation is singleton).  Fix this using useFetcher
- Let's extract the person to it's own component (But still demo it in the developer console. Click on multiple items to delete and observe the request)
- useFetcher (demo it in the network tab)
- Radomize data to simulate issues.  Let's create chaos in the system (Remix will automatically cancel stale request)
- 

## Optimistic UI
We know our server works, so let be optimistic and update the UI and eliminate pending state.
What if optimism fails?
Let's do the following
- Hide item immediately on delete
- Throw error on delete
- Handle error (but don't do anything yet.  Observe the UI.)
- Let's randomize error and handle error (fetcher.data) (style and add retry)
- Add Optimistic UI to the form (create).  Let's not use fetcher this time to show it works with normal form as well. (add item immediately, but don't yet clear the form immediately)
- Immediately wipe off the form so that user can type in new data (delete button pops in later but that's ok as per use case)
- Add button a new optimistic UI with disabled (so that the UI doesn't dance around)
- Since we have OUI we can simple removing the isAdding from the add button
