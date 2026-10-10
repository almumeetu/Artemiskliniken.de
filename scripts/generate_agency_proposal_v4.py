from __future__ import annotations

import html
import json
import re
import shutil
import tempfile
from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
DELIVERY = ROOT / 'output/ARTEMIS_Projektuebergabe'
OUT = Path(tempfile.mkdtemp(prefix='artemis_agency_build_'))
CLIENT = OUT / '01_CLIENT_READY'
MAIL = OUT / '02_EMAIL_TEMPLATES'
EDIT = OUT / '03_EDITABLE_SOURCE'
MEDIA = OUT / '04_DEMO_MATERIAL'
INTERNAL = OUT / '05_INTERNE_UNTERLAGEN'
LOGO = DELIVERY / '04_QUELLDATEIEN/06_WebDev_Software_Solutions_Logo.png'
OFFER = json.loads((DELIVERY / '04_QUELLDATEIEN/05_Angebotsdaten.json').read_text())
OFFER.update(offer_id='WSS ART 2026 1010', date='10.10.2026', valid_until='24.10.2026', contact_person='Moyen Uddin', address_as_provided='Küppersteg, 51373 Leverkusen, NRW, Germany', version='4', language='de')
OFFER['timeline'] = '3-4 Wochen ab Projektstart und vollständiger Bereitstellung der Freigaben und Zugänge'

for directory in (CLIENT, MAIL, EDIT, MEDIA, INTERNAL):
    directory.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont('Agency', '/System/Library/Fonts/Supplemental/Arial.ttf'))
pdfmetrics.registerFont(TTFont('AgencyBold', '/System/Library/Fonts/Supplemental/Arial Bold.ttf'))
pdfmetrics.registerFontFamily('Agency', normal='Agency', bold='AgencyBold', italic='Agency', boldItalic='AgencyBold')

W, H = A4
M = 49
CW = W - M * 2
INK = colors.HexColor('#172A3B')
MUTED = colors.HexColor('#526576')
NAVY = colors.HexColor('#143652')
CYAN = colors.HexColor('#0988B5')
LINE = colors.HexColor('#D9D9D9')
PALE = colors.HexColor('#F1F5F8')
BLACK = colors.black

STYLES = {
    'body': ParagraphStyle('body', fontName='Agency', fontSize=10.4, leading=14.6, textColor=INK, spaceAfter=0),
    'small': ParagraphStyle('small', fontName='Agency', fontSize=8.6, leading=12, textColor=MUTED),
    'micro': ParagraphStyle('micro', fontName='Agency', fontSize=7.8, leading=10.8, textColor=MUTED),
    'h1': ParagraphStyle('h1', fontName='AgencyBold', fontSize=21, leading=26, textColor=BLACK),
    'h2': ParagraphStyle('h2', fontName='AgencyBold', fontSize=12, leading=16, textColor=BLACK),
    'title': ParagraphStyle('title', fontName='AgencyBold', fontSize=34, leading=39, textColor=BLACK),
    'subtitle': ParagraphStyle('subtitle', fontName='Agency', fontSize=19, leading=26, textColor=BLACK),
    'cell': ParagraphStyle('cell', fontName='Agency', fontSize=9.3, leading=12.7, textColor=INK),
    'cellsmall': ParagraphStyle('cellsmall', fontName='Agency', fontSize=8.8, leading=12.0, textColor=INK),
    'headcell': ParagraphStyle('headcell', fontName='AgencyBold', fontSize=9.2, leading=12.5, textColor=colors.white),
    'amount': ParagraphStyle('amount', fontName='Agency', fontSize=9.5, leading=13, textColor=INK, alignment=TA_RIGHT),
    'mail': ParagraphStyle('mail', fontName='Agency', fontSize=11, leading=16, textColor=INK),
}


def esc(value):
    return html.escape(str(value), quote=False)


def euro(value):
    return f'{value:,.0f}'.replace(',', '.') + ' EUR'


def link(label, url):
    return f'<a href="{url}" color="#16628B">{label}</a>'


def plain(value):
    value = re.sub(r'<br\s*/?>', '\n', value)
    return html.unescape(re.sub('<[^>]+>', '', value))


