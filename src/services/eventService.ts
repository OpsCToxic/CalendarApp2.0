import axios from "axios";

const url = import.meta.env.VUE_APP_API_URL;

const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all events
 * @returns {Promise<Array>} A promise that resolves to an array of events
 */
export const getAllEvents = () => {
  return apiClient.get("/");
};

/**
 * Fetch a single event by ID
 * @param {Number} id - The ID of the event
 * @returns {Promise<Object>} A promise that resolves to the event object
 */
export const getEventById = (id) => {
  return apiClient.get(`/${id}`);
};

/**
 * Create a new event
 * @param {Object} event - The event data to create
 * @returns {Promise<Object>} A promise that resolves to the created event
 */
export const createEvent = (event) => {
  return apiClient.post("/", event);
};

/**
 * Update an existing event
 * @param {Number} id - The ID of the event to update
 * @param {Object} event - The updated event data
 * @returns {Promise<Object>} A promise that resolves to the updated event
 */
export const updateEvent = (id, event) => {
  return apiClient.put(`/${id}`, event);
};

/**
 * Delete an event
 * @param {Number} id - The ID of the event to delete
 * @returns {Promise<Object>} A promise that resolves to the deletion response
 */
export const deleteEvent = (id) => {
  return apiClient.delete(`/${id}`);
};
