# Problemos (Issues) ir Funkcijos (Features)

Apie problemas pranešant [GitHub](https://github.com/viliuskacerginas/wanchan/issues) platformoje, reikėtų nurodyti šią informaciją:

- Kokia tai problema, klausimas ar prašymas.
- Kokia naršyklė naudojama.
- Kokia „Wanchan“ versija naudojama.
- Jei įmanoma, pridėti eksportuotą nustatymų failą.

# Vystymas (Development)

Laukiame indėlio iš visų programuotojų, norinčių padėti.
Žemiau pateikiamos kelios gairės, užtikrinančios, kad kodas būtų kokybiškas ir nuoseklus:

- Prieš rašant kodą didelėms funkcijoms, atidarykite „GitHub issue“ diskusijai.
- Laikykitės esamo kodo [konvencijų ir stiliaus](#style).
- Ištestuokite pakeitimus naudodami repozitorijoje esančius nuolatinės integracijos (CI) testus.
- Rašykite švarų, modernų ES6 kodą (`const`/`let`, `async`/`await`, rodyklines funkcijas (arrow functions) ir pan.)
- Dideli „Pull requests“ be aiškios apimties ir tikslo nebus priimami (merged).
- Nebaigtos ar savarankiškai neveikiančios funkcijos nebus priimamos.

## Sąranka (Setup)

„Wanchan“ naudoja [Node.js](https://nodejs.org/) ir [npm](https://www.npmjs.com/) įrankius kompiliavimui (build) bei testavimui.
Įdiegus šiuos įrankius, kūrimo aplinką galima paruošti paleidus komandą `npm ci`, o po jos – `npm run build`.

## Testavimas

Vienetiniai (Unit tests), integraciniai (integration tests) ir įvairūs kiti testai gali būti paleidžiami komanda `npm test`.
Kitus atskirus testus galima rasti [package.json](package.json) faile, o specifinių testų išeities kodą (source) –
[test](test) kataloge.

### Playwright

Žingsniai, kaip paleisti [playwright](https://playwright.dev/) testus lokaliai:

1. Paleiskite `npx playwright install`, kad įdiegtumėte naršykles (headless browsers).
2. Nukopijuokite žodynų testavimo duomenis iš `dictionaries` atšakos į katalogą, pavadintą `dictionaries`. Tai padarysite įvykdę komandą: `git clone --branch dictionaries git@github.com:yomidevs/yomitan.git dictionaries` ([šaltinis](https://github.com/yomidevs/yomitan/blob/086e043856ad54cf13cb65f9ba4c63afe8a22cc3/.github/workflows/playwright.yml#L52-L57)). (Pastaba: Kadangi testiniai žodynai yra originalioje Yomitan repozitorijoje, mes vis dar naudojame originalų šaltinį).
3. Dabar galite paleisti `npx playwright test`. Pirmojo paleidimo metu gali kilti keletas nepavojingų klaidų, teigiančių, kad `Error: A snapshot doesn't exist at ...writing actual.`, tačiau vėlesni paleidimai turėtų būti sėkmingi.

## Kompiliavimas (Building)

Pagal nutylėjimą, vystymo repozitorija yra sukonfigūruota „Chrome“ naršyklei, o [ext](ext) katalogą galima tiesiogiai
įkelti į „Chrome“ kaip neišpakuotą plėtinį (unpacked extension). Tokiu būdu programuojant nereikia jokių papildomų kompiliavimo žingsnių,
o dauguma pakeitimų bus automatiškai atnaujinti naršyklėje. Priklausomai nuo to, kurie failai buvo pakeisti,
kartais plėtinį gali tekti perkrauti (reload), kad pakeitimai įsigaliotų.

Yra du skriptai, skirti sukompiliuoti plėtinį į supakuotą failą įvairioms tikslinėms platformoms:

- [build.bat](build.bat) operacinėje sistemoje Windows
- [build.sh](build.sh) operacinėje sistemoje Linux

Abu šie failai yra patogumo skriptai, iškviečiantys <code>node [dev/bin/build.js](dev/bin/build.js)</code>.
Kompiliavimo skriptas gali sugeneruoti kelis skirtingus failus, remdamasis manifestų konfigūracijomis, apibrėžtomis
[manifest-variants.json](dev/data/manifest-variants.json) faile.
Šiems skriptams galima naudoti kelis komandinės eilutės argumentus:

- `[target]` - Kompiliuoja konkrečiai platformai (target).
- `--all` - Kompiliuoja visoms platformoms, nurodytoms [manifest-variants.json](dev/data/manifest-variants.json) faile.
- `--default` - Atkuria numatytąjį (default) manifesto failą.
- `--manifest <target>` - Perrašo `ext/manifest.json` faile esantį manifesto variantą pasirinkta tiksline platforma.
- `--dryRun` - Paleidžia visą kompiliavimo procesą (be .zip failo kūrimo), patikrindamas, ar konfigūracija yra teisinga.
- `--dryRunBuildZip` - Jei nurodytas kartu su `--dryRun`, zip failo kūrimas bus atliekamas atmintyje; failai sistemoje nebus sukurti.
- `--version <version>` - Nustato versijos numerį plėtinio manifeste. Jei nenurodyta, naudojama numatytoji versija 0.0.0.0.

Jei jokie argumentai nenurodyti, komanda veiks taip pat kaip ir `build.bat --all`.

### Neišpakuoto (unpacked) plėtinio įkėlimas į „Chromium“ naršykles

Sukompiliavę kodą, galite įkelti plėtinį į „Chromium“ pagrindo naršykles.

- Eikite į [plėtinių puslapį](chrome://extensions/)
- Viršutiniame dešiniajame kampe įjunkite perjungiklį „Kūrėjo režimas“ (Developer Mode)
- Viršutiniame kairiajame kampe paspauskite „Įkelti neišpakuotą“ (Load unpacked)
- Pasirinkite `ext` katalogą.

Iškart po to turėtumėte pamatyti pasisveikinimo („Welcome“) puslapį!

Pastaba: „Wanchan“ gali automatiškai atsinaujinti arba atsinaujinti išsaugant naujus kodo pakeitimus lokaliai. Tai priklauso nuo to, kokį failą pakeitėte. „Wanchan“ veikia kaip dviejų programų rinkinys. Yra foninis procesas, vadinamas „service worker“, ir priekinė dalis (frontend), vadinama „content_script“. Priekinė dalis persikraus išsaugojus failą, tačiau norėdami atnaujinti foninį procesą, turite paspausti atnaujinimo (update) piktogramą šalia plėtinio puslapyje `chrome://extensions/`. Jei darote pakeitimus manifeste, turėsite iš naujo paleisti komandą `npm run build`, kad pergeneruotumėte manifesto failą.

### Sukompiliuoto plėtinio įkėlimas į „Firefox“ naršyklę

Sukompiliavę kodą, plėtinį galite įkelti į „Firefox“ naršyklę.

- Eikite į derinimo (Debugging) puslapį – URL juostoje įveskite `about:debugging`
- Kairėje pusėje paspauskite „Ši Firefox“ (This Firefox)
- Dešinėje pusėje paspauskite „Įkelti laikinąjį priedą“ (Load Temporary Add-on)
- Pasirinkite failą `wanchan-firefox-dev.zip` savo builds kataloge

Iškart po to turėtumėte pamatyti pasisveikinimo („Welcome“) puslapį!

Pastaba: Parinktis „Įkelti laikinąjį priedą“ yra laikina, ir po naršyklės perkrovimo plėtinį teks įkelti iš naujo. Kartais gali tekti išbandyti plėtinio funkcijas tarp naršyklės perkrovimų, todėl žemiau pateikiami žingsniai, kaip apeiti šį apribojimą.

- Atsisiųskite „Firefox Developer“ arba „Nightly“ versiją
- URL juostoje įvedę `about:config`, pereikite į konfigūracijos puslapį
- Paieškos juostoje viršuje suraskite `xpinstall.signatures.required` nustatymą
- Pakeiskite reikšmę į „false“
- Per „Manage extensions“ pereikite į priedų puslapį „Extensions“
- Nuvilkite failą (drag and drop) arba naudokite „Įdiegti priedą iš failo“ (Install Add-on from File), kad įkeltumėte `dev` versiją

### Neišpakuoto plėtinio įkėlimas į „Microsoft Edge“ naršyklę

Sukompiliavę kodą, plėtinį galite įkelti į „Edge“ naršyklę.

- Išpakuokite failą `wanchan-edge.zip`
- Eikite į plėtinių puslapį: viršutiniame dešiniajame kampe spauskite „...“ ir pasirinkite „Tvarkyti plėtinius“ (Manage extensions)
- Kairėje pusėje įjunkite perjungiklį „Kūrėjo režimas“ (Developer Mode)
- Viršutiniame dešiniajame kampe paspauskite „Įkelti neišpakuotą“ (Load unpacked)
- Pasirinkite išpakuotą `wanchan-edge` katalogą

Iškart po to turėtumėte pamatyti pasisveikinimo („Welcome“) puslapį!

### Kompiliavimas (Build Tools)

Kompiliavimo procesas gali naudoti archyvavimo įrankį [7-zip](https://www.7-zip.org/) kuriant supakuotus zip failus,
jei 7-zip vykdomasis failas (`7z` arba `7za`) yra randamas `PATH` aplinkos kintamajame.
Kitu atveju, failams sugeneruoti naudojama [JSZip](https://stuk.github.io/jszip/) API.
7-zip paprastai užtikrina geresnį suspaudimą nei JSZip, tačiau failai išlieka identiški.

## Manifestas

Manifestų variantai skirtingoms tikslinėms platformoms yra nurodyti faile [manifest-variants.json](dev/data/manifest-variants.json).
Šis failas naudojamas generuojant `ext/manifest.json` failą, esantį pačiame plėtinyje.
Sugeneruotas `ext/manifest.json` neturėtų būti keliamas į versijų kontrolės (git) istoriją.

## Kodo Stilius (Style)

Lentelės ir sintaksės tikrinimo (linting) taisyklės apibrėžtos keliems failų tipams. Validavimas atliekamas vykdant standartinius testus (naudojant `npm test`) ir tęstinės integracijos procesus.

- [eslint.config.js](eslint.config.js) taisyklės naudojamos JavaScript failams.
- [.stylelintrc.json](.stylelintrc.json) taisyklės naudojamos CSS failams.
- [.htmlvalidate.json](.htmlvalidate.json) taisyklės naudojamos HTML failams.

Be to, markdown failų formatavimui ir automatiniam turinio lentelių atnaujinimui naudojamas plėtinys [Markdown All in One VSCode extension](https://github.com/yzhang-gh/vscode-markdown).

## Kodo įkėlimų (Commits) Pasirašymas

Mes primygtinai rekomenduojame pasirašyti savo kodo įkėlimus (commits) naudojant „Git“.

Nors tam galima naudoti GPG, rekomenduojame naudoti SSH raktus (keys). Be to, jei jūsų įranga tai palaiko (dauguma šiuolaikinių kompiuterių palaiko), patariame raktą saugoti aparatiniame TPM. Taip išvengsite galimybės, kad kenkėjiška programa pavogs raktą iš jūsų kompiuterio.

### Kodėl tai svarbu?

Prisijungiant prie GitHub ir atliekant pagrindines Git operacijas (`pull`, `push` ir pan.), GitHub jau reikalauja rakto. Jis vadinamas „autentifikavimo raktu“ (authentication key) ir yra SSH raktas. Turbūt jau turite jį, jei anksčiau naudojotės GitHub platforma.

Kodo įkėlimų (commits) pasirašymo raktas yra kitoks – jis skirtas pačiam kodo turiniui pasirašyti. Tai svarbu, nes suteikia daug naudingesnę „Git“ istoriją, kurioje galime garantuoti, kas iš tikrųjų parašė konkrečias kodo dalis. Be šio pasirašymo, asmuo, turintis „push“ teises, gali įkelti kodą naudodamas netikrus autorių vardus. Tai tampa rimta problema bandant išsiaiškinti saugumo incidentų priežastis. (Daugiau informacijos rasite [šiame straipsnyje](https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html).)

### Kaip sukurti SSH raktą pasirašymui

- „Mac“ operacinėje sistemoje galite naudoti [secretive](https://github.com/maxgoedjen/secretive), kad atliktumėte SSH operacijas paremtas „Secure Enclave“.
- „Linux“ operacinėje sistemoje galite naudoti [ssh-tpm-agent](https://github.com/Foxboron/ssh-tpm-agent), kad pasinaudotumėte aparatiniu TPM SSH operacijoms.
- Bet kurioje OS galite naudoti [„YubiKey“ SSH operacijoms](https://developers.yubico.com/SSH/Securing_SSH_with_FIDO2.html). „YubiKey“ galima laikyti šiek tiek saugesniu už įprastą TPM (ypač jei tai „YubiKey Bio“), tačiau mūsų saugumo modelyje šie sprendimai laikomi lygiaverčiais, todėl „YubiKey“ pirkti nebūtina, jei kompiuteryje jau yra TPM modulis.
- Kaip paskutinė išeitis, jei dirbate su sena įranga ir neturite „YubiKey“, galite sukurti SSH raktą kompiuterio diske. Tačiau tai yra daug mažiau saugu ir jautriau kenkėjiškoms programoms bei tiekimo grandinės atakoms (pvz., kenkėjiškam npm paketui, vagiančiam SSH raktus).

Kuriant pasirašymo raktą, rekomenduojame reikalauti naudotojo patvirtinimo (pvz., įvesti PIN kodą arba naudoti biometrinius duomenis). Tačiau „autentifikavimo raktui“ (įprastam SSH raktui, skirtam GitHub operacijoms, pvz., `pull`), tai nėra tiek svarbu. Šios operacijos nėra labai jautrios, be to, patvirtinimas kaskart atliekant „pull“ gali būti varginantis. Aišku, papildomas patvirtinimas kaskart didina saugumą ypač atliekant „push“ operacijas, bet potenciali žala vis tiek būtų ribota – įsilaužėlis galėtų nebent pašalinti kelis pasirašytus komitus, bet ne sukurti naujų.

### SSH rakto susiejimas su „Git“ pasirašymui

Sukūrę SSH raktą (rekomenduojama naudoti aukščiau aprašytus, aparatine įranga grįstus būdus, arba įprastą diske esantį raktą, jei TPM neturite), galite jį nustatyti kaip „Git“ kodo pasirašymo raktą įvykdydami šias komandas:

```
git config --global gpg.format ssh
git config --global user.signingkey /path/to/key
git config --global commit.gpgsign true
```

(Gali klaidinti tai, kad parinkčių pavadinimuose yra žodis „gpg“, bet po to, kai pirma komanda pakeisite formatą į SSH, GPG daugiau nebebus naudojamas.)

### SSH rakto registravimas GitHub platformoje

Eikite į [https://github.com/settings/keys](https://github.com/settings/keys) ir spustelėkite „Add new SSH key“. Kitame puslapyje būtinai pakeiskite „Key type“ (rakto tipą) į „Signing key“ (pasirašymo raktas). Tada įklijuokite viešąjį raktą į teksto laukelį.

Viskas! Dabar jūsų kodo įkėlimai („commits“) bus pasirašyti (tai galite matyti GitHub sąsajoje, prie jūsų įkelto kodo matysis žalias ženkliukas „Verified“).
