import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { getUserProfile } from "@/modules/user/server-actions/user.action";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getUserProfile();

  return (
    <section>
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-8 items-center">
            <figure>
              <img
                className="w-40 rounded-full aspect-square object-cover"
                src={user.data?.imgUrl}
                alt={user.data?.name}
              />
            </figure>
            <div>
              <h2 className="text-3xl font-bold">
                {user.data?.name} {user.data?.lastName}
              </h2>
            </div>
          </div>
          <Link href={`/panel/perfil/editar-perfil`}>
            <Button>Editar perfil</Button>
          </Link>
        </CardHeader>
      </Card>
    </section>
  );
}
