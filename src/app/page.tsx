import { Hero } from "@/components/hero/hero";
import { Work } from "@/components/sections/work";
import { Ship } from "@/components/sections/ship";
import { Lab } from "@/components/sections/lab";
import { Experience } from "@/components/sections/experience";
import { Services } from "@/components/sections/services";
import { Recognition } from "@/components/sections/recognition";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Closing } from "@/components/sections/closing";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

export default async function Home({ searchParams }: PageProps<"/">) {
  const sp = await searchParams;
  const status = sp.contact === "sent" ? "sent" : sp.contact === "error" ? "error" : undefined;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: site.url,
          name: `${site.name} — ${site.title}`,
          mainEntity: { "@id": `${site.url}/#person` },
        }}
      />
      <Hero />
      <Work />
      <Ship />
      <Experience />
      <Services />
      <Recognition />
      <About />
      <Contact status={status} />
      <Closing />
      <Lab />
    </>
  );
}
