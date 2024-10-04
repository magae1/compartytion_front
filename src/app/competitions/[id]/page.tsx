import { permanentRedirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  permanentRedirect(`/competitions/${params.id}/home`);
}
