import { getCategories } from "@/modules/category/server-actions/category.action";
import { CreateProductForm } from "@/modules/product/components/CreateProductForm";

export default async function CreateProductPage() {
  const categoriesResponse = await getCategories();

  if (!categoriesResponse.ok) {
    throw new Error(categoriesResponse.message);
  }

  const categories = categoriesResponse.data ?? [];

  return (
    <div>
      <CreateProductForm categories={categories} />
    </div>
  );
}
