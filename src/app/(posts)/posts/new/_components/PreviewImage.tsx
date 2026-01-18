interface Props {
  previewUrl: string;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function PreviewImage({ previewUrl, onRemove }: Props) {
  return (
    <>
      <img
        src={previewUrl}
        alt="選択した画像のプレビュー"
        className="h-48 w-full object-cover"
      />
      <button
        type="button"
        aria-label="選択した画像を削除"
        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-800"
        onClick={onRemove}
      >
        ×
      </button>
    </>
  );
}
