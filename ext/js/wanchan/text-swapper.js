/*
 * Copyright (C) 2026       Vilius Kačerginas
 * Copyright (C) 2023-2025  Yomitan Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


/**
 * Wanchan Localization Script
 * Replaces text content on the page with Lithuanian translations and rebrands "Yomitan" to "Wanchan".
 */

(function textSwapper() {
    'use strict';

    // --- Configuration ---

    const TARGET_LANG = localStorage.getItem('wanchan_ui_language') || 'lt'; // Default to Lithuanian

    // --- Translations Dictionary ---
    // Grouped by file source for organization.
    const TRANSLATIONS = {
        // --- ext/action-popup.html ---
        'No dictionary enabled': 'Nėra įgalinto žodyno',
        'Hover over text to scan': 'Užveskite pelytę, kad nuskenuotumėte',
        'Information': 'Informacija',
        ' Loading... ': ' Kraunama... ',
        'Off': 'Išjungta',
        ' On ': ' Įjungta ',
        'Profile': 'Profilis',
        'Search Shift+click to open here': 'Paieška Shift+paspaudimas atidaryti čia',
        'Settings': 'Nustatymai',
        'Yomitan homepage': ' Wanchan ',
        'Yomitan Action Popup': 'Wanchan Veiksmų Langas',
        'Hold ': 'Laikykite ',
        ' to scan': ' kad nuskenuotumėte',
        'Please enable permissions': 'Prašome suteikti leidimus',
        'Yomitan - Disabled': 'Wanchan - Išjungta',

        // --- ext/background.html ---
        'Background': 'Fonas',

        // --- ext/info.html ---
        ' (Anki not running or connected)': ' (Anki neveikia arba neprijungta)',
        'All versions': 'Visos versijos',
        'AnkiConnect version: ': 'AnkiConnect versija: ',
        'Browser: ': 'Naršyklė: ',
        'Bugs? Report them here: ': 'Klaidos? Praneškite čia: ',
        'Check out the Quick Start Guide': 'Peržiūrėkite Greitos Pradžios Gidą',
        'Chrome': 'Chrome',
        'Edge': 'Edge',
        'Enjoying Yomitan? Help us by leaving a review on the Firefox/Chrome/Edge store! ': 'Patinka Wanchan? Padėkite mums palikdami atsiliepimą Firefox/Chrome/Edge parduotuvėje! ',
        'Export settings': 'Eksportuoti nustatymus',
        'Extension version: ': 'Plėtinio versija: ',
        'Firefox': 'Firefox',
        'General': 'Bendra',
        'GitHub': 'GitHub',
        'GitHub Issues': 'GitHub Problemos',
        'Homepage': 'Pagrindinis puslapis',
        'Information and user guide: ': 'Informacija ir anki gidas: ',
        'Installed dictionaries: ': 'Įdiegti žodynai: ',
        'Issues': 'Problemos',
        'Language: ': 'Kalba: ',
        'Licenses': 'Licencijos',
        'Links': 'Nuorodos',
        'More extension information: ': 'Daugiau plėtinio informacijos: ',
        'Need help?': 'Reikia pagalbos?',
        'None installed': 'Nieko neįdiegta',
        'Permissions': 'Leidimai',
        'Platform: ': 'Platforma: ',
        'Read the wiki': 'Wanchan pagrindinis puslapis',
        'Recommended dictionaries: ': 'Rekomenduojami žodynai: ',
        'Download': 'Atsisiųsti',
        'Release notes: ': 'Išleidimo pastabos: ',
        'Source code: ': 'Kodo šaltinis: ',
        'This version': 'Ši versija',
        'User agent: ': 'Vartotojo agentas: ',
        'Yomitan Dictionaries': 'Wanchan Žodynai',
        'Yomitan Info': 'Wanchan Informacija',
        ' | ': ' | ',

        // --- ext/issues.html ---
        '(Chrome)': '(Chrome)',
        'Audio download failed due to an expired server certificate': 'Garso atsisiuntimas nepavyko dėl pasibaigusio serverio sertifikato',
        'Audio download failed due to possible extension permissions error ': 'Garso atsisiuntimas nepavyko dėl galimos plėtinio teisių klaidos ',
        'Audio download was cancelled due to an idle timeout': 'Garso atsisiuntimas buvo atšauktas dėl neveiklumo laiko limito',
        ' Audio files can be downloaded from remote servers when creating Anki cards, and sometimes these downloads can stall due to server or internet connectivity issues. The ': ' Garso failai gali būti atsisiunčiami iš nuotolinių serverių kuriant Anki korteles, ir kartais šie atsisiuntimai gali įstrigti dėl serverio ar interneto ryšio problemų.  ',
        ' Check the ': ' Patikrinkite ',
        ' Depending on the extension\'s configuration, Yomitan can sometimes run into issues with downloading audio files while creating Anki cards. This may be due to a permissions issue where Yomitan hasn\'t been granted access to the sites hosting the audio files. ': ' Priklausomai nuo plėtinio konfigūracijos, Wanchan kartais gali susidurti su problemomis atsisiunčiant garso failus kuriant Anki korteles. Tai gali būti dėl teisių problemos, kai Wanchan nebuvo suteikta prieiga prie svetainių, kuriose talpinami garso failai. ',
        ' From your browser\'s address bar, go to ': ' Naršyklės adreso juostoje eikite į ',
        'Idle download timeout ': 'Neveiklumo atsisiuntimo laikas ',
        ' If a website failes to keep its HTTPS certificate up to date, downloads can fail because the browser flags the connection as insecure. This has happened occasionally for some websites that Yomitan interacts with, and the issue is usually resolved within a day. ': ' Jei svetainė neatnaujina savo HTTPS sertifikato, atsisiuntimai gali nepavykti, nes naršyklė pažymi ryšį kaip nesaugų. Tai kartais nutinka kai kurioms svetainėms, su kuriomis sąveikauja Wanchan, ir problema paprastai išsprendžiama per dieną. ',
        'Site access': 'Svetainės prieiga',
        ' This issue is a server-side issue that Yomitan doesn\'t have control over. ': ' Ši problema yra serverio pusės problema, kurios Wanchan negali valdyti. ',
        'Yomitan Issues': 'Wanchan Problemos',
        'about:addons': 'about:addons',
        'all sites': 'visos svetainės',
        ' and grant the extension access to ': ' ir suteikite plėtiniui prieigą prie ',
        ' and navigate to the settings for Yomitan. Check the ': ' ir eikite į Wanchan nustatymus. Patikrinkite ',
        'extension settings pages': 'plėtinio nustatymų puslapių',
        ' or add the specific audio host URLs. ': ' arba pridėkite konkrečius garso priegloboos URL. ',
        ' section of the ': ' skyrių ',
        ' section of the extension settings pages and grant the extension access to ': ' skyrių plėtinio nustatymų puslapiuose ir suteikite plėtiniui prieigą prie ',
        ' setting on the ': ' nustatymą ',
        'settings page': 'nustatymų puslapyje',
        ' specifies a time limit for stalled downloads. ': ' nurodo įstrigusių atsisiuntimų laiko limitą. ',

        // --- ext/legal-npm.html ---
        'installed version': 'idiegta versija',
        'license type': 'licencijos tipas',
        'link': 'nuoroda',
        'name': 'pavadinimas',
        'n/a': 'n/a',

        // --- ext/legal.html ---
        'Yomitan Legal': 'Wanchan Teisinė Informacija',
        'Yomitan License': 'Wanchan Licencija',
        'EDRDG License': 'EDRDG Licencija',
        'This publication has included material from the JMdict (EDICT, etc.) dictionary files in accordance with the licence provisions of the Electronic Dictionaries Research Group. See http://www.edrdg.org/': 'Šiame leidinyje panaudota medžiaga iš JMdict (EDICT ir kt.) žodynų failų, vadovaujantis „Electronic Dictionaries Research Group“ licencijos nuostatomis. Žr. http://www.edrdg.org/',
        'Javascript Dependency Licenses': 'Javascript Priklausomybių Licencijos',
        'Copyright (C) 2023-2025 Yomitan Authors Copyright (C) 2016-2022 Yomichan Authors This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>. ': 'Copyright (C) 2026 Vilius Kačerginas Copyright (C) 2023-2025 Yomitan Authors Copyright (C) 2016-2022 Yomichan Authors Ši programa yra nemokama programinė įranga: galite ją platinti ir / arba modifikuoti pagal GNU General Public License sąlygas, kurias paskelbė Free Software Foundation, 3 versiją arba (jūsų pasirinkimu) bet kurią vėlesnę versiją. Ši programa platinama tikintis, kad ji bus naudinga, bet BE JOKIŲ GARANTIJŲ; net be numanomos PERKAMUMO ar TINKAMUMO KONKREČIAM TIKSLUI garantijos. Daugiau informacijos rasite GNU General Public License. Turėjote gauti GNU General Public License kopiją kartu su šia programa. Jei ne, žiūrėkite <https://www.gnu.org/licenses/>. ',
        'This package uses the ': 'Šis paketas gali naudoti ',
        ' dictionary files. These files are the property of the ': ' žodyno failus. Šie failai yra nuosavybė ',
        'Electronic Dictionary Research and Development Group': 'Electronic Dictionary Research and Development Group',
        ', and are used in conformance with the Group\'s ': ', ir yra naudojami laikantis Grupės ',
        'licence': 'licencijos',
        ' and ': ' ir ',

        // --- ext/offscreen.html ---
        'Offscreen': 'Už ekrano',

        // --- ext/permissions.html ---
        'Yomitan Permissions': 'Wanchan Leidimai',
        'Allowed Origins': 'Leistinos Kilmės',
        '<all_urls>': '<visi_url>',
        'Add': 'Pridėti',
        'Additional origins': 'Papildomos kilmės',
        'Allow access to all URLs': 'Leisti prieigą prie visų URL',
        'Allow access to file URLs ': 'Leisti prieigą prie failų URL ',
        'Allow in private windows ': 'Leisti privačiuose languose ',
        'Close': 'Uždaryti',
        'Configure allowed origins…': 'Konfigūruoti leistinas kilmes...',
        ' Example: ': ' Pavyzdys: ',
        'MeCab': 'MeCab',
        ' No additional origins specified. ': ' Nurodytų papildomų kilmių nėra. ',
        'Origin': 'Kilmė',
        'Origin: ': 'Kilmė: ',
        'Persistent storage': 'Nuolatinė saugykla',
        ' Yomitan uses storage permissions in order to save extension settings and dictionary data. ': ' Wanchan naudoja saugyklos leidimus, kad išsaugotų plėtinio nustatymus ir žodynų duomenis. ',
        'clipboardRead': 'clipboardRead',
        'clipboardWrite': 'clipboardWrite',
        '(optional)': '(pasirinktinai)',
        ' (copy to clipboard) keyboard shortcut when a definitions popup is open and focused. ': ' (kopijuoti į iškarpinę) klaviatūros spartusis klavišas, kai atidarytas ir fokusuotas apibrėžimų iššokantis langas. ',
        '. The installation of this component is optional and is not included by default. ': '. Šio komponento diegimas yra neprivalomas ir nėra įtrauktas pagal nutylėjimą. ',
        ' Chromium-based browsers should not need to enable this setting since the Yomitan extension has the ': ' Chromium pagrindu veikiančioms naršyklėms šio nustatymo įgalinti nereikia, nes Wanchan plėtinys turi ',
        'Ctrl+C': 'Ctrl+C',
        ' It may not be possible to enable this permission on Firefox for Android. ': ' Gali būti neįmanoma įgalinti šio leidimo Firefox skirtoje Android. ',
        ' This option can be configured from the web browser\'s ': ' Ši parinktis gali būti konfigūruojama iš žiniatinklio naršyklės ',
        ' This option can be configured from the web browser\'s extension settings pages. From your browser\'s address bar, go to ': ' Ši parinktis gali būti konfigūruojama iš žiniatinklio naršyklės plėtinio nustatymų puslapių. Iš savo naršyklės adreso juostos eikite į ',
        ' Web browsers will sometimes clear stored data if the device is running low on storage space, which can result in the imported dictionaries being deleted unexpectedly. The persistent storage permission tells the browser that the data should not be deleted in those circumstances. ': ' Žiniatinklio naršyklės kartais išvalo saugomus duomenis, jei įrenginyje trūksta vietos, todėl importuoti žodynai gali būti netikėtai ištrinti. Nuolatinės saugyklos leidimas nurodo naršyklei, kad duomenys neturėtų būti ištrinti tokiomis aplinkybėmis. ',
        ' When enabled, Yomitan is able to scan text and show definitions in private/incognito web browser windows. ': ' Kai įgalinta, Wanchan gali skenuoti tekstą ir rodyti apibrėžimus privačiuose / inkognito žiniatinklio naršyklės languose. ',
        ' When enabled, Yomitan is able to scan text and show definitions on local HTML files located using the ': ' Kai įgalinta, Wanchan gali skenuoti tekstą ir rodyti apibrėžimus vietiniuose HTML failuose, esančiuose naudojant ',
        ' Yomitan adds a context menu interface that lets you look up highlighted words. ': ' Wanchan prideda kontekstinio meniu sąsają, leidžiančią ieškoti paryškintų žodžių. ',
        ' Yomitan has the ability to communicate with an optional native messaging component in order to support parsing large blocks of Japanese text using ': ' Wanchan turi galimybę bendrauti su pasirinktiniu vietiniu pranešimų komponentu, kad palaikytų didelių japonų teksto blokų analizę naudojant ',
        ' Yomitan needs to inject content scripts and stylesheets into webpages in order to properly display the search popup. ': ' Wanchan reikia įterpti turinio scenarijus ir stilių lenteles į tinklalapius, kad tinkamai rodytų paieškos iššokantįjį langą. ',
        ' Yomitan requires access to all URLs in order to run scripts to scan text and show the definitions popup, request audio for playback and download, and connect with Anki. ': ' Wanchan reikalauja prieigos prie visų URL, kad galėtų paleisti scenarijus tekstui skenuoti ir rodyti apibrėžimų iššokantįjį langą, prašyti garso atkūrimui ir atsisiuntimui bei prisijungti prie Anki. ',
        ' Yomitan supports automatically opening a search window when text is copied to the clipboard while the browser is running, depending on how certain settings are configured. This allows Yomitan to support scanning text from external applications, provided there is a way to copy text from those applications to the clipboard. ': ' Wanchan palaiko automatinį paieškos lango atidarymą, kai tekstas kopijuojamas į iškarpinę, kol naršyklė veikia, priklausomai nuo to, kaip sukonfigūruoti tam tikri nustatymai. Tai leidžia Wanchan palaikyti teksto skenavimą iš išorinių programų, su sąlyga, kad yra būdas nukopijuoti tekstą iš tų programų į iškarpinę. ',
        ' Yomitan supports simulating the ': ' Wanchan palaiko simuliavimą ',
        ' Yomitan uses this permission to ensure certain requests have valid and secure headers. This sometimes involves removing or changing the ': ' Wanchan naudoja šį leidimą, kad užtikrintų, jog tam tikros užklausos turėtų galiojančias ir saugias antraštes. Tai kartais apima pašalinimą arba keitimą ',
        'contextMenus': 'contextMenus',
        'declarativeNetRequest': 'declarativeNetRequest',
        'file://*': 'file://*',
        ' is used to help prevent web browsers from unexpectedly deleting dictionary data. ': ' naudojama padėti išvengti, kad žiniatinklio naršyklė netikėtai neištrintų žodyno duomenų. ',
        'nativeMessaging': 'nativeMessaging',
        ' permission, which should prevent data deletion.': ' leidimą, kuris turėtų užkirsti kelią duomenų ištrynimui.',
        ' request header, as this can be used to fingerprint browser configuration. ': ' užklausos antraštę, nes ji gali būti naudojama naršyklės konfigūracijai identifikuoti. ',
        ' scheme. ': ' schemą. ',
        'scripting': 'scripting',
        'storage': 'storage',
        'unlimitedStorage': 'unlimitedStorage',

        // --- ext/popup-preview.html ---
        'Yomitan Popup Preview': 'Wanchan Iššokančio Lango Peržiūra',
        ' This page uses the dictionaries you have installed in order to show a preview. If you see this message, make sure you have a dictionary installed. ': ' Šis puslapis naudoja įdiegtus žodynus peržiūrai rodyti. Jei matote šį pranešimą, įsitikinkite, kad turite įdiegtą žodyną. ',

        // --- ext/popup.html ---
        'Close popup': 'Uždaryti iššokantįjį langą',
        'Default Profile': 'Numatytasis profilis',
        'Go to Dictionaries settings.': 'Eiti į Žodynų nustatymus.',
        'Next definition': 'Kitas apibrėžimas',
        'No dictionaries have been installed or enabled yet.': 'Dar neįdiegti arba neįgalinti jokie žodynai.',
        'No results found.': 'Rezultatų nerasta.',
        'Previous definition': 'Ankstesnis apibrėžimas',
        ' The Yomitan extension has been updated to a new version! In order to continue viewing definitions on this page, you must reload this tab or restart your browser. ': ' Wanchan plėtinys buvo atnaujintas į naują versiją! Norėdami toliau matyti apibrėžimus šiame puslapyje, turite iš naujo įkelti šią kortelę arba paleisti naršyklę iš naujo. ',
        'Yomitan Search': 'Wanchan Paieška',
        'Yomitan Updated!': 'Wanchan Atnaujintas!',
        'high priority term': 'Populiarus terminas!',
        'rarely-used kanji form of this expression': 'Retai vartojama kanji forma!',
        'ateji (phonetic) reading': 'Ateji (kanji vartojami fonetiškai)!',
        'rarely-used kana form of this expression': 'Retai vartojama kana forma!',
        'irregular form of this expression': 'Netaisyklinga forma!',
        'gikun (meaning as reading) or jukujikun (special kanji reading)': 'Gikun (reikšmė kaip tarimas) arba jukujikun (visa junginio reikšmė)!',
        'outdated form of this expression': 'Pasenusi forma / archajiškas!',

        // --- ext/quick-start-guide.html ---
        '(Requires a kanji dictionary to be installed.)': '(Reikia įdiegti kandži žodyną.)',
        ', which can be disabled or configured in the ': ', kurį galima išjungti arba konfigūruoti ',
        ' After dictionaries have been installed, webpage text can be scanned by moving the cursor while holding a modifier key. The default key is ': ' Įdiegus žodynus, tinklalapio tekstą galima skenuoti perkeliant žymeklį laikant modifikavimo klavišą. Numatytasis klavišas yra ',
        'Backup section of the Settings': 'atsarginių kopijų skyriaus, Nustatymų',
        ' Clicking on a kanji character in a term\'s definition will show additional information about that character. ': ' Paspaudus ant kandži simbolio termino apibrėžime, bus rodoma papildoma informacija apie tą simbolį. ',
        ' Clicking the ': ' Spustelėjus ',
        'Dictionaries': 'Žodynai',
        'Get recommended dictionaries': 'Gauti rekomenduojamus žodynus',
        'Go to Info page': 'Eiti į Informacijos puslapį',
        'Go to Welcome page': 'Eiti į Pasveikinimo puslapį',
        ' If you are migrating from Yomichan, you may be interested in importing your data into Yomitan. Please follow instructions from ': ' Jei migruojate iš Yomichan, jus gali sudominti duomenų importavimas į Wanchan. Vykdykite instrukcijas iš ',
        ' If you are using or planning to use custom templates for Anki note creation, note that ': ' Jei naudojate arba planuojate naudoti pasirinktinius šablonus Anki užrašų kūrimui, atkreipkite dėmesį, kad ',
        'Installing Dictionaries': 'Žodynų Diegimas',
        'Migrating to Yomitan': 'Migravimas į Wanchan',
        'New to Yomitan? Head to Yomitan Wiki!': 'Naujokas? Daugiau informacijos rasite čia!',
        ' Please ensure that your custom templates are using the updated syntax. ': ' Įsitikinkite, kad jūsų pasirinktiniai šablonai naudoja atnaujintą sintaksę. ',
        'Quick Actions': 'Greiti Veiksmai',
        'Quick Start Guide': 'Greitos Pradžios Gidas',
        'Scanning Text': 'Teksto Skenavimas',
        'Search': 'Paieška',
        'Shift': 'Shift',
        ' The ': '  ',
        ' To get started, first select your desired language in the ': ' Norėdami pradėti, ',
        'Yomitan': 'Wanchan',
        'Yomitan Quick Start Guide': 'Wanchan Greitos Pradžios Gidas',
        ' Yomitan requires one or more dictionaries to be installed in order to look up terms, kanji, and other information. ': ' Wanchan reikalauja įdiegti vieną ar daugiau žodynų, kad būtų galima ieškoti terminų, kandži ir kitos informacijos. ',
        ' You can also import an exported collection of dictionaries from the ': ' Taip pat galite importuoti eksportuotą žodynų kolekciją iš ',
        'browser-action-popup': 'naršyklės veiksmo iššokantis langas',
        ' button in the browser bar will open the quick-actions popup. ': ', mygtukas naršyklės juostoje atidarys greitų veiksmų iššokantįjį langą. ',
        ' button of an entry in the search results will play an audio clip of a term\'s pronunciation using an online dictionary, if available. ': ' paieškos rezultatų įrašo mygtukas atkurs termino tarimo garsą naudojant internetinį žodyną, jei jis yra. ',
        ' button will open the ': ' mygtukas atidarys ',
        'cog': 'krumpliaračio',
        ' for that. ': ' tam. ',
        'magnifying glass': 'didinamojo stiklo',
        ' page, enabling text and terms to be looked up using the installed dictionaries. This can even be used in offline mode! ': ' puslapį, leidžiantį ieškoti teksto ir terminų naudojant įdiegtus žodynus. Tai galima naudoti net neprisijungus! ',
        ' page, which has some helpful information and links about Yomitan. ': ', puslapį, kuriame yra naudingos informacijos ir nuorodų apie Wanchan. ',
        ' page. ': ' puslapį. ',
        ' page. Then, click on ': ' puslapyje spustelėkite ',
        'question mark': 'klaustuko',
        'scanning': 'skenavimas',
        ' section to find dictionaries for your language. You can also visit ': ' skyriuje. Taip pat galite spausti - ',
        'settings-dictionaries-popup': 'nustatymai-žodynai-iššokantis-langas',
        'some syntax has changed from Yomichan and Yomibaba.': 'kai kuri sintaksė pasikeitė nuo Yomichan ir Yomibaba.',
        'speaker': 'garsiakalbio',
        ' to learn more about Yomitan dictionaries. Once downloaded, dictionaries can be configured and managed from the same ': ', atsisiuntus, žodynus galima konfigūruoti ir valdyti tam pačiam ',
        ' under the ': ' po ',

        // --- ext/search.html ---
        ' Automatic kana conversion ': ' Automatinis kana konvertavimas ',
        'Clipboard monitor': 'Iškarpinės stebėjimas',
        'Input a term, expression, sentence, or block of text': 'Įveskite terminą, išraišką, sakinį ar teksto bloką',
        ' Parser ': ' Parseris ',
        'Search Settings': 'Paieškos Nustatymai',
        ' Search header stays on the page when scrolling down. ': ' Paieškos antraštė lieka puslapyje slenkant žemyn. ',
        ' Sticky search header ': ' Lipni paieškos antraštė ',

        // --- ext/settings.html ---
        '"A dog" → "A dog", "A"': '"A dog" → "A dog", "A"',
        '"A dog" → search for "A dog","A do", "A d", "A"': '"A dog" → ieškoti "A dog","A do", "A d", "A"',
        '"Noto Sans JP", "Meiryo", sans-serif': '"Noto Sans JP", "Meiryo", sans-serif',
        '\'s ': '\'s ',
        '\'s internal document, rather than using the ': ' vidinis dokumentas, o ne naudojant ',
        // Curly apostrophe versions (U+2019 instead of U+0027)
        ' option will start scanning at the cursor\'s current position, while the ': ' parinktis pradės skenavimą nuo dabartinės žymeklio pozicijos, o ',
        '(in milliseconds)': '(milisekundėmis)',
        ', a free application designed to assist in remembering information. This feature requires installation of the ': ', nemokama programa, skirta padėti prisiminti informaciją. Šiai funkcijai reikia įdiegti ',
        ', a popup\'s ': ', iššokančiojo lango ',
        ', all tags that are included in the ': ', visos žymos, kurios yra įtrauktos į ',
        ', only tags that are included in the ': ', tik žymos, kurios yra įtrauktos į ',
        ', or ': ', arba ',
        ', where the frequency corresponds to a number of occurrences. Large values indicate a more common term. ': ', kur dažnumas atitinka pasikartojimų skaičių. Didelės reikšmės nurodo dažnesnį terminą. ',
        ', where the frequency value corresponds to a ranking index. Smaller values indicate a more common term. ': ', kur dažnumo reikšmė atitinka reitingo indeksą. Mažesnės reikšmės nurodo dažnesnį terminą. ',
        ', which helps avoid situations where the web page might try to modify or use the Yomitan popup for an unintended purpose. ': ', kas padeda išvengti situacijų, kai tinklalapis gali bandyti modifikuoti arba naudoti Wanchan iššokantįjį langą nenumatytam tikslui. ',
        ' - Definitions for the same term with the same reading will be grouped together. ': ' - Apibrėžimai tam pačiam terminui su tuo pačiu skaitymu bus sugrupuoti. ',
        ' - Every definition will be listed as a separate entry. ': ' - Kiekvienas apibrėžimas bus pateiktas kaip atskiras įrašas. ',
        ' - Related terms that share the same definitions will be grouped together. ': ' - Susiję terminai, kurie dalijasi tais pačiais apibrėžimais, bus sugrupuoti. ',
        '. If Anki is running and AnkiConnect is installed, clicking this URL should open a page showing the current version of AnkiConnect. ': '. Jei Anki veikia ir AnkiConnect yra įdiegtas, spustelėjus šį URL turėtų atsidaryti puslapis, rodantis dabartinę AnkiConnect versiją. ',
        '. Setting its value to ': '. Nustatant jo reikšmę į ',
        '. This container prevents scripts running on the underlying web page from being able to discover the ': '. Šis konteineris neleidžia scenarijams, veikiantiems pagrindiniame tinklalapyje, aptikti ',
        '. This information can also be added to Anki cards to provide additional context. ': '. Ši informacija taip pat gali būti pridėta prie Anki kortelių, kad suteiktų papildomo konteksto. ',
        '<iframe>': '<iframe>',
        ' A card is considered a duplicate if the value of the first field matches that of any other card. By default, this check will include cards across all decks in a collection, but this constraint can be relaxed by using either the ': ' Kortelė laikoma dublikatu, jei pirmojo lauko reikšmė sutampa su bet kurios kitos kortelės reikšme. Pagal nutylėjimą, šis patikrinimas apims korteles visose kolekcijos kaladėse, tačiau šį apribojimą galima sušvelninti naudojant arba ',
        ' A keyboard modifier key can be used to activate text scanning when the cursor is moved. Alternatively, the ': ' Klaviatūros modifikavimo klavišas gali būti naudojamas teksto skenavimui aktyvuoti perkeliant žymeklį. Arba "',
        ' A malicious dictionary which contains malicious CSS may try to execute Javascript. For example, if the output of the Yomitan API is used in Anki, then the resulting Anki card may execute unintended Javascript. The risk in this case is similar to downloading a malicious Anki deck. Namely, in both cases, you are relying purely on Anki\'s sandbox to protect your machine and information from the malicious code. If the Anki sandbox works, card contents could be leaked (a minor confidential issue). If the sandbox fails, there is much more to worry about (actions being taken on your machine such as stealing credentials and sensitive information, or ransomware taking over your computer). ': ' Kenkėjiškas žodynas, kuriame yra kenkėjiškas CSS, gali bandyti vykdyti Javascript. Pavyzdžiui, jei Wanchan API išvestis naudojama Anki, tuomet gauta Anki kortelė gali vykdyti nenumatytą Javascript. Rizika šiuo atveju yra panaši į kenkėjiškos Anki kaladės atsisiuntimą. Būtent abiem atvejais jūs pasikliaujate vien tik Anki smėlio dėže, kad apsaugotumėte savo mašiną ir informaciją nuo kenkėjiško kodo. Jei Anki smėlio dėžė veikia, kortelės turinys gali nutekėti (nedidelė konfidencialumo problema). Jei smėlio dėžė neveikia, yra daug daugiau nerimo (veiksmai, atliekami jūsų mašinoje, tokie kaip kredencialų ir jautrios informacijos vagystė, arba išpirkos reikalaujanti programinė įranga užvaldanti jūsų kompiuterį). ',
        'A menu option to log debugging information will be shown in the search results.': 'Meniu parinktis registruoti derinimo informaciją bus rodoma paieškos rezultatuose.',
        'API key': 'API raktas',
        'About Yomitan': 'Apie Wanchan',
        'Above text': 'Virš teksto',
        'Accessibility': 'Prieinamumas',
        'Action bar appearance': 'Veiksmų juostos išvaizda',
        'Active profile': 'Aktyvus profilis',
        'Adjust how many characters are bidirectionally scanned to form a sentence.': 'Reguliuoti, kiek simbolių skenuojama abiem kryptimis sakiniui formuoti.',
        'Adjust the format and quality of screenshots created for cards.': 'Reguliuoti ekrano kopijų, sukurtų kortelėms, formatą ir kokybę.',
        'Adjust the maximum number of results shown for lookups.': 'Reguliuoti maksimalų rodomų rezultatų skaičių paieškoms.',
        'Adjust the style of Yomitan.': 'Reguliuoti Wanchan stilių.',
        'Adjust the volume audio is played at, in percent. ': 'Reguliuoti garso atkūrimo garsumą procentais. ',
        'Advanced': 'Išplėstinė',
        'After reading direction': 'Po skaitymo krypties',
        'Allow adding': 'Leisti pridėti',
        ' Allow bypassing css sanitization ': ' Leisti apeiti CSS valymą ',
        'Allow overwriting': 'Leisti perrašyti',
        'Allow scanning popup content': 'Leisti skenuoti iššokančiojo lango turinį',
        'Allow scanning popup source terms': 'Leisti skenuoti iššokančiojo lango šaltinio terminus',
        'Allow scanning search page content': 'Leisti skenuoti paieškos puslapio turinį',
        'Allow scanning words under the pointer without the pointer being in motion.': 'Leisti skenuoti žodžius po žymekliu, žymekliui nejudant.',
        'Always': 'Visada',
        'Anki': 'Anki',
        'AnkiConnect': 'AnkiConnect',
        ' AnkiConnect releases after around 2022-05-29 support a new note editor window which can be shown when clicking the ': ' AnkiConnect versijos po maždaug 2022-05-29 palaiko naują užrašų redaktoriaus langą, kuris gali būti rodomas spustelėjus ',
        'AnkiConnect server address': 'AnkiConnect serverio adresas',
        'Appearance': 'Išvaizda',
        'Asterisk': 'Žvaigždutė',
        ' Attempting to connect to Anki can sometimes return an error message which includes "Invalid response", which may indicate that the value of the ': ' Bandant prisijungti prie Anki kartais gali būti grąžinamas klaidos pranešimas, kuriame yra „Neteisingas atsakymas“, kas gali reikšti, kad vertė ',
        'Audio': 'Garsas',
        'Audio fallback sound': 'Garso atsarginis garsas',
        ' Audio files can be downloaded from remote servers when creating Anki cards, and sometimes these downloads can stall due to server or internet connectivity issues. When this setting has a non-zero value, if a download has stalled for longer than the time specified, the download will be cancelled. ': ' Garso failai gali būti atsisiunčiami iš nuotolinių serverių kuriant Anki korteles, ir kartais šie atsisiuntimai gali įstrigti dėl serverio ar interneto ryšio problemų. Kai šis nustatymas turi nenulinę reikšmę, jei atsisiuntimas įstrigo ilgiau nei nurodytas laikas, atsisiuntimas bus atšauktas. ',
        'Audio volume': 'Garso garsumas',
        'Auto': 'Auto',
        'Auto-hide search popup': 'Automatiškai slėpti paieškos iššokantįjį langą',
        'Auto-play search result audio': 'Automatiškai groti paieškos rezultato garsą',
        ' Auto-scale ': ' Automatinis mastelis ',
        ' Auto-scaling will scale the popup automatically based on the browser\'s zoom levels in order to keep the popup at a constant physical size, regardless of the zoom level. ': ' Automatinis mastelis automatiškai keis iššokančiojo lango dydį, remiantis naršyklės mastelio lygiais, kad išlaikytų pastovų fizinį dydį, nepriklausomai nuo mastelio lygio. ',
        'Average frequencies': 'Vidutiniai dažniai',
        'Backup': 'Atsarginė kopija',
        'Before reading direction': 'Prieš skaitymo kryptį',
        'Below text': 'Po tekstu',
        'Bloop': 'Bloop',
        'Body': 'Turinys',
        'Bottom': 'Apačia',
        'Browser': 'Naršyklė',
        ' By default, duplicate checks are only performed for notes created with the same model. Enabling this option will check for duplicates across ': ' Pagal nutylėjimą, dublikatų patikrinimai atliekami tik užrašams, sukurtiems su tuo pačiu modeliu. Įgalinus šią parinktį, bus tikrinami dublikatai per ',
        ' By default, scanning text inside of an embeded ': ' Pagal nutylėjimą, skenuojant tekstą įterptame ',
        'Card browser': 'Kortelių naršyklė',
        'Card tags': 'Kortelių žymos',
        'Change how frequency information is presented. ': 'Keisti, kaip pateikiama dažnumo informacija. ',
        'Change how many characters are read when scanning for terms.': 'Keisti, kiek simbolių nuskaitoma ieškant terminų.',
        ' Change how related results are grouped. ': ' Keisti, kaip grupuojami susiję rezultatai. ',
        'Change how terms and their readings are displayed.': 'Keisti, kaip rodomi terminai ir jų skaitymai.',
        'Change how the search page reacts to new text in the clipboard.': 'Keisti, kaip paieškos puslapis reaguoja į naują tekstą iškarpinėje.',
        'Change how the selected definition entry is visually indicated.': 'Keisti, kaip vizualiai nurodomas pasirinktas apibrėžimo įrašas.',
        ' Change the URL of the AnkiConnect server. ': ' Keisti AnkiConnect serverio URL. ',
        'Change the appearance of the window.': 'Keisti lango išvaizdą.',
        'Change the delay before scanning occurs when no modifier key is required.': 'Keisti delsą prieš skenuojant, kai nereikalaujama modifikavimo klavišo.',
        'Change the distance the popup is placed relative to horizontal text.': 'Keisti atstumą, kuriuo iššokantis langas yra horizontaliojo teksto atžvilgiu.',
        'Change the distance the popup is placed relative to vertical text.': 'Keisti atstumą, kuriuo iššokantis langas yra vertikaliojo teksto atžvilgiu.',
        ' Change the font family used in Yomitan. ': ' Keisti šriftų šeimą, naudojamą Wanchan. ',
        'Change the font size used in popups, in pixels. ': 'Keisti šrifto dydį, naudojamą iššokančiuose languose, pikseliais. ',
        ' Change the layout of the popup. ': ' Keisti iššokančiojo lango išdėstymą. ',
        'Change the limit on the number of popups that may be generated.': 'Keisti generuojamų iššokančiųjų langų skaičiaus limitą.',
        'Change the space between lines of text in popups. This will usually be a decimal number between 1 and 2.': 'Keisti tarpą tarp teksto eilučių iššokančiuose languose. Tai paprastai bus dešimtainis skaičius nuo 1 iki 2.',
        'Change what type of furigana is displayed for parsed text. Japanese only.': 'Keisti, kokio tipo furigana rodoma analizuojamam tekstui. Tik japonų kalba.',
        'Change where the popup is positioned relative to horizontal text.': 'Keisti, kur iššokantis langas yra pozicionuojamas horizontaliojo teksto atžvilgiu.',
        'Change where the popup is positioned relative to vertical text.': 'Keisti, kur iššokantis langas yra pozicionuojamas vertikaliojo teksto atžvilgiu.',
        'Character': 'Simbolis',
        'Check for card duplicates': 'Tikrinti kortelių dublikatus',
        ' Check for duplicates across all models ': ' Tikrinti dublikatus visuose modeliuose ',
        'Click': 'Spustelėti',
        'Clipboard': 'Iškarpinė',
        'Clipboard text search mode': 'Iškarpinės teksto paieškos režimas',
        'Collection': 'Kolekcija',
        'Compact Popup': 'Kompaktiškas iššokantis langas',
        'Compact Popup and Anki': 'Kompaktiškas iššokantis langas ir Anki',
        'Compact glossaries': 'Kompaktiški žodynėliai',
        'Compact tags': 'Kompaktiškos žymos',
        'Compress frequency tags into one "Average" frequency tag based on the harmonic mean.': 'Suspausti dažnumo žymas į vieną „Vidutinį“ dažnumo žymą, remiantis harmoniniu vidurkiu.',
        'Configure Anki card format…': 'Konfigūruoti Anki kortelės formatą...',
        'Configure Anki flashcards…': 'Konfigūruoti Anki korteles...',
        'Configure Yomitan Permissions': 'Konfigūruoti Wanchan',
        'Configure advanced scanning inputs': 'konfigūruokite išplėstinius skenavimo įėjimus',
        'Configure advanced scanning inputs… ': 'Konfigūruoti išplėstinius skenavimo įėjimus... ',
        'Configure audio playback sources…': 'Konfigūruoti garso atkūrimo šaltinius...',
        'Configure collapsible dictionaries…': 'Konfigūruoti suskleidžiamus žodynus...',
        'Configure custom CSS…': 'Konfigūruoti pasirinktinį CSS...',
        'Configure custom text replacement patterns… ': 'Konfigūruoti pasirinktinį teksto keitimo šablonus... ',
        'Configure input action prevention…': 'Konfigūruoti įvesties veiksmų prevenciją...',
        'Configure installed and enabled dictionaries…': 'Konfigūruoti įdiegtus ir įgalintus žodynus...',
        'Configure native keyboard shortcuts…': 'Konfigūruoti vietinius klaviatūros sparčiuosius klavišus...',
        'Configure profiles…': 'Konfigūruoti profilius...',
        'Configure standard keyboard shortcuts…': 'Konfigūruoti standartinius klaviatūros sparčiuosius klavišus...',
        'Configure…': 'Konfigūruoti...',
        'Connection status:': 'Ryšio būsena:',
        'Control the left position of the window, in pixels.': 'Valdyti kairę lango poziciją pikseliais.',
        'Control the scaling factor of the popup.': 'Valdyti iššokančiojo lango mastelio koeficientą.',
        'Control the size of the popup, in pixels.': 'Valdyti iššokančiojo lango dydį pikseliais.',
        'Control the size of the window, in pixels.': 'Valdyti lango dydį pikseliais.',
        'Control the top position of the window, in pixels.': 'Valdyti viršutinę lango poziciją pikseliais.',
        'Control when and where the action bar is visible. ': 'Valdyti, kada ir kur matoma veiksmų juosta. ',
        ' Correct the pointer location on webpages where CSS ': ' Pataisyti žymeklio vietą tinklalapiuose, kur CSS ',
        'Custom': 'Pasirinktinis',
        'Custom, no newlines': 'Pasirinktinis, be naujų eilučių',
        'Customize handlebars templates…': 'Tinkinti handlebars šablonus...',
        'Dark': 'Tamsus',
        'Debug': 'Derinimas',
        'Deck': 'Kaladė',
        'Deck root': 'Kaladės šaknis',
        'Deep content scanning': 'Gilus turinio skenavimas',
        'Default': 'Numatytasis',
        'Delay ': 'Delsa ',
        'Details…': 'Išsamiau...',
        ' Dictionary frequency data can be represented in one of two ways: ': ' Žodyno dažnumo duomenys gali būti pateikiami vienu iš dviejų būdų: ',
        'Dictionary reading': 'Žodyno skaitymas',
        'Dictionary search resolution': 'Žodyno paieškos skiriamoji geba',
        'Disabled': 'Išjungta',
        'Display mode': 'Rodymo režimas',
        'Display term glossaries using a more compact layout.': 'Rodyti terminų žodynėlius naudojant kompaktiškesnį išdėstymą.',
        'Downstep notation': 'Downstep notacija',
        'Downstep position': 'Downstep pozicija',
        ' Due to a bug in Safari, it may be necessary to click the ': ' Dėl klaidos Safari naršyklėje gali tekti spustelėti ',
        ' Duplicate card scope ': ' Dubliuotų kortelių apimtis ',
        'Duplicate cards of a different note type cannot be overwritten.': 'Dubliuotų kortelių su kitu užrašo tipu negalima perrašyti.',
        'Enable Anki integration': 'Įgalinti Anki integraciją',
        ' Enable Google Docs compatibility mode ': ' Įgalinti Google Docs suderinamumo režimą ',
        'Enable Yomitan': 'Įgalinti Wanchan',
        ' Enable Yomitan API ': ' Įgalinti Wanchan API ',
        'Enable audio playback for terms': 'Įgalinti garso atkūrimą terminams',
        'Enable background clipboard text monitoring': 'Įgalinti foninį iškarpinės teksto stebėjimą',
        'Enable scanning text that is covered by other layers.': 'Leisti skenuoti tekstą, kurį dengia kiti sluoksniai.',
        'Enable search page clipboard text monitoring': 'Įgalinti paieškos puslapio iškarpinės teksto stebėjimą',
        ' Enable suffix wildcard when looking up scanned webpage text. ': ' Įgalinti sufikso pakaitos simbolį ieškant nuskenuoto tinklalapio teksto. ',
        ' Enable support for sending local web requests to fetch data from Yomitan. ': ' Įgalinti palaikymą siųsti vietines žiniatinklio užklausas duomenims gauti iš Wanchan. ',
        ' Enable to help prevent the browser from unexpectedly clearing the database. ': ' Įgalinti, kad padėtumėte naršyklei netikėtai neišvalyti duomenų bazės. ',
        ' Enabling this option will sort search results using a specific dictionary. This can be beneficial when using multiple dictionaries which may not have consistent sorting information. ': ' Įgalinus šią parinktį, paieškos rezultatai bus rūšiuojami naudojant konkretų žodyną. Tai gali būti naudinga naudojant kelis žodynus, kurie gali neturėti nuoseklios rūšiavimo informacijos. ',
        ' Enabling this option, which is on by default, will take the value of this property into account when scanning webpage content. It is currently put behind an option in case there are unforeseen negative side effects. ': ' Įgalinus šią parinktį, kuri yra įjungta pagal nutylėjimą, bus atsižvelgta į šios savybės reikšmę skenuojant tinklalapio turinį. Šiuo metu tai yra pasirenkama parinktis, jei atsirastų nenumatytų neigiamų šalutinių poveikių. ',
        'Export Dictionary Collection': 'Eksportuoti žodynų kolekciją',
        'Export Settings': 'Eksportuoti nustatymus',
        'Font family': 'Šriftų šeima',
        'Font size': 'Šrifto dydis',
        'Force Anki sync on adding card': 'Priverstinis Anki sinchronizavimas pridedant kortelę',
        'Format': 'Formatas',
        'Frequency display style': 'Dažnumo rodymo stilius',
        'Frequency sorting dictionary': 'Dažnumo rūšiavimo žodynas',
        ' Frequency sorting mode ': ' Dažnumo rūšiavimo režimas ',
        'Full Width': 'Pilnas plotis',
        'Full width': 'Pilnas plotis',
        'Fullscreen': 'Visas ekranas',
        'Generate notes (experimental)…': 'Generuoti užrašus (eksperimentinė)...',
        'Get recommended dictionaries…': 'Gauti rekomenduojamus žodynus...',
        ' Google Docs now uses ': ' Google Docs dabar naudoja ',
        ' Google has changed this compatibility implementation several times, and the changes do not seem to be announced or documented. Therefore, it is possible that this feature could stop working at any time the future without warning. ': ' Google kelis kartus pakeitė šį suderinamumo įgyvendinimą, ir atrodo, kad apie pakeitimus nebuvo paskelbta ar dokumentuota. Todėl įmanoma, kad ši funkcija bet kuriuo metu ateityje gali nustoti veikti be įspėjimo. ',
        'Graph': 'Grafikas',
        'Group related terms': 'Susiję terminai',
        'Group term-reading pairs': 'Terminų-skaitymo poros',
        'Height': 'Aukštis',
        'Hide popup on cursor exit': 'Slėpti iššokantįjį langą žymekliui išėjus',
        ' Hold a key while moving the cursor to scan text. ': ' Laikyti klavišą perkeliant žymeklį tekstui skenuoti. ',
        'Hold the middle mouse button while moving the cursor to scan text.': 'Laikyti vidurinį pelės mygtuką perkeliant žymeklį tekstui skenuoti.',
        'Horizontal text offset': 'Horizontalus teksto poslinkis',
        'Horizontal text positioning': 'Horizontalus teksto pozicionavimas',
        ' If Yomitan has issues connecting to AnkiConnect, it may be necessary to adjust some system settings. See ': ' Jei Wanchan turi problemų jungiantis prie AnkiConnect, gali tekti pakoreguoti kai kuriuos sistemos nustatymus. Žiūrėti ',
        ' If any profile has this setting enabled, compatibility mode will be activated; profile conditions are ignored. ': ' Jei bet kuris profilis turi įgalintą šį nustatymą, suderinamumo režimas bus aktyvuotas; profilio sąlygos ignoruojamos. ',
        'If there are multiple duplicate cards, the first card found will be overwritten.': 'Jei yra kelios pasikartojančios kortelės, pirmoji rasta kortelė bus perrašyta.',
        ' If you choose to disable the CSS sanitization, we recommend thinking end-to-end about where the Yomitan API output is used, and whether that destination is resilient to potentially malicious Javascript code being included, otherwise you are potentially risking the data and integrity of your system. ': ' Jei nuspręsite išjungti CSS valymą, rekomenduojame gerai apgalvoti, kur naudojama Wanchan API išvestis, ir ar ta vieta yra atspari potencialiai kenkėjiškam Javascript kodui, kitaip jūs rizikuojate savo sistemos duomenimis ir vientisumu. ',
        ' If you want to specify one or multiple specific fonts, you can type them in manually separated by commas, for example ': ' Jei norite nurodyti vieną ar kelis specifinius šriftus, galite juos įvesti rankiniu būdu atskirtus kableliais, pavyzdžiui ',
        'Import Dictionary Collection': 'Importuoti žodynų kolekciją',
        'Import Settings': 'Importuoti nustatymus',
        ' Importing dictionaries may fail. ': ' Importuojant žodynus gali nepavykti. ',
        ' In order for Yomitan to use it, both MeCab and a native messaging component must be installed. A setup guide can be found ': ' Kad Wanchan galėtų jį naudoti, turi būti įdiegti tiek MeCab, tiek vietinis pranešimų komponentas. Sąrankos vadovą galite rasti "Yomitan MeCab Installer github" puslapyje, spausti - ',
        'Info…': 'Informacija...',
        'Inline list': 'Sąrašas eilutėje',
        ' Instead of showing definitions in a popup embedded into the webpage, a native browser window containing the popup content will be opened instead. This window will be shared across all tabs. ': ' Vietoj apibrėžimų rodymo iššokančiame lange, įterptame į tinklalapį, bus atidarytas vietinis naršyklės langas su iššokančiojo lango turiniu. Šis langas bus bendrinamas visose kortelėse. ',
        ' It may not be possible to enable Persistent Storage on Firefox for Android. ': ' Gali būti neįmanoma įgalinti Nuolatinės saugyklos Firefox Android. ',
        'JPEG': 'JPEG',
        ' Japanese only. ': ' Tik japonų kalba. ',
        ' Language ': ' Kalba ',
        ' Language of the text that is being looked up. ': ' Ieškomo teksto kalba. ',
        'Layout-aware scanning': 'Išdėstymą suprantantis skenavimas',
        'Left': 'Kairė',
        'Left of text': 'Kairėje nuo teksto',
        'Left position': 'Kairė pozicija',
        'Less…': 'Mažiau...',
        'Letter': 'Raidė',
        'Light': 'Šviesus',
        'Limit the number of characters used when searching clipboard text.': 'Riboti simbolių skaičių ieškant iškarpinės teksto.',
        'Line height': 'Eilutės aukštis',
        'List': 'Sąrašas',
        'List of space or comma separated tags to add to the card.': 'Sąrašas tarpais arba kableliais atskirtų žymų, kurias reikia pridėti prie kortelės.',
        'List of space or comma separated tags.': 'Sąrašas tarpais arba kableliais atskirtų žymų.',
        'Location': 'Vieta',
        'Log error to console': 'Registruoti klaidą konsolėje',
        'Manual': 'Rankinis',
        'Maximized': 'Padidintas',
        'Maximum clipboard text search length': 'Maksimalus iškarpinės teksto paieškos ilgis',
        'Maximum number of child popups': 'Maksimalus antrinių iššokančiųjų langų skaičius',
        'Maximum number of results': 'Maksimalus rezultatų skaičius',
        ' May cause issues when using in conjuction with Ankiconnect Android, and/or slow or metered connections. ': ' Gali sukelti problemų naudojant kartu su Ankiconnect Android ir/arba lėtais ar ribotais ryšiais. ',
        ' MeCab is a third-party program which uses its own dictionaries and parsing algorithm to decompose sentences into individual words. MeCab may provide more accurate parsing results than Yomitan\'s internal parser. ': ' MeCab yra trečiosios šalies programa, kuri naudoja savo žodynus ir analizės algoritmą sakiniams skaidyti į atskirus žodžius. MeCab gali pateikti tikslesnius analizės rezultatus nei Wanchan vidinis parseris. ',
        'Minimum distance on touch devices for a swipe to be recognized as scrolling. Lower values can feel more responsive but increase the chance for misinputs.': 'Minimalus atstumas liečiamuosiuose įrenginiuose, kad braukimas būtų atpažintas kaip slinkimas. Mažesnės reikšmės gali jaustis jautresnės, bet padidina klaidingų įvesčių tikimybę.',
        'Mode': 'Režimas',
        ' More advanced scanning input customization can be set up by enabling the ': ' Norit pakeisti spauskit ',
        'More…': 'Daugiau...',
        'Native': 'Vietinis',
        'Never': 'Niekada',
        'New cards will be suspended when a note is added. ': 'Naujos kortelės bus sustabdytos, kai pridedamas užrašas. ',
        'Newlines only': 'Tik naujos eilutės',
        'No grouping': 'Jokio grupavimo',
        'No key': 'Jokio klavišo',
        'Non-standard': 'Nestandartinis',
        'None': 'Nėra',
        'Normal': 'Normalus',
        'Normalize CSS zoom': 'Normalizuoti CSS mastelį',
        ' Not all dictionaries are able to be selected as the ': ' Ne visus žodynus galima pasirinkti kaip ',
        'Note editor': 'Užrašų redaktorius',
        ' Note that when this option is enabled, there is a possibility that the extension can interfere with the underlying webpage, since it must send messages to the webpage in order to determine the correct position of the popup. This typically does not cause issues, but if anything unexpected happens, this option could be the cause. ': ' Atkreipkite dėmesį, kad įgalinus šią parinktį, yra tikimybė, kad plėtinys gali trukdyti pagrindiniam tinklalapiui, nes jis turi siųsti pranešimus į tinklalapį, kad nustatytų teisingą iššokančiojo lango poziciją. Tai paprastai nesukelia problemų, bet jei atsitinka kažkas netikėto, ši parinktis gali būti priežastis. ',
        'Note viewer window': 'Užrašų peržiūros langas',
        'Notice for macOS users:': 'Pranešimas macOS vartotojams:',
        'Occurrence-based': 'Pagal pasikartojimą',
        ' On Firefox and Firefox for Android, the storage information feature may be hidden behind a browser flag. To enable this flag, open ': ' Firefox ir Firefox Android saugyklos informacijos funkcija gali būti paslėpta už naršyklės žymos. Norėdami įgalinti šią žymą, atidarykite ',
        'Only applies when language is set to Japanese, Chinese, Cantonese, or Korean.': 'Taikoma tik tada, kai kalba nustatyta į japonų, kinų, kantono arba korėjiečių.',
        ' Only enable this option if you trust the authors of your dictionaries or will perform sanitization outside of Yomitan. Malicious dictionaries can send malformed CSS to allow Javascript execution if injected into a webview or browser. ': ' Įgalinkite šią parinktį tik tada, jei pasitikite savo žodynų autoriais arba atliksite valymą už Wanchan ribų. Kenkėjiški žodynai gali siųsti netinkamą CSS, kad leistų vykdyti Javascript, jei įterpiama į žiniatinklio peržiūrą ar naršyklę. ',
        'Open the search page in a new window when text is copied to the clipboard.': 'Atidaryti paieškos puslapį naujame lange, kai tekstas nukopijuojamas į iškarpinę.',
        'Open…': 'Atidaryti...',
        'Overwriting a card can result in the loss of data.': 'Kortelės perrašymas gali lemti duomenų praradimą.',
        'PNG': 'PNG',
        ' Parse sentences using ': ' Analizuoti sakinius naudojant ',
        "Parse sentences using Yomitan\'s internal parser": 'Sakinio analizė naudojant Wanchan vidinį parserį',
        'Pass a secret value to AnkiConnect API calls. ': 'Perduoti slaptą reikšmę AnkiConnect API užklausas. ',
        "Percentage of the popup\'s height scrolled per step.": 'Procentinė iššokančiojo lango aukščio dalis, slenkama per žingsnį.',
        ' Pitch accent display styles ': ' Tono kirčio rodymo stiliai ',
        ' Pitch accents for terms and expressions can be shown if a dictionary supporting pitch accents is installed. There are currently three different ways that pitch accents can be presented: ': ' Tono kirčiai terminams ir išsireiškimams gali būti rodomi, jei įdiegtas žodynas, palaikantis tono kirčius. Šiuo metu yra trys skirtingi būdai, kaip gali būti pateikiami tono kirčiai: ',
        ' Placeholder text. ': ' Vietos žymeklio tekstas. ',
        'Plain term': 'Paprastas terminas',
        'Plain term and reading': 'Paprastas terminas ir skaitymas',
        'Popup': 'Iššokantis langas',
        'Popup Behavior': 'Iššokantis langas',
        'Popup Position & Size': 'Iššokančiojo lango pozicija ir dydis',
        'Position & Size': 'Pozicija ir dydis',
        'Prevent adding': 'Neleisti pridėti',
        'Primary dictionary': 'Pagrindinis žodynas',
        'Privacy Policy': 'Privatumo politika',
        'Quality (%)': 'Kokybė (%)',
        'Rank-based': 'Pagal rangą',
        ' Rather than searching for the source text exactly, the text will only be required to be a prefix of an existing term. For example, scanning 読み will effectively search for 読み*, which may bring up additional results such as 読み方. ': ' Vietoj tikslios šaltinio teksto paieškos, tekstas turės būti tik esamo termino priešdėlis. Pavyzdžiui, skenuojant 読み bus efektyviai ieškoma 読み*, kas gali pateikti papildomų rezultatų, tokių kaip 読み方. ',
        'Reading mode': 'Skaitymo režimas',
        'Reduced motion scrolling': 'Sumažinto judesio slinkimas',
        'Refresh': 'Atnaujinti',
        'Reset Settings': 'Iš naujo nustatyti',
        'Result Display': 'Grupavimas',
        'Result grouping mode': 'Rezultatų grupavimo režimas',
        'Right': 'Dešinė',
        'Right of text': 'Dešinėje nuo teksto',
        'Romaji': 'Romaji',
        'Same as horizontal text': 'Tas pats kaip horizontalus tekstas',
        ' Sanitization bypass will allow CSS that cannot be sanitized to pass through the sanitizer unchanged. This ONLY applies to the Yomitan API, it will not make any other areas of Yomitan potentially vulnerable. ': ' Valymo apylanka leis CSS, kurio negalima išvalyti, praeiti pro valiklį nepakeistą. Tai TAIKOMA TIK Wanchan API, tai nepadarys jokių kitų Wanchan sričių pažeidžiamų. ',
        'Scale': 'Mastelis',
        'Scan delay ': 'Skenavimo delsa ',
        'Scan modifier key': 'Skenavimo modifikavimo klavišas',
        'Scan resolution': 'Skenavimo skiriamoji geba',
        'Scan using middle mouse button': 'Skenuoti naudojant vidurinį pelės mygtuką',
        'Scan without mouse move': 'Skenuoti nejudinant pelės',
        'Scanning': 'Skenavimas',
        'Screenshot format': 'Ekrano kopijos formatas',
        'Scrolls by a configurable height (similar to pagination), reducing animations. Useful on e-readers and e-ink screens.': 'Slenkama konfigūruojamu aukščiu (panašiai kaip puslapiavimas), mažinant animacijas. Naudinga e-skaityklėse ir e-ink ekranuose.',
        'Search Window': 'Paieškos langas',
        'Search for definitions': 'Ieškoti apibrėžimų',
        'Search terms when clicking text from the results list ': 'Ieškoti terminų spustelėjus tekstą iš rezultatų sąrašo ',
        'Search text with non-Japanese, Chinese, or Korean characters': 'Ieškoti teksto su ne tik japonų, kinų ar korėjiečių rašmenimis',
        'Secondary dictionaries': 'Antriniai žodynai',
        'Secondary dictionaries…': 'Antriniai žodynai...',
        'Security': 'Saugumas',
        ' See ': ' Žiūrėti ',
        ' See the ': ' Žiūrėti ',
        'Select matched text': 'Pasirinkti atitinkantį tekstą',
        'Selection indicator style': 'Pasirinkimo indikatoriaus stilius',
        'Sentence scanning extent': 'Sakinio skenavimo apimtis',
        'Sentence termination characters': 'Sakinio pabaigos simboliai',
        ' Sentence words are parsed using Yomitan\'s dictionaries. ': ' Sakinio žodžiai analizuojami naudojant Wanchan žodynus. ',
        'Sentence words are parsed using a third-party program. Japanese only.': 'Sakinio žodžiai analizuojami naudojant trečiosios šalies programą. Tik japonų kalba.',
        'Setting this value too high (100+) may impact performance.': 'Nustačius šią vertę per didelę (100+), tai gali paveikti našumą.',
        'Shadow': 'Šešėlis',
        'Shortcuts': 'Spartieji klavišai',
        'Show "Lookup in Yomitan" in right-click menu': 'Rodyti „Ieškoti Wanchan“ dešiniojo pelės mygtuko meniu',
        'Show a clickable speaker icon next to search results.': 'Rodyti paspaudžiamą garsiakalbio piktogramą šalia paieškos rezultatų.',
        ' Show card tags and flags ': ' Rodyti kortelės žymas ir vėliavėles ',
        'Show debug information': 'Rodyti derinimo informaciją',
        'Show fewer repeated tags for term glossaries. ': 'Rodyti mažiau pasikartojančių žymų terminų žodynėliuose. ',
        ' Show iframe popups in the root frame ': ' Rodyti iframe iššokančiuosius langus šakniniame rėmelyje ',
        'Show space between parsed words': 'Rodyti tarpą tarp analizuojamų žodžių',
        'Show tags for expressions and their readings': 'Rodyti žymas išsireiškimams ir jų skaitymams',
        'Show the ': 'Rodyti ',
        'Size': 'Dydis',
        'Small dot (left)': 'Mažas taškas (kairėje)',
        'Small dot (right)': 'Mažas taškas (dešinėje)',
        ' Sort results using a frequency dictionary. ': ' Rūšiuoti rezultatus naudojant dažnumo žodyną. ',
        'Split tags': 'Skaidyti žymas',
        'Split tags, grouped content': 'Skaidyti žymas, sugrupuotas turinys',
        'Standard': 'Standartinis',
        ' Start the lookup scan at the word or character of the cursor position. ': ' Pradėti paieškos skenavimą nuo žodžio ar simbolio žymeklio pozicijoje. ',
        'State': 'Būsena',
        'Storage': 'Saugykla',
        'Suspend new cards': 'Sustabdyti naujas korteles',
        'Swipe threshold': 'Braukimo slenkstis',
        'Switch the active profile that is used for scanning.': 'Perjungti aktyvų profilį, kuris naudojamas skenavimui.',
        'Tags': 'Žymos',
        'Tags, grouped content': 'Žymos, sugrupuotas turinys',
        'Target tags': 'Tikslinės žymos',
        'Tasks in progress:': 'Vykdomos užduotys:',
        'Term display style': 'Termino rodymo stilius',
        'Term furigana': 'Termino furigana',
        'Term furigana and reading': 'Termino furigana ir skaitymas',
        'Test ': 'Testas ',
        'Text Parsing': 'Teksto analizė',
        'Text inside of popups can be scanned for definitions, which will open a new popup.': 'Tekstas iššokančiuose languose gali būti skenuojamas apibrėžimams, kas atidarys naują iššokantįjį langą.',
        'Text on the ': 'Tekstas ',
        'Text scan length': 'Teksto skenavimo ilgis',
        'The audio for the first result will be played automatically.': 'Pirmojo rezultato garso įrašas bus atkuriamas automatiškai.',
        ' The correct mode can be determined based on the contents of the dictionary; the ': ' Teisingą režimą galima nustatyti remiantis žodyno turiniu; ',
        ' The default address for a server on the same device is ': ' Numatytasis serverio adresas tame pačiame įrenginyje yra ',
        ' The font family can be changed to any font installed on your system.': ' Šriftų šeimą galima pakeisti į bet kurį sistemoje įdiegtą šriftą.',
        ' The maximum time before an idle download will be cancelled; 0 = no limit. ': ' Maksimalus laikas, kol neveiklus atsisiuntimas bus atšauktas; 0 = nėra limito. ',
        ' The non-standard CSS ': ' Nestandartinis CSS ',
        'The query on the search page will be automatically updated with text in the clipboard.': 'Užklausa paieškos puslapyje bus automatiškai atnaujinta tekstu iš iškarpinės.',
        ' The scan resolution determines where the scan starts when the cursor is moved. The ': ' Skenavimo skiriamoji geba nustato, kur prasideda nuskaitymas, kai perkeliamas žymeklis. ',
        ' The sound to play when Yomitan fails to fetch audio. ': ' Garsas, kurį groti, kai Wanchan nepavyksta gauti garso. ',
        'Theme': 'Tema',
        'These tags can be scanned if the options for popup content scanning are enabled.': 'Šios žymos gali būti nuskaitytos, jei įgalintos iššokančiojo lango turinio skenavimo parinktys.',
        ' This can be required to retrieve CSS on some browsers which do not support the offscreen page necessary for full CSS sanitization in the Yomitan API on the backend. Yomitan will attempt to fall back on basic sanitization but this will fail for dictionaries making use of complex CSS. ': ' Tai gali būti reikalinga CSS gavimui kai kuriose naršyklėse, kurios nepalaiko už ekrano esančio puslapio, būtino visiškam CSS valymui Wanchan API. Wanchan bandys naudoti pagrindinį valymą, tačiau tai nepavyks žodynams, naudojantiems sudėtingą CSS. ',
        ' This feature requires Yomitan to have clipboard reading permissions, and when this option is enabled, the clipboard will be frequently checked for new text. ': ' Ši funkcija reikalauja, kad Wanchan turėtų iškarpinės skaitymo leidimus, ir kai ši parinktis įgalinta, iškarpinė bus dažnai tikrinama dėl naujo teksto. ',
        ' This option may send data outside of Yomitan to local applications that request it': ' Ši parinktis gali siųsti duomenis už Wanchan ribų į vietines programas, kurios to prašo',
        ' This option may send limited information about the current webpage, information contained in Yomitan dictionary entries, and/or relevant user settings outside of Yomitan to Anki': ' Ši parinktis gali siųsti ribotą informaciją apie dabartinį tinklalapį, informaciją, esančią Wanchan žodyno įrašuose, ir/arba atitinkamus vartotojo nustatymus už Wanchan ribų į Anki',
        ' This option may send search query data outside of Yomitan for parsing': ' Ši parinktis gali siųsti paieškos užklausos duomenis už Wanchan ribų analizei',
        ' This option may send term, reading, and/or language outside of Yomitan to fetch audio': ' Ši parinktis gali siųsti terminą, skaitymą ir/arba kalbą už Wanchan ribų garso gavimui',
        ' This page is taking longer than expected to load. ': ' Šio puslapio įkėlimas užtrunka ilgiau nei tikėtasi. ',
        ' This setting does not have any effect in Firefox, as it does not implement the ': ' Šis nustatymas neturi jokio poveikio „Firefox“ naršyklei, nes joje iki šiol nepalaikoma ',
        ' This will likely cause scanning and lookup to be slower, and the results may not be as relevant. ': ' Tai greičiausiai sukels lėtesnį skenavimą ir paiešką, o rezultatai gali būti ne tokie aktualūs. ',
        ' To activate the Yomitan API, a native messaging component must be installed. A setup guide can be found ': ' Norint suaktyvinti Wanchan API, turi būti įdiegtas vietinis pranešimų komponentas. Sąrankos vadovą galima rasti „yomitan-api“ „GitHub“ puslapyje - spausti ',
        'Top': 'Viršus',
        'Top position': 'Viršutinė pozicija',
        'Translation': 'Vertimas',
        'Triangle': 'Trikampis',
        'Type': 'Tipas',
        'Update query only': 'Atnaujinti tik užklausą',
        ' Use a native browser window instead of an embedded popup ': ' Naudoti vietinį naršyklės langą vietoj įterpto iššokančiojo lango ',
        ' Use a secure container around popups ': ' Naudoti saugų konteinerį aplink iššokančiuosius langus ',
        ' Use secure popup frame URL ': ' Naudoti saugų iššokančiojo lango rėmelio URL ',
        'Use webpage styling information to determine where line breaks are likely to be.': 'Naudoti tinklalapio stiliaus informaciją, kad nustatytumėte, kur tikėtina bus eilučių lūžiai.',
        'Vertical bar (left)': 'Vertikalus brūkšnys (kairėje)',
        'Vertical bar (right)': 'Vertikalus brūkšnys (dešinėje)',
        'Vertical text offset': 'Vertikalus teksto poslinkis',
        'Vertical text positioning': 'Vertikalus teksto pozicionavimas',
        'View added note': 'Peržiūrėti pridėtą užrašą',
        'Viewport': 'Rodinio sritis',
        'Visibility': 'Matomumas',
        ' Web browsers will sometimes clear stored data if the device is running low on storage space. This can result in the imported dictionaries being deleted unexpectedly, causing Yomitan to stop functioning. Enabling persistent storage tells the browser that the data should not be deleted in those circumstances. ': ' Žiniatinklio naršyklės kartais išvalo saugomus duomenis, jei įrenginyje trūksta vietos. Tai gali lemti importuotų žodynų netikėtą ištrynimą, dėl ko Wanchan nustos veikti. Įgalinus nuolatinę saugyklą, naršyklei nurodoma, kad duomenys neturėtų būti ištrinti tokiomis aplinkybėmis. ',
        ' When a duplicate is detected ': ' Kai aptinkamas dublikatas ',
        'When an existing popup is present, upon scanning again, hide the existing popup even if no definitions are found when scanning again. ': 'Kai yra esamas iššokantis langas, skenuojant vėl, slėpti esamą iššokantįjį langą, net jei skenuojant vėl nerandama apibrėžimų. ',
        ' When coming across a word that is already in an Anki deck, two buttons can appear that show the tags and flags the card has. If set to ': ' Susidūrus su žodžiu, kuris jau yra Anki kaladėje, gali pasirodyti du mygtukai, rodantys kortelės žymas ir vėliavėles. Jei nustatyta į ',
        'When the cursor exits the popup, the popup will be hidden.': 'Kai žymeklis išeina iš iššokančiojo lango, iššokantis langas bus paslėptas.',
        ' When this option is enabled, the URL of the ': ' Kai ši parinktis įgalinta, URL ',
        'Width': 'Plotis',
        'Wildcard scanning': 'Pakaitos simbolių skenavimas',
        'Window style': 'Lango stilius',
        'Word': 'Žodis',
        'Yomitan Settings': 'Wanchan Nustatymai',
        ' Yomitan can import and export settings files which can be used to restore settings, share settings across devices, and to help to debug problems. These files will only contain settings and will not contain dictionaries. Dictionaries must be imported separately. However, you can also import a previously exported collection of dictionaries. See the next section about that. ': ' Wanchan gali importuoti ir eksportuoti nustatymų failus, kurie gali būti naudojami nustatymams atkurti, dalytis nustatymais įrenginiuose ir padėti derinti problemas. Šiuose failuose bus tik nustatymai ir nebus žodynų. Žodynai turi būti importuojami atskirai. Tačiau taip pat galite importuoti anksčiau eksportuotą žodynų kolekciją. Žiūrėkite kitą skyrių apie tai. ',
        ' Yomitan can watch the system clipboard and automatically search on the search page when text is copied. This can be useful for using Yomitan to scan text from external applications. ': ' Wanchan gali stebėti sistemos iškarpinę ir automatiškai ieškoti paieškos puslapyje, kai tekstas nukopijuojamas. Tai gali būti naudinga naudojant Wanchan tekstui skenuoti iš išorinių programų. ',
        ' Yomitan has two categories of keyboard shortcuts: ': ' Wanchan turi dvi klaviatūros sparčiųjų klavišų kategorijas: ',
        ' Yomitan is able to scan the sentence surrounding a term and parse individual words of the query on the ': ' Wanchan gali skenuoti sakinį aplink terminą ir analizuoti atskirus užklausos žodžius ',
        ' Yomitan is permitted unlimited storage. ': ' Wanchan leidžiama neribota saugykla. ',
        ' Yomitan is using an indeterminate amount of storage. ': ' Wanchan naudoja neapibrėžtą saugyklos kiekį. ',
        ' Yomitan is using approximately ': ' Wanchan naudoja maždaug ',
        ' Yomitan supports automatic flashcard creation for ': ' Wanchan palaiko automatinį kortelių kūrimą ',
        'Yomitan wiki': '▶',
        'Yomitan Wiki': '▶',
        ' Yomitan\'s internal parser is a simple algorithm which can parse sentences using the installed dictionaries. It works by repeatedly detecting the longest term at the start of the sentence and advancing until no text remains. This provides decent results for the general case, but since grammatical structure is not taken into account, it can sometimes yield incorrect segmentation. ': ' Wanchan vidinis parseris yra paprastas algoritmas, kuris gali analizuoti sakinius naudojant įdiegtus žodynus. Jis veikia pakartotinai aptikdamas ilgiausią terminą sakinio pradžioje ir judėdamas į priekį, kol nelieka teksto. Tai suteikia padorius rezultatus bendru atveju, tačiau kadangi gramatinė struktūra nėra vertinama, kartais tai gali lemti neteisingą segmentaciją. ',
        'You can customize overwriting for each field in the ': 'Galite pritaikyti perrašymą kiekvienam laukui ',
        ' You can input things such as ': ' Galite įvesti tokius dalykus kaip ',
        ' You can try to export the entire collection of your dictionaries into a single large file that you can try to import from other browsers or devices. Importing the collection like that is a destructive operation and will replace your current database of dictionaries so please proceed with caution. These operations can take a lot of time depending on the size of your database, especially to start and to complete, so have patience. ': ' Galite pabandyti eksportuoti visą savo žodynų kolekciją į vieną didelį failą, kurį galite pabandyti importuoti iš kitų naršyklių ar įrenginių. Toks kolekcijos importavimas yra destruktyvi operacija ir pakeis jūsų dabartinę žodynų duomenų bazę, todėl prašome elgtis atsargiai. Šios operacijos gali užtrukti daug laiko, priklausomai nuo duomenų bazės dydžio. ',
        'Your system is running low on storage space.': 'Jūsų sistemoje trūksta vietos saugykloje.',
        'Zoom level': 'Mastelio lygis',
        'about:config': 'about:config',
        'all': 'visi',
        ' and search for ': ' ir ieškoti ',
        ' attribute. This results in the extension URL not being exposed to the underling web page, and thus making it harder to detect the presence of Yomitan. ': ' atributas. Dėl to plėtinio URL nėra rodomas pagrindiniam tinklalapiui, todėl sunkiau aptikti Wanchan buvimą. ',
        ' button attempts to auto-detect the correct value. ': ' mygtukas bando automatiškai aptikti teisingą vertę. ',
        ' button in the browser bar to fully load the page ': ' mygtuką naršyklės juostoje, kad visiškai įkeltumėte puslapį ',
        ' button shows this window. ': ' mygtukas rodo šį langą. ',
        ' button. This can be tested using the buttons below. If an error occurs, Anki and/or AnkiConnect may need to be updated. ': ' mygtukas. Tai galima išbandyti naudojant žemiau esančius mygtukus. Jei įvyksta klaida, Anki ir/arba AnkiConnect gali reikėti atnaujinti. ',
        ' can be scanned for definitions, which will open a popup.': ' gali būti nuskaityta apibrėžimams, kas atidarys iššokantįjį langą.',
        'canvas-based': 'drobės pagrindu',
        ' defined)': ' apibrėžta)',
        'dom.storageManager.enabled': 'dom.storageManager.enabled',
        ' element will be assigned by directly changing the location of the ': ' elementas bus priskirtas tiesiogiai keičiant vietą ',
        ' element will be embeded inside of a container with a closed ': ' elementas bus įterptas į konteinerį su uždarytu ',
        ' element will open a new popup inside of that frame, which can sometimes be limiting due to the frame\'s size. When this option is enabled, the popup will be created in the root of the page, if possible. ': ', elementas atidarys naują iššokantįjį langą tame rėmelyje, kas kartais gali būti ribojama dėl rėmelio dydžio. Kai ši parinktis įgalinta, iššokantis langas bus sukurtas puslapio šaknyje, jei įmanoma. ',
        ' enabled)': ' įgalinta)',
        ' for a setup guide. ': ' sąrankos gida. ',
        ' for details. ': ' detalėms. ',
        ' for instructions to export your data from older Yomichan installations. ': ' instrukcijoms, kaip eksportuoti duomenis iš senesnių Yomichan diegimų. ',
        'here': 'čia',
        'http://127.0.0.1:19633': 'http://127.0.0.1:19633',
        'http://127.0.0.1:8765': 'http://127.0.0.1:8765',
        'iframe': 'iframe',
        ' installed, ': ' įdiegta, ',
        ' is used. ': ' naudojama. ',
        ' keyboard shortcuts are controlled by the extension, and can be added, removed, and configured to work on webpages that Yomitan functions on. ': ' klaviatūros spartieji klavišai valdomi plėtinio, ir juos galima pridėti, pašalinti ir konfigūruoti veikti tinklalapiuose, kuriuose veikia Wanchan. ',
        ' keyboard shortcuts are controlled by the web browser, and function globally within the web browser': ' klaviatūros spartieji klavišai valdomi žiniatinklio naršyklės, ir veikia globaliai naršyklėje',
        ' menu. ': ' meniu. ',
        ' mode will anchor the popup to the top or bottom of the screen and take up the full width of the screen, which can be useful on devices with touch screens. ': ' režimas pritvirtins iššokantįjį langą prie ekrano viršaus arba apačios ir užims visą ekrano plotį, kas gali būti naudinga įrenginiuose su jutikliniais ekranais. ',
        ' mode will position the popup relative to the scanned text. The ': ' režimas nustatys iššokančiojo lango poziciją nuskaityto teksto atžvilgiu. ',
        ' model types. ': ' modelio tipai. ',
        'monospace': 'monospace',
        ' of ': ' iš ',
        ' on browser startup': ' naršyklės paleidimo metu',
        ' option and clicking ': ' parinktį ir spustelėjus ',
        ' option can be used to scan text whenever the cursor is moved, without requiring any key to be held. ': '" parinktis gali būti naudojama tekstui skenuoti kiekvieną kartą perkėlus žymeklį, nereikalaujant laikyti jokio klavišo. ',
        ' option is incorrect. Resetting it to the default value may fix issues that are occurring. ': ' parinktis neteisinga. Atstatymas į numatytąją reikšmę gali išspręsti kylančias problemas. ',
        ' option should be assigned to a dictionary which contains related term information, and configuring the ': ' parinktis turėtų būti priskirta žodynui, kuriame yra susijusi termino informacija, ir konfigūruojant ',
        ' option will additionally check for duplicates in all child decks of the root deck. This allows adding cards that are unique for decks including a subdeck structure. For decks which don\'t have any parent-child hierarchy, both options function the same. ': ' parinktis papildomai tikrins dublikatus visose šakninės kaladės antrinėse kaladėse. Tai leidžia pridėti korteles, kurios yra unikalios kaladėms, įskaitant subkaladžių struktūrą. ',
        // --- ext/support.html ---
        'Bug Reporting': 'Klaidų pranešimas',
        'Community': 'Bendruomenė',
        'Feature Requests': 'Funkcijų užklausos',
        'If you have a feature request, please submit it on GitHub.': 'Jei turite funkcijos užklausą, pateikite ją GitHub.',
        'If you have found a bug, please report it on GitHub.': 'Jei radote klaidą, praneškite apie ją GitHub.',
        'Join the chat room': 'Prisijunkite prie pokalbių kambario',
        'Search for existing bugs': 'Ieškoti esamų klaidų',
        'Search for existing requests': 'Ieškoti esamų užklausų',
        'Submit a bug report': 'Pateikti klaidos ataskaitą',
        'Submit a feature request': 'Pateikti funkcijos užklausą',
        'The Quick Start Guide has a list of frequently asked questions which may help solve your problem.': 'Greitos pradžios vadove yra dažniausiai užduodamų klausimų sąrašas, kuris gali padėti išspręsti jūsų problemą.',
        'User support, development discussion, and general chat can be found in the': 'Vartotojų palaikymą, kūrimo diskusijas ir bendrus pokalbius galite rasti',
        'Yomitan Support': 'Wanchan Palaikymas',

        // --- ext/welcome.html ---
        'Agreed': 'Sutinku',
        'Back': 'Atgal',
        'Configure': 'Konfigūruoti',
        'Declined': 'Atmesta',
        'Enable permissions': 'Įgalinti leidimus',
        'Finish': 'Baigti',
        'Granting these permissions is recommended for the best experience.': 'Suteikti šiuos leidimus rekomenduojama geriausiai patirčiai.',
        'Keyboard Shortcuts': 'Klaviatūros spartieji klavišai',
        'Next': 'Kitas',
        'Step': 'Žingsnis',
        'Welcome!': 'Sveiki!',
        'Welcome to Yomitan': 'Sveiki atvykę į Wanchan',
        'You cannot remove required permissions.': 'Jus negalite pašalinti pagrindinių leidimų',
        'Yomitan can automatically download audio from generic sources to be used for Anki cards. Enabling this feature will allow Yomitan to connect to these services.': 'Wanchan gali automatiškai atsisiųsti garsą iš bendrųjų šaltinių naudoti Anki kortelėms. Įgalinus šią funkciją, Wanchan galės prisijungti prie šių paslaugų.',
        'Yomitan connects to an application called Anki allows you to create flashcards to help you remember what you learn. Enabling this feature will allow Yomitan to connect to Anki.': 'Wanchan jungiasi prie programos, vadinamos Anki, kuri leidžia kurti korteles, padedančias prisiminti tai, ką išmokote. Įgalinus šią funkciją, Wanchan galės prisijungti prie Anki.',
        'Yomitan uses the clipboard to search for text copied from other applications. Enabling this feature will allow Yomitan to read from the clipboard.': 'Wanchan naudoja iškarpinę ieškoti teksto, nukopijuoto iš kitų programų. Įgalinus šią funkciją, Wanchan galės skaityti iš iškarpinės.',
        'You can configure the behavior of popup cards, such as how they are shown and what information they contain.': 'Galite konfigūruoti iššokančiųjų kortelių elgseną, pvz., kaip jos rodomos ir kokią informaciją jose yra.',
        'You can customize keyboard shortcuts to perform various actions in Yomitan.': 'Galite pritaikyti klaviatūros sparčiuosius klavišus įvairiems veiksmams Wanchan atlikti.',

        // --- Missing translations from extracted-strings.json (auto-detected) ---
        // ext/welcome.html
        'All Yomitan features are available.': 'Visos Wanchan funkcijos pasiekiamos.',
        'Basic customization': 'Pagrindinis pritaikymas',
        'Configure Installed and enabled dictionaries…': 'Konfigūruoti įdiegtus ir įgalintus žodynus…',
        'Data Transmission': 'Duomenų perdavimas',
        'Disabling this option will disallow pronunciation audio playback for any terms searched.': 'Išjungus šią parinktį, nebus leidžiamas tarimo garso atkūrimas ieškosiems terminams.',
        'Enable optional permissions': 'Įgalinti papildomus leidimus',
        'Enable recommended permissions': 'Įgalinti rekomenduojamus leidimus',
        'Essential Yomitan features are available.': 'Pagrindinės Wanchan funkcijos pasiekiamos.',
        ' Further configuration is available on the ': ' Papildomą konfigūraciją galima rasti ',
        'Here are some basics to get started': 'Štai keletas pagrindų pradžiai',
        'Import Dictionaries (Important)': 'Importuoti žodynus (Svarbu)',
        'More customization options are available on the Settings page': 'Daugiau pritaikymo parinkčių yra nustatymų puslapyje',
        'Permissions page': 'Leidimų puslapyje',
        'Recommended Permissions (Important)': 'Rekomenduojami leidimai (Svarbu)',
        'Show this welcome guide on browser startup': 'Rodyti šį pasveikinimo gidą naršyklės paleidimo metu',
        'Templates': 'Šablonai',
        ' There are custom Anki templates in your settings. Note that ': ' Jūsų nustatymuose yra pasirinktinių Anki šablonų. Atkreipkite dėmesį, kad ',
        ' This option may send term, reading, and/or language outside of Yomitan to fetch audio when the speaker icon is clicked. Personally identifying information is never sent': ' Ši parinktis gali siųsti terminą, skaitymą ir/arba kalbą už Wanchan ribų, kad būtų gautas garsas paspaudus garsiakalbio piktogramą. Asmenį identifikuojanti informacija niekada nesiunčiama',
        'This will allow Yomitan to read the clipboard and communicate with external programs.': 'Tai leis Wanchan skaityti iškarpinę ir bendrauti su išorinėmis programomis.',
        'This will allow Yomitan to scan text from most sites.': 'Tai leis Wanchan skenuoti tekstą daugelyje svetainių.',
        'Welcome to Yomitan!': 'Sveiki atvykę į Wanchan!',
        'Yomitan features will be limited if the recommended permissions are not enabled.': 'Wanchan funkcijos bus ribotos, jei rekomenduojami leidimai nebus įgalinti.',
        '   and the web browser\'s    ': '   ir žiniatinklio naršyklės    ',
        ' and the web browser\'s extension settings page.': ' ir žiniatinklio naršyklės plėtinio nustatymų puslapyje.',
        'extension settings page': 'plėtinio nustatymų puslapyje',
        'some syntax has changed from previous versions of Yomitan.': 'kai kuri sintaksė pasikeitė nuo ankstesnių Wanchan versijų.',

        // ext/support.html
        'Contribute to the Yomitan project! Start by reading our ': 'Prisidėkite prie Wanchan projekto! Pradėkite nuo mūsų ',
        'Contribution Guidelines': 'Prisidėjimas',
        'Here are some ways to support Yomitan:': 'Štai keletas būdų palaikyti Wanchan:',
        'Leave us a review on the Firefox/Chrome/Edge store! ': 'Palikite mums atsiliepimą Firefox/Chrome/Edge parduotuvėje! ',
        'Report any bugs or feedback on our ': 'Praneškite apie klaidas ar atsiliepimus mūsų ',
        'Support Yomitan': 'Palaikyti Wanchan',
        'Support Yomitan ❤️': 'Palaikyti Wanchan ❤️',

        // ext/permissions.html
        ' and navigate to the settings for Yomitan. ': ' ir eikite į Wanchan nustatymus. ',

        // ext/legal.html
        'EDICT': 'EDICT',
        'KANJIDIC': 'KANJIDIC',

        // ext/legal-npm.html (package names - keep as-is)
        '@resvg/resvg-wasm': '@resvg/resvg-wasm',
        '@zip.js/zip.js': '@zip.js/zip.js',
        'Apache-2.0': 'Apache-2.0',
        'BSD-3-Clause': 'BSD-3-Clause',
        'ISC': 'ISC',
        'MIT': 'MIT',
        'MPL-2.0': 'MPL-2.0',
        'dexie': 'dexie',
        'dexie-export-import': 'dexie-export-import',
        'git+https://github.com/WebReflection/linkedom.git': 'git+https://github.com/WebReflection/linkedom.git',
        'git+https://github.com/dexie/Dexie.js.git': 'git+https://github.com/dexie/Dexie.js.git',
        'git+https://github.com/gildas-lormeau/zip.js.git': 'git+https://github.com/gildas-lormeau/zip.js.git',
        'git+ssh://git@github.com/yisibl/resvg-js.git': 'git+ssh://git@github.com/yisibl/resvg-js.git',
        'git://github.com/e-/Hangul.js.git': 'git://github.com/e-/Hangul.js.git',
        'git://github.com/inikulin/parse5.git': 'git://github.com/inikulin/parse5.git',
        'hangul-js': 'hangul-js',
        'https://registry.npmjs.org/kanji-processor/-/kanji-processor-1.0.2.tgz': 'https://registry.npmjs.org/kanji-processor/-/kanji-processor-1.0.2.tgz',
        'kanji-processor': 'kanji-processor',
        'linkedom': 'linkedom',
        'parse5': 'parse5',
        'yomitan-handlebars': 'yomitan-handlebars',

        // ext/template-renderer.html
        'Yomitan Handlebars Sandbox': 'Wanchan Handlebars smėlio dėžė',

        // ext/settings.html
        ' which prevents Yomitan from being able to scan text using the standard methods. Enabling this option will force Google Docs webpages to expose some additional text information which should allow Yomitan to still work. ': ' kas neleidžia Wanchan skenuoti teksto naudojant standartinius metodus. Įgalinus šią parinktį, Google Docs tinklalapiai bus priversti atskleisti papildomą teksto informaciją, kuri turėtų leisti Wanchan veikti. ',

        // --- Templates and others ---
        'Cancel': 'Atšaukti',
        'Save': 'Išsaugoti',

        // --- Dynamic Content (JS Controllers) ---
        // Mouse/Input
        'Middle mouse button:': 'Vidurinis pelės mygtukas:',
        'Back/forward mouse buttons:': 'Atgal/pirmyn pelės mygtukai:',
        'Text Hover': 'Teksto užvedimas',
        'Webpages': 'Tinklalapiai',
        'Popups': 'Iššokantys langai',
        'Search page': 'Paieškos puslapis',
        'Search query': 'Paieškos užklausa',

        // Anki Cards
        'Anki Cards': 'Anki kortelės',
        'Name': 'Pavadinimas',
        'Dictionary Type': 'Žodyno tipas',
        'Term': 'Terminas',
        'Kanji': 'Kanji',
        'Button': 'Mygtukas',
        'Model': 'Modelis',
        'Field': 'Laukas',
        'Value': 'Reikšmė',
        'Overwrite': 'Perrašyti',
        'Delete Format': 'Ištrinti formatą',
        'Help': 'Pagalba',
        'Description': 'Aprašymas',
        'Expression': 'Išraiška',
        'Reading': 'Skaitymas',
        'Front': 'Priekis',
        'Add Reverse': 'Pridėti atvirkštinę',
        'Sentence': 'Sakinys',
        'Sentence No word': 'Sakinys be žodžio',
        'Sentence no word': 'Sakinys be žodžio',
        'Original inflected term as it appeared before being reduced to dictionary form by Yomitan.': 'Originalus linksniuojamas terminas, koks jis pasirodė prieš Wanchan jį paverčiant žodyno forma.',
        'Original inflected term as it appeared before being reduced to dictionary form by Wanchan.': 'Originalus linksniuojamas terminas, koks jis pasirodė prieš Wanchan jį paverčiant žodyno forma.',

        // Anki Card Information Modal
        'Anki Card Information': 'Anki kortelės informacija',
        'Anki card templates': 'Anki kortelių šablonai',
        'Marker (for terms)': 'Žymeklis (terminams)',
        'Marker (for kanji)': 'Žymeklis (kanji)',
        'Marker (for both)': 'Žymeklis (abiem)',

        // Anki field markers
        '{audio}': '{audio}',
        '{cloze-body-kana}': '{cloze-body-kana}',
        '{cloze-body}': '{cloze-body}',
        '{conjugation}': '{conjugation}',
        '{expression}': '{expression}',
        '{furigana}': '{furigana}',
        '{furigana-plain}': '{furigana-plain}',
        '{glossary}': '{glossary}',
        '{glossary-brief}': '{glossary-brief}',
        '{glossary-no-dictionary}': '{glossary-no-dictionary}',
        '{glossary-first}': '{glossary-first}',
        '{glossary-plain}': '{glossary-plain}',
        '{glossary-plain-no-dictionary}': '{glossary-plain-no-dictionary}',
        '{glossary-first-brief}': '{glossary-first-brief}',
        '{glossary-first-no-dictionary}': '{glossary-first-no-dictionary}',
        '{part-of-speech}': '{part-of-speech}',
        '{phonetic-transcriptions}': '{phonetic-transcriptions}',
        '{pitch-accents}': '{pitch-accents}',
        '{pitch-accent-graphs}': '{pitch-accent-graphs}',
        '{pitch-accent-graphs-jj}': '{pitch-accent-graphs-jj}',
        '{pitch-accent-positions}': '{pitch-accent-positions}',
        '{pitch-accent-categories}': '{pitch-accent-categories}',
        '{reading}': '{reading}',
        '{character}': '{character}',
        '{kunyomi}': '{kunyomi}',
        '{onyomi}': '{onyomi}',
        '{onyomi-hiragana}': '{onyomi-hiragana}',
        '{stroke-count}': '{stroke-count}',
        '{clipboard-image}': '{clipboard-image}',
        '{clipboard-text}': '{clipboard-text}',
        '{cloze-prefix}': '{cloze-prefix}',
        '{cloze-suffix}': '{cloze-suffix}',
        '{sentence}': '{sentence}',
        '{dictionary}': '{dictionary}',
        '{dictionary-alias}': '{dictionary-alias}',
        '{document-title}': '{document-title}',
        '{frequencies}': '{frequencies}',
        '{frequency-harmonic-rank}': '{frequency-harmonic-rank}',
        '{frequency-harmonic-occurrence}': '{frequency-harmonic-occurrence}',
        '{frequency-average-rank}': '{frequency-average-rank}',
        '{frequency-average-occurrence}': '{frequency-average-occurrence}',
        '{screenshot}': '{screenshot}',
        '{search-query}': '{search-query}',
        '{popup-selection-text}': '{popup-selection-text}',
        '{sentence-furigana}': '{sentence-furigana}',
        '{sentence-furigana-plain}': '{sentence-furigana-plain}',
        '{url}': '{url}',
        '{tags}': '{tags}',
        '{marker}': '{marker}',

        // Anki marker descriptions
        'Audio of the term\'s pronunciation from one of the audio sources (if available).': 'Termino tarimo garso įrašas iš vieno iš garso šaltinių (jei yra).',
        'Kana reading for': 'Kana skaitymas',
        'Conjugation path from the raw inflected term to the source term.': 'Konjugacijos kelias nuo neapdoroto linksniuojamo termino iki šaltinio termino.',
        'Term expressed using kanji. If kanji expression is not available, kana is used.': 'Terminas išreikštas kanji. Jei kanji išraiška nepasiekiama, naudojama kana.',
        'List of definitions for the term.': 'Termino apibrėžimų sąrašas.',
        'List of definitions for the term in a more compact format.': 'Termino apibrėžimų sąrašas kompaktiškesniu formatu.',
        'List of definitions for the term, except the dictionary tag is omitted.': 'Termino apibrėžimų sąrašas, išskyrus žodyno žymą.',
        'First definition for the term.': 'Pirmasis termino apibrėžimas.',
        'List of definitions for the term with html only used for line breaks. This may break the formatting of some dictionaries.': 'Termino apibrėžimų sąrašas, kur HTML naudojamas tik eilučių lūžiams. Tai gali sugadinti kai kurių žodynų formatavimą.',
        'except the dictionary tag is omitted.': 'išskyrus žodyno žymą.',
        'First definition for the term in a more compact format.': 'Pirmasis termino apibrėžimas kompaktiškesniu formatu.',
        'First definition for the term, except the dictionary tag is omitted.': 'Pirmasis termino apibrėžimas, išskyrus žodyno žymą.',
        'Part of speech information for the term.': 'Termino kalbos dalies informacija.',
        'List of phonetic transcriptions for the term.': 'Termino fonetinių transkripcijų sąrašas.',
        'List of pitch accent downstep notations for the term.': 'Termino kirčio kritimo žymėjimų sąrašas.',
        'List of pitch accent graphs for the term.': 'Termino kirčio grafikų sąrašas.',
        'List of pitch accent graphs for the term (styled after Jidoujisho).': 'Termino kirčio grafikų sąrašas (Jidoujisho stiliumi).',
        'List of accent downstep positions for the term as a number.': 'Termino kirčio kritimo pozicijų sąrašas skaičiumi.',
        'List of pitch accent categories for the term (e.g. heiban, kifuku, atamadaka, odaka, nakadaka).': 'Termino kirčio kategorijų sąrašas (pvz., heiban, kifuku, atamadaka, odaka, nakadaka).',
        'Kana reading for the term, or empty for terms where the expression is the reading.': 'Kana skaitymas terminui arba tuščias terminams, kur išraiška yra skaitymas.',
        'Unicode glyph representing the current kanji.': 'Unicode glifas, atvaizduojantis dabartinį kanji.',
        'List of definitions for the kanji.': 'Kanji apibrėžimų sąrašas.',
        'Kunyomi (Japanese reading) for the kanji, expressed as hiragana.': 'Kunyomi (japoniškas skaitymas) kanji, išreikštas hiragana.',
        'Onyomi (Chinese reading) for the kanji, expressed as katakana.': 'Onyomi (kiniškas skaitymas) kanji, išreikštas katakana.',
        'Onyomi (Chinese reading) for the kanji, expressed as hiragana.': 'Onyomi (kiniškas skaitymas) kanji, išreikštas hiragana.',
        'Number of strokes that the kanji character has.': 'Brūkšnių skaičius, kurį turi kanji simbolis.',
        'An image which is stored in the system clipboard, if available.': 'Vaizdas, saugomas sistemos iškarpinėje, jei yra.',
        'Text which is stored in the system clipboard, if available.': 'Tekstas, saugomas sistemos iškarpinėje, jei yra.',
        'Fragment of the containing': 'Fragmentas iš',
        'starting at the beginning of': 'prasidedantis nuo pradžios',
        'until the beginning of': 'iki pradžios',
        'starting at the end of': 'prasidedantis nuo pabaigos',
        'until the end of': 'iki pabaigos',
        'Original name of the dictionary from which the card is being created.': 'Originalus žodyno pavadinimas, iš kurio kuriama kortelė.',
        'Display name of the dictionary from which the card is being created.': 'Žodyno rodomas pavadinimas, iš kurio kuriama kortelė.',
        'Title of the web page that the term or kanji appeared in.': 'Tinklalapio pavadinimas, kuriame pasirodė terminas ar kanji.',
        'Frequency information for the term or kanji.': 'Termino ar kanji dažnumo informacija.',
        'The harmonic mean of frequency data for the current term or kanji.': 'Dabartinio termino ar kanji dažnumo duomenų harmoninis vidurkis.',
        'Defaults to rank 9999999 when frequency data is not found, indicating extremely low rank-based term or kanji usage.': 'Numatytoji reikšmė yra rangas 9999999, kai dažnumo duomenys nerasti, rodantis itin žemą rangą pagal termino ar kanji naudojimą.',
        'Defaults to 0 occurrences when frequency data is not found, the lowest possible occurrence-based term or kanji usage.': 'Numatytoji reikšmė yra 0 pasikartojimų, kai dažnumo duomenys nerasti, žemiausias įmanomas pasikartojimais pagrįstas termino ar kanji naudojimas.',
        'The average of frequency data for the current term or kanji.': 'Dabartinio termino ar kanji dažnumo duomenų vidurkis.',
        'All frequencies from the selected dictionary put in a list.': 'Visi dažnumai iš pasirinkto žodyno sąraše.',
        'A single frequency number from the selected dictionary with no formatting data.': 'Vienas dažnumo skaičius iš pasirinkto žodyno be formatavimo duomenų.',
        'Screenshot of the web page taken at the time the term or kanji was added.': 'Tinklalapio ekrano kopija, padaryta tuo metu, kai buvo pridėtas terminas ar kanji.',
        'The full search query shown on the search page.': 'Pilna paieškos užklausa, rodoma paieškos puslapyje.',
        'The selected text on the search page or popup.': 'Pasirinktas tekstas paieškos puslapyje ar iššokančiame lange.',
        'Sentence, quote, or phrase that the term or kanji appears in from the source content.': 'Sakinys, citata ar frazė, kurioje pasirodo terminas ar kanji iš šaltinio turinio.',
        'Sentence, quote, or phrase that the term or kanji appears in from the source content, with furigana added.': 'Sakinys, citata ar frazė, kurioje pasirodo terminas ar kanji iš šaltinio turinio, su pridėta furigana.',
        'Sentence, quote, or phrase that the term or kanji appears in from the source content, with furigana added in brackets.': 'Sakinys, citata ar frazė, kurioje pasirodo terminas ar kanji iš šaltinio turinio, su furigana skliausteliuose.',
        'Address of the web page in which the term or kanji appeared in.': 'Tinklalapio adresas, kuriame pasirodė terminas ar kanji.',
        'Grammar and usage tags providing information about the term.': 'Gramatikos ir vartojimo žymos, teikiančios informaciją apie terminą.',
        'Same as': 'Tas pats kaip',
        ', but with entries from only a single dictionary.': ', bet su įrašais tik iš vieno žodyno.',
        'The dictionary name will likely be modified, use the options from the ▼ dropdown.': 'Žodyno pavadinimas greičiausiai bus pakeistas, naudokite parinktis iš ▼ išskleidžiamojo sąrašo.',
        'for kanji cards.': ' kanji kortelėms.',

        // Anki Templates Modal
        'Anki Card Templates': 'Anki kortelių šablonai',
        'Confirm Card Format Deletion': 'Patvirtinti kortelės formato ištrynimą',
        'Are you sure you want to delete the': 'Ar tikrai norite ištrinti',
        'card format?': 'kortelės formatą?',
        'Maximum Card Formats Reached': 'Pasiektas maksimalus kortelių formatų skaičius',
        'The number of card formats is limited to 5.': 'Kortelių formatų skaičius ribojamas iki 5.',
        'Consider copy-pasting the source into a code editor that supports syntax highlighting for easier editing.': 'Apsvarstykite galimybę nukopijuoti šaltinį į kodo redaktorių, palaikantį sintaksės paryškinimą, kad būtų lengviau redaguoti.',
        'Card templates can be tested using the inputs below.': 'Kortelių šablonus galima išbandyti naudojant toliau pateiktus įvesties laukus.',
        'Scanned text': 'Nuskaitytas tekstas',
        'Card field': 'Kortelės laukas',
        'Preview text': 'Peržiūros tekstas',
        'Card render result': 'Kortelės atvaizdavimo rezultatas',
        'Reset Templates': 'Atstatyti šablonus',
        'Reset Anki Card Templates': 'Atstatyti Anki kortelių šablonus',
        'Are you sure you want to reset the card templates to their default value?': 'Ar tikrai norite atstatyti kortelių šablonus į numatytąsias reikšmes?',
        'Any changes you made will be lost.': 'Visi jūsų atlikti pakeitimai bus prarasti.',

        // Anki Note Generator
        'Anki Note Generator': 'Anki užrašų generatorius',
        'WARNING: This feature is experimental!': 'ĮSPĖJIMAS: Ši funkcija yra eksperimentinė!',
        'Notes in plain text (.txt)': 'Užrašai paprastu tekstu (.txt) ',
        'format.': 'formatu.',
        'For more information check the': 'Daugiau informacijos rasite ',
        'documentation': 'dokumentacijoje',
        'Active Anki Flashcard Format:': 'Aktyvus Anki kortelių formatas:',
        'Active Anki deck:': 'Aktyvi Anki kaladė:',
        'Active Anki model:': 'Aktyvus Anki modelis:',
        'Split text into a newline separated list of words': 'Padalinti tekstą į naujos eilutės atskirtą žodžių sąrašą',
        'Parse Words': 'Analizuoti žodžius',
        'Remove duplicate lines': 'Pašalinti pasikartojančias eilutes',
        'Dedupe Words': 'Pašalinti žodžių dublikatus',
        'Test word': 'Testinis žodis',
        'Preview Card': 'Peržiūrėti kortelę',
        'Send to Anki': 'Siųsti į Anki',
        'Export to File': 'Eksportuoti į failą',
        'Send Notes to Anki': 'Siųsti užrašus į Anki',
        'Are you sure you want to send': 'Ar tikrai norite siųsti',
        'terms to': 'terminų į',
        '? This action cannot be undone.': '? Šio veiksmo negalima atšaukti.',
        'Add media to notes': 'Pridėti mediją prie užrašų',
        'Adding media increases processing time.': 'Medijos pridėjimas padidina apdorojimo laiką.',
        'Prevent sending duplicate notes': 'Neleisti siųsti pasikartojančių užrašų',
        'Checking for duplicates increases processing time.': 'Dublikatų tikrinimas padidina apdorojimo laiką.',
        'Export Notes to File': 'Eksportuoti užrašus į failą',
        'Are you sure you want to export': 'Ar tikrai norite eksportuoti',
        'format?': 'formatu?',

        // Import/Export
        'Import Error': 'Importavimo klaida',
        'An error occurred while trying to import the settings file:': 'Bandant importuoti nustatymų failą įvyko klaida:',
        'Additional info can be found in the developer console.': 'Papildomą informaciją galite rasti kūrėjo konsolėje.',
        'Import Security Warning': 'Importavimo saugumo įspėjimas',
        'Import': 'Importuoti',
        'Sanitize and Import': 'Išvalyti ir importuoti',
        'This action cannot be undone.': 'Šio veiksmo negalima atšaukti.',
        'Consider making a backup using the': 'Apsvarstykite galimybę sukurti atsarginę kopiją naudojant',
        'button before resetting': 'mygtuką prieš atstatant',
        'if you want to be able to revert.': 'jei norite galėti grįžti atgal.',
        'Dictionary data will not be deleted, but any installed dictionaries': 'Žodyno duomenys nebus ištrinti, bet visi įdiegti žodynai',
        'will need to be re-enabled.': 'turės būti iš naujo įgalinti.',
        'Reset All Settings': 'Atstatyti visus nustatymus',

        // Text Replacement
        'Custom Text Replacement Patterns': 'Pasirinktiniai teksto pakeitimo šablonai',
        'regular expression syntax': ' reguliariųjų išraiškų sintaksė ',
        'special replacement patterns': ' specialūs pakeitimo šablonai ',
        'Search original text': 'Ieškoti originaliame tekste',
        'The original unmodified text will also be searched for definitions.': 'Originalus nepakeistas tekstas taip pat bus ieškomas apibrėžimų.',
        'Text replacement patterns': 'Teksto pakeitimo šablonai',
        'None defined': 'Nėra apibrėžtų',

        // Sentence Termination
        'Sentence Termination Characters': 'Sakinio pabaigos simboliai',
        'Sentences are terminated by punctuation and quotation marks, which can both be configured below.': 'Sakiniai baigiami skyrybos ženklais ir kabutėmis, kuriuos abu galima konfigūruoti žemiau.',
        '#': '#',
        'Enabled': 'Įjungta',
        'Character 1': 'Simbolis 1',
        'Character 2': 'Simbolis 2',
        'Include character in sentence': 'Įtraukti simbolį į sakinį',
        'No terminators defined.': 'Nėra apibrėžtų terminatorių.',
        'Reset': 'Atstatyti',
        'Terminator': 'Terminatorius',
        'Quote': 'Kabutė',
        'At start': 'Pradžioje',
        'At end': 'Pabaigoje',

        // Keyboard Shortcuts
        'No keyboard shortcuts defined.': 'Nėra apibrėžtų klaviatūros sparčiųjų klavišų.',
        'Native Keyboard Shortcuts': 'Sisteminiai klaviatūros spartieji klavišai',
        'Open': 'Atidaryti',
        'chrome://extensions/shortcuts': 'chrome://extensions/shortcuts',
        'edge://extensions/shortcuts': 'edge://extensions/shortcuts',
        'in a new tab.': 'naujame skirtuke.',
        'Find the': 'Suraskite ',
        'section and configure the shortcuts.': ' sekciją ir sukonfigūruokite sparčiuosius klavišus.',
        'Open the extensions page (': 'Atidarykite plėtinių puslapį (',
        ')': ')',
        'Click the button on the right with the gear icon, then click': 'Spustelėkite mygtuką dešinėje su krumpliaračio piktograma, tada spustelėkite',
        'Manage Extension Shortcuts': ' Tvarkyti plėtinio sparčiuosius klavišus',
        'Reset All': 'Atstatyti viską',
        'Clear All': 'Išvalyti viską',
        'Confirm Keyboard Shortcuts Reset': 'Patvirtinti klaviatūros sparčiųjų klavišų atstatymą',
        'Are you sure you want to reset all keyboard shortcuts to their defaults?': 'Ar tikrai norite atstatyti visus klaviatūros sparčiuosius klavišus į numatytąsias reikšmes?',

        // Data Transmission
        'Data Transmission Consent': 'Duomenų perdavimo sutikimas',
        'To comply with': 'Kad atitiktų',
        'Firefox Add-On Policies': ' Firefox priedų politiką',
        ', Wanchan is required to get your verification that you are comfortable with any default data transmission the extension does.': ', Wanchan privalo gauti jūsų patvirtinimą, kad sutinkate su bet kokiu numatytuoju duomenų perdavimu, kurį atlieka plėtinys.',
        'This request may contain the term, reading, and/or language for the given dictionary entry term.': 'Ši užklausa gali turėti terminą, skaitymą ir/arba kalbą duotam žodyno įrašo terminui. ',
        'Wanchan does very little data transmission, as Wanchan data is stored locally on your device. Wanchan does not sell or externally collect any user data.': 'Wanchan atlieka labai mažai duomenų perdavimo, nes Wanchan duomenys yra saugomi lokaliai jūsų įrenginyje. „Wanchan“ neparduoda ir išoriškai nerenka jokių naudotojo duomenų.',
        'The only place data transmission is done by default is when the audio icon in the Wanchan popup is clicked to play the audio for a term; in this case a request will be sent to the audio provider configured in your settings.': 'Vienintelė vieta, kur duomenų perdavimas atliekamas pagal numatytuosius nustatymus, yra tada, kai iššokančiajame „Wanchan“ lange spustelėjama garso piktograma, norint paleisti termino įrašą; tokiu atveju užklausa bus išsiųsta jūsų nustatymuose sukonfigūruotam garso teikėjui.',
        'Full details on Wanchan\'s use of data transmission are provided in the ': 'Išsami informacija apie Wanchan vykdomą duomenų perdavimą yra pateikiama Privatumo politikoje ',
        'Personally identifying information is never sent.': 'Asmenį identifikuojanti informacija niekada nesiunčiama.',
        'Decline data transmission': 'Atmesti duomenų perdavimą',
        '(disable audio playback)': '(išjungti garso atkūrimą)',
        'Agree to data transmission': 'Sutikti su duomenų perdavimu',
        '(enable audio playback)': '(įjungti garso atkūrimą)',

        // Input/Scan options
        'Alt': 'Alt',
        'Ctrl': 'Ctrl',
        'Windows': 'Windows',
        'Required inputs:': 'Būtinos įvestys:',
        'No inputs': 'Nėra įvesčių',
        'Excluded inputs:': 'Išskirtos įvestys:',
        'Input types:': 'Įvesties tipai:',
        'Mouse': 'Pelė',
        'Touch': 'Lietimas',
        'Pen': 'Rašiklis',
        'Search types:': 'Paieškos tipai:',
        'Search for terms': 'Ieškoti terminų',
        'Search for kanji': 'Ieškoti kanji',
        'Touch options:': 'Lietimo parinktys:',
        'Scan on touch tap': 'Skenavimas palietus',
        'Scan on touch press': 'Skenavimas paspaudus',
        'Scan on touch release': 'Skenavimas atleidus',

        // Shapes
        'Big Circle': 'Didelis apskritimas',
        'Small Circle': 'Mažas apskritimas',
        'Square': 'Kvadratas',
        'Diamond': 'Rombas',

        // Misc
        'Not selected': 'Nepasirinkta',
        'Profile name': 'Profilio pavadinimas',

        // Languages - keep original with Lithuanian suffix
        'Albanian (sq)': 'Albanų (sq)',
        'Ancient Greek (grc)': 'Senovės graikų (grc)',
        'Arabic (Egyptian) (arz)': 'Arabų (Egipto) (arz)',
        'Arabic (MSA) (ar)': 'Arabų (MSA) (ar)',
        'Assyrian Neo-Aramaic (aii)': 'Asirų neo-aramaikų (aii)',
        'Bulgarian (bg)': 'Bulgarų (bg)',
        'Cantonese (yue)': 'Kantoniečių (yue)',
        'Chinese (zh)': 'Kinų (zh)',
        'Czech (cs)': 'Čekų (cs)',
        'Danish (da)': 'Danų (da)',
        'Dutch (nl)': 'Olandų (nl)',
        'English (en)': 'Anglų (en)',
        'Esperanto (eo)': 'Esperanto (eo)',
        'Estonian (et)': 'Estų (et)',
        'Finnish (fi)': 'Suomių (fi)',
        'French (fr)': 'Prancūzų (fr)',
        'Georgian (ka)': 'Gruzinų (ka)',
        'German (de)': 'Vokiečių (de)',
        'Greek (el)': 'Graikų (el)',
        'Hawaiian (haw)': 'Havajiečių (haw)',
        'Hebrew (he)': 'Hebrajų (he)',
        'Hindi (hi)': 'Hindi (hi)',
        'Hungarian (hu)': 'Vengrų (hu)',
        'Indonesian (id)': 'Indoneziečių (id)',
        'Irish (ga)': 'Airių (ga)',
        'Italian (it)': 'Italų (it)',
        'Japanese (ja)': 'Japonų (ja)',
        'Kannada (kn)': 'Kanadų (kn)',
        'Khmer (km)': 'Khmerų (km)',
        'Korean (ko)': 'Korėjiečių (ko)',
        'Lao (lo)': 'Laosiečių (lo)',
        'Latin (la)': 'Lotynų (la)',
        'Latvian (lv)': 'Latvių (lv)',
        'Maltese (mt)': 'Maltiečių (mt)',
        'Mongolian (mn)': 'Mongolų (mn)',
        'Norwegian (no)': 'Norvegų (no)',
        'Old Irish (sga)': 'Senoji airių (sga)',
        'Persian (fa)': 'Persų (fa)',
        'Polish (pl)': 'Lenkų (pl)',
        'Portuguese (pt)': 'Portugalų (pt)',
        'Romanian (ro)': 'Rumunų (ro)',
        'Russian (ru)': 'Rusų (ru)',
        'Serbo-Croatian (sh)': 'Serbų-kroatų (sh)',
        'Spanish (es)': 'Ispanų (es)',
        'Swedish (sv)': 'Švedų (sv)',
        'Tagalog (tl)': 'Tagalogų (tl)',
        'Thai (th)': 'Tajų (th)',
        'Toki Pona (tok)': 'Toki Pona (tok)',
        'Turkish (tr)': 'Turkų (tr)',
        'Ukrainian (uk)': 'Ukrainiečių (uk)',
        'Vietnamese (vi)': 'Vietnamiečių (vi)',
        'Welsh (cy)': 'Valų (cy)',
        'Yiddish (yi)': 'Jidiš (yi)',

        // --- Additional UI Elements ---
        'Delete': 'Ištrinti',
        'Update': 'Atnaujinti',
        'Move': 'Perkelti',
        'Apply': 'Taikyti',
        'Rename': 'Pervadinti',
        'Hide…': 'Slėpti…',
        'All': 'Visi',
        'Delete All': 'Ištrinti viską',
        'Check Integrity': 'Tikrinti vientisumą',
        'Check for Updates': 'Tikrinti atnaujinimus',
        'Import Dictionaries': 'Importuoti žodynus',
        'Profiles': 'Profiliai',
        'Conditions': 'Sąlygos',
        'Add Group': 'Pridėti grupę',
        'Copy Profile': 'Kopijuoti profilį',
        'Reset Profile': 'Atstatyti profilį',
        'Remove Profile': 'Pašalinti profilį',
        'Custom CSS': 'Pasirinktinis CSS',
        'Popup CSS': 'Iššokančio lango CSS',
        'Popup outer CSS': 'Iššokančio lango išorinis CSS',
        'Audio Sources': 'Garso šaltiniai',
        'Scanning Inputs': 'Skenavimo įvestys',

        // Modals
        'Confirm Dictionary Deletion': 'Patvirtinti žodyno ištrynimą',
        'Are you sure you want to delete the dictionary:': 'Ar tikrai norite ištrinti žodyną:',
        'This dictionary is currently used by the following profiles:': 'Šį žodyną šiuo metu naudoja šie profiliai:',
        'Are you sure you want to delete': 'Ar tikrai norite ištrinti ',
        'all dictionaries': 'visus žodynus',
        'Confirm Dictionary Update': 'Patvirtinti žodyno atnaujinimą',
        'Are you sure you want to update the dictionary:': 'Ar tikrai norite atnaujinti žodyną:',
        'Updating a dictionary involves:': 'Žodyno atnaujinimas apima:',
        'Deleting the installed version': 'Įdiegtos versijos ištrynimą',
        'Downloading the latest version': 'Naujausios versijos atsisiuntimą',
        'Importing the latest version': 'Naujausios versijos importavimą',
        'Especially for large dictionaries, this process can take a while, and downloading will use your network.': 'Ypač dideliems žodynams šis procesas gali užtrukti, o atsisiuntimas naudos jūsų tinklą.',
        'Secondary Search Dictionaries': 'Antrinės paieškos žodynai',
        'Profile Conditions': 'Profilio sąlygos',
        'Conditions for profile': 'Profilio sąlygos',
        'Confirm Profile Reset': 'Patvirtinti profilio atstatymą',
        'Are you sure you want to reset the profile': 'Ar tikrai norite atstatyti profilį',
        'to default?': 'į numatytąsias reikšmes?',
        'Confirm Profile Deletion': 'Patvirtinti profilio ištrynimą',
        'Are you sure you want to delete the profile': 'Ar tikrai norite ištrinti profilį',
        'Select which profile to copy options from:': 'Pasirinkite, iš kurio profilio kopijuoti parinktis:',
        'Move Dictionary Options': 'Žodyno perkėlimo parinktys',
        'Input the location the dictionary': 'Įveskite vietą, į kurią žodynas',
        'should be moved to:': 'turėtų būti perkeltas:',
        'Input the display name for': 'Įveskite rodomą pavadinimą',
        'dictionary:': 'žodynui:',
        'Enable Default Audio Sources': 'Įjungti numatytuosius garso šaltinius',
        'No audio sources enabled': 'Nėra įjungtų garso šaltinių',
        'Audio Source - Custom URL': 'Garso šaltinis - Pasirinktinis URL',
        'Audio Source - Custom URL (JSON)': 'Garso šaltinis - Pasirinktinis URL (JSON)',
        'Audio Source - Text-to-speech': 'Garso šaltinis - Teksto į kalbą',
        'Move Audio Source Options': 'Garso šaltinio perkėlimo parinktys',
        'Input the location the audio source should be moved to:': 'Įveskite vietą, į kurią garso šaltinis turėtų būti perkeltas:',
        'Collapsible Dictionaries': 'Sutraukiami žodynai',
        'Collapsible Dictionary Info': 'Sutraukiamo žodyno informacija',
        'Not collapsible': 'Nesutraukiamas',
        'Collapsed': 'Sutrauktas',
        'Expanded': 'Išplėstas',
        'Force collapsed': 'Priverstinai sutrauktas',
        'Force expanded': 'Priverstinai išplėstas',
        'custom CSS': 'pasirinktinis CSS',
        'Recommended Dictionaries': 'Rekomenduojami žodynai',
        'Term Dictionaries': 'Terminų žodynai',
        'Kanji Dictionaries': 'Kanji žodynai',
        'Frequency Dictionaries': 'Dažnumo žodynai',
        'Grammar Dictionaries': 'Gramatikos žodynai',
        'Pronunciation Dictionaries': 'Tarimo žodynai',
        'Recommended settings': 'Rekomenduojami nustatymai',
        'Recommendations': 'Rekomendacijos',
        'Input Action Prevention': 'Įvesties veiksmų prevencija',
        'Unassociated Data': 'Nesusieti duomenys',

        // Dictionary options
        'Prefix wildcard searches supported': 'Palaikomos paieškos su prefikso pakaitos simboliais',
        'Changing this value requires the dictionary to be re-imported.': 'Pakeitus šią reikšmę, žodyną reikia importuoti iš naujo.',
        'Part of speech filtering': 'Kalbos dalies filtravimas',
        'Use deinflections': 'Naudoti dekonjugavimą',
        'Deinflections from this dictionary will be used.': 'Bus naudojamas šio žodyno dekonjugavimas.',

        // Import/Drag-drop
        'Drag and drop dictionaries (.zip)': 'Nuvilkite žodynus (.zip)',
        'or click here to upload': 'arba spustelėkite čia, kad įkeltumėte',
        'Import dictionaries from URLs:': 'Importuoti žodynus iš URL:',
        'Import from URLs': 'Importuoti iš URL',
        'for a list of free dictionaries or click the': 'rekomenduojamų žodynų sąraša arba spustelėkite ',
        'button below to select a dictionary file to import.': ' mygtuką žemiau, kad pasirinktumėte žodyno failą importui.',

        // Scanning inputs modal
        'Required inputs': ' Būtinos įvestys ',
        'Excluded inputs': 'Išskirtos įvestys',
        'Input types': 'Įvesties tipai',
        'must': 'turi',
        'must not': 'neturi',
        'field is used to define which inputs': ' laukas naudojamas apibrėžti, kurios įvestys ',
        'be pressed, and': 'būti paspaustos, ir',
        'be pressed.': 'būti paspaustos.',
        'Show advanced options': 'Rodyti išplėstines parinktis',
        'Clear inputs': 'Išvalyti įvestis',
        'Escape': 'Escape',
        'button,': 'mygtuką,',
        'or use the': 'arba naudokite',
        'menu option.': ' meniu parinktį.',

        // Punctuation - keep as-is
        ' (': ' (',
        '. ': '. ',
        '?': '?',
        ':': ':',
        ', ': ', ',
        ';': ';',
        ' - ': ' - ',
        '—': '—',
        '[': '[',
        ']': ']',
        '(??)': '(??)',
        '…': '…',
        'px': 'px',
        'x': 'x',
        'y': 'y',
        'true': 'Taip',
        'false': 'Ne',
        ' or ': ' arba ',

        // Percentages
        '25%': '25%',
        '33%': '33%',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        '67%': '67%',
        '70%': '70%',
        '75%': '75%',
        '80%': '80%',
        '90%': '90%',
        '100%': '100%',
        '110%': '110%',
        '125%': '125%',
        '150%': '150%',
        '175%': '175%',
        '200%': '200%',
        '250%': '250%',
        '300%': '300%',
        '400%': '400%',
        '500%': '500%',

        // Links and technical terms
        'welcome guide': 'pradžios vadova',
        'search page': 'paieškos puslapyje',
        'this link': 'ši nuoroda',
        'this schema file': 'ši schemos byla',
        'Handlebars.js': ' Handlebars.js ',
        'shadow DOM': 'šešėlinis DOM',
        'supported browsers': 'palaikomos naršyklės',
        ' plugin. ': ' papildinį. ',
        'Kaikki dictionaries': 'Kaikki žodynai',

        // Audio/TTS
        '{term}': '{term}',
        '{language}': '{language}',
        'The replacement tags': 'Pakeitimo žymos',
        'can be used to specify which term and reading is being looked up.': 'gali būti naudojamos nurodyti, kuris terminas ir skaitymas ieškomas.',
        'is also available for sources that require an iso language string.': 'taip pat galima šaltiniams, kuriems reikia ISO kalbos eilutės.',
        'A custom URL can be used to play audio from any URL.': 'Pasirinktinis URL gali būti naudojamas leisti garsą iš bet kurio URL.',
        'A synthesized voice will speak the given text, using either the term text or the reading.': 'Sintetizuotas balsas ištars duotą tekstą, naudodamas termino tekstą arba skaitymą.',
        '⚠️ Note: Audio generated with text-to-speech cannot be captured for use in Anki card creation.': '⚠️ Pastaba: Teksto į kalbą sugeneruotas garsas negali būti užfiksuotas naudojimui Anki kortelių kūrime.',

        // Japanese examples
        '日本語': '日本語',
        'にほんご': 'にほんご',
        'ひらがな': 'ひらがな',
        'カタカナ': 'カタカナ',
        'よ': 'よ',
        'む': 'む',
        '1': '1',
        '[1]': '[1]',
        '[2]': '[2]',
        'sans-serif': 'sans-serif',
        'serif': 'serif',
        'src': 'src',
        'zoom': 'zoom',
        'element': 'elementas',

        // Import/Export Settings
        'yomichan-data-exporter': 'yomichan-data-exporter',
        ' rendering to display content': ' atvaizdavimas turiniui rodyti',

        // --- ext/templates-settings.html ---
        // Profile templates
        'Move up': 'Perkelti aukštyn',
        'Move down': 'Perkelti žemyn',
        'Copy from…': 'Kopijuoti iš…',
        'Edit conditions…': 'Redaguoti sąlygas…',
        'Duplicate': 'Dubliuoti',
        'Reset to Default': 'Atstatyti į numatytuosius',

        // Profile conditions
        'Operator': 'Operatorius',
        'Reset value': 'Atstatyti reikšmę',
        'Delete group': 'Ištrinti grupę',

        // Dictionary templates
        'Rename…': 'Pervadinti…',
        'Move to…': 'Perkelti į…',

        // Collapsible dictionary options

        // Audio source templates
        'JapanesePod101': 'JapanesePod101',
        'LanguagePod101': 'LanguagePod101',
        'Jisho.org': 'Jisho.org',
        '(Commons) Lingua Libre': '(Commons) Lingua Libre',
        '(Commons) Wiktionary': '(Commons) Wiktionary',
        'Text-to-speech ⚠️': 'Teksto į kalbą ⚠️',
        'Text-to-speech (Kana reading) ⚠️': 'Teksto į kalbą (Kana skaitymas) ⚠️',
        'Custom URL': 'Pasirinktinis URL',
        'Custom URL (JSON)': 'Pasirinktinis URL (JSON)',
        'URL:': 'URL:',
        'Voice:': 'Balsas:',

        // Scanning input templates
        'Scan on touch move': 'Skenavimas judant',
        'Prevent touch scrolling': 'Uždrausti slinkimą liečiant',
        'Minimum Touch Time': 'Minimalus lietimo laikas',
        'Scan on pen press': 'Skenavimas paspaudus rašikliu',
        'Scan on pen release': 'Skenavimas atleidus rašiklį',
        'Scan on pen move (while touched)': 'Skenavimas judant rašikliu (kai paliesta)',
        'Scan on pen hover (before touched)': 'Skenavimas užvedus rašiklį (prieš paliečiant)',
        'Scan on pen hover (after touched)': 'Skenavimas užvedus rašiklį (po palietimo)',
        'Prevent pen scrolling': 'Uždrausti slinkimą rašikliu',
        'Hide advanced options': 'Slėpti išplėstines parinktis',
        'Remove': 'Pašalinti',

        // Anki card templates
        'Skip': 'Praleisti',
        'Prepend': 'Įterpti priekyje',
        'Append': 'Pridėti gale',
        'Fill if empty': 'Užpildyti jei tuščia',
        'Overwrite if available': 'Perrašyti jei pasiekiama',
        'Keep existing value': 'Išlaikyti esamą reikšmę',
        'Insert new value before existing': 'Įterpti naują reikšmę prieš esamą',
        'Insert new value after existing': 'Įterpti naują reikšmę po esamos',
        'Overwrite if existing value is empty': 'Perrašyti jei esama reikšmė tuščia',
        'Overwrite if new value is not empty': 'Perrašyti jei nauja reikšmė nėra tuščia',
        'Overwrite even if new value is empty': 'Perrašyti net jei nauja reikšmė tuščia',

        // Translation text replacement
        'Pattern:': 'Šablonas:',
        'Replacement:': 'Pakeitimas:',
        'Ignore case': 'Ignoruoti didžiąsias/mažąsias',
        'Test Input:': 'Testo įvestis:',
        'Output:': 'Išvestis:',
        'Hide test': 'Slėpti testą',

        // Sentence termination

        // Keyboard shortcuts
        'Input:': 'Įvestis:',
        'No input': 'Nėra įvesties',
        'Action:': 'Veiksmas:',
        'Focus search box': 'Fokusuoti paieškos lauką',
        'Go to next entry': 'Eiti į kitą įrašą',
        'Go to previous entry': 'Eiti į ankstesnį įrašą',
        'Go to last entry': 'Eiti į paskutinį įrašą',
        'Go to first entry': 'Eiti į pirmą įrašą',
        'Go to next dictionary': 'Eiti į kitą žodyną',
        'Go to previous dictionary': 'Eiti į ankstesnį žodyną',
        'Navigate backward in history': 'Naršyti atgal istorijoje',
        'Navigate forward in history': 'Naršyti pirmyn istorijoje',
        'Switch to previous profile': 'Perjungti į ankstesnį profilį',
        'Switch to next profile': 'Perjungti į kitą profilį',
        'Add note': 'Pridėti užrašą',
        'View notes': 'Peržiūrėti užrašus',
        'Play audio': 'Groti garsą',
        'Play audio from source': 'Groti garsą iš šaltinio',
        'Copy host window selection': 'Kopijuoti pagrindinio lango pasirinkimą',
        'Scan selected text': 'Skenuoti pasirinktą tekstą',
        'Scan text at selection': 'Skenuoti tekstą pasirinkime',
        'Scan text at caret': 'Skenuoti tekstą ties žymekliu',
        'Toggle option': 'Perjungti parinktį',
        'Web': 'Web',
        'Clear input': 'Išvalyti įvestį',
        'Reset input': 'Atstatyti įvestį',
        'Reset argument': 'Atstatyti argumentą',
        'Count:': 'Skaičius:',
        'Path:': 'Kelias:',
        'Source:': 'Šaltinis:',
        'Lingua Libre': 'Lingua Libre',
        'Wiktionary': 'Wiktionary',
        'Format:': 'Formatas:',

        // Hotkey argument labels
        'Not supported in Anki': 'Nepalaikoma Anki',

        // --- Missing translations from console logs (2025-12-25) ---


        // Settings descriptions
        ' should allow storage information to be calculated. ': ' turėtų leisti apskaičiuoti saugyklos informaciją. ',
        'option will start scanning at the cursor\'s current position, while the': 'parinktis pradės skenavimą nuo dabartinės žymeklio pozicijos, o',
        ' option will start scanning at the beginning of the word. ': ' parinktis pradės skenavimą nuo žodžio pradžios. ',
        ' property interferes with the normal calculation of the pointer coordinates when scanning webpages. This property is discouraged from being used and its use is rare, but some webpages may still use it. ': ' savybė trukdo normaliam žymeklio koordinačių apskaičiavimui skenuojant tinklalapius. Šios savybės naudojimas nerekomenduojamas ir yra retas, tačiau kai kurie tinklalapiai vis dar gali ją naudoti. ',
        ' property. ': ' savybė. ',
        ' will allow definitions for the related terms to be included from other dictionaries. ': ' leis įtraukti susijusių terminų apibrėžimus iš kitų žodynų. ',
        ' uses the zoom level that is typically used on desktop browsers, and ': ' naudoja mastelio lygį, kuris paprastai naudojamas stalinių kompiuterių naršyklėse, ir ',
        ' uses the zoom level that is typically used on mobile browsers. ': ' naudoja mastelio lygį, kuris paprastai naudojamas mobiliųjų įrenginių naršyklėse. ',
        ' option. ': ' parinktis. ',
        ' option will only check for duplicates in the target deck. The ': ' parinktis tikrins dublikatus tik tikslinėje kaladėje. ',
        ' option will be filtered out from the list. If set to ': ' parinktis bus išfiltruota iš sąrašo. Jei nustatyta į ',
        ' option will be shown. If no tags remain after filtering, then the tags button will not be shown. If no flags are found, the flags button will not be shown. ': ' parinktis bus rodoma. Jei po filtravimo neliks jokių žymų, tada žymų mygtukas nebus rodomas. Jei vėliavėlių nerandama, vėliavėlių mygtukas nebus rodomas. ',
        ' or system-wide': ' arba visos sistemos',

        // Prefix wildcard
        'Enable support for prefix wildcard searches': 'Įgalinti priešdėlio pakaitos simbolių paieškos palaikymą',
        'In order for dictionaries to support searches using prefix wildcards on the search page, some additional data must be stored in the database. Enabling this option will include this extra data for any new dictionaries that are imported.': 'Kad žodynai palaikytų paieškas naudojant priešdėlio pakaitos simbolius paieškos puslapyje, duomenų bazėje turi būti saugomi papildomi duomenys. Įgalinus šią parinktį, šie papildomi duomenys bus įtraukti į visus naujai importuojamus žodynus.',
        'This option will not change any dictionaries that are already imported; they must be re-imported for the option to take effect.': 'Ši parinktis nepakeis jau importuotų žodynų; jie turi būti importuoti iš naujo, kad parinktis įsigaliotų.',

        // Dictionary messages
        'No dictionaries have been installed yet. Visit the': 'Dar neįdiegti jokie žodynai. Aplankykite ',
        'These dictionaries will be used to search for definitions of the related terms when the grouping mode is': 'Šie žodynai bus naudojami ieškant susijusių terminų apibrėžimų, kai grupavimo režimas yra',
        'This dictionary is outdated and may not support new extension features. Re-import the dictionary to enable support for the latest features.': 'Šis žodynas pasenęs ir gali nepalaikyti naujų plėtinio funkcijų. Importuokite žodyną iš naujo, kad įgalintumėte naujausių funkcijų palaikymą.',
        'When deinflecting words, only dictionary entries whose POS matches that expected by the deinflector will be shown.': 'Dekonjuguojant žodžius, bus rodomi tik tie žodyno įrašai, kurių kalbos dalis atitinka dekonjugatoriaus laukiamą.',
        'The database contains extra data which is not associated with any installed dictionary. Purging the database can fix this issue.': 'Duomenų bazėje yra papildomų duomenų, kurie nesusiję su jokiu įdiegtu žodynu. Duomenų bazės išvalymas gali išspręsti šią problemą.',
        'For non-English dictionaries, please refer to the list of available': 'Ne anglų kalbos žodynams žiūrėkite galimų sąrašą',
        'We recommend the following settings for your selected language': 'Rekomenduojame šiuos nustatymus jūsų pasirinktai kalbai',
        'Dictionary may not have been imported properly': 'Žodynas gali būti netinkamai importuotas',
        'Update available': 'Yra atnaujinimas',

        // Profile conditions
        'Profile usage conditions are used to automatically select certain profiles based on context. For example, different profiles can be used depending on the nested level of the popup, or based on the website\'s URL.': 'Profilio naudojimo sąlygos naudojamos automatiškai pasirinkti tam tikrus profilius pagal kontekstą. Pavyzdžiui, skirtingi profiliai gali būti naudojami priklausomai nuo iššokančiojo lango įdėjimo lygio arba pagal svetainės URL.',
        'Conditions are organized into groups corresponding to the order in which they are checked. If all of the conditions in any group of a profile are met, then that profile will be used for that context.': 'Sąlygos suskirstytos į grupes, atitinkančias tikrinimo tvarką. Jei visos bet kurios profilio grupės sąlygos yra tenkinamos, tada tas profilis bus naudojamas tam kontekstui.',
        'If no conditions are specified, the profile will only be used if it is selected as the default profile.': 'Jei nenurodytos jokios sąlygos, profilis bus naudojamas tik jei jis pasirinktas kaip numatytasis profilis.',
        'When using the Flags condition,': 'Naudojant Vėliavėlių sąlygą,',
        'clipboard': 'iškarpinė',
        'is the only valid input. This lets the search page apply another profile\'s settings when text is copied, provided': 'yra vienintelė galiojanti įvestis. Tai leidžia paieškos puslapiui taikyti kito profilio nustatymus, kai tekstas nukopijuojamas, su sąlyga, kad',
        'is enabled.': 'yra įgalinta.',
        'No conditions set up.': 'Nenustatytos jokios sąlygos.',

        // Collapsible dictionaries
        'Dictionary definitions can be collapsed if they exceed a certain line count, which may be useful for dictionaries with long definitions. The appearance can be customized using custom CSS.': 'Žodyno apibrėžimai gali būti sutraukti, jei jie viršija tam tikrą eilučių skaičių, kas gali būti naudinga žodynams su ilgais apibrėžimais. Išvaizdą galima pritaikyti naudojant pasirinktinį CSS. ',
        'Dictionary definitions can be collapsed if they exceed a certain line count, which may be useful for dictionaries with long definitions. There are five different modes:': 'Žodyno apibrėžimai gali būti sutraukti, jei jie viršija tam tikrą eilučių skaičių, kas gali būti naudinga žodynams su ilgais apibrėžimais. Yra penki skirtingi režimai:',
        '- Definitions will not be collapsed.': '- Apibrėžimai nebus sutraukiami.',
        '- Definitions will show a collapse button if their size exceeds the max height, and they will be collapsed by default.': '- Apibrėžimai rodys sutraukimo mygtuką, jei jų dydis viršija maksimalų aukštį, ir jie bus sutraukti pagal nutylėjimą.',
        '- Definitions will show a collapse button if their size exceeds the max height, and they will be expanded by default.': '- Apibrėžimai rodys sutraukimo mygtuką, jei jų dydis viršija maksimalų aukštį, ir jie bus išplėsti pagal nutylėjimą.',
        '- Definitions will always show a collapse button, and they will be collapsed by default.': '- Apibrėžimai visada rodys sutraukimo mygtuką, ir jie bus sutraukti pagal nutylėjimą.',
        '- Definitions will always show a collapse button, and they will be expanded by default.': '- Apibrėžimai visada rodys sutraukimo mygtuką, ir jie bus išplėsti pagal nutylėjimą.',
        'By default, the number of lines shown for a definition is 3. This can be configured by adjusting the': 'Pagal nutylėjimą, apibrėžimui rodomų eilučių skaičius yra 27 terminams ir 10 kandži. Tai galima konfigūruoti koreguojant ',
        '; the value can be a unitless integer or decimal number.': '; reikšmė gali būti sveikasis arba dešimtainis skaičius be matavimo vienetų.',
        '/* Globally set the line count */ :root { --collapsible-definition-line-count: 2; } :root { --collapsible-kanji-glyph-data-line-count: 2; } /* Set the line count for a specific dictionary */ .definition-item[data-dictionary=\'JMdict\'] { --collapsible-definition-line-count: 2; } .kanji-entry[data-dictionary=\'KANJIDIC\'] { --collapsible-kanji-glyph-data-line-count: 2; } /* Spoiler-like functionality, use with': '/* Globaliai nustatyti eilučių skaičių */ :root { --collapsible-definition-line-count: 2; } :root { --collapsible-kanji-glyph-data-line-count: 2; } /* Nustatyti eilučių skaičių konkrečiam žodynui */ .definition-item[data-dictionary=\'JMdict\'] { --collapsible-definition-line-count: 2; } .kanji-entry[data-dictionary=\'KANJIDIC\'] { --collapsible-kanji-glyph-data-line-count: 2; } /* Spoilerio tipo funkcionalumas, naudoti su',
        'mode */ .definition-item[data-dictionary=\'JMdict\'] .definition-item-inner.collapsible.collapsed { color: #000000; background-color: #000000; } .kanji-entry[data-dictionary=\'KANJIDIC\'] .kanji-glyph-data.collapsible.collapsed { color: #000000; background-color: #000000; }': 'režimu */ .definition-item[data-dictionary=\'JMdict\'] .definition-item-inner.collapsible.collapsed { color: #000000; background-color: #000000; } .kanji-entry[data-dictionary=\'KANJIDIC\'] .kanji-glyph-data.collapsible.collapsed { color: #000000; background-color: #000000; }',

        // Audio sources
        'When searching for audio, the sources are checked in order until the first valid source is found. This allows for selecting a fallback source if the first choice is not available.': 'Ieškant garso, šaltiniai tikrinami eilės tvarka, kol randamas pirmas galiojantis šaltinis. Tai leidžia pasirinkti atsarginį šaltinį, jei pirmasis pasirinkimas nepasiekiamas.',
        'http://localhost/audio.mp3?term={term}&reading={reading}': 'http://localhost/audio.mp3?term={term}&reading={reading}',
        'A custom URL to a JSON file which lists one or more audio URLs for a given term. The format of the JSON file is described in': 'Pasirinktinis URL į JSON failą, kuriame išvardyti vienas ar daugiau garso URL duotam terminui. JSON failo formatas aprašytas',
        'http://localhost/audio.json?term={term}&reading={reading}': 'http://localhost/audio.json?term={term}&reading={reading}',

        // Scanning inputs
        'Scanning inputs are used to define when text scanning should occur.': 'Skenavimo įvestys naudojamos apibrėžti, kada turėtų vykti teksto skenavimas.',
        'Text scanning is performed when a pointer is moved and certain inputs are either pressed or not pressed. The': 'Teksto skenavimas atliekamas, kai žymeklis judinamas ir tam tikros įvestys yra paspaustos arba nepaspaustos. ',
        'be pressed, and the': ' būti paspaustos, ir ',
        'be pressed. If the': ' būti paspaustos. Jei ',
        'field is empty, text will be scanned whenever the pointer is moved.': 'laukas tuščias, tekstas bus skenuojamas kiekvieną kartą pajudinus žymeklį.',
        'group is used to define which types of pointer input that the keyboard and button inputs are applied to. Supported pointer types include the mouse cursor, touchscreen touches, and pen devices. When using the': ' grupė naudojama apibrėžti, kokio tipo žymeklio įvestims taikomi klaviatūros ir mygtukų įvestys. Palaikomi žymeklių tipai apima pelės žymeklį, jutiklinio ekrano lietimus ir rašiklio įrenginius. Naudojant ',
        'option, the defined inputs will correspond to buttons on the pen device.': ' parinktį, apibrėžtos įvestys atitiks rašiklio įrenginio mygtukus.',
        'Some additional scanning and search options can be configured by clicking the menu button and selecting': 'Kai kurias papildomas skenavimo ir paieškos parinktis galima konfigūruoti spustelėjus meniu mygtuką ir pasirinkus ',
        'To assign keyboard keys, select the input field and press modifier keys on the keyboard.': 'Norėdami priskirti klaviatūros klavišus, pasirinkite įvesties lauką ir paspauskite modifikavimo klavišus klaviatūroje.',
        'To assign mouse or pen buttons, click on the button with the mouse icon using the desired button.': 'Norėdami priskirti pelės ar rašiklio mygtukus, spustelėkite mygtuką su pelės piktograma naudodami norimą mygtuką.',
        'To clear inputs, select the input field and press the': 'Norėdami išvalyti įvestis, pasirinkite įvesties lauką ir paspauskite ',
        'button, or use the': ' mygtuką, arba naudokite ',
        'No scanning inputs have been defined yet. Click the': 'Dar nenustatytos jokios skenavimo įvestys. Spustelėkite',
        'button to add a new input.': 'mygtuką, kad pridėtumėte naują įvestį.',
        'Prevent secondary mouse button actions on:': 'Uždrausti antrinius pelės mygtuko veiksmus:',
        'This option is used to disable the default action of the secondary mouse buttons in different contexts. This can be useful for preventing actions that the middle button and buttons 4 and 5 are typically mapped to (scrolling and back/forward, respectively), which are otherwise difficult to disable inside extension pages via other means.': 'Ši parinktis naudojama išjungti numatytuosius antrinių pelės mygtukų veiksmus skirtinguose kontekstuose. Tai gali būti naudinga norint uždrausti veiksmus, kuriems paprastai priskirti vidurinys mygtukas ir mygtukai 4 bei 5 (atitinkamai slinkimas ir atgal/pirmyn), kuriuos kitaip sunku išjungti plėtinio puslapiuose kitomis priemonėmis.',

        // Anki card fields
        'Anki card fields can be populated with information about a term or kanji character by using field markers. When a card is being generated, field markers are replaced with information about the term or kanji by using the installed dictionaries. Several preset markers are available, which are described below. Markers can be customized by adjusting the': 'Anki kortelės laukai gali būti užpildyti informacija apie terminą ar kanji simbolį naudojant laukų žymeklius. Kai generuojama kortelė, laukų žymekliai pakeičiami informacija apie terminą ar kanji naudojant įdiegtus žodynus. Galimi keli iš anksto nustatyti žymekliai, aprašyti žemiau. Žymeklius galima pritaikyti koreguojant ',
        'Anki requires the first field in a model to be unique for a card; therefore, it is recommended to use': 'Anki reikalauja, kad pirmasis modelio laukas būtų unikalus kortelei; todėl rekomenduojama naudoti ',
        'as the marker for the first field of term cards, or': ' kaip žymeklį pirmajam terminų kortelių laukui, arba ',
        'Term expressed as kanji with furigana displayed above it. Example:': 'Terminas, išreikštas kanji su furigana, rodoma virš jo. Pavyzdys:',
        'Term expressed as kanji with furigana displayed next to it in brackets. Example: 日本語[にほんご].': 'Terminas, išreikštas kanji su furigana, rodoma šalia skliausteliuose. Pavyzdys: 日本語[にほんご].',
        '{single-glossary-DICT-NAME}': '{single-glossary-DICT-NAME}',
        ', but with entries from only a single dictionary. The dictionary name will likely be modified, use the options from the ▼ dropdown.': ', bet su įrašais tik iš vieno žodyno. Žodyno pavadinimas greičiausiai bus pakeistas, naudokite parinktis iš ▼ išskleidžiamojo meniu.',
        '{single-glossary-DICT-NAME-brief}': '{single-glossary-DICT-NAME-brief}',
        '{single-glossary-DICT-NAME-no-dictionary}': '{single-glossary-DICT-NAME-no-dictionary}',
        '{single-glossary-DICT-NAME-plain}': '{single-glossary-DICT-NAME-plain}',
        '{single-glossary-DICT-NAME-plain-no-dictionary}': '{single-glossary-DICT-NAME-plain-no-dictionary}',
        '{single-frequency-DICT-NAME}': '{single-frequency-DICT-NAME}',
        '{single-frequency-number-DICT-NAME}': '{single-frequency-number-DICT-NAME}',
        'Anki card fields are formatted using the': 'Anki kortelės laukai formatuojami naudojant',
        'template rendering engine. Advanced users can modify these templates for full control over what information is included in Anki cards.': 'šablonų atvaizdavimo variklį. Pažengę vartotojai gali modifikuoti šiuos šablonus, kad visiškai kontroliuotų, kokia informacija įtraukiama į Anki korteles.',
        'Are you sure you want to reset the card templates to their default value? Any changes you made will be lost.': 'Ar tikrai norite atstatyti kortelių šablonus į jų numatytąsias reikšmes? Visi jūsų padaryti pakeitimai bus prarasti.',
        'Enter a newline separated list of terms below to send notes directly to an Anki deck or export to an Anki deck file in': 'Įveskite naujomis eilutėmis atskirtą terminų sąrašą žemiau, kad siųstumėte užrašus tiesiai į Anki kaladę arba eksportuotumėte į Anki kaladės failą ',

        // Settings import/export
        'Settings file contains settings which may pose a security risk. Only import settings from sources you trust.': 'Nustatymų failas turi nustatymus, kurie gali kelti saugumo riziką. Importuokite nustatymus tik iš šaltinių, kuriais pasitikite.',
        'button before resetting if you want to be able to revert.': 'mygtuką prieš atstatant, jei norite turėti galimybę atšaukti.',
        'Dictionary data will not be deleted, but any installed dictionaries will need to be re-enabled.': 'Žodyno duomenys nebus ištrinti, bet visus įdiegtus žodynus reikės iš naujo įgalinti.',
        'Text replacement patterns are used to modify or remove text that matches certain patterns. Patterns are defined using': 'Teksto pakeitimo šablonai naudojami modifikuoti arba pašalinti tekstą, atitinkantį tam tikrus šablonus. Šablonai apibrėžiami naudojant',
        ', and the replacement text can use certain': ', o pakeitimo tekstas gali naudoti tam tikrus',
        'The native keyboard shortcuts are listed below, but cannot be configured from within the extension on this browser. To configure these shortcuts:': 'Vietiniai klaviatūros spartieji klavišai išvardyti žemiau, bet jų negalima konfigūruoti iš plėtinio šioje naršyklėje. Norėdami konfigūruoti šiuos sparčiuosius klavišus:',
        'The native keyboard shortcuts can be configured below on this browser, or by doing the following:': 'Vietinius klaviatūros sparčiuosius klavišus galima konfigūruoti žemiau šioje naršyklėje arba atlikus šiuos veiksmus:',

        // Touch and pen options
        'Pen options:': 'Rašiklio parinktys:',

        // Keyboard shortcut labels
        'Open the info page': 'Atidaryti informacijos puslapį',
        'Open the popup window': 'Atidaryti iššokantįjį langą',
        'Open the search page': 'Atidaryti paieškos puslapį',
        'Open the settings page': 'Atidaryti nustatymų puslapį',
        'Toggle text scanning on/off': 'Įjungti/išjungti teksto skenavimą',
        'Nėra įvesčių': 'Nėra įvesčių',

        // Other UI elements
        'Peržiūros tekstas': 'Peržiūros tekstas',
        'Padalinti tekstą į naujos eilutės atskirtą žodžių sąrašą': 'Padalinti tekstą į naujos eilutės atskirtą žodžių sąrašą',
        'Pašalinti pasikartojančias eilutes': 'Pašalinti pasikartojančias eilutes',
        'Profilio pavadinimas': 'Profilio pavadinimas',
        'Varies': 'Skiriasi',
        'Author:': 'Autorius:',
        'Description:': 'Aprašymas:',
        'Term Count:': 'Terminų skaičius:',
        'Tag Count:': 'Žymų skaičius:',
        'Attribution:': 'Priskyrimas:',
        'Import Success:': 'Importavimas pavyko:',
        'No updates': 'Atnaujinimų nėra',

        // --- ext/js/pages/settings/dictionary-import-controller.js ---
        'Directory upload item count too large': 'Katalogų įkėlimo elementų skaičius per didelis',
        'A mutation operation was attempted on a database that did not allow mutations.': 'Buvo bandoma atlikti mutacijos operaciją duomenų bazėje, kuri neleidžia mutacijų.',
        'Access to IndexedDB appears to be restricted. Firefox seems to require that the history preference is set to "Remember history" before IndexedDB use of any kind is allowed.': 'Prieiga prie IndexedDB atrodo apribota. Firefox, regis, reikalauja nustatyti istorijos parinktį į „Prisiminti istoriją“, prieš leidžiant naudoti IndexedDB.',
        'The operation failed for reasons unrelated to the database itself and not covered by any other error code.': 'Operacija nepavyko dėl su pačia duomenų baze nesusijusių priežasčių, kurių neapima joks kitas klaidos kodas.',
        'Unable to access IndexedDB due to a possibly corrupt user profile. Try using the "Refresh Firefox" feature to reset your user profile.': 'Nepavyksta pasiekti IndexedDB dėl galimai sugadinto vartotojo profilio. Pabandykite naudoti „Atkurti Firefox“ funkciją, kad atstatytumėte savo vartotojo profilį.',
        'Failed to automatically set dictionary settings. A page refresh and manual enabling of the dictionary may be required.': 'Nepavyko automatiškai nustatyti žodyno nustatymų. Gali prireikti atnaujinti puslapį ir rankiniu būdu įgalinti žodyną.',
        'Initializing import': 'Inicijuojamas importavimas',
        'Loading dictionary': 'Įkeliamas žodynas',
        'Loading schemas': 'Įkeliamos schemos',
        'Validating data': 'Tikrinami duomenys',
        'Importing data': 'Importuojami duomenys',
        'Finalizing import': 'Užbaigiamas importavimas',
        'Downloading dictionary': 'Atsiunčiamas žodynas',
        'Deleting dictionary...': 'Žodynas yra trinamas',

        // --- ext/templates-display.html ---
        'Meaning': 'Reikšmė',
        'Readings': 'Skaitymai',
        'Statistics': 'Statistika',
        'Classifications': 'Klasifikacijos',
        'Codepoints': 'Kodų taškai',
        'Dictionary Indices': 'Žodynų indeksai',
    };

    /**
     * Replaces "Yomitan" with "Wanchan" in a given string.
     * @param {string} text
     * @returns {string} Rebranded text
     */
    function rebrandYomitan(text) {
        if (text && text.includes('Yomitan')) {
            return text.replace(/Yomitan/g, 'Wanchan');
        }
        return text;
    }

    /**
     * Translates the given text using the dictionary.
     * Falls back to rebranding logic if no translation matches.
     * @param {string} text
     * @returns {string} Translated/Rebranded text
     */
    // Build a normalized lookup map (whitespace collapsed)
    const NORMALIZED_TRANSLATIONS = {};
    for (const key in TRANSLATIONS) {
        if (Object.hasOwn(TRANSLATIONS, key)) {
            const normalizedKey = key.replace(/\s+/g, ' ').trim();
            // Only add if not already present (first occurrence wins)
            if (!NORMALIZED_TRANSLATIONS[normalizedKey]) {
                NORMALIZED_TRANSLATIONS[normalizedKey] = TRANSLATIONS[key];
            }
        }
    }

    // --- Dynamic Regex Translations ---
    const REGEX_TRANSLATIONS = [
        {
            regex: /^Importing dictionary \((\d+) of (\d+)\) - Step (\d+) of (\d+): (.*)\.\.\.$/,
            replace: (match, p1, p2, p3, p4, p5) => `Importuojamas žodynas (${p1} iš ${p2}) - Žingsnis ${p3} iš ${p4}: ${translateText(p5)}...`,
        },
        {
            regex: /^Importing dictionary - Step (\d+) of (\d+): (.*)\.\.\.$/,
            replace: (match, p1, p2, p3) => `Importuojamas žodynas - Žingsnis ${p1} iš ${p2}: ${translateText(p3)}...`,
        },
        {
            regex: /^Failed to fetch blob from (.*)$/,
            replace: 'Nepavyko gauti blob iš $1',
        },
        {
            regex: /^Failed to fetch the URL: (.*)$/,
            replace: 'Nepavyko gauti URL: $1',
        },
        {
            regex: /^Error fetching URL: (.*)$/,
            replace: 'Klaida gaunant URL: $1',
        },
        {
            regex: /^Failed to read file (\d+) of (\d+)\.$/,
            replace: 'Nepavyko nuskaityti failo $1 iš $2.',
        },
        {
            regex: /^Dictionary may not have been imported properly: (\d+) error(s?) reported\.$/,
            replace: (match, p1, p2) => `Žodynas galėjo būti importuotas netinkamai: pranešta apie ${p1} klaid${p2 ? 'as' : 'ą'}.`,
        },
    ];

    /**
     *
     * @param text
     */
    function translateText(text) {
        if (!text || !text.trim()) { return text; }

        const trimmed = text.trim();
        // Normalize whitespace: collapse multiple spaces/newlines into single space
        const normalized = trimmed.replace(/\s+/g, ' ');

        // Ignore simple numbers or punctuation to reduce log noise
        if (/^[\d\s\p{P}]+$/u.test(normalized)) { return text; }

        // 1. Exact Match Lookup (try original trimmed first)
        if (TRANSLATIONS[trimmed]) {
            return TRANSLATIONS[trimmed];
        }

        // 2. Normalized Match Lookup (for multi-line strings with embedded whitespace)
        if (NORMALIZED_TRANSLATIONS[normalized]) {
            return NORMALIZED_TRANSLATIONS[normalized];
        }

        // 3. Regex Match Lookup
        for (const item of REGEX_TRANSLATIONS) {
            if (item.regex.test(trimmed)) {
                return trimmed.replace(item.regex, item.replace);
            }
        }

        // 4. Rebranding Fallback
        return rebrandYomitan(text);
    }

    /**
     * Traverses the DOM to find and translate Text nodes and specific Attribute nodes.
     * @param {Node} root The root node to start traversal from
     */
    function traverseAndTranslate(root) {
        if (!root) { return; }
        processNode(root);

        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check attributes for specific tags
                        if (['INPUT', 'TEXTAREA', 'IMG', 'BUTTON'].includes(node.tagName) || node.hasAttribute('title') || node.hasAttribute('aria-label')) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        // Skip scripts/styles
                        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'LINK', 'META'].includes(node.tagName)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_SKIP;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                },
            },
        );

        let currentNode = walker.nextNode();
        while (currentNode) {
            processNode(currentNode);
            currentNode = walker.nextNode();
        }
    }

    /**
     * Processes a single node (Text or Element) to apply translations.
     * @param {Node} node
     */
    function processNode(node) {
        // Handle Text Nodes
        if (node.nodeType === Node.TEXT_NODE) {
            const originalText = node.nodeValue;
            const translatedText = translateText(originalText);
            if (translatedText !== originalText) {
                node.nodeValue = translatedText;
            }
            return;
        }

        // Handle Element Attributes
        if (node.nodeType === Node.ELEMENT_NODE) {
            const attributes = ['placeholder', 'title', 'alt', 'aria-label', 'value'];
            for (const attr of attributes) {
                if (node.hasAttribute(attr)) {
                    // Special check for 'value' - only for button/submit/reset inputs
                    if (attr === 'value' && node.tagName === 'INPUT' && !['button', 'submit', 'reset'].includes(node.type)) {
                        continue;
                    }

                    const originalVal = node.getAttribute(attr);
                    const translatedVal = translateText(originalVal);
                    if (translatedVal !== originalVal) {
                        node.setAttribute(attr, translatedVal);
                    }
                }
            }
        }
    }

    /**
     * Replaces known href values on all anchor tags using direct DOM manipulation.
     */
    function replaceAnchors() {
        const anchors = document.querySelectorAll('a[href]');
        for (const a of anchors) {
            const href = a.getAttribute('href');

            switch (href) {
                case 'https://github.com/yomidevs/yomitan/blob/master/CONTRIBUTING.md':
                    a.href = 'https://github.com/viliuskacerginas/wanchan/blob/master/CONTRIBUTING.md';
                    break;
                case 'https://yomitan.wiki/dictionaries/':
                    a.href = 'https://github.com/viliuskacerginas/wanchan-dict';
                    break;
                case 'https://github.com/yomidevs/yomitan/blob/master/docs/dictionaries.md#dictionaries':
                    a.href = 'https://github.com/viliuskacerginas/wanchan-dict';
                    break;
                case 'https://yomitan.wiki':
                    a.href = 'https://wanchan.lt/';
                    break;
                case 'https://github.com/yomidevs/yomitan':
                    a.href = 'https://github.com/viliuskacerginas/wanchan';
                    break;
                case 'https://yomitan.wiki/privacy/':
                    a.href = 'https://github.com/viliuskacerginas/wanchan/blob/master/PRIVACY-POLICY.md';
                    break;
                case 'https://github.com/yomidevs/yomitan/issues/new/choose':
                    a.href = 'https://github.com/viliuskacerginas/wanchan/issues/new/choose';
                    break;
                case 'https://addons.mozilla.org/en-US/firefox/addon/yomitan/privacy/':
                    a.href = 'https://addons.mozilla.org/en-US/firefox/addon/wanchan_iššokantis_žodynas/privacy/';
                    break;
                case 'addons.mozilla.org/en-US/firefox/addon/yomitan/privacy/':
                    a.href = 'https://addons.mozilla.org/en-US/firefox/addon/wanchan_iššokantis_žodynas/privacy/';
                    break;
                case 'https://foosoft.net/projects/anki-connect/':
                    a.href = 'https://ankiweb.net/shared/info/2055492159';
                    break;
                case 'https://yomitan.wiki/anki/':
                    a.href = 'https://wanchan.lt/anki';
                    break;
            }
        }
    }

    /**
     * Initializes the localization logic.
     */
    function init() {
        if (TARGET_LANG !== 'lt') {
            return;
        }


        // Initial Translation
        traverseAndTranslate(document.body);
        replaceAnchors();
        if (document.title) {
            document.title = translateText(document.title);
        }

        // Observer for dynamic changes
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const addedNode of mutation.addedNodes) {
                    traverseAndTranslate(addedNode);
                }
                if (mutation.type === 'attributes') {
                    processNode(mutation.target);
                }
                if (mutation.type === 'characterData') {
                    processNode(mutation.target);
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'alt', 'aria-label', 'value'],
            characterData: true,
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
