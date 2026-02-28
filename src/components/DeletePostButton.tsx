"use client";

import { TrashIcon } from "@/components/icons";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { deletePost } from "@/app/(posts)/posts/[postId]/_components/actions/deletePost";

type Props = {
  postId: number;
  authorUserId: string;
  redirectTo?: string;
};

export function DeletePostButton({ postId, authorUserId, redirectTo }: Props) {
  const [canDelete, setCanDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkOwnPost = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const currentUserId = data.user?.id;
        if (!isMounted) return;

        if (currentUserId && currentUserId === authorUserId) {
          setCanDelete(true);
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkOwnPost();

    return () => {
      isMounted = false;
    };
  }, [authorUserId]);

  if (!canDelete) {
    return null;
  }

  const handleConfirmDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deletePost({ postId, userId: authorUserId });

      if (!result.success) {
        setError(result.message ?? "投稿の削除に失敗しました。");
        return;
      }

      setIsOpen(false);

      if (redirectTo) {
        router.replace(redirectTo);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <>
      <button
        type="button"
        aria-label="投稿を削除"
        className="inline-flex items-center justify-center rounded-full p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
        onClick={() => setIsOpen(true)}
      >
        <TrashIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-base font-semibold text-gray-900">
              投稿を削除しますか？
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              この操作は取り消せません。よろしければ「削除する」を押してください。
            </p>
            {error && (
              <p className="mb-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                キャンセル
              </button>
              <button
                type="button"
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                onClick={handleConfirmDelete}
                disabled={isPending}
              >
                {isPending ? "削除中..." : "削除する"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


