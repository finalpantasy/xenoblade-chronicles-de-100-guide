# Game icon sources

These small interface images are used decoratively in this private, unofficial fan guide. Text labels remain present everywhere; no control depends on recognizing an icon.

Game UI artwork is copyright Nintendo / MONOLITHSOFT. Files were retrieved from the Xenoblade Wiki (Fandom) image pages on 2026-07-31.

The Monsterpedia caches real enemy-page thumbnails locally in `assets/monster-images/` when `node build-monsterpedia-data.js --refresh-images` is run. Each entry retains its source page and original thumbnail URL in `data/monsterpedia-data.js`; the wiki controls which enemy pages expose a thumbnail.

`assets/area-maps/` contains 19 locally cached, actual in-game map files selected from the Xenoblade Wiki's area galleries by `node build-map-atlas-data.js` on 2026-08-01. `data/map-atlas-data.js` preserves the exact source file URL per area; Colony 9 and Ether Mine are deliberately omitted because the builder could not identify an unambiguous in-game map file rather than substituting an invented image. The item-level Collectopaedia snapshot in `data/collectopaedia-data.js` is generated from the 21 public [XC Collectopaedia](https://xenoblade.fandom.com/wiki/Collectopaedia_(XC1)) pages by `node build-collectopaedia-data.js`.

Three enemy pages do not expose a page thumbnail, so the builder uses their exact Xenoblade Wiki file pages instead: [Clap Bunniv](https://xenoblade.fandom.com/wiki/File:Clap_Bunniv.jpg), [Energy Device](https://xenoblade.fandom.com/wiki/File:Energy_Device.jpg), and [Mechon M32 Transport Unit](https://xenoblade.fandom.com/wiki/File:Mechon_M32_Transport_Unit.jpg). This preserves an individual in-game portrait for every Monsterpedia entry without generated substitutes.

`assets/party-portraits/` contains 320px page thumbnails for Shulk, Reyn, Sharla, Dunban, Melia, Riki, Fiora, Kino, and Nene from their respective Xenoblade Wiki pages, retrieved 2026-07-31. They are decorative—the party text remains the accessible source of identity.

| Local file | Original wiki file |
| --- | --- |
| `quest-alert.png` | [Quest alert.png](https://xenoblade.fandom.com/wiki/File:Quest_alert.png) |
| `timed-quest.png` | [Timedquest.png](https://xenoblade.fandom.com/wiki/File:Timedquest.png) |
| `landmark-xcde.png` | [XCDE Landmark Icon.png](https://xenoblade.fandom.com/wiki/File:XCDE_Landmark_Icon.png) |
| `quest-complete.png` | [Quest complete.png](https://xenoblade.fandom.com/wiki/File:Quest_complete.png) |
| `back-slash-xcde.png` | [ShulkBackSlashDE.png](https://xenoblade.fandom.com/wiki/File:ShulkBackSlashDE.png) |
| `skills.png` | [Skills-blue-circle-1.png](https://xenoblade.fandom.com/wiki/File:Skills-blue-circle-1.png) |
| `enemy-sight.png` | [Sight enemy icon.png](https://xenoblade.fandom.com/wiki/File:Sight_enemy_icon.png) |
| `../xbcde-logo.png` | [XBCDE Logo.png](https://xenoblade.fandom.com/wiki/File:XBCDE_Logo.png) |
| `../xenoblade-mechonis-scene.png` | [Mechonis Field DE 4.png](https://xenoblade.fandom.com/wiki/File:Mechonis_Field_DE_4.png) |
| `superboss-abaasy.png` | [Avalanche Abaasy 1.png](https://xenoblade.fandom.com/wiki/File:Avalanche_Abaasy_1.png) |
| `colony6-shop.png` | [Shop Colony 6 numbered.png](https://xenoblade.fandom.com/wiki/File:Shop_Colony_6_numbered.png) |
| `affinity-mission.png` | [Affinity Mission icon.png](https://xenoblade.fandom.com/wiki/File:Affinity_Mission_icon.png) |
| `quest-log-de.png` | [Quest.png](https://xenoblade.fandom.com/wiki/File:Quest.png) — authentic XCDE Quest Log capture, used as the higher-resolution source for the Completion Hub and Quest Lookup navigation crops |
| `colony6-affinity.png` | [Colony 6 Area Affinity.png](https://xenoblade.fandom.com/wiki/File:Colony_6_Area_Affinity.png) |
