# Mani uzdevumi

Vienkārša uzdevumu saraksta tīmekļa lietotne, kas izveidota ar tīru HTML, CSS un JavaScript. Lietotne darbojas tieši pārlūkprogrammā, bez servera, bibliotēkām vai interneta savienojuma.

## Apraksts

Lietotne “Mani uzdevumi” ļauj:

- pievienot jaunu uzdevumu ar pogu vai taustiņu Enter;
- atzīmēt uzdevumus kā izpildītus vai atgriezt aktīvajā statusā;
- dzēst nevajadzīgus uzdevumus;
- rediģēt uzdevuma tekstu, ar peles dubultklikšķi atverot rediģēšanu;
- atlasīt visus, aktīvos vai izpildītos uzdevumus;
- sekot līdzi atlikušajiem uzdevumiem.

Uzdevumi tiek saglabāti pārlūkprogrammas `localStorage` ar atslēgu `pdl-uzdevumi` JSON formātā.

## Palaišana

1. Lejupielādē vai klonē projekta repozitoriju.
2. Atver projekta mapē esošo failu `index.html`.
3. Lietotni var izmantot tieši pārlūkprogrammā — papildu serveris vai instalācijas nav nepieciešami.

Alternatīvi ar Visual Studio Code var izmantot Live Server paplašinājumu vai jebkuru vienkāršu lokālo tīmekļa serveri.

## Papildfunkcijas

- Uzdevuma rediģēšana ar dubultklikšķi uz teksta.
- Rediģēšanas saglabāšana ar Enter.
- Rediģēšanas atcelšana ar Escape.
- Datu saglabāšana arī pēc lapas aizvēršanas.
- Atlikušo uzdevumu skaita automātiska atjaunināšana.
- Adaptīvs izkārtojums mazākiem ekrāniem.

## Izmantotie MI rīki

- GitHub Copilot — kodēšanas asistents un dokumentācijas sagatavošana ar Copilot SDK VS Code vidē.

## Pārbaudes rezultāti

Pamatfailu un lietotnes funkciju pārbaude ir dokumentēta zemāk.

| Pārbaude | Rezultāts |
|---|---|
| HTML, CSS un JavaScript failu klātbūtne | pārbaudīta |
| Uzdevuma pievienošana ar pogu un Enter | iekļauta lietotnes loģikā |
| Tukša teksta novēršana | iekļauta lietotnes loģikā |
| Izpildītā statusa pārslēgšana un dzēšana | iekļauta lietotnes loģikā |
| Aktīvo, izpildīto un visu uzdevumu filtrēšana | iekļauta lietotnes loģikā |
| Datu saglabāšana `localStorage` | iekļauta lietotnes loģikā |
| Uzdevuma rediģēšana ar Enter un Escape | iekļauta lietotnes loģikā |

Projektā nav īpaša automatizēta testu komplekta vai testa palaišanas skripta. Pilna pārlūkprogrammas pārbaude jāveic, atverot `index.html`.