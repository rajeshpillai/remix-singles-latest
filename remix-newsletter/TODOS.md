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
 