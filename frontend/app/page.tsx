'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Download, Sparkles, UploadCloud } from 'lucide-react';

const features = [
  {
    title: 'Smart OCR extraction',
    description: 'Upload lab reports and instantly extract structured text from PDFs and medical images.',
    icon: UploadCloud
  },
  {
    title: 'GPT-4.1 powered insight',
    description: 'Generate educational summaries, explain abnormalities, and suggest next lab tests.',
    icon: Cpu
  },
  {
    title: 'Interactive report chat',
    description: 'Ask the agent questions about your uploaded report with report-aware context.',
    icon: Sparkles
  },
  {
    title: 'Doctor-ready summary export',
    description: 'Create polished AI-generated report summaries with clear findings and severity ratings.',
    icon: Download
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cyber-900 text-slate-100 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(28,211,255,0.16),_transparent_20%)]" />
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-white/5 px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl shadow-glow">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
              LabMind AI · Medical report intelligence
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-cyan-200">
            <Link href="#features" className="transition hover:text-white">
              Features
            </Link>
            <Link href="#workflow" className="transition hover:text-white">
              Workflow
            </Link>
            <Link href="/dashboard" className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-400/20">
              Dashboard
            </Link>
          </nav>
        </header>

        <section className="relative z-10 grid gap-10 pt-20 lg:grid-cols-[1.05fr,_0.95fr] lg:items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 shadow-soft"
            >
              <Sparkles className="h-5 w-5 text-cyan-300" />
              Futuristic AI lab report assistant
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6"
            >
              <h1 className="text-5xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-6xl">
                AI-Powered Laboratory Intelligence
              </h1>
              <p className="max-w-xl text-lg text-slate-300 sm:text-xl">
                Upload medical laboratory reports and receive AI-assisted interpretations, summaries, and insights instantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Get Started
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
              <a href="#workflow" className="inline-flex items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm text-cyan-100 transition hover:border-cyan-300/50 hover:bg-white/10">
                Upload Report
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-gradient-to-br from-cyber-800/80 to-cyber-900/90 p-8 shadow-glow"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(8,240,255,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.14),_transparent_22%)]" />
            <div className="relative space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.36em] text-cyan-200">Live dashboard preview</p>
                <div className="mt-4 rounded-3xl border border-cyan-400/10 bg-cyber-900/90 p-4 text-slate-300 shadow-glow">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Report: CBC-2026.pdf</span>
                    <span>Severity: Moderate</span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-cyan-300/10 bg-cyan-400/5 p-4">
                      <p className="text-sm font-semibold text-white">Summary</p>
                      <p className="mt-2 text-sm text-slate-300">AI highlights elevated WBC and low hemoglobin with patient-friendly guidance.</p>
                    </div>
                    <div className="rounded-3xl border border-cyan-300/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">Chat</p>
                      <p className="mt-2 text-sm text-slate-300">Ask what high WBC means or what follow-up tests are recommended.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl border border-cyan-300/10 bg-cyan-400/10 p-4 text-center text-cyan-200">
                  <p className="text-sm uppercase tracking-[0.32em]">OCR</p>
                  <p className="mt-3 text-3xl font-semibold">99%</p>
                </div>
                <div className="rounded-3xl border border-cyan-300/10 bg-white/5 p-4 text-center text-slate-200">
                  <p className="text-sm uppercase tracking-[0.32em]">GPT-4.1</p>
                  <p className="mt-3 text-3xl font-semibold">Secure</p>
                </div>
                <div className="rounded-3xl border border-cyan-300/10 bg-cyan-400/10 p-4 text-center text-cyan-200">
                  <p className="text-sm uppercase tracking-[0.32em]">Report</p>
                  <p className="mt-3 text-3xl font-semibold">Download</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="relative z-10 mt-24 space-y-10">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Features</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">A complete AI lab assistant with premium tools.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group rounded-[1.75rem] border border-cyan-400/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl hover:-translate-y-1 hover:border-cyan-300/30"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-200 transition group-hover:bg-cyan-400/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="workflow" className="relative z-10 mt-24 grid gap-10 lg:grid-cols-[0.8fr,_1.2fr] lg:items-center">
          <div className="space-y-6 rounded-[2rem] border border-cyan-400/10 bg-cyber-800/80 p-8 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Workflow</p>
            <h2 className="text-3xl font-semibold text-white">Smooth upload-to-insight flow.</h2>
            <p className="text-slate-300">
              Drag and drop your lab reports, review AI-extracted findings, explore interactive chat, and export a polished professional report with a single workflow.
            </p>
            <div className="grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/5 bg-white/5 p-4">
                <p className="font-semibold text-white">1. Upload</p>
                <p className="mt-2">Send your PDF or image and extract the lab text instantly.</p>
              </div>
              <div className="rounded-3xl border border-white/5 bg-white/5 p-4">
                <p className="font-semibold text-white">2. Analyze</p>
                <p className="mt-2">Let GPT-4.1 generate findings, recommendations, and severity ratings.</p>
              </div>
              <div className="rounded-3xl border border-white/5 bg-white/5 p-4">
                <p className="font-semibold text-white">3. Chat</p>
                <p className="mt-2">Ask context-aware questions about your report.</p>
              </div>
              <div className="rounded-3xl border border-white/5 bg-white/5 p-4">
                <p className="font-semibold text-white">4. Export</p>
                <p className="mt-2">Download a professional AI-generated summary with a strong disclaimer.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-gradient-to-br from-cyber-800/80 to-cyber-900/90 p-8 shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.12),_transparent_20%)]" />
            <div className="relative space-y-6 text-slate-200">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Demo panel</p>
              <div className="space-y-4 rounded-3xl border border-cyan-300/10 bg-white/5 p-6">
                <p className="text-sm font-semibold text-white">Report summary</p>
                <p className="leading-7 text-slate-300">
                  Elevated WBC count may indicate inflammation or infection. Hemoglobin is slightly below normal. AI suggests follow-up iron studies and a renal panel. This tool is educational only and not medical advice.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-cyan-300/10 bg-cyan-400/5 p-4">
                  <p className="text-xs uppercase tracking-[0.32em] text-cyan-200">Severity</p>
                  <p className="mt-3 text-3xl font-semibold text-white">Moderate</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-300">Confidence</p>
                  <p className="mt-3 text-3xl font-semibold text-white">92%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mt-24 rounded-[2rem] border border-cyan-400/10 bg-cyber-800/80 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Ethical disclaimer</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Educational analysis only — not a medical diagnosis.</h2>
            </div>
            <p className="max-w-2xl text-slate-300">
              This system provides AI-assisted educational interpretations and is not a substitute for professional medical diagnosis. Always consult a licensed medical professional for clinical concerns.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