class Document:
    def __init__(self, path, title, pages, label):
        self.path = path
        self.c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
        self.c.setTitle(title)
        self.c.setAuthor('Moyen Uddin | WebDev Software Solutions')
        self.c.setSubject('ARTEMIS Leverkusen und Opladen | ' + OFFER['offer_id'])
        self.c.setCreator('WebDev Software Solutions')
        self.pages = pages
        self.page_number = 0
        self.label = label
        self.y = 0
        self.md = []
        self.html_pages = []
        self.html_page = []
        self.layout = []

    def page(self, title=None, cover=False):
        if self.page_number:
            self.finish_page()
            self.c.showPage()
        self.page_number += 1
        self.c.setFillColor(colors.white)
        self.c.rect(0, 0, W, H, stroke=0, fill=1)
        self.html_page = []
        if not cover:
            self.c.setFont('AgencyBold', 8)
            self.c.setFillColor(BLACK)
            self.c.drawString(M, H - 34, 'WEBDEV SOFTWARE SOLUTIONS')
            self.c.setFont('Agency', 8)
            self.c.drawRightString(W - M, H - 34, 'ARTEMIS Leverkusen und Opladen')
            self.c.setStrokeColor(LINE)
            self.c.line(M, H - 46, W - M, H - 46)
        self.y = H - 75 if not cover else H - 62
        if title:
            self.heading(title, 'h1', gap=16)
        self.c.bookmarkPage(f'page{self.page_number}')
        self.c.addOutlineEntry(title or 'Projektangebot', f'page{self.page_number}', 0, False)

    def finish_page(self):
        if self.y < 61:
            raise RuntimeError(f'Overflow in {self.path.name}, page {self.page_number}: y={self.y}')
        self.c.setStrokeColor(LINE)
        self.c.line(M, 48, W - M, 48)
        self.c.setFillColor(MUTED)
        self.c.setFont('Agency', 7.5)
        self.c.drawString(M, 32, OFFER['offer_id'] + ' | ' + OFFER['date'] + ' | ' + self.label)
        self.c.drawRightString(W - M, 32, f'{self.page_number} / {self.pages}')
        self.layout.append({'page': self.page_number, 'lowest_content_y': round(self.y, 2)})
        self.html_pages.append('<section class="page">' + '\n'.join(self.html_page) + '</section>')

    def p(self, value, style='body', gap=9):
        p = Paragraph(value, STYLES[style])
        _, ph = p.wrap(CW, H)
        if self.y - ph < 61:
            raise RuntimeError(f'Paragraph overflow {self.path.name} page {self.page_number}: {plain(value)[:65]}')
        p.drawOn(self.c, M, self.y - ph)
        self.y -= ph + gap
        self.md.append(plain(value) + '\n')
        self.html_page.append(f'<p class="{style}">{value}</p>')

    def heading(self, title, style='h2', gap=8):
        self.p(esc(title), style, gap)
        self.md[-1] = ('# ' if style == 'h1' else '## ') + title + '\n'

    def space(self, value=7):
        self.y -= value

    def table(self, headers, rows, widths, small=False, numeric_cols=(), total=False, pad=8):
        data = [[Paragraph(esc(x), STYLES['headcell']) for x in headers]]
        for row in rows:
            cells = []
            for i, val in enumerate(row):
                sty = 'amount' if i in numeric_cols else ('cellsmall' if small else 'cell')
                cells.append(Paragraph(val, STYLES[sty]))
            data.append(cells)
        table = Table(data, colWidths=[CW * n for n in widths], repeatRows=1, hAlign='LEFT')
        commands = [
            ('BACKGROUND', (0, 0), (-1, 0), NAVY),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('GRID', (0, 0), (-1, -1), 0.45, LINE),
            ('LEFTPADDING', (0, 0), (-1, -1), pad),
            ('RIGHTPADDING', (0, 0), (-1, -1), pad),
            ('TOPPADDING', (0, 0), (-1, -1), pad),
            ('BOTTOMPADDING', (0, 0), (-1, -1), pad),
        ]
        for row in range(1, len(data)):
            commands.append(('BACKGROUND', (0, row), (-1, row), PALE if row % 2 else colors.white))
        if total:
            commands.append(('BACKGROUND', (0, len(data)-1), (-1, len(data)-1), colors.HexColor('#DFEAF1')))
        table.setStyle(TableStyle(commands))
        _, th = table.wrap(CW, H)
        if self.y - th < 61:
            raise RuntimeError(f'Table overflow {self.path.name} page {self.page_number}, height {th}, y {self.y}')
        table.drawOn(self.c, M, self.y - th)
        self.y -= th + 12
        self.md.append('| ' + ' | '.join(headers) + ' |\n| ' + ' | '.join('---' for _ in headers) + ' |\n' + '\n'.join('| ' + ' | '.join(plain(x).replace('\n',' ') for x in row) + ' |' for row in rows) + '\n')
        self.html_page.append('<table><thead><tr>' + ''.join(f'<th>{esc(x)}</th>' for x in headers) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join(f'<td>{x}</td>' for x in row) + '</tr>' for row in rows) + '</tbody></table>')

    def save(self, stem):
        self.finish_page()
        assert self.page_number == self.pages
        self.c.save()
        (EDIT / (stem + '.md')).write_text('\n'.join(self.md), encoding='utf-8')
        css = '''@page { size:A4; margin:18mm; } * {box-sizing:border-box;} body {font:15px/1.5 Arial,sans-serif;color:#172a3b;margin:0;background:#edf1f4;} .page{max-width:850px;margin:25px auto;background:white;padding:60px;break-after:page;} h1,h2,.h1,.h2,.title,.subtitle{color:black;} .title{font-size:40px;font-weight:bold;} .subtitle{font-size:25px;} .h1{font-size:28px;font-weight:bold;margin:0 0 20px;} .h2{font-size:18px;font-weight:bold;margin:24px 0 10px;} p{margin:0 0 12px;} .small,.micro{font-size:12px;color:#526576;} table{width:100%;border-collapse:collapse;margin:12px 0 22px;font-size:13px;} th,td{padding:10px;border:1px solid #d9d9d9;vertical-align:middle;text-align:left;} th{background:#143652;color:white;} tr:nth-child(odd) td{background:#f1f5f8;} a{color:#16628b;} @media print {body{background:white;} .page{padding:0;margin:0;max-width:none;} }'''
        page = '<!doctype html><html lang="de"><meta charset="utf-8"><title>' + esc(self.c._doc.info.title) + '</title><style>' + css + '</style><body>' + '\n'.join(self.html_pages) + '</body></html>'
        (EDIT / (stem + '.html')).write_text(page, encoding='utf-8')
        return self.layout


def sources(doc, short=False):
    doc.p('Quellen der Einordnung: ' + link('[1] ARTEMIS Hauptauftritt', 'https://www.artemiskliniken.de/') + ' · ' + link('[2] Leverkusen', 'https://www.artemiskliniken.de/standorte/artemis-augenzentrum-leverkusen/') + ' · ' + link('[3] Opladen', 'https://www.artemiskliniken.de/standorte/artemis-augenarzt-praxis-opladen/') + '. Öffentliche Text- und Linkinhalte, abgerufen am 09.10.2026. Kein Vergleich von Nutzungsdaten, Ladezeiten oder internen Systemen.', 'micro', 0)


