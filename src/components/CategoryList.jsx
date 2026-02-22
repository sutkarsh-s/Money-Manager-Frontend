import { memo } from "react";
import { Layers2, Pencil } from "lucide-react";
import EmptyState from "./ui/EmptyState.jsx";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Category Sources</h4>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Add some categories to organize your income and expenses."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3.5 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all border border-transparent hover:border-purple-100 dark:hover:border-purple-800/40"
            >
              <div className="w-12 h-12 flex items-center justify-center text-xl bg-gray-100 dark:bg-gray-700 rounded-xl flex-shrink-0">
                {category.icon ? (
                  <img src={category.icon} alt={category.name} className="h-5 w-5" />
                ) : (
                  <Layers2 className="text-purple-600 dark:text-purple-400" size={22} />
                )}
              </div>

              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 capitalize">
                    {category.type}
                  </p>
                </div>
                <button
                  onClick={() => onEditCategory(category)}
                  className="p-2 rounded-lg text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  aria-label={`Edit ${category.name}`}
                >
                  <Pencil size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(CategoryList);
