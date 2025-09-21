# Pokemon Library
## Project Description
**Pokemon Library** is a Next.js-based application designed to display and search Pokémon information. This interactive project offers a user-friendly interface for browsing, searching, and filtering Pokémon data.
## Features
1. **Search Functionality**:
    - Search Pokémon by name.
      - Partial name matches are supported
     - Dynamic search input with instant feedback for results matching the query.
    - Cancel search and reset results functionality.

2. **Pagination**:
    - Efficient pagination for navigating large datasets.

3. **API Structure**:
    - Multiple endpoints for Pokémon data retrieval.

4. **Image Fallback Handling**:
    - Built-in handling for missing Pokémon images using fallback placeholders.

5. **Reusable Components**:
    - Modular and reusable React components for fast feature development.

## Installation and Usage
### Prerequisites
Make sure you have `Node.js` ≥16 installed on your system.
### Installation Steps
1. Clone the repository:
``` bash
   git clone <repository-url>
   cd pokemon-library
```
1. Install dependencies:
``` bash
   npm install
```
1. Run the development server:
``` bash
   npm run dev
```
Open your browser at `http://localhost:3000`.

## Folder Structure
Here’s an overview of the project structure:
``` 
pokemon-library/                # Root folder
├── app/                        # Next.js-specific features (pages, API routes)
│   ├── api/ 
│   │   └── pokemon/ 
│   │       ├── [id]/route.ts           # Fetch Pokémon by ID API endpoint
│   │       ├── search/route.ts         # Pokémon search by partial name API endpoint
│   │       ├── types/[type]/route.ts   # Fetch specific Type by name API endpoint
│   │       └── route.ts                # Fetch Pokémon list by offset API endpoint
│   ├── pokemon/[name]/page.tsx         # Pokémon detail page
│   ├── types/[name]/page.tsx           # Pokémon specific type page
│   ├── globals.css                     # Application-wide global styles
│   ├── layout.tsx                      # Root layout file
│   └── page.tsx                        # App entry page
│
├── components/                 # Reusable React components
│   ├── ThemeToggle.tsx                 # Theme switcher component
│   ├── PokemonListDisplay.tsx          # Display Pokémon lists
│   ├── PokemonListItem.tsx             # Single Pokémon list item
│   └── ...                             # Other UI components (Pagination, Skeleton, etc.)
│
├── contexts/                   # React context providers
│   └── ThemeContext.tsx                # Dark/Light theme context
│
├── hooks/                      # Custom React hooks
│   └── usePokemonSearch.ts             # Logic for Pokémon search
│
├── lib/                        # Utility functions and helpers
│   ├── pokemon-utils.ts                # Pokémon utility functions
│   └── url-utils.ts                    # URL and Search management utilities
```
---

# API Documentation


### 1. Retrieve All Pokémon
**Endpoint:** `/api/pokemon`  
**Method:** `GET`  
**Description:** Fetch a paginated list of Pokémon.

**Query Parameters:**
- `offset` *(optional, number)* — starting index for pagination.

**Example:**
```bash
"http://localhost:3000/api/pokemon?offset=0"
```

---

### 2. Retrieve Pokémon by ID
**Endpoint:** `/api/pokemon/:id`  
**Method:** `GET`  
**Description:** Return detailed data for the Pokémon with the specified ID.

**Example:**
```bash
"http://localhost:3000/api/pokemon/1"
```

---

### 3. Search Pokémon by Partial Name
**Endpoint:** `/api/pokemon/search`  
**Method:** `GET`  
**Description:** Search for Pokémon by partial or full name.

**Query Parameters:**
- `q` *(required, string)* — search string.

**Example:**
```bash
"http://localhost:3000/api/pokemon/search?q=pika"
```

---

### 4. Retrieve Pokémon by Type
**Endpoint:** `/api/pokemon/types/:type`  
**Method:** `GET`  
**Description:** Fetch a list of Pokémon filtered by a specific type (e.g., `fire`, `water`, `grass`).

**Example:**
```bash
"http://localhost:3000/api/pokemon/types/fire"
```

---

# Utilities Documentation

## URL Utilities

