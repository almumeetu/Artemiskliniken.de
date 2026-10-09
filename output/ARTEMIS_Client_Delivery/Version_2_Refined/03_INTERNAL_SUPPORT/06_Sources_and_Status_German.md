# Interne Quellen- und Statusnotizen

**Projekt:** ARTEMIS Standort-Pilot Leverkusen und Opladen  
**Prüfdatum der ARTEMIS-Quellen:** 08.10.2026  
**Verwendung:** Interne Grundlage für Angebot, Vergleich und Kundengespräch. Dieses Dokument enthält Prüfgrenzen und ist kein unabhängiges technisches oder rechtliches Gutachten.

## Richtige Einordnung des Angebots

Die bestehende ARTEMIS-Website ist eine bundesweite Netzwerk-Website. Der lokale neue Entwurf umfasst zwei Standorte: Leverkusen und Opladen. Er kann als regionaler Pilot oder als Grundlage für neue Standorttemplates angeboten werden. Er ersetzt die nationale Website einschließlich aller Standorte, Fachinhalte und Funktionen in seinem aktuellen Zustand nicht vollständig.

Geeignete Angebotsformulierung: **„Patientenorientierter Standort-Pilot für Leverkusen und Opladen – mit klaren Kontaktwegen und einer Grundlage für den späteren Ausbau.“**

Der Auftrag kann mit einem überzeugenden Angebot unterstützt werden. Eine Zusage, den Auftrag sicher zu gewinnen, oder eine garantierte Umsatz- bzw. Conversion-Steigerung wäre unbelegt.

## Geprüfte offizielle Quellen

