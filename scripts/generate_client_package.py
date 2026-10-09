from __future__ import annotations

import json
import shutil
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Inches, Pt, RGBColor
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, Image, KeepTogether, PageBreak, PageTemplate,
    Paragraph, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "ARTEMIS_Client_Delivery" / "Version_3_Final"
SEND = OUT / "01_CLIENT_READY"
EDIT = OUT / "02_EDITABLE_SOURCE"
INTERNAL = OUT / "03_INTERNAL_SUPPORT"
LOGO = Path("/tmp/artemis-old-docx/word/media/webdevss-logo.png")

NAVY = "12365B"
BLUE = "008FC9"
CYAN = "37BCE8"
INK = "172B3D"
MUTED = "526779"
PALE = "EEF6FA"
LINE = "CBD9E3"


def euro(value: int) -> str:
    return f"{value:,.0f}".replace(",", ".") + " EUR"


OFFER = {
    "agency": "WebDev Software Solutions",
    "website": "https://webdevss.tech/",
    "email": "info@webdevsoftwaresolutions.com",
    "phone_germany": "+49 172 9766016",
    "phone_bangladesh": "+880 1722 301927",
    "recipient": "ARTEMIS Standortverantwortliche Leverkusen und Opladen",
    "offer_id": "WSS ART 2026 1009",
    "date": "09.10.2026",
    "valid_until": "23.10.2026",
    "total_eur": 4950,
    "tax_note": "zzgl. gesetzlicher Umsatzsteuer, sofern anwendbar; steuerliche Behandlung vor Beauftragung bestätigen",
    "timeline": "3–4 Wochen ab Projektstart und vollständiger Bereitstellung der Freigaben und Zugänge",
    "payments": [
        {"stage": "30 % bei Beauftragung", "amount_eur": 1485},
        {"stage": "40 % nach Design- und Inhaltsfreigabe", "amount_eur": 1980},
        {"stage": "30 % nach Abnahme vor Veröffentlichung", "amount_eur": 1485},
    ],
    "items": [
        ["Projektklärung und Inhaltsinventar", 450],
        ["Webdesign und Nutzerführung", 1100],
        ["Deutsche Inhalte und Standortdaten", 750],
        ["Webentwicklung und Terminwege", 1100],
        ["Seitenstruktur und technische SEO", 650],
        ["Qualitätssicherung und Abnahme", 550],
        ["Veröffentlichung und Übergabe", 350],
    ],
    "optional_maintenance_eur_month": 95,
}


