import { useState, useEffect } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import { Input } from "@mm/shared";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories, initialData, isEditing }) => {
    const [expense, setExpense] = useState({
        id: "",
        name: "",
        categoryId: "",
        amount: "",
        date: "",
        icon: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && initialData) {
            const dateValue = initialData.date
                ? new Date(initialData.date).toISOString().split("T")[0]
                : "";
            setExpense({
                id: initialData.id ?? "",
                name: initialData.name ?? "",
                categoryId: initialData.categoryId ?? initialData.category?.id ?? "",
                amount: initialData.amount ?? "",
                date: dateValue,
                icon: initialData.icon ?? "",
            });
        } else {
            setExpense({
                id: "",
                name: "",
                categoryId: "",
                amount: "",
                date: "",
                icon: "",
            });
        }
    }, [isEditing, initialData]);

    useEffect(() => {
        if (categories && categories.length > 0 && !expense.categoryId && !isEditing) {
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, expense.categoryId, isEditing]);

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    };

    const categoryOptions = (categories || []).map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Expense Source"
                placeholder="e.g., Electricity, Wifi"
                type="text"
            />

            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({ target }) => handleChange("categoryId", target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="e.g., 150.00"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        isEditing ? "Update Expense" : "Add Expense"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