| Quelle | Beobachtete und für den Vergleich verwendete Inhalte |
|---|---|
| [ARTEMIS Startseite](https://www.artemiskliniken.de/) | Bundesweite Standortsuche, breites Behandlungs- und Informationsangebot, mehrere Inhaltskarussells sowie zwei unterschiedliche Standortzahlen in verschiedenen Abschnitten. |
| [ARTEMIS Augenzentrum Leverkusen](https://www.artemiskliniken.de/standorte/artemis-augenzentrum-leverkusen/) | Kontakt, Öffnungszeiten, telefonische Erreichbarkeit, offizieller Online-Terminlink, Leistungsportfolio, Team, Praxisbilder und eine redaktionell abzustimmende Leitungsangabe. |
| [ARTEMIS Augenarzt-Praxis Opladen](https://www.artemiskliniken.de/standorte/artemis-augenarzt-praxis-opladen/) | Kontakt, Öffnungszeiten, lokale Leistungen und Team. Auf der geprüften Standortseite wurde kein entsprechender Online-Terminlink ausgewiesen. |

Die Web-Auslesung der Startseite und der Leverkusener Seite meldete einen aktuellen Crawl. Die Opladener Auslesung war als Crawl der Vorwoche gekennzeichnet. Datum und lokale Daten müssen daher vor Veröffentlichung nochmals durch ARTEMIS bestätigt werden.

Die Auslesung belegt Texte und verlinkte Ziele. Am 09.10.2026 wurde der lokale Entwurf zusätzlich in Chrome am Desktop und in einer iPhone-16-Ansicht mit 393 px Breite visuell geprüft. Das belegt keine Aussage über reale Ladegeschwindigkeit, alle Browser/Geräte oder Fehlerfreiheit aller Unterseiten.

## Stärken der bestehenden Website

Die bestehende Website verfügt über einen umfangreichen medizinischen Informationsbestand und eine bundesweite Standortsuche. Die lokalen Seiten stellen Kontaktinformationen, Öffnungszeiten, Leistungen und Team bereit. Die Leverkusener Seite enthält bereits einen offiziellen samedi-Terminweg. Diese Funktionen sind eine vorhandene Grundlage und dürfen im Angebot nicht als fehlend dargestellt werden.

Der neue Entwurf konzentriert sich auf die lokale Auswahl und kürzere Informationswege. Ein daraus entstehender Vorteil für Patienten ist ein Gestaltungsziel, bis er durch Nutzungstests oder eine definierte Pilotmessung bestätigt wurde.

## Zwei echte redaktionelle Abstimmungspunkte

1. **Standortzahl auf der Startseite:** Im Standortabschnitt nennt die geprüfte [Startseite](https://www.artemiskliniken.de/) 120 Standorte; im Philosophie-Teaser stehen 115. Redaktionelles Ziel: eine durch ARTEMIS bestätigte, konsistente Zahl. Die Prüfung legt nicht fest, welche Zahl aktuell richtig ist.
2. **Leitungsangabe in Leverkusen:** Die Einleitung der geprüften [Leverkusener Seite](https://www.artemiskliniken.de/standorte/artemis-augenzentrum-leverkusen/) nennt „Dr. Kemani“; im Teamabschnitt werden Masoud Arani und Karl Schmiedt als Chefärzte geführt. Redaktionelles Ziel: Zuständigkeit und Namensschreibweise mit ARTEMIS abstimmen. Daraus wird kein medizinischer oder organisatorischer Fehler abgeleitet.

## Stand des lokalen Entwurfs

Der Quellcode enthält eine deutsche Startseite, Standortübersicht, zwei Standortdetails, Team- und Profilseiten, kurze Leistungs-, Diagnostik- und Krankheitsübersichten sowie Patienten- und Akuthinweise. Kontakt- und Öffnungszeitdaten sind aus den offiziellen Standortseiten übernommen. Die Terminansicht verlinkt für Leverkusen den offiziellen samedi-Weg und bietet für Opladen telefonische Kontaktaufnahme.

Responsive Layoutklassen, eine mobile Anrufaktion, Fokusdarstellung, ein Sprunglink sowie Schriftgrößen- und Kontrastoptionen sind im Code vorhanden. Die Navigation verwendet Hash-URLs; Seitenmetadaten werden im Browser aktualisiert. Strukturierte Standortdaten sind eingebunden. Rechtliche Informationsseiten verweisen auf die offiziellen ARTEMIS-Seiten.

**Ergänzungen vom 09.10.2026:** Die Startseite enthält einen automatisch wechselnden Hero-Slider und ein Qualitätsband mit drei gleichzeitig sichtbaren Logos. Das Band läuft fortlaufend, bietet eine Pause und respektiert reduzierte Bewegung. Die Standortübersicht und der ARTEMIS-Footer wurden neu gestaltet. Standortbilder verwenden WebP und verzögertes Laden weiter unten auf der Seite.

**Abgrenzung:** Es handelt sich um ein lokales, noch nicht veröffentlichtes Konzept. Es gibt kein CMS, keine vollständige nationale Standortdatenbank und kein eigenes Termin- oder Formularbackend. Der offizielle Buchungsweg ist eine externe Verlinkung. Kontaktinformationen, Leistungen und medizinische Texte benötigen eine abschließende Freigabe des Auftraggebers.

Am 09.10.2026 liefen `npm run lint` (TypeScript-Check) und `npm run build` erfolgreich. Die lokale Chrome-Vorschau wurde am Desktop und in einer iPhone-16-Ansicht mit 393 px Breite angesehen. Vollständige Browser-/Geräteabnahme, Inhaltsfreigabe, Hosting-/CMS-Einbindung und Veröffentlichung stehen weiterhin aus. Eine bestandene Build-Prüfung allein belegt keine vollständige Produktionsreife.

## Vor der Veröffentlichung zu erledigen

- Standortdaten, ärztliche Rollen, medizinische Texte und Markeninhalte durch ARTEMIS freigeben lassen; verwendete Fotos und Nutzungsrechte abstimmen.
- Mobile und Desktop-Layouts in vereinbarten Browsern visuell prüfen; Navigation, Fokus, Zoom, Tastaturbedienung, Dialoge und ausgewählte Screenreader-Abläufe kontrollieren.
- Eine indexierbare Seitenstruktur mit echten Pfad-URLs und geeignetem Rendering festlegen. Aktuelle Hash-Navigation ist eine Konzeptlösung; sie reicht nicht als vollständiges SEO-Migrationskonzept.
- Canonicals, Sitemap, Robots-Regeln, Fehlerseiten und die strukturierten Daten passend zur endgültigen Domain prüfen. Wenn bestehende URLs ersetzt werden, die Weiterleitungen aus dem tatsächlich vereinbarten Umfang ableiten.
- Buchungs-, Telefon-, E-Mail-, Routen- und externe Informationslinks kontrollieren; bei einem zukünftigen Formular eine echte Übermittlung, Zuständigkeit und Datenschutzerklärung vorsehen.
- Hosting, Domain, TLS, Deployment, Betriebsverantwortung, Monitoring und Übergabe festlegen. Das endgültige Datenschutz- und Cookie-Verhalten hängt von den tatsächlich eingebundenen Diensten ab und muss daran geprüft werden.

Ein nationaler Ausbau erfordert ein eigenes Inhaltsinventar, Standortdatenmodell, CMS-Konzept, Integrationskonzept sowie einen gesonderten Migrations- und Abnahmeplan.

## Vergleich korrekt formulieren

Erfundene Bewertungen, falsche Arztrollen, simulierte Formulare und unbestätigte Werbe- bzw. Zertifizierungsbehauptungen wurden aus dem **früheren lokalen Prototyp** entfernt. Diese Befunde dürfen **nicht** als nachgewiesene Fehler der öffentlich betriebenen ARTEMIS-Website bezeichnet werden.

Keine unbelegten Lighthouse-Werte, Ladezeitvergleiche, Conversion-Prozente, Patientenzahlen oder Kosteneinsparungen ergänzen. Aussagen wie „vollständig DSGVO-konform“, „WCAG-zertifiziert“, „100 % fehlerfrei“ oder „garantiert mehr Termine“ sind durch diese Arbeit nicht belegt. Im Angebot konkrete Leistungen, Abnahmekriterien und den noch erforderlichen Freigabeprozess benennen.

## Agenturangaben für das Angebot

Der Auftraggeber hat die Agentur-Website für die Verwendung im Angebot genannt. Die folgenden Angaben wurden anschließend aus dem direkten Abruf der öffentlichen Homepage übernommen:

- **Name:** WebDev Software Solutions
- **Website:** https://webdevss.tech/
- **E-Mail:** info@webdevsoftwaresolutions.com
- **Telefon Deutschland:** +49 172 9766016
- **Telefon Bangladesch:** +880 1722 301927
- **Standortbezug:** Germany & Bangladesh

Das Web-Recherchewerkzeug konnte die Agenturseite nicht öffnen; der anschließende direkte HTTPS-Abruf war erfolgreich. Auch das Agenturlogo wurde aus der öffentlichen Website übernommen. Diese Angaben sind kein Register- oder Identitätsnachweis. Keine unbestätigten Agentur-Erfolgszahlen, Kundenanzahlen, Rankings oder Zertifizierungen ergänzen. Vollständige Vertragspartei, ladungsfähige Anschrift und steuerliche Rechnungsangaben müssen vor Abgabe eines verbindlichen Angebots vervollständigt werden.
