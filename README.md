
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
- Detail view for each entry, with edit (✏️) and delete (🗑️) actions
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

- **BotwPage**
	- Contains a horizontal nav bar: logo/text left, switch-game link and create entry button right
	- "Create entry" button leads to CreateEntryPage
	- Shows a paginated grid (20 per page) with BOTW entries
	- Each card links to the detail view

- **TotkPage**
	- Same structure as BotwPage, but for TOTK data

- **DetailPage**
	- Dynamic: shows details for the selected entry (BOTW or TOTK depending on navigation)
	- Contains nav or back button
	- Shows edit (✏️) and delete (🗑️) actions
	- On delete: user must confirm before removing from state
	- On edit: user is sent to CreateEntryPage with pre-filled values

- **CreateEntryPage**
	- Dynamic: renders form for creating or editing an entry
	- Fields adapt to selected category (e.g. monster, equipment, material, etc.)
	- On edit: form is pre-filled with entry data
	- On create: form is empty
	- Contains nav or back button

### CRUD flow
- **GET**: Fetches data from API on page load
- **CREATE**: Adds new entry to state (immediately visible in list)
- **UPDATE**: Updates entry in state (immediately visible in list and detail view)
- **DELETE**: Removes entry from state (disappears from list and detail view)
- All changes are lost on refresh (no persistence, per assignment)

### Components
- Nav
- EntryCard
- EntryGrid
- EntryForm (used for both create and edit)
- Pagination

### Routing
- `/` (HomePage)
- `/botw` (BotwPage)
- `/totk` (TotkPage)
- `/botw/create` (CreateEntryPage for BOTW)
- `/totk/create` (CreateEntryPage for TOTK)
- `/botw/:id` (DetailPage for BOTW)
- `/totk/:id` (DetailPage for TOTK)
- `/botw/:id/edit` (CreateEntryPage for BOTW, edit mode)
- `/totk/:id/edit` (CreateEntryPage for TOTK, edit mode)

### UI/Design: Navigation and responsiveness

- The navigation bar (Nav) is always horizontal, regardless of screen size
- Left: logo or "Hyrule Compendium" text (using custom font from assets)
- Right: switch-game link and "Create Entry" button
- No home link needed, as the home page is only shown on first visit
- On small screens:
	- Font size and padding are reduced so that logo/text, nav link, and create button always fit on one row
	- If "Hyrule Compendium" text is too wide, it is truncated or further reduced to avoid wrapping
- Mobile first: All layout and styling starts from small screens and scales up with media queries

Example layout:

| Hyrule Compendium | [Switch game] [Create Entry] |

Everything is left- and right-aligned using flexbox or grid.