PROPOSAL = [
    ("Projektziel", [
        "Für Leverkusen und Opladen liegt ein fokussiertes Website-Konzept vor, das die häufigsten Patientenaufgaben direkt erreichbar macht: Standort wählen, Leistungen verstehen, Kontakt aufnehmen, Terminweg finden und im Notfall richtig handeln.",
        "Der nationale ARTEMIS-Auftritt bleibt die maßgebliche Unternehmensplattform. Das vorgeschlagene regionale Konzept ergänzt diese Stärke durch kurze Wege für zwei konkrete Standorte und kann nach fachlicher, rechtlicher und technischer Freigabe als Pilot umgesetzt werden.",
    ]),
    ("Management Summary", [
        "Die Entscheidungsvorlage verbindet ein fertig ausgearbeitetes Frontend mit einem klar begrenzten Einführungsprojekt. Der aktuelle lokale Produktionsbuild wurde auf 16 Routen in vier Viewportbreiten geprüft. 64 von 64 Layoutprüfungen sowie 19 von 19 Prüfungen für mobile Interaktionen und vergrößerte Schrift verliefen ohne festgestellten Fehler.",
        "Das Angebot umfasst Konzeption, deutsche Inhalte, responsive Entwicklung, technische SEO-Grundlagen, Qualitätssicherung und Übergabe. Medizinische Aussagen, Markenmaterial, Datenschutztexte, Tracking, Terminziele und Produktionszugänge werden vor Veröffentlichung von ARTEMIS freigegeben.",
    ]),
    ("Ausgangslage und Nutzen", [
        "Der bestehende ARTEMIS-Webauftritt deckt ein großes Standortnetz und ein breites medizinisches Angebot ab. Für Menschen mit einem konkreten Anliegen in Leverkusen oder Opladen entsteht dadurch ein zusätzlicher Auswahl- und Orientierungsschritt.",
        "Das regionale Konzept bündelt beide Standorte, unterscheidet ihre Leistungen und Kontaktdaten und hält relevante Aktionen am jeweiligen Inhalt bereit. So bleibt die Nutzerführung auch auf kleinen Displays verständlich.",
    ]),
    ("Gelöste Nutzerprobleme", [
        "Standortklarheit: Adresse, Telefon, Sprechzeiten, Anfahrt und Terminweg sind je Standort eindeutig zugeordnet.",
        "Mobile Bedienung: Navigation, Dialoge, Kontaktkarten und Aktionsflächen passen sich an schmale Displays und vergrößerte Schrift an.",
        "Behandlungsorientierung: Behandlungen, Augenkrankheiten, Diagnostik, Ärzte und Patienteninformationen sind getrennt auffindbar und intern verknüpft.",
        "Notfallorientierung: 116117 und 112 werden kontextbezogen erklärt; die Standortkarten bleiben auf Mobilgeräten vollständig lesbar.",
        "Datenschutzfreundliche Karte: Google Maps wird erst nach aktiver Auswahl geladen. Vorher bleibt eine klare Standort- und Routenansicht verfügbar.",
        "Wiedererkennbarkeit: Logo, Favicon, Social Links und Footer bilden einen konsistenten Abschluss auf Desktop und Mobilgeräten.",
    ]),
    ("Leistungsumfang", [
        "Responsive Website für Startseite, Standorte, Behandlungen, Augenkrankheiten, Diagnostik, Ärzte, Patienteninformationen, Notfallseite sowie Impressum und Datenschutz.",
        "Standortbezogene Kontakt- und Terminwege für Leverkusen und Opladen einschließlich Telefon, Routenlink und Sprechzeiten.",
        "Suche, mobile Navigation, Termin-Dialog, Skeleton-Ladezustand, reduzierte Bewegung und Tastaturbedienung zentraler Dialoge.",
        "Saubere URLs, Seitentitel, Beschreibungen, Canonical URLs, strukturierte Daten, Sitemap, robots.txt, Manifest und SPA-Rewrites.",
        "Click-to-load-Karten, grundlegende Sicherheitsheader, produktionsfähiger Build und dokumentierte Abnahme.",
    ]),
    ("Qualität und Prüfnachweis", [
        "Produktionsbuild, Lint-Prüfung und Diff-Prüfung wurden am 09.10.2026 erfolgreich ausgeführt.",
        "Responsive Audit: 16 Routen × 4 Breiten (320, 375, 768 und 1440 px) = 64 Prüfungen, ohne festgestellten horizontalen Überlauf, Route-Fehler oder Laufzeitfehler.",
        "Interaktionsaudit: 16 Routen bei 320 px mit vergrößerter Schrift plus mobile Navigation, Termin- und Suchdialog = 19 Prüfungen, ohne festgestellten horizontalen Überlauf.",
        "Diese Prüfungen dokumentieren den aktuellen lokalen Build. Die finale Abnahme erfolgt zusätzlich in der späteren Hosting-, Browser-, Geräte- und Inhaltsumgebung von ARTEMIS.",
    ]),
    ("Projektablauf", [
        "1. Kick-off und Verantwortlichkeiten: Vertragspartei, Ansprechpartner, Hosting, Datenschutz und Freigabeweg bestätigen.",
        "2. Inhaltsabnahme: Standortdaten, medizinische Aussagen, Ärzte, Bilder, Logos, Termin- und Notfallhinweise freigeben.",
        "3. Technische Integration: Zielsystem, Domain, Formulare, Tracking und Terminziele konfigurieren.",
        "4. Abnahmerunde: ARTEMIS prüft Inhalte und Funktionen; vereinbarte Korrekturen werden eingearbeitet.",
        "5. Veröffentlichung und Übergabe: Go-live nach schriftlicher Freigabe, Übergabedokumentation und Sicherung des freigegebenen Stands.",
    ]),
    ("Abnahmekriterien", [
        "Alle vereinbarten Seiten und Navigationseinträge sind erreichbar; interne Links und Standortaktionen führen zum freigegebenen Ziel.",
        "Leverkusen und Opladen zeigen die schriftlich bestätigten Adressen, Telefonangaben, Sprechzeiten und Terminwege.",
        "Die freigegebenen Kernabläufe funktionieren in den vereinbarten aktuellen Browsern und auf den festgelegten Referenzbreiten.",
        "Impressum, Datenschutz, Consent, Tracking und medizinische Inhalte wurden durch die zuständigen ARTEMIS-Stellen freigegeben.",
        "Keine offenen Fehler der vereinbarten Priorität verhindern Veröffentlichung oder Kernaufgaben.",
    ]),
    ("Verantwortlichkeiten und Annahmen", [
        "ARTEMIS stellt verbindliche Inhalte, Markenfreigaben, Bildrechte, rechtliche Texte, Terminziele sowie Hosting- und Domainzugänge bereit.",
        "WebDev Software Solutions setzt den beschriebenen Umfang um, dokumentiert Prüfungen und behebt reproduzierbare Abweichungen innerhalb des vereinbarten Umfangs.",
        "Nicht enthalten sind medizinische oder rechtliche Beratung, externe Lizenzkosten, Hostinggebühren, kostenpflichtige Dienste, umfangreiche CMS-Migration, Mehrsprachigkeit und nachträglich erweiterter Funktionsumfang.",
    ]),
    ("Optionale Betreuung", [
        "Wartung und kleine Inhaltsanpassungen können nach Veröffentlichung für 95 EUR pro Monat vereinbart werden. Enthaltene Stunden, Reaktionszeiten und technische Zuständigkeiten werden vor Abschluss in einer separaten Leistungsbeschreibung festgehalten.",
    ]),
]

COMPARE_ROWS = [
    ["Thema", "Bestehende nationale Plattform", "Regionales Konzept Leverkusen und Opladen"],
    ["Aufgabe", "Unternehmensweite Information und Standortnetz", "Direkte Orientierung für zwei konkrete Standorte"],
    ["Einstieg", "Breites Leistungs- und Standortangebot", "Leverkusen, Opladen und häufige Patientenwege im ersten Blick"],
    ["Kontakt", "Standortsuche führt zu den jeweiligen Detailseiten", "Telefon, Adresse, Sprechzeit, Route und Terminweg am relevanten Inhalt"],
    ["Mobil", "Unternehmensweite Navigation mit umfangreicher Tiefe", "Kompakte Navigation und geprüfte Kontaktkarten ab 320 px"],
    ["Karte", "Externe Kartenfunktionen im Standortkontext", "Click-to-load mit vorher sichtbarer Adresse und Routenlink"],
    ["Technik", "Zentrale Plattform und bestehende Systemlandschaft", "Saubere Slugs, Canonical, strukturierte Daten, Sitemap und Sicherheitsheader"],
    ["Rolle", "Verbindlicher ARTEMIS-Hauptauftritt", "Freigabepflichtiger regionaler Pilot und möglicher Ergänzungsbaustein"],
]


