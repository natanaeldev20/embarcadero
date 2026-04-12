import { auth } from "@/auth";

export default async function PanelPage() {
  const session = await auth();
  return (
    <div className="p-4 text-center text-3xl font-bold">
      <h1 className="mt-20">{`Bienvenido al sistema ${session?.user?.name}`}</h1>
    </div>
  );
}