def proposal():
    d = Document(CLIENT / '01_ARTEMIS_Projektangebot_DE.pdf', 'Projektangebot für ARTEMIS Leverkusen und Opladen', 8, 'Projektangebot')
    d.page(cover=True)
    d.c.drawImage(str(LOGO), M, H - 168, width=126, height=100, mask='auto', preserveAspectRatio=True)
    d.y = H - 200
    d.p('PROJEKTANGEBOT', 'small', 16)
    d.p('Regionale Website<br/>für ARTEMIS', 'title', 13)
    d.p('Leverkusen und Opladen', 'subtitle', 21)
    d.p('Ein regionaler Pilot für verständliche Standortinformationen und klare Kontakt- und Terminwege.', 'body', 29)
    d.table(['Projekt', 'Angebotsrahmen'], [
        ['Auftraggeber', 'ARTEMIS<br/>Standortverantwortliche Leverkusen und Opladen'],
        ['Angebotsnummer und Datum', f"{OFFER['offer_id']} · {OFFER['date']}"],
        ['Angebotsgültigkeit', f"Bis {OFFER['valid_until']}"],
        ['Projektpreis', '<b>4.950 EUR</b>'],
        ['Geplante Umsetzung', '<b>3-4 Wochen</b> ab vollständigen Startvoraussetzungen'],
    ], [.36, .64], pad=9)
    d.p('Zuzüglich gesetzlicher Umsatzsteuer, sofern anwendbar. Die steuerliche Behandlung wird vor Beauftragung bestätigt.', 'small', 18)
    d.p('<b>Ihr Ansprechpartner</b><br/>Moyen Uddin · WebDev Software Solutions<br/>Küppersteg, 51373 Leverkusen, NRW, Deutschland<br/>' + link('+49 172 9766016', 'tel:+491729766016') + ' · ' + link('info@webdevsoftwaresolutions.com', 'mailto:info@webdevsoftwaresolutions.com') + '<br/>' + link('webdevss.tech', 'https://webdevss.tech/'), 'small', 0)

    d.page('02 Executive Summary')
    d.heading('Ausgangslage')
    d.p('ARTEMIS stellt bereits eine bundesweite Standortsuche, medizinische Informationen und lokale Standortseiten bereit. Leverkusen und Opladen verfügen über eigene Kontakt- und Leistungsinformationen. [1-3] Für den regionalen Pilot steht die konkrete Aufgabe der Patienten im Mittelpunkt: den passenden Standort finden und den nächsten Schritt erkennen.')
    d.heading('Vorgeschlagene Lösung')
    d.p('Wir schlagen einen deutschsprachigen Webauftritt für zwei Standorte vor. Er bündelt Standortwahl, Leistungen, Ärzteteam, Kontakt und Terminwege in einer gemeinsamen regionalen Nutzerführung. Ein bereitgestellter Frontend-Konzeptstand ist als öffentliche Projektvorschau erreichbar und dient als Grundlage für die Abstimmung mit ARTEMIS.')
    d.heading('Nutzen für ARTEMIS und die Patienten')
    d.p('Die eindeutige Zuordnung von Leistungen und Kontaktwegen soll die Orientierung erleichtern und vermeidbare Rückfragen zur Erreichbarkeit reduzieren. ARTEMIS erhält einen begrenzten Pilot mit definiertem Umfang, dokumentierter Abnahme und einer Grundlage für spätere Entscheidungen zur Standortdarstellung. Ein tatsächlicher Nutzungsvorteil ist im Pilot noch zu bestätigen.')
    d.space(8)
    d.heading('03 Projektverständnis', 'h1', 14)
    d.p('Der regionale Auftritt ergänzt die nationale Plattform. Deren Fachinhalte, Marke und bestehende Terminprozesse bleiben die verbindliche Grundlage. Der Mehrwert des Piloten liegt in der örtlichen Bündelung und einer konsistenten Führung zwischen den beiden Standorten.')
    d.p('Kalkuliert ist eine eigenständige Website auf einem von ARTEMIS freigegebenen Host. Domain, Verlinkung aus der nationalen Plattform und der Umgang mit überlappenden Inhalten werden vor Projektstart abgestimmt. Die Übernahme in ein bestehendes zentrales CMS wird gesondert bewertet.')
    d.p('<b>Aktueller Stand:</b> Ein Konzeptstand ist als öffentliche Projektvorschau unter ' + link('artemiskliniken-de.vercel.app', 'https://artemiskliniken-de.vercel.app/') + ' erreichbar. Die Vorschau ist kein offizieller ARTEMIS-Produktivauftritt. Inhalte, Marke, Terminziele und technische Umgebung benötigen ARTEMIS-Freigabe vor Veröffentlichung.', 'small', 15)
    sources(d)

    d.page('04 Patientenführung')
    d.p('Die folgenden Stationen beschreiben die Orientierung im regionalen Auftritt. Patienten können an jedem Punkt einsteigen; Informationen und Aktionen werden passend zum jeweiligen Standort angeboten.', gap=15)
    d.table(['Station', 'Frage des Patienten', 'Vorgesehene Nutzerführung'], [
        ['<b>01 Standort</b>', 'Welche Praxis passt zu meinem Anliegen?', 'Leverkusen und Opladen mit Adresse, Leistungsprofil, Sprechzeiten und Anfahrt unterscheiden.'],
        ['<b>02 Behandlung</b>', 'Welche Informationen sind für mich relevant?', 'Freigegebene Übersichtstexte zu Behandlungen, Diagnostik und Augenkrankheiten; klare Zuordnung zum Standort.'],
        ['<b>03 Ärzteteam</b>', 'Wer behandelt mich vor Ort?', 'Team und Profile mit bestätigter Rolle und Standortzuordnung anzeigen.'],
        ['<b>04 Kontakt</b>', 'Wie erreiche ich die richtige Praxis?', 'Telefon, E-Mail, Öffnungszeiten und Routenlink direkt im Standortkontext bereitstellen.'],
        ['<b>05 Termin</b>', 'Welchen Buchungsweg kann ich nutzen?', 'Für Leverkusen den bestätigten externen Buchungslink anbieten; für Opladen den telefonischen Weg hervorheben.'],
        ['<b>06 Akutfall</b>', 'Wo finde ich die Hinweise bei akuten Beschwerden?', 'Freigegebene Akuthinweise von jeder Seite direkt zugänglich machen, unabhängig vom regulären Terminweg.'],
    ], [.18, .29, .53], pad=10)
    d.heading('Terminvereinbarung mit klarer Zuständigkeit')
    d.p('Die Terminansicht leitet zum freigegebenen ARTEMIS-Buchungsdienst oder zur Telefonnummer der Praxis weiter. Sie erfasst selbst keine Kontakt- oder Gesundheitsdaten und bestätigt keine Termine. Der Buchungsabschluss erfolgt im jeweiligen bestehenden Prozess.')
    d.heading('Akuthinweise als eigener direkter Zugang')
    d.p('Die Darstellung ist keine medizinische Ersteinschätzung. ARTEMIS gibt Texte, Rufnummern und Zuständigkeiten für akute Anliegen frei. Dieser Zugang bleibt unabhängig davon erreichbar, ob zuvor ein Standort, eine Behandlung oder ein Arzt ausgewählt wurde.')

    d.page('05 Leistungsumfang')
    d.p('Das Angebot umfasst den vorhandenen Inhaltsbestand in deutscher Sprache mit bis zu <b>35 Seitenansichten</b>. Die abschließende Seitenliste und Standortzuordnung werden in Woche 1 bestätigt.', gap=12)
    d.table(['Seitenbereich', 'Enthaltene Ansichten', 'Anzahl'], [
        ['Regionaler Einstieg', 'Startseite', '1'],
        ['Standorte', 'Übersicht und zwei Standortdetails', '3'],
        ['Ärzteteam', 'Übersicht und bis zu fünf Profile', '6'],
        ['Behandlungen', 'Übersicht und sechs Themen', '7'],
        ['Diagnostik', 'Übersicht und drei Themen', '4'],
        ['Augenkrankheiten', 'Übersicht und neun kurze Informationen', '10'],
        ['Patienten und Akutfälle', 'Patienteninformation und Akuthinweise', '2'],
        ['Rechtliche Informationen', 'Impressum und Datenschutz nach Freigabe', '2'],
    ], [.29, .60, .11], numeric_cols=(2,), pad=6.5)
    d.heading('Funktionen und mobile Nutzung')
    d.p('Enthalten sind Seitensuche, mobile Navigation, standortbezogene Kontaktkarten und die Terminansicht. Telefon, E-Mail, Routen- und Buchungslinks führen zu bestätigten Zielen. Externe Karten werden erst nach aktiver Auswahl geladen. Inhalte und Bedienelemente werden für Smartphone, Tablet und Desktop angepasst.')
    d.heading('Inhalte und Zugänglichkeit')
    d.p('Wir bearbeiten vorhandene deutsche Texte redaktionell und integrieren freigegebenes Bildmaterial aus dem abgestimmten Bestand. Zwei gebündelte Korrekturrunden sind enthalten. Lesbare Schrift, geeignete Kontraste, sichtbarer Fokus, Tastaturbedienung, Textvergrößerung und reduzierte Bewegung gehören zur Umsetzung und Prüfung.')
    d.heading('Technischer Lieferumfang')
    d.p('Die Umsetzung basiert auf React, TypeScript und Vite. Enthalten sind die Finalisierung des Frontends, eigene Seitenpfade, seitenbezogene Metadaten, Canonicals, strukturierte Standortdaten, Sitemap, Robots-Regeln, Fehlerbehandlung und ein freigegebenes Deployment. Einzelheiten zu Qualität und Zielsystem stehen auf der folgenden Seite.', gap=0)

    d.page('06 Technische Qualität')
    d.heading('Responsive Entwicklung und Browser')
    d.p('Wir prüfen die vereinbarten Seiten bei 320, 375, 768 und 1440 Pixeln Breite sowie bei vergrößertem Text. Der Prüfumfang umfasst die zum Abnahmezeitpunkt aktuellen stabilen Versionen von Chrome, Edge, Firefox und Safari sowie Safari unter iOS und Chrome unter Android. Versionen und verwendete Geräte oder Simulationen werden im Protokoll benannt.')
    d.heading('SEO als technische Grundlage')
    d.p('Für jede vereinbarte Seite werden URL, Titel und Beschreibung festgelegt. Canonicals, Sitemap und strukturierte Daten werden mit der freigegebenen Domain abgeglichen. Da die Konzeptbasis Inhalte im Browser rendert, wird die Seitenausgabe vor Veröffentlichung auf Abrufbarkeit und Indexierbarkeit geprüft und im vereinbarten Host angepasst. Die Abstimmung mit dem nationalen Auftritt soll widersprüchliche oder doppelte Inhalte vermeiden.')
    d.heading('Sicherheit und Datenverarbeitung')
    d.p('TLS, Sicherheitsheader, verwendete Abhängigkeiten und externe Ressourcen werden im Zielsystem geprüft. Produktionszugänge werden für die erforderlichen Aufgaben beschränkt übergeben. Der Umfang enthält keine eigene Patientenverwaltung und keine Speicherung von Terminanfragen. ARTEMIS bestätigt die Rechts- und Datenschutzhinweise für die tatsächlich eingesetzten Dienste; Tracking wird nur nach gesonderter Abstimmung eingebunden.')
    d.heading('Ladeverhalten und Betrieb')
    d.p('Wir verwenden angemessene Bildgrößen, laden nicht sofort benötigte Inhalte verzögert und prüfen die Aufteilung des Frontend-Codes sowie die Cache-Konfiguration des Hosts. Auffälligkeiten beim Laden und bei Kerninteraktionen werden unter dokumentierten Bedingungen geprüft. Konkrete Ladezeitwerte oder Verbesserungsquoten werden erst nach Messung angegeben.')
    d.heading('Abgrenzung des Angebots')
    d.p('Nicht enthalten sind ein nationaler Relaunch, CMS-Neuentwicklung oder CMS-Migration, Patientenportal, eigene Formularverarbeitung, Buchungsbackend, Übersetzungen und laufende Kampagnen. Hosting, Domain, externe Lizenzen und kostenpflichtige Dienste werden gesondert getragen. Eine formale Barrierefreiheitszertifizierung, ein Penetrationstest sowie medizinische oder rechtliche Beratung sind nicht Bestandteil des Festpreises.', 'small', 0)

    d.page('07 Projektplan')
    d.p('Die geplante Umsetzung beträgt <b>3-4 Wochen</b>. Sie beginnt nach schriftlicher Beauftragung, Startzahlung und Bereitstellung der erforderlichen Inhalte, Freigaben und Zugänge. Wartezeiten auf Entscheidungen oder externe Dienstleister verschieben die betroffenen Termine.', gap=15)
    d.table(['Phase', 'Zeitraum', 'Arbeitsergebnis und Freigabe'], [
        ['<b>1 Projektstart</b>', 'Woche 1', 'Seiteninventar, Verantwortliche, Host, Terminziele und Freigabeweg abstimmen. ARTEMIS bestätigt die Projektgrundlage.'],
        ['<b>2 Gestaltung und Inhalte</b>', 'Woche 1-2', 'Regionale Darstellung und deutsche Inhalte finalisieren. Erste Korrekturrunde; Design- und Inhaltsfreigabe.'],
        ['<b>3 Technische Umsetzung</b>', 'Woche 2-3', 'Frontend, Terminwege, Domainkonfiguration und SEO-Grundlagen finalisieren. Zweite Korrekturrunde auf der Prüfversion.'],
        ['<b>4 Abnahme und Übergabe</b>', 'Woche 3-4', 'Vereinbarte Prüfungen dokumentieren, Abweichungen beheben und ARTEMIS-Abnahme einholen. Veröffentlichung nach schriftlicher Freigabe.'],
    ], [.25, .17, .58], pad=9)
    d.space(5)
    d.heading('08 Liefergegenstände', 'h1', 15)
    d.p('<b>Website:</b> Der freigegebene deutsche Auftritt für Leverkusen und Opladen mit den vereinbarten Seiten, Funktionen und bestehenden Terminwegen.')
    d.p('<b>Qualitätsnachweise:</b> Seiten- und Linkinventar, dokumentierte Browser- und Bedienprüfungen sowie eine abgestimmte Liste etwaiger Restpunkte.')
    d.p('<b>Technische Übergabe:</b> Projektquellcode, verwendbare Projektdateien, freigegebene Assets sowie Hinweise zu Build, Deployment und Konfiguration. Nutzungs- und Lizenzbedingungen von Drittanbietern bleiben bestehen.')
    d.p('<b>Veröffentlichung:</b> Ein Deployment im vereinbarten Zielsystem, eine abschließende Funktionskontrolle und ein Übergabegespräch. Betrieb, Sicherung und Rückkehr zum vorherigen Stand werden vor Veröffentlichung zugeordnet.', gap=0)

    d.page('09 Qualitätssicherung und Abnahme')
    d.p('Die folgenden Kriterien sind Liefer- und Abnahmeziele. Die finale Prüfung erfolgt mit freigegebenen Inhalten in der vorgesehenen Produktionsumgebung.', gap=12)
    d.table(['Prüfbereich', 'Abnahmekriterium'], [
        ['Seiten und Inhalte', 'Alle vereinbarten Seiten sind direkt aufrufbar. Standortdaten, Leistungszuordnung, Arztrollen, Bilder und Rechtstexte entsprechen der ARTEMIS-Freigabe.'],
        ['Patientenwege', 'Navigation, Suche und Terminansicht sind bedienbar. Telefon-, E-Mail-, Routen- und Buchungslinks führen zum richtigen Standort; Akuthinweise sind direkt erreichbar.'],
        ['Darstellung und Bedienung', 'In der vereinbarten Browsermatrix keine abgeschnittenen Kerninhalte oder unbeabsichtigte horizontale Seitenbewegung. Tastaturführung, sichtbarer Fokus und Dialogbedienung sind geprüft; Text bleibt bei 200 % lesbar.'],
        ['Technischer Betrieb', 'Seitenpfade, Metadaten, Sitemap und Canonicals passen zum Zielsystem. Build, TLS, Sicherheitsheader und vereinbarte externe Dienste sind geprüft und dokumentiert.'],
    ], [.24, .76], pad=8)
    d.p('Veröffentlichungsblockierend sind insbesondere nicht erreichbare Kernseiten, falsche Standort- oder Terminziele sowie Bedienfehler, die eine Kernaufgabe verhindern. Diese Abweichungen werden vor Abnahme behoben. Sonstige Restpunkte erhalten eine abgestimmte Zuständigkeit und Frist. ARTEMIS erteilt die schriftliche Abnahme und Freigabe zur Veröffentlichung.', 'small', 17)
    d.heading('10 Verantwortlichkeiten', 'h1', 13)
    d.table(['Verantwortung', 'Beitrag zum Projekt'], [
        ['<b>ARTEMIS</b>', 'Zentrale Ansprechperson benennen; Standort- und medizinische Angaben, Markenmaterial, Bildrechte, Rechts- und Datenschutzhinweise freigeben; Terminziele und technische Zugänge bereitstellen; Abnahme erteilen.'],
        ['<b>WebDev Software Solutions</b>', 'Vereinbarten Umfang umsetzen, Rückfragen und Korrekturen bündeln, Prüfungen dokumentieren, reproduzierbare Abweichungen im Umfang beheben und Website sowie Projektdateien übergeben.'],
        ['<b>Gemeinsam</b>', 'Seitenliste, Host, Freigabetermine und Betriebszuständigkeit festlegen. Änderungen an Umfang oder Integration werden vor Umsetzung mit Auswirkungen auf Preis und Termin schriftlich vereinbart.'],
    ], [.27, .73], small=True, pad=7)

    d.page('11 Investition')
    d.p('Der Festpreis gilt für den in diesem Angebot beschriebenen regionalen Umfang.', gap=10)
    rows = [[esc(name), euro(value)] for name, value in OFFER['items']]
    rows.append(['<b>Projektgesamtpreis</b>', '<b>4.950 EUR</b>'])
    d.table(['Leistung', 'Betrag'], rows, [.76, .24], numeric_cols=(1,), total=True, pad=5.5)
    d.p('Zuzüglich gesetzlicher Umsatzsteuer, sofern anwendbar. Steuerliche Behandlung und vollständige Vertrags- und Rechnungsdaten werden vor Beauftragung schriftlich bestätigt.', 'small', 12)
    d.heading('12 Zahlungsmeilensteine')
    d.table(['Meilenstein', 'Anteil', 'Betrag'], [
        ['Bei Beauftragung', '30 %', '1.485 EUR'],
        ['Nach Design- und Inhaltsfreigabe', '40 %', '1.980 EUR'],
        ['Nach Abnahme, vor Veröffentlichung', '30 %', '1.485 EUR'],
    ], [.60, .15, .25], numeric_cols=(1, 2), pad=5.5)
    d.heading('13 Optionale Betreuung')
    d.p('Betreuung kann für <b>95 EUR pro Monat</b> separat vereinbart werden. Umfang der Wartung und kleiner Inhaltsänderungen, Stundenkontingent, Reaktionszeiten, Laufzeit und Betriebszuständigkeiten werden vor Abschluss schriftlich festgelegt. Externe Kosten sind nicht enthalten; eine Rund-um-die-Uhr-Bereitschaft ist nicht zugesagt.', 'small', 12)
    d.heading('14 Nächster Schritt')
    d.p('Gern stellen wir Ihnen den regionalen Entwurf in einem 30-minütigen Gespräch vor. Dabei bestätigen wir den vorgesehenen Host, die Ansprechpartner und den Freigabeweg. Auf dieser Grundlage können Sie Umfang, Investition und Projektstart verbindlich entscheiden.', 'body', 8)
    d.p(f"<b>Das Angebot ist bis zum {OFFER['valid_until']} gültig.</b><br/>Moyen Uddin · WebDev Software Solutions<br/>" + link('info@webdevsoftwaresolutions.com', 'mailto:info@webdevsoftwaresolutions.com') + ' · ' + link('+49 172 9766016', 'tel:+491729766016'), 'small', 0)
    return d.save('01_Projektangebot_Editierbar_DE')


