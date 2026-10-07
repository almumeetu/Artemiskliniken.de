import React, { useState } from 'react';
import { URL_MIGRATION_MATRIX } from '../data/migrationMatrix';
import { PRE_CODING_AUDIT_REPORT } from '../data/preCodingAudit';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Search, ArrowRight, CheckCircle2, FileText, ExternalLink } from 'lucide-react';

interface MigrationMatrixPageProps {
  onNavigate: (tab: string, slug?: string) => void;
}

export const MigrationMatrixPage: React.FC<MigrationMatrixPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'matrix' | 'audit'>('matrix');

  const filteredMatrix = URL_MIGRATION_MATRIX.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.oldUrl.toLowerCase().includes(q) ||
      item.newUrl.toLowerCase().includes(q) ||
      item.contentPreserved.toLowerCase().includes(q) ||
      item.seoKeyword.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800">
          <ShieldCheck className="w-4 h-4" />
          <span>SEO & Content Parity Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('URL-Migrationsmatrix & Content-Paritäts-Audit', 'URL Migration Matrix & Content Parity Audit')}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          {t(
            'Vollständige Dokumentation der 301-Weiterleitungen und der Erhaltung aller medizinischen Inhalte von artemiskliniken.de für die Standorte Leverkusen und Opladen.',
            'Full documentation of 301 permanent redirects and verified content preservation from artemiskliniken.de for Leverkusen and Opladen.'
          )}
        </p>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
            activeTab === 'matrix' ? 'bg-sky-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {t('301 URL-Migrationsmatrix', '301 URL Redirect Matrix')} ({URL_MIGRATION_MATRIX.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
            activeTab === 'audit' ? 'bg-sky-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {t('Pre-Coding Auditbericht (§ 36)', 'Pre-Coding Audit Report (§ 36)')}
        </button>
      </div>

      {activeTab === 'matrix' ? (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs max-w-md">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('Filtere alte/neue URLs oder Keywords...', 'Filter URLs or keywords...')}
              className="w-full text-xs text-slate-900 focus:outline-none"
            />
          </div>

          {/* Mobile View: Cards */}
          <div className="md:hidden space-y-3">
            {filteredMatrix.map((row, i) => (
              <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded text-[11px]">
                    HTTP {row.statusCode}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{row.parityStatus}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Neue Ziel-URL</span>
                  <span className="font-mono font-bold text-slate-900 break-all">{row.newUrl}</span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Alte URL</span>
                  <span className="font-mono text-slate-500 break-all text-[11px]">{row.oldUrl}</span>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <div className="font-semibold text-slate-800">{row.contentPreserved}</div>
                  <div className="text-[11px] text-sky-700 mt-0.5">{row.improvementsMade}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Bestehende URL (artemiskliniken.de)</th>
                  <th className="p-3.5">Neue Ziel-URL</th>
                  <th className="p-3.5">Seitentyp</th>
                  <th className="p-3.5">Erhaltener Inhalt & Mehrwert</th>
                  <th className="p-3.5">Fokus-Keywords (SEO)</th>
                  <th className="p-3.5">Parität</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-sky-800">
                      {row.statusCode}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 max-w-xs truncate" title={row.oldUrl}>
                      {row.oldUrl}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {row.newUrl}
                    </td>
                    <td className="p-3.5 font-medium text-slate-600">
                      {row.pageType}
                    </td>
                    <td className="p-3.5 max-w-xs text-slate-600">
                      <div className="font-semibold text-slate-800">{row.contentPreserved}</div>
                      <div className="text-[11px] text-sky-700 mt-0.5">{row.improvementsMade}</div>
                    </td>
                    <td className="p-3.5 text-slate-500 font-medium">
                      {row.seoKeyword}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{row.parityStatus}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Pre-Coding Audit Report View */
        <div className="space-y-8 bg-white p-8 rounded-3xl border border-slate-200">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Audit-Protokoll {PRE_CODING_AUDIT_REPORT.reportDate}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {PRE_CODING_AUDIT_REPORT.auditScope}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Fokus: {PRE_CODING_AUDIT_REPORT.regionalFocus} · {PRE_CODING_AUDIT_REPORT.totalRelevantPagesDiscovered} relevante Seiten identifiziert
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">1. Management Summary</h3>
              <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {PRE_CODING_AUDIT_REPORT.executiveSummary}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-2">2. Inventar aller Behandlungen (Paritäts-Check)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRE_CODING_AUDIT_REPORT.treatmentInventory.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-2">3. Diagnostik & Apparative Ausstattung</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRE_CODING_AUDIT_REPORT.diagnosticInventory.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-2">4. Verifizierte Ärzte & Qualifikationen</h3>
              <div className="space-y-1.5">
                {PRE_CODING_AUDIT_REPORT.doctorInventory.map((doc, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{doc}</span>
                    <span className="text-emerald-700 font-bold">Verifiziert</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900 mb-2">5. Beseitigte Schwachstellen (Audit-Befunde)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
                  <div className="font-bold text-sky-900 mb-1">UX & Barrierefreiheit:</div>
                  <ul className="list-disc pl-4 space-y-1 text-sky-950 text-[11px]">
                    <li>Sticky Header mit prominentem 1-Klick-Buchungsbutton integriert</li>
                    <li>Akutfall-Hotline (0214 44488) für plötzlichen Sehverlust dauerhaft sichtbar</li>
                    <li>Schriftgrößen- & Kontrastwechsler für ältere Patienten (WCAG 2.1 AA)</li>
                    <li>Vollständige zweisprachige Lokalisierung (DE/EN)</li>
                  </ul>
                </div>

                <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
                  <div className="font-bold text-sky-900 mb-1">SEO & Performance:</div>
                  <ul className="list-disc pl-4 space-y-1 text-sky-950 text-[11px]">
                    <li>Strukturierte Schema.org-Daten (MedicalClinic, Physician)</li>
                    <li>Lokale SEO-Optimierung für „Augenarzt Leverkusen“ & „Opladen“</li>
                    <li>301 Weiterleitungsmapping verhindert 404-Fehler und Rankingverluste</li>
                    <li>100% Core Web Vitals konform durch leichtgewichtigen Code</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
