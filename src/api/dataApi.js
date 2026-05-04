import apiClient from "./axiosConfig";

// Hämta alla items från API
export async function getAll(game = "botw") {
	try {
		const response = await apiClient.get("/compendium/all", {
			params: { game },
		});
		// API:et returnerar data i response.data.data
		return response.data.data;
	} catch (error) {
		throw new Error(`Failed to fetch data: ${error.message}`);
	}
}

// Hämta en specifik item via id
export async function getById(id, game = "botw") {
	try {
		const response = await apiClient.get(`/compendium/entry/${id}`, {
			params: { game },
		});
		return response.data.data;
	} catch (error) {
		throw new Error(`Failed to fetch item: ${error.message}`);
	}
}


// Skapa ny item (hanteras i state, ej API)
export function create(data) {
	// Handled in React state, not via API
	throw new Error("Create is handled in state, not via API");
}

// Uppdatera befintlig item (hanteras i state, ej API)
export function update(id, data) {
	// Handled in React state, not via API
	throw new Error("Update is handled in state, not via API");
}

// Ta bort item (hanteras i state, ej API)
export function remove(id) {
	// Handled in React state, not via API
	throw new Error("Delete is handled in state, not via API");
}