def management():
    d = Document(CLIENT / '02_ARTEMIS_Managementvergleich_DE.pdf', 'Managementvergleich für ARTEMIS Leverkusen und Opladen', 1, 'Managementvergleich')
    d.page('Managementvergleich')
    d.p('<b>Nationaler ARTEMIS-Auftritt und regionaler Pilot</b><br/>Leverkusen und Opladen', gap=13)
    d.p('Empfehlung: Den regionalen Entwurf als begrenzten Pilot bewerten. Er bündelt die örtliche Orientierung und nutzt die bestehende nationale Plattform und ihre Terminprozesse als Grundlage.', gap=15)
    d.table(['Kriterium', 'Nationale Website heute', 'Regionaler Pilot als Lieferziel'], [
        ['Patientenkomfort', 'Bundesweite Standortsuche und breites Informationsangebot. [1]', 'Direkter Einstieg in zwei Standorte mit zugeordneten nächsten Schritten.'],
        ['Lokale Informationen', 'Standortseiten mit Kontakt, Zeiten, Leistungen und Team. [2, 3]', 'Leverkusen und Opladen gemeinsam auffindbar; einheitliche Kontaktkarten.'],
        ['Mobile Nutzung', 'Öffentliche Inhalte geprüft; keine vergleichende Geräte- oder Leistungsmessung.', 'Kompakte Navigation und Standortaktionen; dokumentierte mobile Abnahme.'],
        ['Terminweg', 'Leverkusen verlinkt die Onlinebuchung; Opladen nennt den telefonischen Kontakt. [2, 3]', 'Bestehende Wege erklären und standortbezogen hervorheben; keine neue Buchungsplattform.'],
        ['Geschäftlicher Nutzen', 'Gemeinsame Marken- und Informationsplattform für das Netzwerk. [1]', 'Begrenzter Rahmen zur Bewertung lokaler Orientierung. Nutzungseffekt noch zu bestätigen.'],
        ['Technische Weiterentwicklung', 'Bestehende Standort-URLs; interne Architektur und Qualität nicht bewertet.', 'Regional abgestimmte Metadaten, abrufbare Seiten, dokumentierte Bedien- und Betriebsprüfung.'],
    ], [.235, .365, .40], small=True, pad=8.5)
    d.p(f"<b>Investition:</b> 4.950 EUR · <b>Dauer:</b> 3-4 Wochen ab vollständigen Startvoraussetzungen.<br/>Zuzüglich gesetzlicher Umsatzsteuer, sofern anwendbar. Gültig bis {OFFER['valid_until']}.", 'small', 12)
    d.heading('Entscheidung im nächsten Gespräch')
    d.p('Die öffentliche Projektvorschau ' + link('artemiskliniken-de.vercel.app', 'https://artemiskliniken-de.vercel.app/') + ' ist zur Abstimmung erreichbar. Sie ist kein ARTEMIS-Produktivauftritt; Inhalte, Marke und Veröffentlichung benötigen ARTEMIS-Freigabe. Pilotumfang, Ansprechpartner und Zielsystem werden im Gespräch bestätigt.', 'small', 12)
    sources(d)
    return d.save('02_Managementvergleich_Editierbar_DE')


