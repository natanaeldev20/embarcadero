import { SiteHeader } from "@/global/components/site-header";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader title="Perfil" />
      {children}
    </>
  );
}
