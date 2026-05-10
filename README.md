# LabMind AI

**LabMind AI** is a polished AI-powered laboratory report assistant demo built as a futuristic healthcare startup MVP.

## Overview

LabMind AI enables users to upload laboratory reports, extract text via OCR, analyze lab values with OpenAI GPT-4.1, chat with the uploaded report, view severity metrics, and download a professional AI-generated report.

## Architecture

- Frontend: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Lucide React
- Backend: FastAPI, OpenAI SDK, pytesseract, pdfplumber, Pillow
- AI Model: OpenAI `gpt-4.1`

## Features

- Landing page with premium futuristic styling
- Dashboard with drag-and-drop file upload
- OCR extraction from images and PDFs
- GPT-4.1 structured report analysis
- Interactive report chat
- Animated severity meter
- Downloadable AI-generated summary PDF
- Ethical disclaimer on every page

## Setup

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Add your OpenAI API key to `.env`:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the app at `http://localhost:3000`.

## API Endpoints

- `GET /health`
- `POST /upload`
- `POST /analyze`
- `POST /chat`

## Deployment

- Frontend: Vercel or Netlify
- Backend: Render, Railway, or any container host

## Demo Data

Sample report text files are available in `frontend/public/demo-data/`.

## Notes

This system provides AI-assisted educational interpretations and is not a substitute for professional medical diagnosis.