def set_cell_shading(cell, fill: str):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = tcPr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tcPr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_margins(cell, top=100, start=110, bottom=100, end=110):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = tcPr.first_child_found_in("w:tcMar")
    if tcMar is None:
        tcMar = OxmlElement("w:tcMar")
        tcPr.append(tcMar)
    for m, v in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tcMar.find(qn(f"w:{m}"))
        if node is None:
            node = OxmlElement(f"w:{m}")
            tcMar.append(node)
        node.set(qn("w:w"), str(v)); node.set(qn("w:type"), "dxa")


def add_doc_header(section):
    header = section.header
    p = header.paragraphs[0]
    p.text = "WEBDEV SOFTWARE SOLUTIONS  |  ARTEMIS LEVERKUSEN UND OPLADEN"
    p.style = "Caption"
    p.runs[0].font.color.rgb = RGBColor.from_string(MUTED)
    p.runs[0].font.size = Pt(8)
    footer = section.footer
    p = footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.add_run("WebDev Software Solutions  •  WSS ART 2026 1009  •  ")
    fld = OxmlElement("w:fldSimple"); fld.set(qn("w:instr"), "PAGE")
    p._p.append(fld)
    for r in p.runs:
        r.font.size = Pt(8); r.font.color.rgb = RGBColor.from_string(MUTED)


def setup_doc(title: str, subtitle: str) -> Document:
    doc = Document()
    sec = doc.sections[0]
    sec.top_margin = Cm(1.8); sec.bottom_margin = Cm(1.7)
    sec.left_margin = Cm(2.0); sec.right_margin = Cm(2.0)
    add_doc_header(sec)
    styles = doc.styles
    normal = styles["Normal"]
    normal.font.name = "Aptos"; normal.font.size = Pt(10); normal.font.color.rgb = RGBColor.from_string(INK)
    normal.paragraph_format.space_after = Pt(6); normal.paragraph_format.line_spacing = 1.12
    for name, size in (("Title", 28), ("Heading 1", 18), ("Heading 2", 13)):
        s = styles[name]; s.font.name = "Aptos Display"; s.font.size = Pt(size); s.font.bold = True; s.font.color.rgb = RGBColor(0, 0, 0)
    styles["Heading 1"].paragraph_format.space_before = Pt(14)
    styles["Heading 1"].paragraph_format.space_after = Pt(7)
    styles["Heading 2"].paragraph_format.space_before = Pt(10)
    styles["Heading 2"].paragraph_format.space_after = Pt(5)
    if LOGO.exists():
        p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p.add_run().add_picture(str(LOGO), width=Inches(1.65))
    p = doc.add_paragraph(title, style="Title"); p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p = doc.add_paragraph(subtitle); p.style = "Subtitle"
    p.runs[0].font.color.rgb = RGBColor.from_string(NAVY)
    p = doc.add_paragraph(f"Angebotsnummer {OFFER['offer_id']}  |  Stand {OFFER['date']}  |  Gültig bis {OFFER['valid_until']}")
    p.runs[0].bold = True; p.runs[0].font.color.rgb = RGBColor.from_string(BLUE)
    return doc


def add_bullets_doc(doc, lines):
    for line in lines:
        p = doc.add_paragraph(style="List Bullet")
        p.add_run(line)


def add_price_table_doc(doc):
    doc.add_heading("Investition", 1)
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER; table.style = "Table Grid"
    hdr = table.rows[0].cells
    hdr[0].text = "Leistung"; hdr[1].text = "Betrag"
    for cell in hdr:
        set_cell_shading(cell, NAVY)
        for r in cell.paragraphs[0].runs: r.font.bold = True; r.font.color.rgb = RGBColor(255,255,255)
    for idx, (name, amount) in enumerate(OFFER["items"]):
        cells = table.add_row().cells; cells[0].text = name; cells[1].text = euro(amount)
        cells[1].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT
        if idx % 2 == 0:
            for c in cells: set_cell_shading(c, PALE)
    cells = table.add_row().cells; cells[0].text = "Gesamt"; cells[1].text = euro(OFFER["total_eur"])
    for c in cells: set_cell_shading(c, "DCEEF7")
    for c in cells:
        for r in c.paragraphs[0].runs: r.font.bold = True
    cells[1].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT
    for row in table.rows:
        for c in row.cells: c.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER; set_cell_margins(c)
    p = doc.add_paragraph(OFFER["tax_note"]); p.runs[0].italic = True
    doc.add_heading("Zahlungsplan", 2)
    for item in OFFER["payments"]:
        doc.add_paragraph(f"{item['stage']}: {euro(item['amount_eur'])}", style="List Bullet")
    doc.add_paragraph(f"Voraussichtliche Dauer: {OFFER['timeline']}.")