SIGNATURE = ['Mit freundlichen Grüßen', 'Moyen Uddin', 'WebDev Software Solutions', 'Küppersteg, 51373 Leverkusen, NRW, Deutschland', '+49 172 9766016', 'info@webdevsoftwaresolutions.com', 'https://webdevss.tech/']
EMAILS = [
    {
        'heading': 'A Erstkontakt',
        'purpose': 'Interesse wecken und ein Gespräch vereinbaren',
        'subject': 'Regionales Website-Konzept für ARTEMIS Leverkusen und Opladen',
        'paragraphs': [
            'Sehr geehrte Damen und Herren,',
            'wir haben ein regionales Website-Konzept für Leverkusen und Opladen ausgearbeitet. Es ergänzt den nationalen ARTEMIS-Auftritt und bündelt Standortinformationen, Leistungen sowie die bestehenden Kontakt- und Terminwege.',
            'Im Mittelpunkt steht die Orientierung von Patientinnen und Patienten: Welcher Standort passt, wie erreiche ich die Praxis und welcher Terminweg ist vorgesehen?', 'Für einen ersten Eindruck sehen Sie die Projektvorschau hier: https://artemiskliniken-de.vercel.app/. Sie zeigt den Konzeptstand und ist kein freigegebener ARTEMIS-Produktivauftritt.',
            'Gern zeigen wir Ihnen den Entwurf in einem 30-minütigen Gespräch und besprechen, ob ein begrenzter Pilot für Ihre Standorte sinnvoll ist. Passt Ihnen ein Termin in der kommenden Woche? Falls das Thema in einen anderen Zuständigkeitsbereich fällt, freue ich mich über einen Hinweis auf die passende Ansprechperson.',
        ],
        'usage': 'Ohne Anlagen versendbar. Bei Bedarf nur den einseitigen Managementvergleich beifügen. Vor Versand die Vorschau unter https://artemiskliniken-de.vercel.app/ öffnen und als Konzeptstand, nicht als freigegebenen ARTEMIS-Produktivauftritt, kennzeichnen.',
    },
    {
        'heading': 'B Angebot nach dem Gespräch',
        'purpose': 'Projektangebot und Entscheidungsvorlage übermitteln',
        'subject': 'Ihr Projektangebot für ARTEMIS Leverkusen und Opladen',
        'paragraphs': [
            'Sehr geehrte Damen und Herren,',
            'vielen Dank für das Gespräch über den regionalen Webauftritt. Anbei erhalten Sie unser Projektangebot und den kompakten Managementvergleich für Leverkusen und Opladen. Die Projektvorschau ist unter https://artemiskliniken-de.vercel.app/ erreichbar und dient der Abstimmung.',
            'Das Angebot beschreibt den Seitenumfang, die bestehenden Terminwege, die Qualitätssicherung und die Zuständigkeiten. Der Projektpreis beträgt 4.950 EUR zuzüglich gesetzlicher Umsatzsteuer, sofern anwendbar. Die steuerliche Behandlung bestätigen wir vor Beauftragung. Für die Umsetzung planen wir 3-4 Wochen ab vollständigen Startvoraussetzungen.',
            'Als nächsten Schritt schlagen wir vor, das Zielsystem, die zuständigen Ansprechpartner und den Freigabeweg zu bestätigen. Anschließend können wir den Projektstart und die vollständigen Vertragsdaten schriftlich festhalten.',
            f"Das Angebot {OFFER['offer_id']} ist bis zum {OFFER['valid_until']} gültig. Gern erläutere ich Ihnen offene Punkte.",
        ],
        'usage': 'Nach einem tatsächlich geführten Gespräch verwenden. Anlagen: 01_ARTEMIS_Projektangebot_DE.pdf und 02_ARTEMIS_Managementvergleich_DE.pdf. Angebotsdatum und Gültigkeit vor Versand prüfen.',
    },
    {
        'heading': 'C Rückfrage nach fünf Arbeitstagen',
        'purpose': 'An die Angebotsprüfung anknüpfen',
        'subject': 'Rückfrage zum Projektangebot Leverkusen und Opladen',
        'paragraphs': [
            'Sehr geehrte Damen und Herren,',
            'ich möchte kurz an unser Projektangebot für Leverkusen und Opladen anknüpfen. Konnten Sie die Unterlagen bereits prüfen?',
            'Gern kläre ich offene Fragen zum Umfang, zur technischen Einbindung oder zum Freigabeablauf in einem kurzen Gespräch. Wenn Ihre interne Abstimmung noch Zeit benötigt, genügt mir eine kurze Rückmeldung zum passenden Zeitpunkt.',
            'Ist ein Austausch in der kommenden Woche für Sie sinnvoll?',
        ],
        'usage': 'Fünf Arbeitstage nach Versand des Angebots im bestehenden E-Mail-Verlauf senden. Bei abgelaufener Gültigkeit zuerst das Angebot aktualisieren. Keine automatische Nachfassserie.',
    },
]


