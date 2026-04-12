import { getCompanies } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";

export async function Companies() {
  const companies = await getCompanies();

  const displayCompanies: { name: string; logoUrl?: string }[] =
    companies.length > 0
      ? companies.map((c) => ({
          name: c.name,
          logoUrl: c.logo ? urlFor(c.logo).height(40).url() : undefined,
        }))
      : [
          { name: "TURING" },
          { name: "MEGAVERSE" },
          { name: "FREELANCE" },
        ];

  return (
    <section className="bg-bg-secondary border-t-[2.5px] border-border px-6 py-5">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <span className="text-[10px] font-extrabold text-text-muted tracking-[1.5px] whitespace-nowrap">
          WORKED WITH
        </span>
        <div className="flex flex-wrap items-center gap-5">
          {displayCompanies.map((company) => (
            <div
              key={company.name}
              className="px-4 py-2 bg-white border-[2px] border-[#ddd] text-xs font-extrabold text-text-muted"
            >
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-5 object-contain" />
              ) : (
                company.name
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
