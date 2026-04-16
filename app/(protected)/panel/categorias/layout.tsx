import { SiteHeader } from "@/global/components/site-header";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader title="Categorias" />
      {children}
    </>
  );
}
