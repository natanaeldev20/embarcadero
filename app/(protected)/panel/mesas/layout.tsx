import { SiteHeader } from "@/global/components/site-header";

export default function TablesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader title="Pedidos" />
      {children}
    </>
  );
}
