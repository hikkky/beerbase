"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Camera, Coffee, RefreshCw, X } from "lucide-react";
import { BeerStyles } from "@/components/BeerStyles";

const beerStyles = [
  "IPA",
  "Lager",
  "Pilsner",
  "Stout",
  "Sour",
  "Wheat",
  "Pale Ale",
  "Hazy IPA",
  "Porter",
  "Amber Ale",
  "Saison",
  "Barley Wine",
  "Belgian Ale",
  "その他",
];

type RadarKey = "body" | "aroma" | "bitterness" | "sweetness" | "sharpness";

const radarFields: { key: RadarKey; label: string }[] = [
  { key: "bitterness", label: "苦味" },
  { key: "aroma", label: "香り" },
  { key: "sweetness", label: "甘み" },
  { key: "body", label: "コク" },
  { key: "sharpness", label: "キレ" },
];

type FormData = {
  number: string;
  name: string;
  country: string;
  brewery: string;
  style: string;
  abv: string;
  ibu: string;
  photoUrl: string; // Keeping photoUrl for now, though App.tsx used file upload preview
  radar: Record<RadarKey, number>;
  comment: string;
};

const initialState: FormData = {
  number: "",
  name: "",
  country: "",
  brewery: "",
  style: "",
  abv: "",
  ibu: "",
  photoUrl: "",
  radar: {
    bitterness: 3,
    aroma: 3,
    sweetness: 3,
    body: 3,
    sharpness: 3,
  },
  comment: "",
};

export function PostForm() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const key = name as RadarKey;
    setFormData((prev) => ({
      ...prev,
      radar: { ...prev.radar, [key]: Number(value) },
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // In a real app, you'd upload this file and get a URL.
        // For now, we'll just use the data URL as a placeholder if needed,
        // but the form still has a photoUrl input for manual entry.
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("success");
    // Here you would typically send the data to your backend
    console.log("Submitting:", formData);
    setTimeout(() => setStatus("idle"), 2400);
  };

  const resetForm = () => {
    setFormData(initialState);
    setImagePreview(null);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#fdfbf7] shadow-2xl p-6 border-l border-gray-200 font-hand text-gray-700 relative">
      <BeerStyles />
      
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
          <Coffee className="w-5 h-5 text-orange-500" />
          ビアノートを編集
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 画像アップロード */}
        <div className="group relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-white hover:border-orange-300 transition-all cursor-pointer bg-gray-50 overflow-hidden">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
          ) : (
            <>
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-orange-500 transition-colors" />
              <p className="text-sm text-gray-500">写真を選択または撮影</p>
            </>
          )}
        </div>

        {/* URL Input fallback */}
        <div className="hidden">
           <input
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="Or enter Image URL"
          />
        </div>

        {/* 基本情報 */}
        <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <label className="text-xs font-bold text-gray-500 mb-1 block">No.</label>
              <input 
                type="text" 
                name="number" 
                value={formData.number} 
                onChange={handleChange} 
                className="w-full border-b border-gray-300 py-1 focus:border-orange-400 focus:outline-none bg-transparent font-eng-hand" 
                placeholder="001"
              />
            </div>
            <div className="col-span-3">
              <label className="text-xs font-bold text-gray-500 mb-1 block">ビール名</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full border-b border-gray-300 py-1 focus:border-orange-400 focus:outline-none bg-transparent font-serif font-bold" 
                placeholder="Beer Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">生産地</label>
              <input 
                type="text" 
                name="country" 
                value={formData.country} 
                onChange={handleChange} 
                className="w-full border-b border-gray-300 py-1 focus:border-orange-400 focus:outline-none bg-transparent text-sm" 
                placeholder="Japan"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">醸造所</label>
              <input 
                type="text" 
                name="brewery" 
                value={formData.brewery} 
                onChange={handleChange} 
                className="w-full border-b border-gray-300 py-1 focus:border-orange-400 focus:outline-none bg-transparent text-sm" 
                placeholder="Brewery Name"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">スタイル</label>
            <input 
                type="text" 
                name="style" 
                value={formData.style} 
                onChange={handleChange} 
                list="style-options"
                className="w-full border-b border-gray-300 py-1 focus:border-orange-400 focus:outline-none bg-transparent text-sm" 
                placeholder="Select or type style"
              />
              <datalist id="style-options">
                {beerStyles.map(style => <option key={style} value={style} />)}
              </datalist>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">ABV (%)</label>
              <input 
                type="number" 
                step="0.1"
                name="abv" 
                value={formData.abv} 
                onChange={handleChange} 
                className="w-full border-b border-gray-300 py-1 focus:border-orange-400 focus:outline-none bg-transparent font-eng-hand text-center" 
                placeholder="5.0"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">IBU</label>
              <input 
                type="number" 
                step="1"
                name="ibu" 
                value={formData.ibu} 
                onChange={handleChange} 
                className="w-full border-b border-gray-300 py-1 focus:border-orange-400 focus:outline-none bg-transparent font-eng-hand text-center" 
                placeholder="20"
              />
            </div>
          </div>
        </div>

        {/* チャート入力 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-600">味わいチャート</h3>
            <button 
              type="button"
              className="text-gray-400 hover:text-orange-500" 
              onClick={() => setFormData(prev => ({...prev, radar: initialState.radar}))}
            >
              <RefreshCw size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {radarFields.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3 text-sm">
                <span className="w-16 text-gray-500 font-medium text-xs">
                  {label}
                </span>
                <input 
                  type="range" min="0" max="5" 
                  name={key}
                  value={formData.radar[key]} 
                  onChange={handleRadarChange}
                  className="flex-1 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-orange-500"
                />
                <span className="w-4 font-eng-hand text-right text-gray-600">{formData.radar[key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* コメント */}
        <div>
          <label className="text-xs font-bold text-gray-500 mb-2 block">メモ・感想</label>
          <textarea 
            name="comment" 
            rows={3}
            value={formData.comment} 
            onChange={handleChange} 
            className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-orange-400 focus:outline-none resize-none shadow-sm"
            placeholder="どんな味でしたか？"
          />
        </div>

        <div className="flex gap-3">
          <button 
            type="submit" 
            className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors shadow-lg"
          >
            書き込み完了
          </button>
           <button 
            type="button" 
            onClick={resetForm}
            className="px-4 py-3 rounded-lg border border-gray-300 font-bold hover:bg-gray-50 transition-colors"
          >
            リセット
          </button>
        </div>
        
        {status === "success" && (
          <p className="text-center text-sm text-green-600 font-bold animate-pulse">
            保存しました！
          </p>
        )}
      </form>
    </div>
  );
}
