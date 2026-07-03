# Wanchan (Yomitan atšaka)

<!-- (nuorodos kol kas veda į Yomitan, Wanchan nuorodos bus atnaujintos vėliau).
[![Get Wanchan for Chrome](<https://img.shields.io/chrome-web-store/v/likgccmbimhjbgkjambclfkhldnlhbnn?logo=Google%20Chrome&style=for-the-badge&logoColor=lightblue&color=lightblue&label=get%20wanchan%20for%20chrome%20(stable)>)](https://chrome.google.com/webstore/detail/yomitan/likgccmbimhjbgkjambclfkhldnlhbnn)
[![Get Wanchan for Firefox](<https://img.shields.io/amo/v/yomitan?logo=Firefox&style=for-the-badge&color=orange&label=get%20wanchan%20for%20firefox%20(stable)>)](https://addons.mozilla.org/en-US/firefox/addon/yomitan/)
[![Get Wanchan for Edge](https://img.shields.io/badge/dynamic/json?logo=puzzle&label=get%20wanchan%20for%20edge&style=for-the-badge&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fidelnfbbmikgfiejhgmddlbkfgiifnnn)](https://microsoftedge.microsoft.com/addons/detail/yomitan/idelnfbbmikgfiejhgmddlbkfgiifnnn)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/yomidevs/yomitan/badge?style=for-the-badge)](https://securityscorecards.dev/viewer/?uri=github.com/yomidevs/yomitan)

[![Discord](https://dcbadge.limes.pink/api/server/YkQrXW6TXF?style=for-the-badge)](https://discord.gg/YkQrXW6TXF) -->

:wave: **„Wanchan“ yra „Yomitan“ atšaka (fork), kuri savo ruožtu yra (https://foosoft.net/posts/passing-the-torch-to-yomitan/) projektui „Yomichan“** ([migracijos gidas](https://yomitan.wiki/yomichan-migration/)). Savo ruožtu atlikau pakeitimus, pritaikydamas projektą lietuvių kalbai, tuo pačiu išlaikydamas visą pamatinį funkcionalumą, užtikrinantį **kad projektas veiktų naujausiose naršyklių versijose ir prie jo būtų lengva prisidėti**.

📢 **Nauji bendraautoriai [laukiami](#prisidėjimas-contributing)!**

## Kas yra Wanchan (Yomitan)?

„Wanchan“ (Yomitan) paverčia jūsų interneto naršyklę įrankiu, padedančiu ugdyti kalbos raštingumą, leidžiant **skaityti** tekstus, kuriuos kitaip būtų per sunku įveikti

Šis plėtinys siūlo galingas funkcijas, kurių nerasite kituose naršyklės žodynuose:

- 💬 Interaktyvus iššokantis langas su apibrėžimais paieškos rezultatams rodyti.
- 🔊 Integruotas gimtosios kalbos tarimo garsas su galimybe pridėti savo [asmeninius garso šaltinius](https://yomitan.wiki/advanced/#default-audio-sources).
- ✍️ Kanji brūkšnių rašymo eiliškumo diagramos pasiekiamos vienu paspaudimu.
- 📝 [Automatinis kortelių kūrimas](https://yomitan.wiki/anki/) programai [Anki](https://apps.ankiweb.net/) per [AnkiConnect](https://foosoft.net/projects/anki-connect) įskiepį.
- 🔍 Individualizuotas paieškos puslapis patogiam pasirinktinių paieškos užklausų vykdymui.
- 📖 Kelių žodynų formatų, įskaitant [EPWING](https://ja.wikipedia.org/wiki/EPWING), palaikymas per [Yomitan Import](https://github.com/yomidevs/yomitan-import) įrankį.
- ✨ Švarus, modernus kodas palengvina kūrėjams [prisidėti](#prisidėjimas-contributing) kuriant naujas funkcijas ir kalbas.
  Pastaba: Kai kurios originalios „Yomitan“ funkcijos (pvz., [Mecab; Wanchan API]) 1.0.0.0 versijoje yra paslėptos. Taip pat kai kurios funkcijos buvo supaprastintos ir pritaikytos intuityvesniam naudojimuisi (pvz. Tabs; Popup; ).

## Dokumentacija / Kaip naudotis

### Kūrėjų dokumentacija

- Anki integracija
  - 🔧 [Anki handlebar šablonai](./docs/templates.md)
- Pažangios funkcijos
- Problemų sprendimas (Troubleshooting)
  - 🕷️ [Žinomos naršyklių klaidos (bugs)](./docs/browser-bugs.md)

<!-- ## Diegimas

Išleistos dvi versijos: _stabili (stable)_ ir _testinė (testing)_. Jei išmanote technologijas, siūlome išbandyti _testinę_ versiją, kitu atveju geriausia rinktis _stabilią_ (nuorodos kol kas veda į Yomitan, Wanchan nuorodos bus atnaujintos vėliau).

- **Google Chrome**
  - [stabili](https://chrome.google.com/webstore/detail/yomitan/likgccmbimhjbgkjambclfkhldnlhbnn)
  - [testinė](https://chrome.google.com/webstore/detail/yomitan-development-build/glnaenfapkkecknnmginabpmgkenenml)

- **Mozilla Firefox**
  - [stabili](https://addons.mozilla.org/en-US/firefox/addon/yomitan/)
  - [testinė](https://github.com/yomidevs/yomitan/releases) ※

- **Microsoft Edge**
  - [stabili](https://microsoftedge.microsoft.com/addons/detail/yomitan/idelnfbbmikgfiejhgmddlbkfgiifnnn)

※ Skirtingai nei Chrome, Firefox neleidžia parduotuvėje talpinti testavimui skirtų plėtinių. Turėsite atsisiųsti norimą versiją ir ją įdiegti patys (side-load). Tai reikia padaryti tik kartą, o atnaujinimus gausite automatiškai. -->

## Prisidėjimas (Contributing)

Kadangi tai yra atviro kodo projektas, **labai laukiame naujų bendraautorių**! Kviečiu naršyti [problemų sekimo sistemą (issue tracker)](https://github.com/viliuskacerginas/wanchan/issues) ir perskaityti [prisidėjimo gaires](./CONTRIBUTING.md).

Būdai, kaip galite padėti:

- Išbandykite dev (kūrėjų) versiją ir praneškite apie klaidas.
- Dokumentuokite UI/UX problemas GitHub Issues platformoje.
- Padėkite atkurti senas klaidas `area/bug` kategorijoje.

Jei norite rašyti kodą, prieš teikdami „Pull Request“, praneškite, ties kuo planuojate dirbti, sukurdami „GitHub Issue“. Tai leis pateikti grįžtamąjį ryšį iš anksto.

Laukiame:

- Gerai parašytų testų ([playwright tests](https://github.com/viliuskacerginas/wanchan/tree/master/test/playwright), [benchmark tests](https://github.com/viliuskacerginas/wanchan/tree/master/benches), unit tests).
- Geresnio tipų (types) padengimo.
- Daugiau ir geresnės dokumentacijos!

## Kaip sukompiliuoti (Building) projektą

1. Įdiekite [Node.js](https://nodejs.org/) ir [npm](https://www.npmjs.com/).
2. Paleiskite `npm ci`, kad paruoštumėte aplinką.
3. Paleiskite `npm run license-report:html`, kad sugeneruotumėte trūkstamą informaciją apie licencijas.
4. Paleiskite `npm run build` testinei versijai, arba `npm run-script build -- --all --version {version}` leidimo (release) versijai.
5. Kiekvienos naršyklės kompiliuotus failus rasite `builds` direktorijoje.

Daugiau informacijos [Prisidėjimas (Contributing)](./CONTRIBUTING.md#setup).

## Trečiųjų šalių bibliotekos (Third-Party Libraries)

Projektas naudoja kelias trečiųjų šalių bibliotekas:

<!-- The following table is generated using the command `npm run license-report:markdown`. -->

| Name                | License type | Link                                                                   |
| :------------------ | :----------- | :--------------------------------------------------------------------- |
| @resvg/resvg-wasm   | MPL-2.0      | git+ssh://git@github.com/yisibl/resvg-js.git                           |
| @zip.js/zip.js      | BSD-3-Clause | git+https://github.com/gildas-lormeau/zip.js.git                       |
| dexie               | Apache-2.0   | git+https://github.com/dexie/Dexie.js.git                              |
| dexie-export-import | Apache-2.0   | git+https://github.com/dexie/Dexie.js.git                              |
| hangul-js           | MIT          | git://github.com/e-/Hangul.js.git                                      |
| kanji-processor     | n/a          | https://registry.npmjs.org/kanji-processor/-/kanji-processor-1.0.2.tgz |
| parse5              | MIT          | git://github.com/inikulin/parse5.git                                   |
| yomitan-handlebars  | MIT          | n/a                                                                    |
| linkedom            | ISC          | git+https://github.com/WebReflection/linkedom.git                      |

## Padėka / Autorystė (Attribution)

`fallback-bloop.mp3` pateikė [UNIVERSFIELD](https://pixabay.com/sound-effects/error-8-206492/) ir licencijuota pagal [Pixabay Content License](https://pixabay.com/service/license-summary/).

„Wanchan“ yra „Yomitan“ projekto atšaka (fork). Nuoširdžiai dėkojame originaliems „Yomitan“ ir „Yomichan“ kūrėjams už šį nuostabų atviro kodo įrankį.
