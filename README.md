# discourse-affiliate-linker

Replace links for a set of hostnames with their respective referral links.

For example, you might want to replace links to digitalocean.com with my referral link, which is https://m.do.co/c/a5bf212d9a92. Install this theme component and you can do just that! You can instead
use your referral link for Digital Ocean or whatever other sites you wish.

## Configuration

The theme setting `affiliate link map` takes a list of "HOSTNAME,referral_url" mappings and
then replaces those links (`<div class='cooked'>`) with the referral link. This replacement happens
in the browser, so there is no need to rebake posts after making changes.

## Cases Covered

This replaces _only_ links to the domain with no path (with or without trailing slash), so links to other pages on the site still function
as expected. See https://dashboard.literatecomputing.com/t/discourse-affiliate-linker/950 for an example of its use.

For hostname you enter, it looks for with and without the `www`. It also checks for both `http` and `https` links. So `digitalocean.com` will match and replace `http://www.digitalocean.com/`, `https://digitalocean.com` and the other two variations.

## OOPs. I made a Speling eror.

The first release used a setting `affilliate_link_map`, which should be `affiliate_link_map` (see the extra `l`?). You need to copy the settings from the old setting to the new one. As long as the correct setting does not have "example.com" as the first entry, it'll continue using the wrong one. One day I'll delete the original setting.