def emails():
    d = Document(MAIL / '03_ARTEMIS_E_Mailvorlagen_DE.pdf', 'E-Mailvorlagen für ARTEMIS Leverkusen und Opladen', 3, 'E-Mailvorlagen')
    copy = ['E-MAILVORLAGEN | ARTEMIS LEVERKUSEN UND OPLADEN', 'Moyen Uddin | WebDev Software Solutions', 'Nur die jeweilige E-Mail kopieren; Versandhinweise nicht mitsenden.', '']
    for e in EMAILS:
        d.page(e['heading'])
        d.p(e['purpose'], 'small', 24)
        d.p('<b>Betreff:</b> ' + esc(e['subject']), 'mail', 25)
        for paragraph in e['paragraphs']:
            d.p(esc(paragraph), 'mail', 14)
        d.p('<br/>'.join(esc(x) for x in SIGNATURE), 'mail', 28)
        d.p('<b>Versandhinweis für Moyen Uddin</b><br/>' + esc(e['usage']), 'small', 0)
        copy.extend([e['heading'].upper(), 'Betreff: ' + e['subject'], '', '\n\n'.join(e['paragraphs']), '', '\n'.join(SIGNATURE), '', 'VERSANDHINWEIS (nicht mitsenden): ' + e['usage'], '', '------------------------------------------------------------', ''])
    (MAIL / '03_ARTEMIS_E_Mailvorlagen_DE.txt').write_text('\n'.join(copy), encoding='utf-8')
    return d.save('03_E_Mailvorlagen_Editierbar_DE')


