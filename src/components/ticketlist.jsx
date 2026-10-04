import { useEffect, useState } from "react";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../api";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "LOW",
    status: "OPEN",
    category: "GENERAL",
  });

  const [editingId, setEditingId] = useState(null);

  // Get all tickets
  const loadTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTickets();
      setTickets(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  // Form input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create / Update ticket
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (editingId) {
        await updateTicket(editingId, form);
        alert("Ticket updated successfully");
      } else {
        await createTicket(form);
        alert("Ticket created successfully");
      }

      setForm({
        title: "",
        description: "",
        priority: "LOW",
        status: "OPEN",
        category: "GENERAL",
      });

      setEditingId(null);
      await loadTickets();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to save ticket");
      }
    }
  };

  // Edit ticket
  const handleEdit = (ticket) => {
    setEditingId(ticket.id);

    setForm({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      category: ticket.category,
    });
  };

  // Delete ticket
  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteTicket(id);

      alert("Ticket deleted successfully");

      await loadTickets();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to delete ticket");
      }
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);

    setForm({
      title: "",
      description: "",
      priority: "LOW",
      status: "OPEN",
      category: "GENERAL",
    });
  };

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  return (
    <div>
      <h2>{editingId ? "Update Ticket" : "Create Ticket"}</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <br />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description:</label>
          <br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Priority:</label>
          <br />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <br />

        <div>
          <label>Status:</label>
          <br />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        <br />

        <div>
          <label>Category:</label>
          <br />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="TECHNICAL">TECHNICAL</option>
            <option value="BILLING">BILLING</option>
            <option value="GENERAL">GENERAL</option>
          </select>
        </div>

        <br />

        <button type="submit">
          {editingId ? "Update Ticket" : "Create Ticket"}
        </button>

        {editingId && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <h3>{ticket.title}</h3>

            <p>
              <strong>Description:</strong> {ticket.description}
            </p>

            <p>
              <strong>Priority:</strong> {ticket.priority}
            </p>

            <p>
              <strong>Status:</strong> {ticket.status}
            </p>

            <p>
              <strong>Category:</strong> {ticket.category}
            </p>

            <button onClick={() => handleEdit(ticket)}>
              Edit
            </button>

            <button onClick={() => handleDelete(ticket.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TicketList;