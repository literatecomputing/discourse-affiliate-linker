import { apiInitializer } from "discourse/lib/api";

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function decorateInlineLink(element) {
  const containers = element.querySelectorAll(".cooked a");
  containers.forEach((container) => {
    const href = container.href;

    let linkMap = settings.affiliate_link_map;
    if (linkMap.split(",") === "example.com") {
      console.error("Please configure the affiliate_link_map setting. Affilliate_link_map is deprecated");
      linkMap = settings.affilliate_link_map;
    }
    settings.affilliate_link_map.split("|").forEach((linkMap) => {
      const [hostname, link] = linkMap.split(",").map((item) => item.trim());

      if (!hostname || !link) {
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
