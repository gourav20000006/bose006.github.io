import React, { useState } from 'react';

interface ProjectMockupProps {
  type:
    | 'ecommerce'
    | 'cleaning'
    | 'merging'
    | 'flipkart'
    | 'excel'
    | 'database'
    | 'fashion_pivot'
    | 'hr_attendance';
  title: string;
  software?: 'excel' | 'sheets';
  sheetName?: string;
  image?: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({
  type,
  title,
  software = type === 'ecommerce' ||
  type === 'merging' ||
  type === 'excel' ||
  type === 'fashion_pivot' ||
  type === 'hr_attendance'
    ? 'excel'
    : 'sheets',
  sheetName = software === 'excel' ? `${title.replace(/\s+/g, '_')}.xlsx` : `${title.replace(/\s+/g, '_')}.gsheet`,
  image,
}) => {
  const [viewMode, setViewMode] = useState<'sheet' | 'photo'>('sheet');
  const [activeSubTab, setActiveSubTab] = useState<'pivot' | 'raw'>('pivot');
  const isExcel = software === 'excel';

  // Specific formulas per case study
  const getFormula = () => {
    switch (type) {
      case 'ecommerce':
        return '=SUMIFS(Orders[Total Amount], Orders[Status], "Delivered", Orders[Category], "Protein")';
      case 'fashion_pivot':
        return '=GETPIVOTDATA("Sum of Revenue", $A$3, "Category", "Women\'s Kurtis")';
      case 'hr_attendance':
        return '=IF(AND(HOUR(D2)<=9, (E2-D2)*24>=8.5), "FullDay", "HalfDay")';
      case 'cleaning':
        return '=TRIM(PROPER(REGEXREPLACE(B2, "[^a-zA-Z0-9@. ]", "")))';
      case 'merging':
        return '=INDEX(Vendor_Pricing[Rate], MATCH(1, (Vendor_Pricing[SKU]=A2)*(Vendor_Pricing[Status]="Active"), 0))';
      case 'flipkart':
        return '=IF(AND(D2="Delivered", E2<=SLA_Target), "ON_TIME_100%", "DISPATCH_BREACH")';
      case 'excel':
        return '=SUMIFS(Sales_Data[Revenue], Sales_Data[Region], "East", Sales_Data[Quarter], "Q1")';
      case 'database':
        return '=QUERY(tbl_clients, "SELECT A, B, C, D WHERE D > 1000 ORDER BY D DESC LABEL D \'Volume\'")';
    }
  };

  return (
    <div className="w-full bg-[#18181b] text-neutral-100 rounded-lg border border-neutral-700/80 shadow-2xl overflow-hidden flex flex-col">
      {/* Top Application Title Bar */}
      <div
        className={`px-3 py-2 flex items-center justify-between text-xs select-none border-b ${
          isExcel
            ? 'bg-[#107c41] text-white border-[#0b5c30]'
            : 'bg-[#0F9D58] text-white border-[#0b7a44]'
        }`}
      >
        {/* Left: Software brand & filename */}
        <div className="flex items-center gap-2 font-sans truncate">
          <div className="w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] bg-white/20 shadow-inner">
            {isExcel ? 'X' : '田'}
          </div>
          <span className="font-semibold text-[13px] tracking-tight truncate">
            {sheetName}
          </span>
          <span className="hidden sm:inline-block text-[11px] opacity-80 font-normal">
            — {isExcel ? 'Microsoft Excel' : 'Google Sheets'}
          </span>
          <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-white/20 font-mono">
            AutoSave ON
          </span>
        </div>

        {/* Right: View Toggle (Sheet UI vs Photo Screenshot) & Window dots */}
        <div className="flex items-center gap-2">
          {image && (
            <div className="bg-black/30 rounded p-0.5 flex text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setViewMode('sheet')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  viewMode === 'sheet'
                    ? 'bg-white text-neutral-900 font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Sheet UI
              </button>
              <button
                type="button"
                onClick={() => setViewMode('photo')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  viewMode === 'photo'
                    ? 'bg-white text-neutral-900 font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Actual Sheet
              </button>
            </div>
          )}

          <div className="hidden sm:flex items-center space-x-1.5 opacity-80">
            <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      {viewMode === 'photo' && image ? (
        /* Actual Photographic / Screenshot View of the spreadsheet */
        <div className="relative w-full h-[280px] sm:h-[320px] bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={image}
            alt={`${title} spreadsheet capture`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/20">
            <span className="truncate">Source: Verified {isExcel ? 'Excel' : 'Google Sheets'} Dataset</span>
            <span className="text-emerald-400 font-bold whitespace-nowrap">99.8% Accuracy</span>
          </div>
        </div>
      ) : (
        /* Realistic Spreadsheet Application UI */
        <div className="bg-[#1e1e24] text-neutral-200 flex flex-col font-sans">
          {/* Software Ribbon / Menu Bar */}
          <div className="bg-[#27272a] border-b border-neutral-700/80 px-2 py-1 flex items-center gap-3 text-[11px] text-neutral-300 font-medium select-none overflow-x-auto">
            {isExcel ? (
              <>
                <span className="text-white font-bold bg-[#107c41] px-2 py-0.5 rounded-sm">File</span>
                <span className="text-white font-semibold border-b-2 border-[#107c41] pb-0.5">Home</span>
                <span className="hover:text-white">Insert</span>
                <span className="hover:text-white">Page Layout</span>
                <span className="hover:text-white">Formulas</span>
                <span className="hover:text-white">Data</span>
                <span className="hover:text-white">Review</span>
                <span className="hover:text-white">View</span>
              </>
            ) : (
              <>
                <span className="text-white font-semibold border-b-2 border-[#0F9D58] pb-0.5">File</span>
                <span className="hover:text-white">Edit</span>
                <span className="hover:text-white">View</span>
                <span className="hover:text-white">Insert</span>
                <span className="hover:text-white">Format</span>
                <span className="hover:text-white">Data</span>
                <span className="hover:text-white">Tools</span>
                <span className="hover:text-white">Extensions</span>
                <span className="hover:text-white">Help</span>
              </>
            )}
            <div className="ml-auto flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
              <span className="px-2 py-0.5 bg-neutral-800 rounded border border-neutral-700">100% Zoom</span>
            </div>
          </div>

          {/* Formula Bar */}
          <div className="bg-[#18181b] border-b border-neutral-800 px-3 py-1.5 flex items-center gap-2 text-xs font-mono">
            <span className="bg-[#27272a] text-neutral-300 px-2 py-0.5 rounded text-[11px] font-semibold border border-neutral-700 w-12 text-center">
              C2
            </span>
            <span className="text-emerald-400 font-bold italic text-sm">fx</span>
            <div className="flex-1 bg-[#27272a]/80 text-emerald-300 px-2 py-0.5 rounded text-[11px] truncate border border-neutral-700/60 selection:bg-emerald-900">
              {getFormula()}
            </div>
          </div>

          {/* Spreadsheet Data Grid */}
          <div className="overflow-x-auto text-[11px] font-mono">
            {type === 'ecommerce' && (
              <div className="flex flex-col">
                {/* Official Store KPI Summary Banner */}
                <div className="bg-neutral-900 border-b border-neutral-700/80 px-3 py-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-1.5 rounded bg-emerald-950/40 border border-emerald-800/40">
                    <span className="text-[10px] text-neutral-400 block font-mono">TOTAL REVENUE</span>
                    <span className="text-emerald-400 font-bold font-mono text-xs">₹15,06,779</span>
                  </div>
                  <div className="p-1.5 rounded bg-sky-950/40 border border-sky-800/40">
                    <span className="text-[10px] text-neutral-400 block font-mono">TOTAL ORDERS</span>
                    <span className="text-sky-400 font-bold font-mono text-xs">1,436 Orders</span>
                  </div>
                  <div className="p-1.5 rounded bg-purple-950/40 border border-purple-800/40">
                    <span className="text-[10px] text-neutral-400 block font-mono">UNITS SOLD</span>
                    <span className="text-purple-400 font-bold font-mono text-xs">2,301 Units</span>
                  </div>
                  <div className="p-1.5 rounded bg-amber-950/40 border border-amber-800/40">
                    <span className="text-[10px] text-neutral-400 block font-mono">DELIVERED</span>
                    <span className="text-amber-400 font-bold font-mono text-xs">1,280 Orders</span>
                  </div>
                </div>

                <table className="w-full border-collapse text-left text-[10px] sm:text-[11px]">
                  <thead>
                    <tr className="bg-[#27272a] text-neutral-400 border-b border-neutral-700 text-[10px]">
                      <th className="w-7 py-1 text-center border-r border-neutral-700">#</th>
                      <th className="py-1 px-2 border-r border-neutral-700">Order ID</th>
                      <th className="py-1 px-2 border-r border-neutral-700">Product Name</th>
                      <th className="py-1 px-2 border-r border-neutral-700">Brand</th>
                      <th className="py-1 px-2 border-r border-neutral-700">Category</th>
                      <th className="py-1 px-2 border-r border-neutral-700 text-right">Price (₹)</th>
                      <th className="py-1 px-2 border-r border-neutral-700 text-center">Qty</th>
                      <th className="py-1 px-2 border-r border-neutral-700 text-right">Disc</th>
                      <th className="py-1 px-2 border-r border-neutral-700 text-center">GST</th>
                      <th className="py-1 px-2 border-r border-neutral-700 text-right">Total</th>
                      <th className="py-1 px-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 font-mono">
                    <tr className="hover:bg-neutral-800/50">
                      <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">1</td>
                      <td className="px-2 py-1.5 font-bold text-sky-400 border-r border-neutral-800">OD260401001</td>
                      <td className="px-2 py-1.5 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[140px]">Whey Protein 1kg Chocolate</td>
                      <td className="px-2 py-1.5 text-neutral-300 border-r border-neutral-800 font-sans">Muscle Max</td>
                      <td className="px-2 py-1.5 text-neutral-400 border-r border-neutral-800">Protein</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800">₹1,999</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">1</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800 text-rose-400">₹500</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">18%</td>
                      <td className="px-2 py-1.5 text-right font-bold text-neutral-100 border-r border-neutral-800">₹1,999</td>
                      <td className="px-2 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Delivered</span></td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50">
                      <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">2</td>
                      <td className="px-2 py-1.5 font-bold text-sky-400 border-r border-neutral-800">OD260401002</td>
                      <td className="px-2 py-1.5 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[140px]">Creatine Monohydrate 250g</td>
                      <td className="px-2 py-1.5 text-neutral-300 border-r border-neutral-800 font-sans">Power Fuel</td>
                      <td className="px-2 py-1.5 text-neutral-400 border-r border-neutral-800">Sports Nutrition</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800">₹699</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800 font-bold text-sky-300">2</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800 text-rose-400">₹400</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">18%</td>
                      <td className="px-2 py-1.5 text-right font-bold text-neutral-100 border-r border-neutral-800">₹1,398</td>
                      <td className="px-2 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Delivered</span></td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50">
                      <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">3</td>
                      <td className="px-2 py-1.5 font-bold text-sky-400 border-r border-neutral-800">OD260401003</td>
                      <td className="px-2 py-1.5 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[140px]">Omega 3 Fish Oil 60 Caps</td>
                      <td className="px-2 py-1.5 text-neutral-300 border-r border-neutral-800 font-sans">Nutri Life</td>
                      <td className="px-2 py-1.5 text-neutral-400 border-r border-neutral-800">Vitamins</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800">₹549</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">1</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800 text-rose-400">₹150</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">18%</td>
                      <td className="px-2 py-1.5 text-right font-bold text-neutral-100 border-r border-neutral-800">₹549</td>
                      <td className="px-2 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Delivered</span></td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50">
                      <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">4</td>
                      <td className="px-2 py-1.5 font-bold text-sky-400 border-r border-neutral-800">OD260401004</td>
                      <td className="px-2 py-1.5 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[140px]">Daily Multivitamin 60 Tabs</td>
                      <td className="px-2 py-1.5 text-neutral-300 border-r border-neutral-800 font-sans">Health First</td>
                      <td className="px-2 py-1.5 text-neutral-400 border-r border-neutral-800">Multivitamins</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800">₹449</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">1</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800 text-rose-400">₹150</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">18%</td>
                      <td className="px-2 py-1.5 text-right font-bold text-neutral-100 border-r border-neutral-800">₹449</td>
                      <td className="px-2 py-1.5 text-right"><span className="bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.5 rounded text-[10px]">Shipped</span></td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50">
                      <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">5</td>
                      <td className="px-2 py-1.5 font-bold text-sky-400 border-r border-neutral-800">OD260401005</td>
                      <td className="px-2 py-1.5 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[140px]">Marine Collagen 200g</td>
                      <td className="px-2 py-1.5 text-neutral-300 border-r border-neutral-800 font-sans">Glow Well</td>
                      <td className="px-2 py-1.5 text-neutral-400 border-r border-neutral-800">Beauty</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800">₹999</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">1</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800 text-rose-400">₹300</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">18%</td>
                      <td className="px-2 py-1.5 text-right font-bold text-neutral-100 border-r border-neutral-800">₹999</td>
                      <td className="px-2 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Delivered</span></td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50">
                      <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">6</td>
                      <td className="px-2 py-1.5 font-bold text-sky-400 border-r border-neutral-800">OD260401007</td>
                      <td className="px-2 py-1.5 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[140px]">BCAA Powder 250g Orange</td>
                      <td className="px-2 py-1.5 text-neutral-300 border-r border-neutral-800 font-sans">Power Fuel</td>
                      <td className="px-2 py-1.5 text-neutral-400 border-r border-neutral-800">Sports Nutrition</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800">₹849</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">1</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800 text-rose-400">₹250</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">18%</td>
                      <td className="px-2 py-1.5 text-right font-bold text-neutral-100 border-r border-neutral-800">₹849</td>
                      <td className="px-2 py-1.5 text-right"><span className="bg-neutral-800 text-neutral-400 border border-neutral-700 px-1.5 py-0.5 rounded text-[10px]">Cancelled</span></td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50">
                      <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">7</td>
                      <td className="px-2 py-1.5 font-bold text-sky-400 border-r border-neutral-800">OD260401010</td>
                      <td className="px-2 py-1.5 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[140px]">Natural Peanut Butter 500g</td>
                      <td className="px-2 py-1.5 text-neutral-300 border-r border-neutral-800 font-sans">Fit Foods</td>
                      <td className="px-2 py-1.5 text-neutral-400 border-r border-neutral-800">Health Foods</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800">₹349</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800 font-bold text-sky-300">2</td>
                      <td className="px-2 py-1.5 text-right border-r border-neutral-800 text-rose-400">₹200</td>
                      <td className="px-2 py-1.5 text-center border-r border-neutral-800">12%</td>
                      <td className="px-2 py-1.5 text-right font-bold text-neutral-100 border-r border-neutral-800">₹698</td>
                      <td className="px-2 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Delivered</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {type === 'cleaning' && (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#27272a] text-neutral-400 border-b border-neutral-700 text-[10px]">
                    <th className="w-8 py-1 text-center border-r border-neutral-700">#</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">A (RAW_LEAD_NAME)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">B (STANDARDIZED)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">C (PHONE_E164)</th>
                    <th className="py-1 px-2.5 text-right">D (HYGIENE_STATUS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">1</td>
                    <td className="px-2.5 py-1.5 text-rose-300/80 border-r border-neutral-800">"  john dOE  "</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 font-semibold border-r border-neutral-800">John Doe</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">+91 98301 22910</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">✓ Cleaned</span></td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">2</td>
                    <td className="px-2.5 py-1.5 text-rose-300 border-r border-neutral-800 line-through">Priya_Sharma (Dup)</td>
                    <td className="px-2.5 py-1.5 text-neutral-500 border-r border-neutral-800">[DUPLICATE REMOVED]</td>
                    <td className="px-2.5 py-1.5 text-neutral-500 border-r border-neutral-800">MATCH #1402</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-rose-950 text-rose-400 border border-rose-800 px-1.5 py-0.5 rounded text-[10px]">✕ Purged</span></td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">3</td>
                    <td className="px-2.5 py-1.5 text-amber-300/80 border-r border-neutral-800">amit.k@gmaill.co</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 font-semibold border-r border-neutral-800">amit.k@gmail.com</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">+91 97482 10928</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.5 rounded text-[10px]">✓ Domain Fixed</span></td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">4</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">Kavita Sen</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 font-semibold border-r border-neutral-800">Kavita Sen</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">+91 94330 88219</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">✓ Verified</span></td>
                  </tr>
                </tbody>
              </table>
            )}

            {type === 'merging' && (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#27272a] text-neutral-400 border-b border-neutral-700 text-[10px]">
                    <th className="w-8 py-1 text-center border-r border-neutral-700">#</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">A (SOURCE_FEED)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">B (COMMON_KEY)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">C (VENDOR_NAME)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">D (QTY)</th>
                    <th className="py-1 px-2.5 text-right">E (SYNC_STATUS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">1</td>
                    <td className="px-2.5 py-1.5 text-sky-400 border-r border-neutral-800 font-semibold">Vendor_A (CSV)</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">PART-9901</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">Apex Supplies</td>
                    <td className="px-2.5 py-1.5 border-r border-neutral-800">1,250</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Matched 100%</span></td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">2</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 border-r border-neutral-800 font-semibold">Partner_B (Sheets)</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">PART-9902</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">Zenith Wholesale</td>
                    <td className="px-2.5 py-1.5 border-r border-neutral-800">3,400</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Matched 100%</span></td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">3</td>
                    <td className="px-2.5 py-1.5 text-amber-400 border-r border-neutral-800 font-semibold">POS_C (XLSX)</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">PART-9903</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">Retail Direct</td>
                    <td className="px-2.5 py-1.5 border-r border-neutral-800">890</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Reconciled</span></td>
                  </tr>
                </tbody>
              </table>
            )}

            {type === 'flipkart' && (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#27272a] text-neutral-400 border-b border-neutral-700 text-[10px]">
                    <th className="w-8 py-1 text-center border-r border-neutral-700">#</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">A (ORDER_ID)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">B (HUB_INBOUND)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">C (BARCODE_SCAN)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">D (DISPATCH_STATUS)</th>
                    <th className="py-1 px-2.5 text-right">E (SLA_TIME)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">1</td>
                    <td className="px-2.5 py-1.5 text-sky-400 border-r border-neutral-800 font-semibold">OD88392019482</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">Kolkata_Hub_04</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 border-r border-neutral-800 font-mono">BC-99201 [OK]</td>
                    <td className="px-2.5 py-1.5 border-r border-neutral-800"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Dispatched</span></td>
                    <td className="px-2.5 py-1.5 text-right font-bold text-emerald-400">22 mins (Target: 45)</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">2</td>
                    <td className="px-2.5 py-1.5 text-sky-400 border-r border-neutral-800 font-semibold">OD88392019483</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">Kolkata_Hub_04</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 border-r border-neutral-800 font-mono">BC-99202 [OK]</td>
                    <td className="px-2.5 py-1.5 border-r border-neutral-800"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Dispatched</span></td>
                    <td className="px-2.5 py-1.5 text-right font-bold text-emerald-400">18 mins (Target: 45)</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">3</td>
                    <td className="px-2.5 py-1.5 text-sky-400 border-r border-neutral-800 font-semibold">OD88392019484</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">Kolkata_Hub_04</td>
                    <td className="px-2.5 py-1.5 text-sky-400 border-r border-neutral-800 font-mono">BC-99203 [IN_BIN]</td>
                    <td className="px-2.5 py-1.5 border-r border-neutral-800"><span className="bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.5 rounded text-[10px]">Staged for Van</span></td>
                    <td className="px-2.5 py-1.5 text-right font-bold text-neutral-300">31 mins (Target: 45)</td>
                  </tr>
                </tbody>
              </table>
            )}

            {type === 'fashion_pivot' && (
              <div className="flex flex-col">
                {/* View Switcher: Pivot Table vs Raw Orders */}
                <div className="bg-[#202023] border-b border-neutral-700/80 px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('pivot')}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                        activeSubTab === 'pivot'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-neutral-800 text-neutral-300 hover:text-white'
                      }`}
                    >
                      📊 Pivot Table Summary (₹17.6L / 835 Units)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('raw')}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                        activeSubTab === 'raw'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-neutral-800 text-neutral-300 hover:text-white'
                      }`}
                    >
                      📋 Order Dispatch Log (24 Cities)
                    </button>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                    Sheet: Pivot_Sales_Summary
                  </span>
                </div>

                {activeSubTab === 'pivot' ? (
                  <table className="w-full border-collapse text-left text-[10px] sm:text-[11px]">
                    <thead>
                      <tr className="bg-[#27272a] text-neutral-300 border-b border-neutral-700 text-[10px]">
                        <th className="py-1 px-3 border-r border-neutral-700">Row Labels (Category & Product Name)</th>
                        <th className="py-1 px-3 border-r border-neutral-700 text-right">Sum of Qty</th>
                        <th className="py-1 px-3 text-right">Sum of Revenue (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 font-mono">
                      {/* Dresses Group */}
                      <tr className="bg-neutral-800/80 font-bold text-neutral-100">
                        <td className="px-3 py-1 text-sky-400 border-r border-neutral-700">▼ Dresses</td>
                        <td className="px-3 py-1 text-right text-sky-300 border-r border-neutral-700">119</td>
                        <td className="px-3 py-1 text-right text-emerald-400">₹2,75,215</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Casual Maxi Dress</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">56</td>
                        <td className="px-3 py-1 text-right">₹1,31,118</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Cotton Printed Dress</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">63</td>
                        <td className="px-3 py-1 text-right">₹1,44,097</td>
                      </tr>

                      {/* Kurta Sets Group */}
                      <tr className="bg-neutral-800/80 font-bold text-neutral-100">
                        <td className="px-3 py-1 text-sky-400 border-r border-neutral-700">▼ Kurta Sets</td>
                        <td className="px-3 py-1 text-right text-sky-300 border-r border-neutral-700">182</td>
                        <td className="px-3 py-1 text-right text-emerald-400">₹4,78,316</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Cotton Kurta Set</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">56</td>
                        <td className="px-3 py-1 text-right">₹1,20,314</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Palazzo Kurta Set</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">66</td>
                        <td className="px-3 py-1 text-right">₹2,05,092</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Straight Kurta Set</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">60</td>
                        <td className="px-3 py-1 text-right">₹1,52,910</td>
                      </tr>

                      {/* Women's Kurtis Group */}
                      <tr className="bg-neutral-800/80 font-bold text-neutral-100">
                        <td className="px-3 py-1 text-sky-400 border-r border-neutral-700">▼ Women's Kurtis</td>
                        <td className="px-3 py-1 text-right text-sky-300 border-r border-neutral-700">534</td>
                        <td className="px-3 py-1 text-right text-emerald-400">₹10,06,542</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Anarkali Kurti</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">67</td>
                        <td className="px-3 py-1 text-right">₹1,30,691</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Chikankari Kurti</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">78</td>
                        <td className="px-3 py-1 text-right">₹1,81,860</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Embroidered Kurti</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">57</td>
                        <td className="px-3 py-1 text-right">₹86,913</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Festive Kurti</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">86</td>
                        <td className="px-3 py-1 text-right">₹1,96,636</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Floral Cotton Kurti</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">114</td>
                        <td className="px-3 py-1 text-right">₹1,93,358</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Printed A-Line Kurti</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">63</td>
                        <td className="px-3 py-1 text-right">₹1,06,981</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Rayon Printed Kurti</td>
                        <td className="px-3 py-1 text-right border-r border-neutral-800">69</td>
                        <td className="px-3 py-1 text-right">₹1,10,103</td>
                      </tr>

                      {/* Grand Total */}
                      <tr className="bg-emerald-950/60 font-bold text-white border-t-2 border-emerald-500">
                        <td className="px-3 py-1.5 border-r border-neutral-700">Grand Total (Full Apparel Catalog)</td>
                        <td className="px-3 py-1.5 text-right text-sky-300 border-r border-neutral-700">835 Units</td>
                        <td className="px-3 py-1.5 text-right text-emerald-300 text-xs">₹17,60,073</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full border-collapse text-left text-[10px] sm:text-[11px]">
                    <thead>
                      <tr className="bg-[#27272a] text-neutral-400 border-b border-neutral-700 text-[10px]">
                        <th className="py-1 px-2.5 border-r border-neutral-700">Order ID</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700">Date</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700">SKU</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700">Product Name</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700">Destination</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700 text-center">Qty</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700 text-right">Total</th>
                        <th className="py-1 px-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 font-mono">
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">MS2606001</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800">01-06-2026</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">SKU101</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[130px]">Floral Cotton Kurti</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">Delhi, DL</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800">1</td>
                        <td className="px-2.5 py-1 text-right text-emerald-400 border-r border-neutral-800">₹799</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">Delivered</span></td>
                      </tr>
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">MS2606002</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800">01-06-2026</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">SKU102</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[130px]">Rayon Printed Kurti</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">Jaipur, RJ</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800">2</td>
                        <td className="px-2.5 py-1 text-right text-emerald-400 border-r border-neutral-800">₹2,996</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">Delivered</span></td>
                      </tr>
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">MS2606003</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800">02-06-2026</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">SKU103</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[130px]">Anarkali Kurti</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">Lucknow, UP</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800">1</td>
                        <td className="px-2.5 py-1 text-right text-emerald-400 border-r border-neutral-800">₹1,199</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">Delivered</span></td>
                      </tr>
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">MS2606004</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800">02-06-2026</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">SKU104</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[130px]">Straight Kurta Set</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">Noida, UP</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800">1</td>
                        <td className="px-2.5 py-1 text-right text-emerald-400 border-r border-neutral-800">₹1,699</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">Delivered</span></td>
                      </tr>
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">MS2606005</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800">03-06-2026</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">SKU105</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans truncate max-w-[130px]">Embroidered Kurti</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">Pune, MH</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800">1</td>
                        <td className="px-2.5 py-1 text-right text-rose-400 border-r border-neutral-800">₹999</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-rose-950 text-rose-400 border border-rose-800 px-1.5 py-0.5 rounded text-[9px]">Returned</span></td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {type === 'hr_attendance' && (
              <div className="flex flex-col">
                {/* View Switcher: Headcount Matrix vs Daily Shift Log */}
                <div className="bg-[#202023] border-b border-neutral-700/80 px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('pivot')}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                        activeSubTab === 'pivot'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-neutral-800 text-neutral-300 hover:text-white'
                      }`}
                    >
                      👥 Headcount Pivot Matrix (483 Total Staff)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('raw')}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                        activeSubTab === 'raw'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-neutral-800 text-neutral-300 hover:text-white'
                      }`}
                    >
                      ⏰ Biometric Punch & Shift Attendance Log
                    </button>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                    Sheet: Staff_Attendance_Audit
                  </span>
                </div>

                {activeSubTab === 'pivot' ? (
                  <table className="w-full border-collapse text-left text-[10px] sm:text-[11px]">
                    <thead>
                      <tr className="bg-[#27272a] text-neutral-300 border-b border-neutral-700 text-[10px]">
                        <th className="py-1 px-3 border-r border-neutral-700">Department / Role Breakdown</th>
                        <th className="py-1 px-3 text-right">Headcount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 font-mono">
                      {/* Finance Department */}
                      <tr className="bg-neutral-800/80 font-bold text-neutral-100">
                        <td className="px-3 py-1 text-sky-400 border-r border-neutral-700">▼ Finance Department</td>
                        <td className="px-3 py-1 text-right text-emerald-400">252</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Accountant</td>
                        <td className="px-3 py-1 text-right">21</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Accounts Executive</td>
                        <td className="px-3 py-1 text-right">21</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Audit & Cost Analysts</td>
                        <td className="px-3 py-1 text-right">42</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">FP&A Analyst & MIS</td>
                        <td className="px-3 py-1 text-right">42</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Senior Accountant & Treasury</td>
                        <td className="px-3 py-1 text-right">42</td>
                      </tr>

                      {/* Sales Department */}
                      <tr className="bg-neutral-800/80 font-bold text-neutral-100">
                        <td className="px-3 py-1 text-sky-400 border-r border-neutral-700">▼ Sales Department</td>
                        <td className="px-3 py-1 text-right text-emerald-400">231</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Sales Executive (Field Core)</td>
                        <td className="px-3 py-1 text-right text-sky-300 font-bold">63</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Business Executive & Channel Mgr</td>
                        <td className="px-3 py-1 text-right">42</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Key Account & Regional Coordinators</td>
                        <td className="px-3 py-1 text-right">42</td>
                      </tr>
                      <tr className="hover:bg-neutral-800/40 text-neutral-300">
                        <td className="pl-7 pr-3 py-1 border-r border-neutral-800 font-sans">Sales Strategist & Territory Mgr</td>
                        <td className="px-3 py-1 text-right">42</td>
                      </tr>

                      {/* Grand Total */}
                      <tr className="bg-emerald-950/60 font-bold text-white border-t-2 border-emerald-500">
                        <td className="px-3 py-1.5 border-r border-neutral-700">Total Audited Employee Headcount</td>
                        <td className="px-3 py-1.5 text-right text-emerald-300 text-xs">483 Staff</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full border-collapse text-left text-[10px] sm:text-[11px]">
                    <thead>
                      <tr className="bg-[#27272a] text-neutral-400 border-b border-neutral-700 text-[10px]">
                        <th className="py-1 px-2.5 border-r border-neutral-700">Emp ID</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700">Employee Name</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700">Department</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700">Designation</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700 text-center">Punch In</th>
                        <th className="py-1 px-2.5 border-r border-neutral-700 text-center">Punch Out</th>
                        <th className="py-1 px-2.5 text-right">Status Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 font-mono">
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">E001</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans">Mr Rahul Sharma</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">Sales</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800 font-sans">Sales Executive</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-emerald-400">09:05</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-neutral-300">18:10</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">FullDay</span></td>
                      </tr>
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">E002</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans">Ms Anita Verma</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">HR</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800 font-sans">HR Manager</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-emerald-400">08:55</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-neutral-300">17:45</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">FullDay</span></td>
                      </tr>
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">E003</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans">Mr Rohit Gupta</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">IT</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800 font-sans">IT Analyst</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-amber-400">09:00</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-amber-400">11:00</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-amber-950 text-amber-400 border border-amber-800 px-1.5 py-0.5 rounded text-[9px]">HalfDay</span></td>
                      </tr>
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">E004</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans">Mr Sumit Kumar</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">Finance</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800 font-sans">Finance Accountant</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-emerald-400">09:10</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-neutral-300">18:00</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">FullDay</span></td>
                      </tr>
                      <tr className="hover:bg-neutral-800/50">
                        <td className="px-2.5 py-1 text-sky-400 font-bold border-r border-neutral-800">E005</td>
                        <td className="px-2.5 py-1 text-neutral-200 border-r border-neutral-800 font-sans">Ms Pooja Sharma</td>
                        <td className="px-2.5 py-1 text-neutral-300 border-r border-neutral-800">Sales</td>
                        <td className="px-2.5 py-1 text-neutral-400 border-r border-neutral-800 font-sans">Sales Coordinator</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-emerald-400">09:15</td>
                        <td className="px-2.5 py-1 text-center border-r border-neutral-800 text-neutral-300">18:00</td>
                        <td className="px-2.5 py-1 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">FullDay</span></td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {type === 'excel' && (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#27272a] text-neutral-400 border-b border-neutral-700 text-[10px]">
                    <th className="w-8 py-1 text-center border-r border-neutral-700">#</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">A (METRIC_NAME)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">B (CURRENT_Q)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">C (PREVIOUS_Q)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">D (VARIANCE %)</th>
                    <th className="py-1 px-2.5 text-right">E (FORMULA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">1</td>
                    <td className="px-2.5 py-1.5 font-bold text-neutral-100 border-r border-neutral-800">Gross Merchandise Value</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 font-semibold border-r border-neutral-800">₹42,85,000</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">₹36,20,000</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 font-bold border-r border-neutral-800">+18.4% ▲</td>
                    <td className="px-2.5 py-1.5 text-right text-neutral-400 text-[10px] font-mono">=(B2-C2)/C2</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">2</td>
                    <td className="px-2.5 py-1.5 font-bold text-neutral-100 border-r border-neutral-800">Inventory Turnover Ratio</td>
                    <td className="px-2.5 py-1.5 text-sky-400 font-semibold border-r border-neutral-800">6.8x / Year</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">5.2x / Year</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 font-bold border-r border-neutral-800">+30.7% ▲</td>
                    <td className="px-2.5 py-1.5 text-right text-neutral-400 text-[10px] font-mono">=COGS/AvgInv</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">3</td>
                    <td className="px-2.5 py-1.5 font-bold text-neutral-100 border-r border-neutral-800">Order Processing Hours</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 font-semibold border-r border-neutral-800">0.75 hrs/wk</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">8.00 hrs/wk</td>
                    <td className="px-2.5 py-1.5 text-emerald-400 font-bold border-r border-neutral-800">-90.6% (Fast)</td>
                    <td className="px-2.5 py-1.5 text-right text-neutral-400 text-[10px] font-mono">=VLOOKUP_Pivot</td>
                  </tr>
                </tbody>
              </table>
            )}

            {type === 'database' && (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#27272a] text-neutral-400 border-b border-neutral-700 text-[10px]">
                    <th className="w-8 py-1 text-center border-r border-neutral-700">#</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">A (CLIENT_ID [PK])</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">B (COMPANY_NAME)</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">C (LINKED_ORDERS [FK])</th>
                    <th className="py-1 px-2.5 border-r border-neutral-700">D (SNAPSHOT_BACKUP)</th>
                    <th className="py-1 px-2.5 text-right">E (INTEGRITY_CHECK)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">1</td>
                    <td className="px-2.5 py-1.5 font-mono text-sky-400 font-bold border-r border-neutral-800">CL-10492</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">Horizon Retail Corp</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">14 Orders (Active)</td>
                    <td className="px-2.5 py-1.5 text-neutral-400 border-r border-neutral-800">Cloud Synced 03:00 UTC</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">✓ Zero Nulls</span></td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">2</td>
                    <td className="px-2.5 py-1.5 font-mono text-sky-400 font-bold border-r border-neutral-800">CL-10493</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">Vanguard Logistics</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">38 Orders (Active)</td>
                    <td className="px-2.5 py-1.5 text-neutral-400 border-r border-neutral-800">Cloud Synced 03:00 UTC</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">✓ Zero Nulls</span></td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="text-center py-1.5 text-neutral-500 bg-[#27272a]/40 border-r border-neutral-700/60">3</td>
                    <td className="px-2.5 py-1.5 font-mono text-sky-400 font-bold border-r border-neutral-800">CL-10494</td>
                    <td className="px-2.5 py-1.5 text-neutral-200 border-r border-neutral-800">Sterling Goods Ltd</td>
                    <td className="px-2.5 py-1.5 text-neutral-300 border-r border-neutral-800">22 Orders (Active)</td>
                    <td className="px-2.5 py-1.5 text-neutral-400 border-r border-neutral-800">Cloud Synced 03:00 UTC</td>
                    <td className="px-2.5 py-1.5 text-right"><span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px]">✓ Zero Nulls</span></td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Excel / Google Sheets Bottom Tabs & Status Bar */}
          <div className="bg-[#18181b] border-t border-neutral-700/80 px-3 py-1.5 flex items-center justify-between text-[11px] text-neutral-400 font-mono select-none">
            <div className="flex items-center gap-1">
              <span
                className={`px-3 py-0.5 rounded-t text-[11px] font-medium border-t-2 ${
                  isExcel
                    ? 'bg-[#27272a] text-white border-[#107c41]'
                    : 'bg-[#27272a] text-white border-[#0F9D58]'
                }`}
              >
                Sheet1
              </span>
              <span className="px-2.5 py-0.5 text-neutral-500 hover:text-neutral-300 cursor-pointer">
                Pivot_Report
              </span>
              <span className="px-2.5 py-0.5 text-neutral-500 hover:text-neutral-300 cursor-pointer">
                Raw_Archive
              </span>
              <span className="px-1 text-neutral-600 font-bold hover:text-white cursor-pointer">+</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[10px] text-neutral-400">
              <span>Ready</span>
              <span className="text-neutral-600">|</span>
              <span>Count: 1,000+</span>
              <span className="text-neutral-600">|</span>
              <span className="text-emerald-400 font-semibold">100% Validated</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
