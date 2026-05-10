'use client';

import { type ChangeEvent, type DragEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { uploadReport, analyzeReport, chatWithReport } from '../../lib/api';
import type { AnalysisResult, ChatMessage } from '../../types/api';

const severityMeta = {
  low: { label: 'Normal', color: 'bg-emerald-400/15 text-emerald-200', hue: 'from-emerald-400 to-cyan-400' },
  moderate: { label: 'Moderate concern', color: 'bg-amber-400/15 text-amber-200', hue: 'from-amber-400 to-cyan-400' },
  high: { label: 'Needs medical attention', color: 'bg-rose-400/15 text-rose-200', hue: 'from-rose-400 to-cyan-400' }
};

function severityScore(value: 'low' | 'moderate' | 'high') {
  if (value === 'low') return 25;
  if (value === 'moderate') return 65;
  return 95;
}

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('Upload a report to begin analysis.');

  const selectedSeverity = analysis?.severity || 'low';
  const severityInfo = severityMeta[selectedSeverity];

  const handleFileSelect = async (selectedFile: File) => {
    setError('');
    setLoading(true);
    setStatusMessage('Uploading report and extracting text...');
    try {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile));
      const response = await uploadReport(selectedFile);
      setFileId(response.file_id);
      setExtractedText(response.extracted_text || 'No text found in the file yet.');
      setAnalysis(null);
      setChatHistory([]);
      setStatusMessage('Report uploaded. Review the extracted text and run analysis.');
    } catch (err) {
      setError((err as Error).message);
      setStatusMessage('Upload failed. Try another file.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files?.[0]) {
      await handleFileSelect(event.dataTransfer.files[0]);
    }
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      await handleFileSelect(selectedFile);
    }
  };

  const startAnalysis = async () => {
    if (!fileId) {
      setError('Please upload a report first.');
      return;
    }
    setLoading(true);
    setStatusMessage('Analyzing report with GPT-4.1...');
    try {
      const response = await analyzeReport(fileId, extractedText);
      setAnalysis(response.analysis);
      setStatusMessage('Analysis complete. Explore findings and chat with the report.');
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setStatusMessage('Analysis failed. Check the backend logs or your OpenAI configuration.');
    } finally {
      setLoading(false);
    }
  };

  const sendChat = async () => {
    if (!fileId || !chatInput.trim()) {
      return;
    }
    setLoading(true);
    setStatusMessage('Generating AI response...');
    try {
      const question = chatInput.trim();
      const nextHistory = [...chatHistory, { role: 'user', content: question }];
      const response = await chatWithReport(fileId, question, nextHistory);
      nextHistory.push({ role: 'assistant', content: response.answer });
      setChatHistory(nextHistory);
      setChatInput('');
      setStatusMessage('Chat response ready. Keep asking report questions.');
      setError('');
    } catch (err) {
      setError((err as Error).message);
      setStatusMessage('Chat failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!analysis || !file) return;
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const lines = [
      'LabMind AI Report',
      '',
      `File: ${file.name}`,
      `Severity: ${analysis.severity.toUpperCase()}`,
      `Confidence: ${analysis.confidence_score.toFixed(0)}%`,
      '',
      'Summary:',
      analysis.summary,
      '',
      'Findings:',
      ...analysis.findings.map((item) => `- ${item}`),
      '',
      'Recommendations:',
      ...analysis.recommendations.map((item) => `- ${item}`),
      '',
      'Patient-friendly explanation:',
      analysis.patient_friendly_explanation,
      '',
      'Disclaimer: This system provides AI-assisted educational interpretations and is not a substitute for professional medical diagnosis.'
    ];
    let y = 40;
    doc.setFontSize(14);
    lines.forEach((line) => {
      const split = doc.splitTextToSize(line, 520);
      doc.text(split, 40, y);
      y += split.length * 18;
      if (y > 720) {
        doc.addPage();
        y = 40;
      }
    });
    doc.save(`LabMindAI_Report_${file.name.replace(/\W+/g, '_')}.pdf`);
  };

  const progressWidth = analysis ? `${severityScore(analysis.severity)}%` : '10%';
  const statusTone = error ? 'text-rose-300' : 'text-cyan-200';

  return (
    <main className="min-h-screen bg-cyber-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 rounded-[2rem] border border-cyan-400/10 bg-cyber-800/80 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">LabMind AI dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">AI Laboratory Report Intelligence</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Upload and analyze laboratory reports with GPT-4.1, ask the agent follow-up questions, and export polished summaries with a medical disclaimer.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-5 py-3 text-cyan-100 shadow-glow">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
              OpenAI GPT-4.1 online
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.9fr,_0.7fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.36em] text-cyan-300">Quick status</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-cyan-300/10 bg-cyan-400/10 p-4">
                  <p className="text-xs uppercase text-cyan-200">Current step</p>
                  <p className="mt-2 text-lg font-semibold text-white">{fileId ? 'Report loaded' : 'Awaiting upload'}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase text-slate-400">Connection</p>
                  <p className="mt-2 text-lg font-semibold text-white">GPT-4.1 ready</p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl bg-slate-950/20 p-4 text-sm text-slate-200">
                <p className={statusTone}>{statusMessage}</p>
                {error ? <p className="mt-2 text-rose-300">{error}</p> : null}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-cyan-400/10 bg-cyber-800/80 p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.36em] text-cyan-300">Severity meter</p>
              <div className="mt-6 rounded-3xl border border-cyan-300/10 bg-white/5 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <p>{analysis ? `${analysis.severity.toUpperCase()} risk` : 'No data yet'}</p>
                  <p>{analysis ? `${Math.min(100, Math.round(analysis.confidence_score))}%` : '0%'}</p>
                </div>
                <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full bg-gradient-to-r ${severityInfo.hue} transition-all duration-700`} style={{ width: progressWidth }} />
                </div>
                <p className={`mt-4 rounded-3xl ${severityInfo.color} p-3 text-sm`}>{analysis ? severityInfo.label : 'Upload a report to see severity.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr,_1.15fr]">
          <section className="space-y-6 rounded-[2rem] border border-cyan-400/10 bg-cyber-800/80 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Upload panel</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Drop your report anywhere.</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-sm text-cyan-200">
                <span className="text-xl">📄</span> Supported: PNG, JPG, JPEG, PDF
              </div>
            </div>
            <div
              onDrop={onDrop}
              onDragOver={(event) => event.preventDefault()}
              className="group relative rounded-[1.75rem] border border-dashed border-cyan-300/30 bg-white/5 px-6 py-14 text-center transition hover:border-cyan-400/60 hover:bg-white/10"
            >
              <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200 shadow-glow text-3xl">
                  <span>☁️</span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Drag & drop your report</p>
                  <p className="mt-2 text-sm text-slate-400">Or choose a file to upload and extract OCR text instantly.</p>
                </div>
                <label className="cursor-pointer rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Select File
                  <input type="file" accept="image/png,image/jpeg,application/pdf" className="sr-only" onChange={onFileChange} />
                </label>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.36em] text-cyan-300">File info</p>
                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  <p><span className="text-slate-100">Name:</span> {file?.name || 'No file selected'}</p>
                  <p><span className="text-slate-100">ID:</span> {fileId || '—'}</p>
                  <p><span className="text-slate-100">Status:</span> {analysis ? 'Ready for report export' : 'Awaiting analysis'}</p>
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.36em] text-cyan-300">Actions</p>
                <div className="mt-4 flex flex-col gap-3">
                  <button onClick={startAnalysis} className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60" disabled={!fileId || loading}>
                    Analyze Report
                  </button>
                  <button onClick={downloadReport} className="inline-flex items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 px-5 py-3 text-sm text-cyan-100 transition hover:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-60" disabled={!analysis}>
                    <span className="mr-2 text-cyan-200">⬇️</span> Download Summary
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-cyan-400/10 bg-cyber-800/80 p-6 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">OCR output</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Extracted report text</h2>
                </div>
                <div className="rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200">Preview</div>
              </div>
              <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 text-sm leading-6 text-slate-300">
                <pre className="whitespace-pre-wrap break-words">{extractedText || 'Upload a report to display extracted laboratory report text here.'}</pre>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.95fr,_1.05fr]">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-cyan-400/10 bg-cyber-800/80 p-6 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">AI intelligence</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Analysis & findings</h2>
                  </div>
                  <span className="text-cyan-200 text-xl">📊</span>
                </div>
                <div className="mt-5 space-y-6 text-slate-300">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="font-semibold text-white">Summary</p>
                    <p className="mt-3 text-sm leading-7">{analysis?.summary || 'Analyze the report to reveal a professional AI summary and severity insight.'}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="font-semibold text-white">Findings</p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                        {analysis?.findings.length ? analysis.findings.map((item, index) => <li key={index}>{item}</li>) : <li>No findings available yet.</li>}
                      </ul>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="font-semibold text-white">Recommendations</p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                        {analysis?.recommendations.length ? analysis.recommendations.map((item, index) => <li key={index}>{item}</li>) : <li>Start analysis to generate recommendations.</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-cyan-400/10 bg-cyber-800/80 p-6 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">AI chat</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Ask the lab report</h2>
                  </div>
                  <span className="text-cyan-200 text-xl">💬</span>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                    {chatHistory.length ? (
                      chatHistory.map((message, index) => (
                        <div key={index} className={`space-y-2 ${message.role === 'assistant' ? 'text-cyan-100' : 'text-slate-200'}`}>
                          <p className="text-xs uppercase tracking-[0.36em] text-slate-500">{message.role}</p>
                          <p>{message.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">Start a conversation about your report once analysis is complete.</p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <textarea
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                      rows={4}
                      placeholder="Ask about a lab value, abnormality, or next test."
                      className="min-h-[120px] w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:bg-slate-950"
                    />
                    <button
                      onClick={sendChat}
                      disabled={!fileId || loading}
                      className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? <span className="mr-2 text-cyan-200">⏳</span> : <span className="mr-2 text-cyan-200">✨</span>}
                      Send Question
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
