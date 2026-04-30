import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { getUserProfile } from "@/modules/user/server-actions/user.action";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  lastName: string;
  imgUrl: string;
  username: string;
}

export default async function ProfilePage() {
  const userResponse = await getUserProfile();
  const user: User | null = userResponse.data ?? null;
  return (
    <section className="p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="w-full flex flex-col gap-4 lg:flex-row items-center justify-between">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-8  items-center">
            <figure>
              <img
                className="w-40 rounded-full aspect-square object-cover"
                src={user?.imgUrl}
                alt={user?.name}
              />
            </figure>
            <div>
              <h2 className="text-center lg:text-start text-3xl font-bold">
                {user?.name} {user?.lastName}
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
