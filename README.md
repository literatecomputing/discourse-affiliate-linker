# discourse-affiliate-linker

Replace a link for a set of hostnames with their respective referral links.

For example, you might want to replace links to digitalocean.com with my referral link, which is https://m.do.co/c/a5bf212d9a92. Install this theme component and you can do just that! You can instead
use your referral ink for Digital Ocean or whatever other sites you wish.

The theme setting `affilliate link map` takes a list of "HOSTNAME,referral_url" mappings and
then replaces those links (<div class='cooked'>) with the referral link. This replacement happens
in the browser, so there is no need to rebake posts after making changes.

This replaces _only_ links to the home page, so links to other pages on the site still function
as expected.
