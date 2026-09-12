import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, CheckCircle2, Sparkles, X } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  steps: string[];
}

export const ZentroTutorials: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  const tutorials: Tutorial[] = [
    {
      id: 'meshy-workflow',
      title: 'How to Generate Game-Ready 3D Assets with Meshy AI',
      category: '3D & Generative AI',
      readTime: '6 min read',
      summary: 'Learn how to transform single 2D concept illustrations into fully textured, UV-unwrapped FBX and GLB files ready for Unity or Blender.',
      steps: [
        'Upload your front-facing character or prop sketch with clean outlines.',
        'Configure the Polycount budget (e.g. 5,000 tris for mobile vs 25,000 for PC).',
        'Enable PBR texturing to bake ambient occlusion, roughness, and normal maps automatically.',
        'Download the quad-topology model and import into your game engine scene.',
      ],
    },
    {
      id: 'emergent-fullstack',
      title: 'Building and Deploying a Web App in 10 Minutes with Emergent AI',
      category: 'AI App Builder',
      readTime: '8 min read',
      summary: 'Step-by-step walkthrough of turning natural conversational prompts into a working React frontend with integrated Postgres database persistence.',
      steps: [
        'Describe your app schema and core user stories in natural conversational terms.',
        'Iterate on the live UI preview directly in the sandbox browser tab.',
        'Attach Postgres tables and test authentication sessions.',
        'Connect your custom DNS domain and trigger production Cloud deployment.',
      ],
    },
    {
      id: 'proton-privacy',
      title: 'Complete Privacy Hardening: Setting Up Custom Domain with Proton Mail',
      category: 'Secure Email & Privacy',
      readTime: '7 min read',
      summary: 'Protect your professional identity from email spoofing, corporate tracking, and surveillance with end-to-end PGP encrypted mail.',
      steps: [
        'Add your domain inside the Proton Mail Admin console.',
        'Configure DNS verification TXT records with your domain registrar.',
        'Add MX, SPF (TXT), and DKIM records to guarantee 100% inbox delivery.',
        'Generate secure PGP encryption keys and activate password-protected external email links.',
      ],
    },
  ];

  return (
    <section id="tutorials" className="py-14 border-t border-slate-200/80 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200/80 px-2.5 py-1 rounded-full">
              Hands-On Guides
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              AI Tutorials & Engineering Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Field-tested walkthroughs to help you master new software tools quickly without wasting hours.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tut) => (
            <div
              key={tut.id}
              onClick={() => setSelectedTutorial(tut)}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {tut.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {tut.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {tut.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {tut.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                <span>Read step-by-step tutorial</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tutorial Modal */}
      {selectedTutorial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedTutorial(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  {selectedTutorial.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedTutorial.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedTutorial.readTime} · Verified by Zentro Editors</p>
              </div>
              <button
                onClick={() => setSelectedTutorial(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {selectedTutorial.summary}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Step-by-Step Implementation:
                </h4>
                <div className="space-y-3">
                  {selectedTutorial.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedTutorial(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 cursor-pointer"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
