import type { MenuItem, Category } from "../../../mock/mockData";
import { AddProductDialogProps } from "./AddProductDialogP
// hoặc bỏ dòng này nếu bạn để interface trong cùng file

export default function AddProductDialog({
  open,
  onOpenChange,
  item,
  onSave,
  categories
}: AddProductDialogProps) {
  
  const [form, setForm] = useState<MenuItem>(
    item ?? {
      item_id: Date.now(),
      name: "",
      category_id: categories[0]?.category_id ?? 0,
      description: "",
      price: 0,
      image_url: "",
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  );

  const handleChange = (key: keyof MenuItem, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      updated_at: new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    onSave(form);
    onOpenChange(false);
  };

  return (
    <div>
      {/* Shadcn dialog của bạn */}
      <h2>Thêm / Sửa món</h2>

      <input
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <select
        value={form.category_id}
        onChange={(e) => handleChange("category_id", Number(e.target.value))}
      >
        {categories.map((c: Category) => (
          <option key={c.category_id} value={c.category_id}>
            {c.category_name}
          </option>
        ))}
      </select>

      <button onClick={handleSave}>Lưu</button>
    </div>
  );
}
