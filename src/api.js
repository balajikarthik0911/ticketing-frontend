import axios from "axios";

const API = axios.create({
  baseURL: "https://ticketing-api-wd0x.onrender.com",
});

// Get all tickets
export const getTickets = () => {
  return API.get("/api/tickets");
};

// Get one ticket
export const getTicket = (id) => {
  return API.get(`/api/tickets/${id}`);
};

// Create a ticket
export const createTicket = (ticket) => {
  return API.post("/api/tickets", ticket);
};

// Update a ticket
export const updateTicket = (id, ticket) => {
  return API.put(`/api/tickets/${id}`, ticket);
};

// Delete a ticket
export const deleteTicket = (id) => {
  return API.delete(`/api/tickets/${id}`);
};