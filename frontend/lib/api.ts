import { AnalyzeResponse, ChatResponse, ChatMessage, UploadResponse } from '../types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function safeJson(response: Response) {
  const body = await response.text();
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

export async function uploadReport(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    const error = await safeJson(response);
    throw new Error(error.detail || 'Upload failed');
  }
  return response.json();
}

export async function analyzeReport(fileId: string, reportText?: string): Promise<AnalyzeResponse> {
  const response = await fetch(`${BASE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file_id: fileId, report_text: reportText })
  });
  if (!response.ok) {
    const error = await safeJson(response);
    throw new Error(error.detail || 'Analysis failed');
  }
  return response.json();
}

export async function chatWithReport(fileId: string, question: string, history: ChatMessage[]): Promise<ChatResponse> {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file_id: fileId, question, history })
  });
  if (!response.ok) {
    const error = await safeJson(response);
    throw new Error(error.detail || 'Chat failed');
  }
  return response.json();
}
