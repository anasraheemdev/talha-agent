export type UploadResponse = {
  file_id: string;
  filename: string;
  content_type: string;
  extracted_text: string;
  message: string;
};

export type AnalysisResult = {
  summary: string;
  findings: string[];
  recommendations: string[];
  severity: 'low' | 'moderate' | 'high';
  confidence_score: number;
  patient_friendly_explanation: string;
};

export type AnalyzeResponse = {
  file_id: string;
  analysis: AnalysisResult;
  message: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatResponse = {
  file_id?: string;
  answer: string;
  source_text: string;
  message: string;
};
