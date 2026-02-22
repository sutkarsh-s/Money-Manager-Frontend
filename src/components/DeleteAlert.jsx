import { memo, useState } from "react";
import { LoaderCircle, AlertTriangle } from "lucide-react";

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/30 mb-4">
        <AlertTriangle className="w-7 h-7 text-red-500" aria-hidden />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{content}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          type="button"
          className="btn-danger inline-flex items-center justify-center gap-2 w-auto px-6"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(DeleteAlert);