def project_overview():
    d = Document(CLIENT / '00_ARTEMIS_Projektuebersicht_DE.pdf', 'Projektübersicht für ARTEMIS Leverkusen und Opladen', 1, 'Projektübersicht')
    d.page(cover=True)
    d.c.setFont('AgencyBold', 8)
    d.c.setFillColor(NAVY)
    d.c.drawString(M, H - 38, 'WEBDEV SOFTWARE SOLUTIONS')
    d.c.setFont('Agency', 8)
    d.c.setFillColor(MUTED)
    d.c.drawRightString(W - M, H - 38, 'Moyen Uddin | Leverkusen')
    d.c.setStrokeColor(LINE)
    d.c.line(M, H - 49, W - M, H - 49)
    d.y = H - 68
    d.heading('Regionale Website für ARTEMIS', 'title', 7)
    d.p('Leverkusen und Opladen | Entscheidungsvorlage für einen regionalen Pilot', 'subtitle', 8)
    d.p(f"Angebot {OFFER['offer_id']} · {OFFER['date']} · gültig bis {OFFER['valid_until']}", 'small', 11)
    d.p('Ein deutschsprachiger Auftritt, der zwei ARTEMIS-Standorte und ihre bestehenden Kontakt- und Terminwege gemeinsam darstellt.', 'body', 12)
    d.heading('Patientenweg', 'h2', 4)
    d.table(['1 Standort', '2 Behandlung', '3 Ärzteteam', '4 Kontakt', '5 Termin', '6 Akutfall'], [[
        'Passende Praxis<br/>finden', 'Freigegebene<br/>Infos lesen', 'Team vor Ort<br/>kennenlernen', 'Praxis direkt<br/>erreichen', 'Bestehenden Weg<br/>nutzen', 'Freigegebene<br/>Hinweise öffnen',
    ]], [.165, .167, .167, .167, .167, .167], small=True, pad=5)
    d.heading('Enthalten', 'h2', 4)
    d.table(['Bereich', 'Geplanter Umfang'], [
        ['Seiten', 'Bis zu 35 Ansichten, darunter Standorte, Behandlungen, Diagnostik, Team und Patienteninformation'],
        ['Funktionen', 'Seitensuche, mobile Navigation, Kontaktkarten, Terminverweise und direkt erreichbare Akuthinweise'],
        ['Qualität', 'Responsive Entwicklung, vereinbarte Browser- und Bedienprüfung, technische SEO-Grundlage und Übergabe'],
    ], [.20, .80], small=True, pad=5.5)
    d.table(['Investition', 'Zeitraum', 'Zahlungsmeilensteine'], [[
        '<b>4.950 EUR</b><br/>zzgl. Umsatzsteuer, sofern anwendbar', '<b>3-4 Wochen</b><br/>ab vollständigen Startvoraussetzungen', '<b>30 / 40 / 30 %</b><br/>1.485 / 1.980 / 1.485 EUR',
    ]], [.32, .34, .34], small=True, pad=7)
    d.p('Bestehende nationale Website und externe Terminprozesse bleiben die Grundlage. Die öffentliche Projektvorschau ' + link('artemiskliniken-de.vercel.app', 'https://artemiskliniken-de.vercel.app/') + ' dient der Abstimmung und ist kein freigegebener ARTEMIS-Produktivauftritt. Inhalt und finale Umsetzung benötigen ARTEMIS-Freigabe; die vorgesehene Orientierung ist keine Ergebnisgarantie.', 'micro', 8)
    d.p(f"<b>Nächster Schritt:</b> Einen 30-minütigen Vorstellungstermin vereinbaren und Zielsystem, Ansprechpartner sowie Freigabeweg bestätigen. Angebot gültig bis {OFFER['valid_until']}.<br/>{link('info@webdevsoftwaresolutions.com', 'mailto:info@webdevsoftwaresolutions.com')} · {link('+49 172 9766016', 'tel:+491729766016')} · {link('webdevss.tech', 'https://webdevss.tech/')}", 'small', 0)
    return d.save('00_Projektuebersicht_Editierbar_DE')


