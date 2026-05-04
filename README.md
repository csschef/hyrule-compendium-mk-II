
# Hyrule Compendium MK II

## Author
Sebastian Valdemarsson

## Project Description
This is a React CRUD application using the Hyrule Compendium API as a data source. Since the API is read-only, all Create/Update/Delete operations are handled in-memory (React state) during the session, as per assignment requirements. The app is fully responsive and built with a mobile-first approach.

## API Used
[Hyrule Compendium API](https://gadhagod.github.io/Hyrule-Compendium-API/#/compendium-api)

## How to run the project
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open the app in your browser (default: http://localhost:5173)

## Implemented Features
- Choose between Breath of the Wild and Tears of the Kingdom entries on the home page
- Paginated grid view (20 per page) for each game
- Detail view for each entry, with edit and delete actions
- Create new entry (in-memory)
- Edit entry (in-memory, using the same form as create, pre-filled)
- Delete entry (in-memory, with confirmation)
- Dynamic form fields based on entry category
- Responsive, mobile-first design
- All navigation and CRUD logic in React state (no localStorage or backend)
- Error and loading states handled in all views

## Known bugs or limitations
- All changes are lost on page refresh (by design, per assignment)
- No real backend for create/update/delete (API is read-only)
- Some entry categories may have fields not fully supported in the form

---

## Project structure and flow

### Page structure and flow

- **HomePage**
	- Shows two cards/buttons: "Breath of the Wild" and "Tears of the Kingdom"
	- User selects which game to view

- **ListPage**
	- Contains a horizontal nav bar with switch-game link and create entry button right
	- Shows a paginated grid (20 per page) with BOTW or TOTK entries depending on the route
	- Each card links to the detail view

- **DetailPage**
	- Dynamic: shows details for the selected entry (BOTW or TOTK depending on navigation)
	- Contains the shared nav/back navigation
	- Shows edit and delete actions
	- On delete: user must confirm before removing from state
	- On edit: the same form component is shown with pre-filled values

- **CreateEntryPage**
	- Dynamic: renders form for creating or editing an entry
	- Fields adapt to selected category (e.g. monster, equipment, material, etc.)
	- On edit: form is pre-filled with entry data
	- On create: form is empty
	- Contains nav back button

### CRUD flow
- **GET**: Fetches data from the API on page load
- **CREATE**: Adds a new entry to React state (immediately visible in the list)
- **UPDATE**: Updates an entry in React state (immediately visible in the list and detail view)
- **DELETE**: Removes an entry from React state (disappears from the list and detail view)
- All changes are lost on refresh (no persistence, per assignment)

### Components
- Nav
- GameCard
- ItemList
- Item
- ItemForm (used for both create and edit)
- ItemDetails
- CustomSelect
- TagSelector
- FormField
- Pagination

### Routing
- `/` (HomePage)
- `/:game/entries` (ListPage)
- `/:game/entries/create` (CreateEntryPage)
- `/:game/entries/:id` (DetailPage)
