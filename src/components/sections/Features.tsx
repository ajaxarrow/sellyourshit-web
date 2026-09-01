import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const FEATURES = [
  {
    title: "Inventory",
    body: "Every item, sourced or from your own closet, with photos, status tags, and quantity at a glance.",
  },
  {
    title: "Mark Sold",
    body: "Single or bulk mark-as-sold, with buyer and price captured in one pass.",
  },
  {
    title: "Capital & Remittance",
    body: "Track capital in, remittances out, and where the money actually went.",
  },
  {
    title: "Analytics",
    body: "Sales over time, current stock, top brands, items with issues — the real numbers.",
  },
  {
    title: "Settings",
    body: "Manage customers, custom options, and full backup/restore, all local-first.",
  },
];

export function Features() {
  return (
    <Section canvas="b">
      <Container>
        <h2 className="mb-12 text-display-sm font-display">What it does</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-border-strong bg-surface-raised p-6">
              <h3 className="mb-2 font-display text-lg">{f.title}</h3>
              <p className="font-body text-sm text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
