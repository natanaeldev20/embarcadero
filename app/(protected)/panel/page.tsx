import { auth } from "@/auth";
import { SiteHeader } from "@/global/components/site-header";

export default async function PanelPage() {
  const session = await auth();
  return (
    <div className="p-4 text-center text-3xl font-bold">
      <SiteHeader title="Inicio" />
      <h1 className="mt-20">{`Bienvenido al sistema ${session?.user?.name}`}</h1>
    </div>
  );
}
