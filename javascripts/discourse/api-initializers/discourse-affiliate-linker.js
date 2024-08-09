import { apiInitializer } from "discourse/lib/api";

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function decorateInlineLink(element) {
  const containers = element.querySelectorAll(".cooked a");
  containers.forEach((container) => {
    const href = container.href;

    let linkMaps = settings.affiliate_link_map;

    console.log("first affiliate", linkMaps.split(",")[0]);

    if (linkMaps.split(",")[0] === "example.com") {
      // eslint-disable-next-line no-console
      console.error(
        "Please configure the affiliate_link_map setting. affiliate_link_map is deprecated"
      );
      // eslint-disable-next-line no-shadow
      linkMaps = settings.affilliate_link_map; // No redeclaration, just reassignment
    }

    linkMaps.split("|").forEach((linkMap) => {
      const [hostname, link] = linkMap.split(",").map((item) => item.trim());

      if (!hostname || !link) {
        // eslint-disable-next-line no-console
        console.error("Invalid affiliate link map entry:", linkMap);
        return;
      }

      const escapedMapHostname = escapeRegex(hostname);
      const mapRegex = new RegExp(
        `^https?:\/\/(www\\.)?${escapedMapHostname}(\/?)?$`,
        "i"
      );
      if (mapRegex.test(href)) {
        container.href = link;
      }
    });
  });
}

export default apiInitializer("1.8.0", (api) => {
  api.decorateCookedElement((element) => {
    decorateInlineLink(element);
  });
});