def proposal_docx(path: Path):
    doc = setup_doc("Projektangebot", "Regionale Website für ARTEMIS Leverkusen und Opladen")
    doc.add_paragraph("Entscheidungsvorlage für eine fokussierte, mobile und freigabefähige Patient Journey.")
    for heading, paragraphs in PROPOSAL:
        doc.add_heading(heading, 1)
        if heading in {"Gelöste Nutzerprobleme", "Leistungsumfang", "Qualität und Prüfnachweis", "Projektablauf", "Abnahmekriterien", "Verantwortlichkeiten und Annahmen"}:
            add_bullets_doc(doc, paragraphs)
        else:
            for text in paragraphs: doc.add_paragraph(text)
        if heading == "Management Summary":
            doc.add_heading("Entscheidung", 2)
            doc.add_paragraph("Freigabe des beschriebenen Pilotprojekts zu 4.950 EUR und Benennung der fachlichen, rechtlichen und technischen Ansprechpartner.")
    add_price_table_doc(doc)
    doc.add_heading("Gültigkeit und Beauftragung", 1)
    doc.add_paragraph(f"Dieses Angebot ist bis {OFFER['valid_until']} gültig. Änderungen an Umfang, Zielsystem oder Integrationen werden vor Umsetzung schriftlich bewertet und angeboten.")
    doc.add_paragraph("Auftraggeber / Vertragspartei: ______________________________________________")
    doc.add_paragraph("Name und Funktion: ________________________________________________________")
    doc.add_paragraph("Ort, Datum und Unterschrift: _______________________________________________")
    doc.add_heading("Kontakt", 1)
    doc.add_paragraph(f"{OFFER['agency']}\n{OFFER['website']}\n{OFFER['email']}\nDeutschland {OFFER['phone_germany']}  |  Bangladesh {OFFER['phone_bangladesh']}")
    doc.core_properties.title = "Projektangebot ARTEMIS Leverkusen und Opladen"
    doc.core_properties.author = OFFER["agency"]
    doc.save(path)


def comparison_docx(path: Path):
    doc = setup_doc("Managementvergleich", "Nationaler ARTEMIS-Auftritt und regionales Zwei-Standorte-Konzept")
    doc.add_heading("Einordnung", 1)
    doc.add_paragraph("Der Vergleich bewertet unterschiedliche Aufgaben. Der bestehende Webauftritt vermittelt die Breite der ARTEMIS-Gruppe. Das regionale Konzept verdichtet die wichtigsten Patientenwege für Leverkusen und Opladen.")
    table = doc.add_table(rows=1, cols=3); table.style = "Table Grid"; table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for j, value in enumerate(COMPARE_ROWS[0]):
        table.rows[0].cells[j].text = value; set_cell_shading(table.rows[0].cells[j], NAVY)
        for r in table.rows[0].cells[j].paragraphs[0].runs: r.font.bold=True; r.font.color.rgb=RGBColor(255,255,255)
    for i, row in enumerate(COMPARE_ROWS[1:]):
        cells=table.add_row().cells
        for j,value in enumerate(row): cells[j].text=value
        if i%2==0:
            for c in cells: set_cell_shading(c, PALE)
    for row in table.rows:
        for c in row.cells: set_cell_margins(c, 80, 80, 80, 80); c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.TOP
    doc.add_heading("Messbarer Entwicklungsstand", 1)
    add_bullets_doc(doc, [
        "64 von 64 responsive Layoutprüfungen ohne festgestellten Fehler.",
        "19 von 19 Prüfungen für mobile Interaktion und vergrößerte Schrift ohne festgestellten Fehler.",
        "Produktionsbuild, Lint-Prüfung und Diff-Prüfung erfolgreich.",
        "Produktionsfreigabe bleibt abhängig von ARTEMIS-Inhalts-, Rechts-, Marken- und Systemfreigaben.",
    ])
    doc.add_heading("Empfohlene Entscheidung", 1)
    doc.add_paragraph("Den regionalen Aufbau als klar abgegrenzten Pilot freigeben, Verantwortlichkeiten benennen und den finalen Integrations- und Abnahmelauf im ARTEMIS-Zielsystem starten.")
    doc.add_heading("Quellenbasis", 1)
    doc.add_paragraph("Öffentlicher ARTEMIS-Hauptauftritt und die Standortseiten Leverkusen und Opladen, geprüft am 09.10.2026. Der Vergleich enthält keine Aussage über interne Kennzahlen, Conversion oder Systemqualität.")
    doc.save(path)


def pdf_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("TitleX", parent=base["Title"], fontName="Helvetica-Bold", fontSize=25, leading=29, textColor=colors.HexColor("#12365B"), spaceAfter=8),
        "sub": ParagraphStyle("Sub", parent=base["Normal"], fontName="Helvetica", fontSize=12, leading=16, textColor=colors.HexColor("#526779"), spaceAfter=14),
        "h1": ParagraphStyle("H1X", parent=base["Heading1"], fontName="Helvetica-Bold", fontSize=15, leading=18, textColor=colors.HexColor("#12365B"), spaceBefore=10, spaceAfter=7),
        "h2": ParagraphStyle("H2X", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=colors.HexColor("#008FC9"), spaceBefore=7, spaceAfter=5),
        "body": ParagraphStyle("BodyX", parent=base["BodyText"], fontName="Helvetica", fontSize=9.3, leading=13.2, textColor=colors.HexColor("#172B3D"), spaceAfter=6),
        "bullet": ParagraphStyle("BulletX", parent=base["BodyText"], fontName="Helvetica", fontSize=9.1, leading=12.7, leftIndent=12, firstLineIndent=-7, bulletIndent=3, textColor=colors.HexColor("#172B3D"), spaceAfter=4),
        "small": ParagraphStyle("SmallX", parent=base["BodyText"], fontName="Helvetica", fontSize=7.5, leading=10, textColor=colors.HexColor("#526779")),
        "meta": ParagraphStyle("MetaX", parent=base["BodyText"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=colors.HexColor("#008FC9"), spaceAfter=12),
    }


