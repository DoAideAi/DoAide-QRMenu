import { QrCode, Palette, Zap, Share2 } from 'lucide-react';

const features = [
  { icon: Zap, titleKey: 'feature1Title', descKey: 'feature1Desc', color: 'bg-teal-100 text-teal-600' },
  { icon: Palette, titleKey: 'feature2Title', descKey: 'feature2Desc', color: 'bg-purple-100 text-purple-600' },
  { icon: QrCode, titleKey: 'feature3Title', descKey: 'feature3Desc', color: 'bg-blue-100 text-blue-600' },
  { icon: Share2, titleKey: 'feature4Title', descKey: 'feature4Desc', color: 'bg-green-100 text-green-600' },
];

export default function LandingPage({ onGetStarted, t }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-secondary text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/30 rounded-full px-4 py-1.5 mb-6">
          <QrCode className="w-4 h-4 text-brand" />
          <span className="text-sm font-medium text-brand">100% Free — No Signup</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
          <span className="text-brand">DoAide</span>
          <span className="text-gray-400 mx-2">|</span>
          <span className="text-white">QRMenu</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-2">{t.tagline}</p>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">{t.heroDescription}</p>

        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 bg-brand text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-brand-dark transition-all hover:scale-105 shadow-lg shadow-brand/25"
        >
          {t.getStarted}
        </button>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, titleKey, descKey, color }) => (
            <div key={titleKey} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className={`inline-flex p-3 rounded-lg ${color} mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">{t[titleKey]}</h3>
              <p className="text-gray-400 text-sm">{t[descKey]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Preview */}
      <div className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="w-64 bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700 mx-auto">
            <div className="bg-gray-800 h-5 flex justify-center">
              <div className="w-16 h-3 bg-gray-700 rounded-b-lg" />
            </div>
            <div className="p-4 space-y-2">
              <div className="h-8 bg-brand/20 rounded-lg flex items-center justify-center">
                <span className="text-brand text-xs font-bold">My Restaurant</span>
              </div>
              <div className="h-5 bg-gray-800 rounded w-24" />
              <div className="space-y-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-gray-800 rounded-lg flex items-center px-3 justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm border border-green-500" />
                      <div className={`h-2 bg-gray-600 rounded ${i === 1 ? 'w-16' : i === 2 ? 'w-20' : 'w-14'}`} />
                    </div>
                    <div className="h-4 w-8 bg-brand rounded text-[8px] flex items-center justify-center text-white font-bold">₹249</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 h-3 flex justify-center">
              <div className="w-16 h-1 bg-gray-600 rounded-full mt-1" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">{t.subtitle}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10">
        <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-3">
          <span className="text-xs font-medium text-brand">A DoAide Product</span>
        </div>
        <p className="text-gray-500 text-sm">
          <a href="https://doaide.com" className="text-brand hover:text-brand-light" target="_blank" rel="noopener noreferrer">doaide.com</a>
        </p>
      </div>
    </div>
  );
}
