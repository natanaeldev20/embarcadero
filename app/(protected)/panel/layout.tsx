import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/modules/auth/server-actions/auth.action";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* IZQUIERDA */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <Link href="/panel">
              <Button variant="ghost">Inicio</Button>
            </Link>

            <Link href="/panel/mesas">
              <Button variant="ghost">Mesas</Button>
            </Link>

            <Link href="/panel/categorias">
              <Button variant="ghost">Categorías</Button>
            </Link>

            <Link href="/panel/productos">
              <Button variant="ghost">Productos</Button>
            </Link>
          </div>

          {/* DERECHA */}
          <div className="flex items-center gap-3">
            {/* PERFIL */}
            <Link href="/panel/perfil">
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>

            {/* LOGOUT */}
            <form action={signOutAction}>
              <Button variant="destructive" size="sm">
                Salir
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