def screenshot_deck():
    source = DELIVERY / '04_QUELLDATEIEN/07_BILDMATERIAL'
    crops = MEDIA / 'SCREENSHOTS'
    crops.mkdir(exist_ok=True)
    crop_specs = [
        ('01_Desktop_Startseite.png', '01_Desktop_Startseite_Ausschnitt.jpg', 2350),
        ('02_Desktop_Standorte.png', '02_Desktop_Standorte_Ausschnitt.jpg', 3300),
    ]
    crop_files = []
    for original, target, height in crop_specs:
        im = Image.open(source / original).convert('RGB')
        im = im.crop((0, 0, im.width, min(height, im.height))).resize((1764, int(1764 * min(height, im.height) / im.width)), Image.Resampling.LANCZOS)
        path = crops / target
        im.save(path, 'JPEG', quality=88, optimize=True)
        crop_files.append(path)
    mobile = crops / '03_Mobile_iPhone14Pro.jpg'
    Image.open(source / '03_Mobile_iPhone14Pro.png').convert('RGB').save(mobile, 'JPEG', quality=91, optimize=True)
    crop_files.append(mobile)

    path = CLIENT / '04_ARTEMIS_Screenshot_Deck_DE.pdf'
    d = Document(path, 'Screenshots des regionalen ARTEMIS Entwurfs', 3, 'Screenshots')
    screenshots = [
        ('Startseite am Desktop', 'Regionaler Einstieg, ausgewählte Leistungen und beide Standorte aus dem Konzeptstand.', crop_files[0], 493),
        ('Standortwahl am Desktop', 'Leverkusen und Opladen mit lokaler Einordnung und Kontaktinformationen im Konzeptstand.', crop_files[1], 493),
        ('Mobile Darstellung', 'Ansicht im iPhone 14 Pro Viewport mit direktem Zugang zu Standort, Kontakt und Akuthinweisen.', crop_files[2], 236),
    ]
    for i, (title, caption, imgpath, imgw) in enumerate(screenshots):
        d.page(f"{i+1:02d} | {title}")
        d.p(link('artemiskliniken-de.vercel.app', 'https://artemiskliniken-de.vercel.app/') + ' | ÖFFENTLICHE PROJEKTVORSCHAU, KONZEPTSTAND', 'small', 12)
        d.p(esc(caption), 'body', 17)
        img = Image.open(imgpath)
        aspect = img.height / img.width
        ih = imgw * aspect
        if i < 2:
            ih = min(ih, 435)
            imgw = ih / aspect
        x = M + (CW - imgw) / 2
        d.c.setFillColor(colors.HexColor('#F7F9FA'))
        d.c.roundRect(M + 1, d.y - ih - 8, CW - 2, ih + 16, 8, fill=1, stroke=0)
        d.c.drawImage(str(imgpath), x, d.y - ih, width=imgw, height=ih, preserveAspectRatio=True, anchor='c', mask='auto')
        d.y -= ih + 24
        if i == 2:
            d.p('Screenshot im mobilen Konzept-Viewport (393 x 852 CSS-Pixel). Dies ersetzt keine Geräteabnahme; die öffentliche Vorschau ist kein freigegebener ARTEMIS-Produktivauftritt.', 'small', 0)
        else:
            d.p('Screenshot des Konzeptstands. Die verlinkte Vorschau ist kein freigegebener ARTEMIS-Produktivauftritt; Inhalte und Marke benötigen Freigabe.', 'small', 0)
    return d.save('04_Screenshot_Deck_Editierbar_DE')


if __name__ == '__main__':
    report = {'proposal': proposal(), 'management': management(), 'emails': emails(), 'overview': project_overview(), 'screenshots': screenshot_deck()}
    (INTERNAL / 'Layout_Data.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    (EDIT / 'Angebotsdaten.json').write_text(json.dumps(OFFER, ensure_ascii=False, indent=2), encoding='utf-8')
    shutil.copy2(LOGO, EDIT / 'WebDev_Software_Solutions_Logo.png')
    print(json.dumps(report, indent=2))
