import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { MobileDocsNav } from "@/components/docs/MobileDocsNav";
import { getDocsNavTree } from "@/lib/docs/getDocs";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const sections = getDocsNavTree();

  return (
    <div className="min-h-screen bg-bg pt-16">
      <MobileDocsNav sections={sections} />
      <div className="flex">
        <DocsSidebar sections={sections} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
