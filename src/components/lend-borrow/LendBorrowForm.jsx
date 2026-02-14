import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import EmojiPickerPopup from "../EmojiPickerPopup.jsx";
import Input from "../Input.jsx";

const LendBorrowForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    personName: "",
    amount: "",
    date: "",
    dueDate: "",
    notes: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        type: type.toUpperCase(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EmojiPickerPopup icon={formData.icon} onSelect={(icon) => handleChange("icon", icon)} />

      <Input
        label={`${type} Purpose`}
        placeholder={`e.g., ${type === "lend" ? "Personal loan" : "Borrowed for rent"}`}
        value={formData.name}
        onChange={({ target }) => handleChange("name", target.value)}
      />

      <Input
        label={type === "lend" ? "Lent To" : "Borrowed From"}
        placeholder="Person name"
        value={formData.personName}
        onChange={({ target }) => handleChange("personName", target.value)}
      />

      <Input
        label="Amount"
        type="number"
        placeholder="e.g., 1000"
        value={formData.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Transaction Date"
          type="date"
          value={formData.date}
          onChange={({ target }) => handleChange("date", target.value)}
        />
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={({ target }) => handleChange("dueDate", target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
        <textarea
          value={formData.notes}
          onChange={({ target }) => handleChange("notes", target.value)}
          rows={3}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white"
          placeholder="Optional notes"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button type="button" onClick={handleSubmit} disabled={loading} className="add-btn add-btn-fill">
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>Save {type === "lend" ? "Lend" : "Borrow"} Entry</>
          )}
        </button>
      </div>
    </div>
  );
};

export default LendBorrowForm;
