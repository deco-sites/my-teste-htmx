import { useSection } from "deco/hooks/useSection.ts";
import { SectionProps } from "deco/mod.ts";

const useUrlRebased = (overrides: string | undefined, base: string) => {
  let url: string | undefined = undefined;

  if (overrides) {
    const temp = new URL(overrides, base);
    const final = new URL(base);

    final.pathname = temp.pathname;
    for (const [key, value] of temp.searchParams.entries()) {
      final.searchParams.set(key, value);
    }

    url = final.href;
  }

  return url;
};

export default function ButtonContronls(props: SectionProps<typeof loader>) {
  const { url } = props;

  const search = useUrlRebased(
    url,
    "http://localhost:10503/s?q=all&filter.v.availability=In+stock&page=0",
  );
  const buttonSearch = useSection({
    href: search,
    props: { partial: "hideLess" },
  });
  const searchS = useUrlRebased(
    url,
    "http://localhost:10503/s?q=all&filter.v.availability=Out+of+stock&page=0",
  );
  const buttonSearchS = useSection({
    href: searchS,
    props: { partial: "hideLess" },
  });

  return (
    <div class="flex justify-center gap-3">
      <button
        class="bg-primary p-2 "
        hx-swap="outerHTML show:parent:top"
        hx-get={buttonSearch}
        hx-target="#teste"
      >
        Em estoque
      </button>
      <button
        class="bg-primary p-2 "
        hx-swap="outerHTML show:parent:top"
        hx-get={buttonSearchS}
        hx-target="#teste"
      >
        Sem estoque
      </button>
    </div>
  );
}

export const loader = (req: Request) => {
  return {
    url: req.url,
  };
};