The file `url-utils.ts` includes utility functions for managing URL parameters and building API requests.

#### 1. Reset Page and Search
**Function:** `resetPageAndSearch(searchParams: URLSearchParams, query?: string): URLSearchParams`  
**Description:** Resets the `page` parameter and updates the `search` query in the provided URLSearchParams object.

- **Parameters:**
    - `searchParams` *(URLSearchParams)* — The current URL's query parameters.
    - `query` *(string, optional)* — The new search query. If omitted, the `search` parameter is removed.

- **Returns:** Updated `URLSearchParams` object.

**Example:**
```typescript
const searchParams = new URLSearchParams('?search=pikachu&page=2');
const updatedParams = resetPageAndSearch(searchParams, 'charmander');
console.log(updatedParams.toString()); // "search=charmander"
```

---

#### 2. Update Page Parameter
**Function:** `updatePageParam(searchParams: URLSearchParams, page: number): URLSearchParams`  
**Description:** Updates or removes the `page` parameter in the given URLSearchParams object.

- **Parameters:**
    - `searchParams` *(URLSearchParams)* — The current URL's query parameters.
    - `page` *(number)* — The new page number. If the page is less than or equal to 1, the `page` parameter is removed.

- **Returns:** Updated `URLSearchParams` object.

**Example:**
```typescript
const searchParams = new URLSearchParams('?search=pikachu&page=2');
const updatedParams = updatePageParam(searchParams, 3);
console.log(updatedParams.toString()); // "search=pikachu&page=3"
```

---

#### 3. Build API URL
**Function:** `buildApiUrl(page?: number, searchQuery?: string): string`  
**Description:** Builds the API endpoint URL with optional pagination and search parameters.

- **Parameters:**
    - `page` *(number, optional)* — The current page number. Defaults to `1`.
    - `searchQuery` *(string, optional)* — The search keyword. Defaults to an empty string.

- **Returns:** A formatted string representing the API URL.

**Example:**
```typescript
const url = buildApiUrl(2, 'bulbasaur');
console.log(url); // "/api/pokemon/search?name=bulbasaur&offset=30"
```

---

#### Additional Notes:
- `ITEMS_LIMIT` is used to calculate the pagination offset. To change the number of items fetched per page, update this constant in the `pokemon-utils.ts` file.

---

## Pokémon Utilities

The file `pokemon-utils.ts` provides constants and utility functions for handling Pokémon data transformations, pagination, and type mappings.

---

#### 1. Pokémon API Base URL
**Constant:** `POKEAPI_BASE_URL`  
**Description:** Base URL for the official Pokémon API.  
**Value:** `https://pokeapi.co/api/v2`

---

#### 2. Items Limit
**Constant:** `ITEMS_LIMIT`  
**Description:** Number of items fetched per API request (used for pagination).  
**Value:** `12`

---

#### 3. Pokémon Type Icon Mapping
**Constant:** `typesIconMap`  
**Description:** Maps Pokémon types (e.g., `fire`, `water`, `grass`, etc.) to their corresponding icon file paths.

**Example:**
```javascript
console.log(typesIconMap['fire']); // "/pokemonTypeIcons/fire-icon.svg"
```

---

#### 4. Parse Pokémon List
**Function:** `parsePokemonList(data: { results: { name: string; url: string }[] }): PokemonListItem[]`  
**Description:** Transforms raw Pokémon API data into a simplified list format for Pokémon cards.

- **Parameters:**
    - `data` *(object)* — Pokémon data returned from the API, containing names and URLs.

- **Returns:** A list of Pokémon objects, including `id`, `name`, and `image` URL.

**Example:**
```javascript
const rawData = {
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" }
  ]
};
const parsedList = parsePokemonList(rawData);
console.log(parsedList);
// Output: 
// [
//   { id: 1, name: "bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
//   { id: 2, name: "ivysaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" }
// ]
```

---

#### 5. Transform Pokémon Data
**Function:** `transformPokemonData(pokemonRaw: PokemonRaw): Pokemon`  
**Description:** Converts raw Pokémon API data into a detailed Pokémon object, including stats, abilities, types, and images.

