import { Globe, QrCode } from 'lucide-react';

export default function Header({ t, lang, setLang }) {
  return (
    <header className="bg-dark text-white px-4 py-3 flex items-center justify-between no-print">
      <div className="flex items-center gap-2">
        <QrCode className="w-7 h-7 text-brand" />
        <div>
          <h1 className="text-lg font-bold leading-tight">
            <span className="text-brand">DoAide</span>
            <span className="text-gray-400 mx-1">|</span>
            <span className="text-white">QRMenu</span>
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-gray-400" />
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          className="bg-dark-secondary text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-brand"
        >
          <option value="en">{t.english}</option>
          <option value="hi">{t.hindi}</option>
        </select>
      </div>
    </header>
  );
}
