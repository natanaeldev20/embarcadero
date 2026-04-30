import { EditUserForm } from "@/modules/user/components/EditUserForm";
import { getUserProfile } from "@/modules/user/server-actions/user.action";

export default async function EdithProfilePage() {
  const user = await getUserProfile();

  if (!user.data) return null;
  return (
    <div className="p-6">
      <EditUserForm data={user.data} userId={user.data.id} />
    </div>
  );
}
