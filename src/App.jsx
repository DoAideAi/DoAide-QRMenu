import { useState, useEffect } from 'react';
import { Eye, Pencil, Share2 } from 'lucide-react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import MenuBuilder from './components/MenuBuilder';
import LivePreview from './components/LivePreview';
import ExportPanel from './components/ExportPanel';
import MenuViewer from './components/MenuViewer';
import { translations } from './data/i18n';
import { createSampleMenu } from './data/sampleMenu';
import { decodeMenuFromHash } from './utils/menuEncoder';

const TABS = [
  { id: 'builder', icon: Pencil, labelKey: 'menuBuilder' },
  { id: 'preview', icon: Eye, labelKey: 'livePreview' },
  { id: 'export', icon: Share2, labelKey: 'exportShare' },
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('builder');
  const [menuData, setMenuData] = useState(() => createSampleMenu('en'));

  const t = translations[lang] || translations.en;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#menu=')) {
      const encoded = hash.slice(6);
      const decoded = decodeMenuFromHash(encoded);
      if (decoded) {
        setMenuData(decoded);
        setPage('viewer');
      }
    }
  }, []);

  if (page === 'viewer') {
    return <MenuViewer menuData={menuData} />;
  }

  if (page === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setPage('builder')}
        t={t}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header t={t} lang={lang} setLang={setLang} />

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex border-b border-gray-200 bg-white no-print">
        {TABS.map(({ id, icon: Icon, labelKey }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
              activeTab === id
                ? 'text-brand border-b-2 border-brand bg-teal-50/50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {t[labelKey]}
          </button>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Builder Panel */}
        <div className={`lg:w-[420px] lg:border-r border-gray-200 bg-white overflow-y-auto ${
          activeTab !== 'builder' ? 'hidden lg:block' : ''
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4 lg:mb-4">
              <h2 className="text-lg font-bold text-gray-800 hidden lg:block">{t.menuBuilder}</h2>
              <button
                onClick={() => setPage('landing')}
                className="text-sm text-gray-500 hover:text-brand transition-colors"
              >
                {t.backToHome}
              </button>
            </div>
            <MenuBuilder menuData={menuData} setMenuData={setMenuData} t={t} lang={lang} />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 bg-gray-100 overflow-y-auto ${
          activeTab !== 'preview' ? 'hidden lg:block' : ''
        }`}>
          <div className="p-4 lg:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 hidden lg:block">{t.livePreview}</h2>
            <LivePreview menuData={menuData} t={t} />
          </div>
        </div>

        {/* Export Panel */}
        <div className={`lg:w-[320px] lg:border-l border-gray-200 bg-white overflow-y-auto ${
          activeTab !== 'export' ? 'hidden lg:block' : ''
        }`}>
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4 hidden lg:block">{t.exportShare}</h2>
            <ExportPanel menuData={menuData} t={t} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-center py-3 no-print">
        <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-3 py-1 mb-1">
          <span className="text-[10px] font-medium text-brand">A DoAide Product</span>
        </div>
        <p className="text-xs text-gray-500">
          <a href="https://doaide.com" className="text-brand hover:text-brand-light" target="_blank" rel="noopener noreferrer">
            doaide.com
          </a>
        </p>
      </footer>
    </div>
  );
}
