import axios from "axios";

const API = axios.create({
  baseURL: "https://ticketing-api-wd0x.onrender.com"
});

export const getTickets = () => {
  return API.get("/tickets");
};

export const getTicket = (id) => {
  return API.get(`/tickets/${id}`);
};

export const createTicket = (ticket) => {
  return API.post("/tickets", ticket);
};

export const updateTicket = (id, ticket) => {
  return API.put(`/tickets/${id}`, ticket);
};

export const deleteTicket = (id) => {
  return API.delete(`/tickets/${id}`);
};