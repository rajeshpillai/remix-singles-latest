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