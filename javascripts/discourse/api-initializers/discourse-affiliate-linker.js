import { apiInitializer } from "discourse/lib/api";

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function decorateInlineLink(element) {
  const containers = element.querySelectorAll(".cooked a");
  containers.forEach((container) => {
    const href = container.href;

    settings.affilliate_link_map.split("|").forEach((linkMap) => {
      const hostname = linkMap.split(",")[0].trim();
      const link = linkMap.split(",")[1].trim();
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
