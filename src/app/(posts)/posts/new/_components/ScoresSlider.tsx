import type { CSSProperties } from "react";

import { ScoreKey } from "./PostForm";

interface Props {
  id: ScoreKey;
  label: string;
  value: string;
  onChange: (key: ScoreKey, value: string) => void;
}

export function ScoreSlider({ id, label, value, onChange }: Props) {
  const progress = `${(Number(value) / 5) * 100}%`;
  const sliderStyle = {
    "--range-progress": progress,
  } as CSSProperties;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
        <span className="text-sm font-semibold text-gray-600">
          {Number(value).toFixed(1)}
        </span>
      </div>
      <input
        id={id}
        name={id}
        type="range"
        step="0.5"
        min="0"
        max="5"
        required
        className="w-full score-slider"
        value={value}
        style={sliderStyle}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  );
}
