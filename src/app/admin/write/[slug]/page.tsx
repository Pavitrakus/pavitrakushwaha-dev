import { EssayEditor } from "@/components/admin/EssayEditor";

type Props = { params: Promise<{ slug: string }> };

export default async function EditEssayPage({ params }: Props) {
  const { slug } = await params;
  return <EssayEditor slug={slug} />;
}
