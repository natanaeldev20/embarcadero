import { Card, CardHeader } from "@/components/ui/card";
import { EditUserForm } from "@/modules/user/components/EditUserForm";
import { getUser } from "@/modules/user/server-actions/user.action";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getUser(id);

  if (!user.data) return null;

  return (
    <section className="w-full space-y-8 py-8">
      <Card className="max-w-xl mx-auto">
        <CardHeader className="w-full">
          <div className="flex flex-col justify-center gap-8 items-center">
            <figure>
              <img
                className="w-40 rounded-full aspect-square object-cover"
                src={user.data.imgUrl}
                alt={user.data.name}
              />
            </figure>
            <div>
              <h2 className="text-3xl font-bold">
                {user.data.name} {user.data.lastName}
              </h2>
            </div>
          </div>
        </CardHeader>
      </Card>
      <EditUserForm data={user.data} userId={user.data.id} />
    </section>
  );
}
