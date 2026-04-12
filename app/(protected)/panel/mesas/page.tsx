import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTables } from "@/modules/table/server-actions/table.action";
import Link from "next/link";

export default async function TablesPage() {
  const tables = await getTables();

  if (!tables?.ok) {
    return <p className="text-red-500">{tables?.message}</p>;
  }

  return (
    <section className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-bold">Mesas</h2>

        <Link href={`/panel/mesas/crear-mesa`}>
          <Button className="w-full sm:w-auto">+ Nueva mesa</Button>
        </Link>
      </div>

      {/* EMPTY STATE */}
      {tables.data?.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          No hay mesas registradas
        </div>
      ) : (
        /* GRID RESPONSIVE */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {tables.data?.map((t) => {
            const activeOrder = t.orders[0];
            const waiter = activeOrder?.user;

            return (
              <Link key={t.id} href={`/panel/mesas/${t.id}`}>
                <Card className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer border hover:border-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-center text-lg font-semibold">
                      {t.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex justify-center py-4">
                    <Avatar className="w-16 h-16">
                      {waiter ? (
                        <>
                          <AvatarImage src={waiter.imgUrl} alt={waiter.name} />
                          <AvatarFallback>
                            {waiter.name?.charAt(0)}
                          </AvatarFallback>
                          <AvatarBadge className="bg-green-500" />
                        </>
                      ) : (
                        <>
                          <AvatarImage
                            src="https://cdn-icons-png.flaticon.com/512/9972/9972749.png"
                            alt="Sin mozo"
                          />
                          <AvatarFallback>?</AvatarFallback>
                          <AvatarBadge className="bg-gray-400" />
                        </>
                      )}
                    </Avatar>
                  </CardContent>

                  <CardFooter className="flex justify-center">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        t.status === "LIBRE"
                          ? "bg-green-100 text-green-700"
                          : t.status === "OCUPADO"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