- **Parameters:**
    - `pokemonRaw` *(object)* — Raw data of a specific Pokémon returned from the API.

- **Returns:** A Pokémon object containing detailed data such as `id`, `name`, `types`, `abilities`, `stats`, `height`, and `weight`.

**Example:**
```javascript
const rawData = {
  id: 1,
  name: "bulbasaur",
  abilities: [
    { ability: { name: "overgrow" }, is_hidden: false },
    { ability: { name: "chlorophyll" }, is_hidden: true }
  ],
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } }
  ],
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    other: {
      "official-artwork": { front_default: "https://example.com/official-artwork.png" }
    }
  }
};
const detailedData = transformPokemonData(rawData);
console.log(detailedData);
// Output: 
// {
//   id: 1,
//   name: "bulbasaur",
//   image: "https://example.com/official-artwork.png",
//   types: ["grass", "poison"],
//   abilities: [
//     { name: "overgrow", isHidden: false },
//     { name: "chlorophyll", isHidden: true }
//   ],
//   stats: {
//     hp: 45,
//     attack: 49,
//     defense: 0,
//     specialAttack: 0,
//     specialDefense: 0,
//     speed: 0,
//     total: 94
//   },
//   height: 7,
//   weight: 6.9,
//   baseExperience: 64
// }
```

---

### Additional Notes:
- `typesIconMap` provides a visual reference for Pokémon types. You can use these icons for UI representation.
- The `ITEMS_LIMIT` constant is critical for controlling the number of Pokémon per page in API requests and pagination features.

---

# Type Definitions

The file `pokemon.ts` contains type definitions for Pokémon data structures, used throughout the application to maintain consistency and type safety.

---

### 1. Raw Pokémon Data
**Interface:** `PokemonRaw`  
**Description:** Represents unprocessed Pokémon data fetched from the PokeAPI.  
**Usage:** Used as an input for data transformation functions.

---

### 2. Processed Pokémon Data
**Interface:** `Pokemon`  
**Description:** Represents a detailed Pokémon object used within the application.  
**Usage:** Includes processed fields such as `types`, `abilities`, `stats`, and image URLs.

---

### 3. Simplified Pokémon List Data
**Interface:** `PokemonListItem`  
**Description:** Represents simplified data for rendering Pokémon in lists.  
**Fields Included:** `id`, `name`, and `image`.

---

### 4. Pokémon List Response
**Interface:** `PokemonListResponse`  
**Description:** Represents the structure for paginated Pokémon lists.  
**Fields Included:** Total `count` and array of `PokemonListItem`.

---

### 5. Pokémon Type Mapping
**Interface:** `PokemonType`  
**Description:** Maps Pokémon types (e.g., `fire`, `water`, `grass`) to corresponding properties or visual elements such as icons.

---

### 6. Pokémon Type Details
**Interface:** `PokemonTypeDetails`  
**Description:** Represents detailed data for a Pokémon type, such as damage relations, type-specific Pokémon, and moves.  
**Key Fields:**
- `damage_relations` — Relations with other types.
- `pokemon` — List of Pokémon by type.
- `moves` — Moves associated with the type.

---

### Additional Notes:
- Use `PokemonRaw` for raw API responses and transform it into `Pokemon` for application usage.
- The `PokemonListItem` is tailored for list views (e.g., grids or cards).
- `PokemonTypeDetails` is essential for implementing type matchups and battle-related logic.

---

# Interactive Tutorial using `driver.js`
This project includes an interactive tutorial powered by [driver.js](http://driverjs.com), a lightweight and user-friendly library for showcasing features in your web application.
#### Features
- Highlights key parts of the interface, making it easier for users to understand the app's functionality.
- Supports responsive behavior, offering tailored tooltips for both desktop and mobile layouts.
- Custom animations, overlays, and dynamic behavior based on user actions.

#### How It Works
The tutorial is implemented using the `TutorialDriver.tsx` component, which initializes `driver.js` and manages the tutorial steps. Upon triggering the tutorial (e.g., by clicking on a help icon), the library highlights specific elements of the UI and displays popovers explaining their functionality.
