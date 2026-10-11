import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Copy, Check, FileText, Code, MessageCircle } from 'lucide-react';
import { getShareableUrl } from '../utils/menuEncoder';
import { downloadHTML, downloadPDF } from '../utils/exportUtils';

export default function ExportPanel({ menuData, t }) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const qrRef = useRef(null);

  const shareUrl = getShareableUrl(menuData);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out our menu at ${menuData.restaurantName}!\n${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);

      const a = document.createElement('a');
      a.download = `${menuData.restaurantName.replace(/\s+/g, '_')}_QR.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = url;
  };

  const handleDownloadPDF = async () => {
    setExporting(true);
    try {
      await downloadPDF(menuData);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* QR Code */}
      <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{t.qrCodeTitle}</h3>
        <div ref={qrRef} className="inline-block p-4 bg-white rounded-lg">
          <QRCodeSVG
            value={shareUrl}
            size={200}
            level="M"
            fgColor="#1a1a2e"
            bgColor="#ffffff"
            imageSettings={{
              src: '/favicon.svg',
              x: undefined,
              y: undefined,
              height: 30,
              width: 30,
              excavate: true,
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{t.scanToView}</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-2">
        <button
          onClick={handleDownloadQR}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          {t.downloadQR}
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={exporting}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-dark text-white font-semibold rounded-lg hover:bg-dark-secondary transition-colors text-sm disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          {exporting ? '...' : t.downloadPDF}
        </button>

        <button
          onClick={() => downloadHTML(menuData)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dark text-dark font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          <Code className="w-4 h-4" />
          {t.downloadHTML}
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          {t.shareWhatsApp}
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? t.linkCopied : t.copyLink}
        </button>
      </div>
    </div>
  );
}
