import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AutoRefresh } from "@/global/components/AutoRefresh";
import { DeleteUserButton } from "@/modules/user/components/DeleteUserButton";
import { getsUsers } from "@/modules/user/server-actions/user.action";
import Link from "next/link";

export default async function UsersPage() {
  const users = await getsUsers();

  return (
    <section className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">Usuarios</h1>

        <Link href={`/panel/usuarios/crear-usuario`}>
          <Button className="w-full sm:w-auto">+ Crear usuario</Button>
        </Link>
      </div>

      {/* TABLA */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Lista de usuarios</CardTitle>
        </CardHeader>

        <CardContent>
          <AutoRefresh interval={2000}>
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableCaption>Usuarios registrados</TableCaption>

                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Apellido
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Username
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.data?.map((u) => (
                    <TableRow key={u.id}>
                      {/* 👤 USUARIO */}
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={u.imgUrl} />
                          <AvatarFallback>{u.name?.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {u.lastName}
                          </p>
                        </div>
                      </TableCell>

                      {/* APELLIDO */}
                      <TableCell className="hidden sm:table-cell">
                        {u.lastName}
                      </TableCell>

                      {/* USERNAME */}
                      <TableCell className="hidden md:table-cell">
                        {u.username}
                      </TableCell>

                      {/* ACCIONES */}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/panel/usuarios/editar-usuario/${u.id}`}>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="hover:bg-yellow-500 hover:text-white"
                            >
                              Editar
                            </Button>
                          </Link>

                          <DeleteUserButton idUser={u.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AutoRefresh>
        </CardContent>
      </Card>
    </section>
  );
}
