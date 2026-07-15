# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) system for Healthcare Professionals (HCPs) built as part of the Round 1 Technical Assignment.

The application enables medical representatives to log interactions using either a structured form or a conversational AI assistant powered by **LangGraph** and an **LLM**.

---

# Features

## AI Chat Assistant
- Conversational interaction logging
- Intent detection
- AI-generated summaries
- Entity extraction
- Follow-up recommendations

## Structured Interaction Form
- Doctor Name
- Hospital
- Products
- Summary
- Follow-up
- Outcome

## LangGraph AI Agent

The AI Agent manages the interaction workflow using LangGraph.

Implemented Tools:

1. Log Interaction
2. Edit Interaction
3. Search Interaction
4. Generate Summary
5. Follow-up Recommendation

---

# Tech Stack

## Frontend

- React
- Redux Toolkit
- React Router
- Axios
- React Markdown
- CSS

## Backend

- FastAPI
- LangGraph
- SQLAlchemy
- Pydantic

## AI

- LangGraph
- LLM (Gemini/Groq compatible)

## Database

- SQLite (Development)

> The project is designed to be compatible with PostgreSQL/MySQL for production deployment.

---

# Project Structure

```
ai-first-crm-hcp/

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── routes/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── graph/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── db/
│   │
│   └── main.py
│
└── README.md
```

---

# LangGraph Workflow

```
User Input
      │
      ▼
Intent Detection
      │
      ▼
LangGraph Router
      │
 ┌────┼─────┬─────┬─────┐
 ▼    ▼     ▼     ▼     ▼
Log  Edit Search Summary Follow-up
      │
      ▼
Database
      │
      ▼
AI Response
```

---

# AI Tools

## 1. Log Interaction

Captures interaction details and stores them in the database.

Features

- Intent Detection
- Entity Extraction
- AI Summary
- Database Storage

---

## 2. Edit Interaction

Allows modification of previously logged interactions.

---

## 3. Search Interaction

Searches interactions using keywords.

---

## 4. Summary Tool

Generates concise summaries of previous interactions.

---

## 5. Follow-up Recommendation

Provides:

- Recommended Next Action
- Priority
- Suggested Follow-up Date
- Reason

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Sumit-kumar1-stack/ai-first-crm-hcp.git

cd ai-first-crm-hcp
```

---

# Backend Setup

```bash
cd backend

python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn app.main:app --reload
```

Backend

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# Environment Variables

Backend

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL=sqlite:///./crm.db

GOOGLE_API_KEY=YOUR_GEMINI_API_KEY

LLM_PROVIDER=gemini
```

> If using Groq:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY

MODEL_NAME=gemma2-9b-it
```

---

# API Endpoints

## AI Agent

```
POST /agent/chat
```

---

## Interactions

```
POST   /interactions

GET    /interactions

PUT    /interactions/{id}

DELETE /interactions/{id}

GET    /interactions/search
```

---

## Analytics

```
GET /analytics/dashboard
```

---

# Screens

- Login
- Dashboard
- AI Chat
- History
- Analytics
- Settings

---

# Assignment Requirements Covered

- React + Redux
- FastAPI
- LangGraph
- AI-first Interaction Logging
- Structured Form
- Conversational Chat
- Five LangGraph Tools
- CRUD Operations
- Dashboard
- Analytics

---

# Future Improvements

- Authentication & Authorization
- File Upload Support
- Voice Input
- Multi-user Support
- PostgreSQL/MySQL Production Database
- Role-Based Access Control
- Deployment on Cloud

---

# Author

**Sumit Kumar**

GitHub:
https://github.com/Sumit-kumar1-stack

---

# Repository

https://github.com/Sumit-kumar1-stack/ai-first-crm-hcp

---

# License

This project was developed as part of a technical assignment for interview evaluation.