def pdf_template(path: Path, title: str):
    doc = BaseDocTemplate(str(path), pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=20*mm, bottomMargin=18*mm, title=title, author=OFFER["agency"])
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    def page(canvas, document):
        canvas.saveState(); canvas.setStrokeColor(colors.HexColor("#CBD9E3")); canvas.setLineWidth(.5)
        canvas.line(18*mm, A4[1]-14*mm, A4[0]-18*mm, A4[1]-14*mm)
        canvas.setFont("Helvetica", 7.5); canvas.setFillColor(colors.HexColor("#526779"))
        canvas.drawString(18*mm, A4[1]-10.5*mm, "WEBDEV SOFTWARE SOLUTIONS  |  ARTEMIS LEVERKUSEN UND OPLADEN")
        canvas.drawString(18*mm, 9*mm, f"{OFFER['offer_id']}  |  {OFFER['email']}")
        canvas.drawRightString(A4[0]-18*mm, 9*mm, f"Seite {document.page}")
        canvas.restoreState()
    doc.addPageTemplates(PageTemplate(id="clean", frames=[frame], onPage=page))
    return doc


def logo_story(width=32*mm):
    return Image(str(LOGO), width=width, height=width*0.76) if LOGO.exists() else Spacer(1, 1)


def title_story(title, subtitle, styles):
    return [Table([["", logo_story()]], colWidths=[130*mm, 32*mm], style=TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"), ("ALIGN",(1,0),(1,0),"RIGHT")])) ,
            Paragraph(title, styles["title"]), Paragraph(subtitle, styles["sub"]), Paragraph(f"Angebotsnummer {OFFER['offer_id']}  |  Stand {OFFER['date']}  |  Gültig bis {OFFER['valid_until']}", styles["meta"])]


def bullet_pdf(text, styles):
    return Paragraph("•  " + text, styles["bullet"])


def proposal_pdf(path: Path):
    s=pdf_styles(); story=title_story("Projektangebot", "Regionale Website für ARTEMIS Leverkusen und Opladen", s)
    story += [Paragraph("Entscheidungsvorlage für eine fokussierte, mobile und freigabefähige Patient Journey.", s["body"]), Spacer(1,5*mm)]
    for heading, paras in PROPOSAL:
        story.append(Paragraph(heading, s["h1"]))
        if heading in {"Gelöste Nutzerprobleme", "Leistungsumfang", "Qualität und Prüfnachweis", "Projektablauf", "Abnahmekriterien", "Verantwortlichkeiten und Annahmen"}:
            story.extend(bullet_pdf(p,s) for p in paras)
        else: story.extend(Paragraph(p,s["body"]) for p in paras)
        if heading == "Management Summary":
            story += [Paragraph("Entscheidung", s["h2"]), Paragraph("Freigabe des beschriebenen Pilotprojekts zu 4.950 EUR und Benennung der fachlichen, rechtlichen und technischen Ansprechpartner.", s["body"])]
    story += [Paragraph("Investition", s["h1"])]
    data=[[Paragraph("Leistung",s["small"]),Paragraph("Betrag",s["small"])]] + [[Paragraph(n,s["small"]),Paragraph(euro(a),s["small"])] for n,a in OFFER["items"]] + [[Paragraph("<b>Gesamt</b>",s["small"]),Paragraph("<b>"+euro(OFFER["total_eur"])+"</b>",s["small"])]]
    table=Table(data,colWidths=[125*mm,37*mm],repeatRows=1)
    table.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),colors.HexColor("#12365B")),("TEXTCOLOR",(0,0),(-1,0),colors.white),("BACKGROUND",(0,-1),(-1,-1),colors.HexColor("#DCEEF7")),("GRID",(0,0),(-1,-1),.35,colors.HexColor("#CBD9E3")),("VALIGN",(0,0),(-1,-1),"TOP"),("ALIGN",(1,1),(1,-1),"RIGHT"),("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)]))
    story += [table, Paragraph(OFFER["tax_note"], s["small"]), Paragraph("Zahlungsplan",s["h2"])]
    story.extend(bullet_pdf(f"{i['stage']}: {euro(i['amount_eur'])}",s) for i in OFFER["payments"])
    story += [Paragraph(f"Voraussichtliche Dauer: {OFFER['timeline']}.",s["body"]), Paragraph("Gültigkeit und Beauftragung",s["h1"]), Paragraph(f"Dieses Angebot ist bis {OFFER['valid_until']} gültig. Änderungen an Umfang, Zielsystem oder Integrationen werden vor Umsetzung schriftlich bewertet und angeboten.",s["body"]), Spacer(1,2*mm), Paragraph("Auftraggeber / Vertragspartei: __________________________________________",s["body"]), Paragraph("Name und Funktion: _________________________________________________",s["body"]), Paragraph("Ort, Datum und Unterschrift: ________________________________________",s["body"])]
    pdf_template(path,"Projektangebot ARTEMIS Leverkusen und Opladen").build(story)


def comparison_pdf(path: Path):
    s=pdf_styles(); story=title_story("Managementvergleich","Nationaler ARTEMIS-Auftritt und regionales Zwei-Standorte-Konzept",s)
    story += [Paragraph("Einordnung",s["h1"]),Paragraph("Der Vergleich bewertet unterschiedliche Aufgaben. Der bestehende Webauftritt vermittelt die Breite der ARTEMIS-Gruppe. Das regionale Konzept verdichtet die wichtigsten Patientenwege für Leverkusen und Opladen.",s["body"])]
    data=[]
    for i,row in enumerate(COMPARE_ROWS): data.append([Paragraph(("<b>"+v+"</b>") if i==0 else v,s["small"]) for v in row])
    t=Table(data,colWidths=[30*mm,65*mm,67*mm],repeatRows=1)
    cmds=[("BACKGROUND",(0,0),(-1,0),colors.HexColor("#12365B")),("TEXTCOLOR",(0,0),(-1,0),colors.white),("GRID",(0,0),(-1,-1),.35,colors.HexColor("#CBD9E3")),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]
    for i in range(1,len(data)):
        if i%2==1: cmds.append(("BACKGROUND",(0,i),(-1,i),colors.HexColor("#EEF6FA")))
    t.setStyle(TableStyle(cmds)); story += [t, Paragraph("Messbarer Entwicklungsstand",s["h1"])]
    for x in ["64 von 64 responsive Layoutprüfungen ohne festgestellten Fehler.","19 von 19 Prüfungen für mobile Interaktion und vergrößerte Schrift ohne festgestellten Fehler.","Produktionsbuild, Lint-Prüfung und Diff-Prüfung erfolgreich.","Produktionsfreigabe bleibt abhängig von ARTEMIS-Inhalts-, Rechts-, Marken- und Systemfreigaben."]: story.append(bullet_pdf(x,s))
    story += [Paragraph("Empfohlene Entscheidung",s["h1"]),Paragraph("Den regionalen Aufbau als klar abgegrenzten Pilot freigeben, Verantwortlichkeiten benennen und den finalen Integrations- und Abnahmelauf im ARTEMIS-Zielsystem starten.",s["body"]),Paragraph("Quellenbasis",s["h1"]),Paragraph("Öffentlicher ARTEMIS-Hauptauftritt und die Standortseiten Leverkusen und Opladen, geprüft am 09.10.2026. Der Vergleich enthält keine Aussage über interne Kennzahlen, Conversion oder Systemqualität.",s["body"])]
    pdf_template(path,"Managementvergleich ARTEMIS").build(story)


def write_support_files():
    (SEND/"03_Anschreiben_und_E_Mails_DE.txt").write_text("""BETREFF: Regionales Website-Konzept für ARTEMIS Leverkusen und Opladen\n\nSehr geehrte Damen und Herren,\n\nwir übersenden Ihnen ein ausgearbeitetes Konzept für einen fokussierten regionalen Webauftritt der Standorte Leverkusen und Opladen. Es ergänzt die Reichweite der nationalen ARTEMIS-Plattform durch kurze Patientenwege zu Standort, Leistung, Kontakt, Termin und Notfallinformation.\n\nDer aktuelle Produktionsbuild wurde auf 16 Routen und vier Referenzbreiten sowie mit mobilen Interaktionen und vergrößerter Schrift geprüft. Die Details, Abnahmekriterien und das Angebot über 4.950 EUR finden Sie in den Anlagen.\n\nAls nächsten Schritt schlagen wir einen 30-minütigen Entscheidungstermin vor, um Vertragspartei, Verantwortlichkeiten, Zielsystem und Freigabeweg festzulegen.\n\nMit freundlichen Grüßen\nWebDev Software Solutions\ninfo@webdevsoftwaresolutions.com\n+49 172 9766016\n\n--- KURZE VERSION ---\n\nBetreff: Entscheidungsvorlage Leverkusen und Opladen\n\nGuten Tag,\n\nim Anhang erhalten Sie die kompakte Entscheidungsvorlage und das vollständige Angebot für den regionalen ARTEMIS-Webauftritt Leverkusen und Opladen. Das Konzept verkürzt die wichtigsten Patientenwege und ist technisch bis zur finalen ARTEMIS-Freigabe vorbereitet.\n\nKönnen wir die offenen Zuständigkeiten und den Freigabeweg in einem 30-minütigen Termin abstimmen?\n\nFreundliche Grüße\nWebDev Software Solutions\n\n--- FOLLOW-UP NACH 5 WERKTAGEN ---\n\nBetreff: Rückfrage zur Entscheidungsvorlage Leverkusen und Opladen\n\nGuten Tag,\n\nich möchte kurz nachfragen, ob Sie die Unterlagen prüfen konnten. Für den Projektstart benötigen wir vor allem die zuständige Vertragspartei, die fachliche und rechtliche Freigabe sowie das vorgesehene Zielsystem. Gerne gehen wir diese Punkte gemeinsam in 30 Minuten durch.\n\nFreundliche Grüße\nWebDev Software Solutions\n""",encoding="utf-8")
    (INTERNAL/"04_Praesentation_12_Minuten_DE.md").write_text("""# Präsentation in 12 Minuten\n\n## 0 bis 2 Minuten Ausgangslage\nDer nationale ARTEMIS-Auftritt erfüllt eine breite Unternehmensaufgabe. Der regionale Pilot konzentriert sich auf zwei Standorte und die Aufgaben, mit denen Patienten typischerweise ankommen.\n\n## 2 bis 5 Minuten Nutzerführung\nZeigen Sie Startseite, Standortwahl, Leistungssuche und die mobilen Kontaktkarten. Betonen Sie die eindeutige Zuordnung von Telefon, Sprechzeit, Route und Terminweg.\n\n## 5 bis 7 Minuten Vertrauen und Sicherheit\nZeigen Sie Notfallseite, klare 116117- und 112-Hinweise, Qualitätsbereich, Datenschutzlinks und die Karte, die erst nach Auswahl geladen wird.\n\n## 7 bis 9 Minuten Technischer Stand\nNennen Sie die 64 bestandenen responsive Prüfungen, 19 bestandenen Interaktionsprüfungen, saubere URLs, Metadaten, strukturierte Daten, Sitemap, Rewrites und Sicherheitsheader. Keine Conversion- oder Performancewerte behaupten.\n\n## 9 bis 11 Minuten Angebot\n4.950 EUR, 3 bis 4 Wochen nach vollständigen Freigaben und Zugängen, Zahlungsplan 30/40/30. Die genauen Leistungen und Abnahmekriterien im Angebot zeigen.\n\n## 11 bis 12 Minuten Abschlussfrage\nKönnen wir den regionalen Aufbau als Pilot freigeben und heute die fachliche, rechtliche sowie technische Verantwortung benennen?\n""",encoding="utf-8")
    (INTERNAL/"05_Einwandbehandlung_DE.md").write_text("""# Einwandbehandlung\n\n## Wir haben bereits eine Website\nRichtig. Das Konzept ersetzt den nationalen Auftritt nicht automatisch. Es zeigt einen fokussierten regionalen Weg für Leverkusen und Opladen und kann als Pilot oder als Integrationsvorlage dienen.\n\n## Warum ist der Preis 4.950 EUR\nDer Preis umfasst Konzeption, Design, deutsche Inhalte, responsive Entwicklung, technische SEO-Grundlagen, QA, Abnahme und Übergabe. Die Einzelpositionen stehen im Angebot.\n\n## Können Sie bessere Conversion garantieren\nNein. Ohne freigegebenes Tracking und belastbare Vergleichsdaten wäre eine Garantie nicht seriös. Wir liefern klare Patientenwege und definieren auf Wunsch vor dem Go-live messbare Ziele.\n\n## Ist die Website vollständig barrierefrei\nDer aktuelle Stand berücksichtigt Reflow, vergrößerte Schrift, reduzierte Bewegung, Beschriftungen und Tastaturbedienung zentraler Dialoge. Eine formale BITV- oder WCAG-Konformitätsprüfung ist nicht Bestandteil dieses Angebots und müsste separat beauftragt werden.\n\n## Ist alles rechtssicher\nRechtstexte, Consent, Tracking, medizinische Aussagen und Markenverwendung müssen von den zuständigen ARTEMIS-Stellen freigegeben werden. WebDev Software Solutions erbringt keine Rechts- oder Medizinberatung.\n\n## Kann sofort veröffentlicht werden\nDer lokale Produktionsbuild ist technisch vorbereitet. Vor Go-live fehlen die ARTEMIS-Freigaben, die Zielsystem- und Domainentscheidung, Produktionszugänge und der finale Abnahmelauf.\n\n## Können Änderungen später erfolgen\nJa. Änderungen innerhalb des vereinbarten Umfangs laufen über die Abnahme. Erweiterungen werden vor Umsetzung bewertet und angeboten. Optional ist Betreuung ab 95 EUR pro Monat vorgesehen.\n""",encoding="utf-8")
    (INTERNAL/"06_Quellen_und_Fakten_DE.md").write_text("""# Quellen und Fakten\n\nStand 09.10.2026\n\n## Öffentliche Primärquellen\n- ARTEMIS Hauptauftritt: https://www.artemiskliniken.de/\n- ARTEMIS Augen- und Laserzentrum Leverkusen: https://www.artemiskliniken.de/standorte/artemis-augenzentrum-leverkusen/\n- ARTEMIS Augenarzt-Praxis Opladen: https://www.artemiskliniken.de/standorte/artemis-augenarzt-praxis-opladen/\n\n## Interne Prüfnachweise\n- 16 Routen in 320, 375, 768 und 1440 px: 64 Prüfungen, keine gemeldeten Fehler.\n- 16 Routen bei 320 px mit vergrößerter Schrift plus mobile Navigation, Termin- und Suchdialog: 19 Prüfungen, keine gemeldeten Fehler.\n- Produktionsbuild, Lint und Diff-Prüfung erfolgreich.\n\n## Formulierungsgrenzen\n- Keine Behauptung, die bestehende ARTEMIS-Website sei schlecht oder fehlerhaft.\n- Keine erfundenen Conversion-, Umsatz-, Ladezeit- oder SEO-Ergebnisse.\n- Keine Garantie vollständiger Fehlerfreiheit oder rechtlicher beziehungsweise medizinischer Konformität.\n- Standort- und Leistungsangaben vor Veröffentlichung schriftlich bestätigen lassen.\n""",encoding="utf-8")
    (INTERNAL/"07_Produktions_und_Abnahmecheck_DE.md").write_text("""# Produktions- und Abnahmecheck\n\n## Vertrag und Verantwortung\n- [ ] Rechtliche Vertragspartei und Rechnungsadresse bestätigt\n- [ ] Fachlicher, rechtlicher, Datenschutz- und Technikansprechpartner benannt\n- [ ] Preis, Steuerbehandlung, Zahlungsplan und Laufzeit freigegeben\n\n## Inhalt und Marke\n- [ ] Adressen, Telefonnummern, Sprechzeiten und Terminziele bestätigt\n- [ ] Leistungen, Ärzte, Notfallhinweise und medizinische Aussagen freigegeben\n- [ ] Logos, Bilder, Qualitätszeichen und Social Links zur Nutzung freigegeben\n- [ ] Impressum, Datenschutz, Consent und Tracking schriftlich freigegeben\n\n## Technik\n- [ ] Domain, Hosting, CMS oder Integrationsziel festgelegt\n- [ ] Produktionszugänge sicher übergeben\n- [ ] Formulare, E-Mail-Ziele, Terminlinks und Karten geprüft\n- [ ] Canonical Domain, Sitemap, robots.txt und Redirects finalisiert\n- [ ] Security Header und externe Ressourcen im Zielsystem geprüft\n\n## Abnahme\n- [ ] Aktuelle Browser und vereinbarte Geräte geprüft\n- [ ] Kernwege Standort, Termin, Kontakt, Suche und Notfall abgenommen\n- [ ] Keine offenen Fehler der vereinbarten Veröffentlichungspriorität\n- [ ] Backup und Rollback-Verantwortung festgelegt\n- [ ] Schriftliche Go-live-Freigabe liegt vor\n\n## Nach Veröffentlichung\n- [ ] Erreichbarkeit, Indexierung, Formulare und Terminziele geprüft\n- [ ] Monitoring, Analytics und Einwilligung geprüft, sofern beauftragt\n- [ ] Ansprechpartner für Betrieb und Änderungen dokumentiert\n""",encoding="utf-8")
    (OUT/"START_HERE_BN.md").write_text("""# Client submission guide\n\n## Client-ke je file gulo pathaben\n1. `CLIENT_SEND/01_ARTEMIS_Projektangebot_DE.pdf`\n2. `CLIENT_SEND/02_ARTEMIS_Management_Vergleich_DE.pdf`\n3. `CLIENT_SEND/03_Anschreiben_und_E_Mails_DE.txt` theke prothom email text\n\n## Pathanor age obossoi confirm korun\n- WebDev Software Solutions-er legal name, billing address o tax treatment\n- ARTEMIS-er contracting entity, recipient name o designation\n- 4.950 EUR price, 30/40/30 payment plan, validity date\n- Hosting, domain/CMS, content, legal, medical o brand approval owner\n\n## Meeting-e ki bolben\nNational website-ke kharap bolben na. Bolben, national platform-er broad role ache; ei regional concept Leverkusen o Opladen-er patient journey short o clear kore. Verified QA result hisebe 64 responsive check ebong 19 interaction check pass mention korte paren. Conversion, revenue, speed score ba 100% bug-free claim korben na.\n\n## Internal file\n`INTERNAL` folder-er presentation, objection response, source sheet o production checklist client call-er preparation-er jonno.\n""",encoding="utf-8")


def main():
    if OUT.exists(): shutil.rmtree(OUT)
    SEND.mkdir(parents=True); EDIT.mkdir(); INTERNAL.mkdir()
    proposal_docx(EDIT/"01_Project_Proposal_Editable_German.docx")
    comparison_docx(EDIT/"02_Management_Comparison_Editable_German.docx")
    proposal_pdf(SEND/"01_Project_Proposal_German.pdf")
    comparison_pdf(SEND/"02_Management_Comparison_German.pdf")
    (EDIT/"Quotation_Data.json").write_text(json.dumps(OFFER,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    write_support_files()
    generated_name_map = {
        SEND/"03_Anschreiben_und_E_Mails_DE.txt": SEND/"03_Client_Email_Templates_German.txt",
        INTERNAL/"04_Praesentation_12_Minuten_DE.md": INTERNAL/"04_Presentation_12_Minutes_German.md",
        INTERNAL/"05_Einwandbehandlung_DE.md": INTERNAL/"05_Client_Objection_Responses_German.md",
        INTERNAL/"06_Quellen_und_Fakten_DE.md": INTERNAL/"06_Sources_and_Verified_Facts_German.md",
        INTERNAL/"07_Produktions_und_Abnahmecheck_DE.md": INTERNAL/"07_Production_and_Acceptance_Checklist_German.md",
    }
    for old_path, new_path in generated_name_map.items():
        old_path.rename(new_path)
    (OUT/"START_HERE_BN.md").unlink(missing_ok=True)
    (OUT/"README_BN.md").write_text(
        "# ARTEMIS client delivery\n\n"
        "Ei folder-e sudhu latest verified client delivery rakha hoyeche. Purono version ba duplicate package nei.\n\n"
        "## Folder structure\n\n"
        "- `01_CLIENT_READY` — Client-ke pathanor final PDF o email copy\n"
        "- `02_EDITABLE_SOURCE` — Nijer jonno editable DOCX o quotation data\n"
        "- `03_INTERNAL_SUPPORT` — Meeting, objection handling, source o production checklist\n\n"
        "## Client-ke ja pathaben\n\n"
        "1. `01_CLIENT_READY/01_ARTEMIS_Projektangebot_DE.pdf`\n"
        "2. `01_CLIENT_READY/02_ARTEMIS_Management_Vergleich_DE.pdf`\n"
        "3. `01_CLIENT_READY/03_Anschreiben_und_E_Mails_DE.txt` theke prothom email text\n",
        encoding="utf-8",
    )
    files=sorted(p.relative_to(OUT).as_posix() for p in OUT.rglob("*") if p.is_file())
    (OUT/"File_List.txt").write_text("\n".join(files)+"\n",encoding="utf-8")
    print(json.dumps({"output":str(OUT),"files":len(list(OUT.rglob('*')))},indent=2))


if __name__ == "__main__": main()
