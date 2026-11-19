<div align="center">

# 🌐 ComfyUI-Global-Translation

**Mehrsprachige Übersetzung der ComfyUI-Oberfläche**

> Ergänzt Übersetzungen für Knoten, Blueprints und Workflow-Subgraphen, Menüs, Einstellungen und Oberflächen von Drittanbieter-Knoten in der in ComfyUI gewählten Sprache.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.5.3-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Language packs](https://img.shields.io/badge/language%20packs-15-8a2be2)](#verwendung)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 语言 · Language

[简体中文](README.md) · [English](README.en-US.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · **Deutsch** · [Español](README.es-ES.md) · [Italiano](README.it-IT.md) · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · [Türkçe](README.tr-TR.md) · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Autor: **猪的飞行梦** — Dieses Projekt ist eine auf [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) und [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation) basierende Modifikation. Besonderer Dank an diese Autoren für ihren herausragenden Beitrag zur Open-Source-Community. Dieses Projekt bleibt Open Source.

</div>

---

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Hauptfunktionen](#hauptfunktionen)
- [Vorschau](#vorschau)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Abdeckung der Übersetzung](#abdeckung-der-übersetzung)
- [Architektur](#architektur)
- [Hinweise](#hinweise)
- [Änderungsverlauf](#änderungsverlauf)
- [Community und Unterstützung](#community-und-unterstützung)
- [Lizenz](#lizenz)
- [Haftungsausschluss](#haftungsausschluss)

---

## Überblick

ComfyUI-Global-Translation ist ein Plugin zur mehrsprachigen Übersetzung der Benutzeroberfläche. Es folgt der Spracheinstellung in ComfyUI (Einstellungen → Allgemein → `Comfy.Locale`) und ergänzt Übersetzungen für Knoten, Menüs, das Einstellungsfenster, den Manager und die Oberflächen von Drittanbieter-Knoten. Auch Oberflächentexte, die Drittanbieter-Knoten dynamisch aktualisieren, werden übersetzt. Der Übersetzungsumfang richtet sich nach dem Wörterbuch der jeweils gewählten Sprache.

### Warum dieses Plugin?

| Funktion | Dieses Plugin | Andere Übersetzungs-Plugins |
|------|--------|-------------|
| Kompatibel mit offizieller Übersetzung | ✅ Ergänzt Oberflächenübersetzungen in der gewählten ComfyUI-Sprache | ❌ Möglichweise Konflikte |
| Rechtsklick-Menü-Funktionen | ✅ Nach Übersetzung weiterhin funktionsfähig | ❌ Einige Funktionen brechen |
| Kompatibel mit alter & neuer UI | ✅ Doppelte Schaltflächen-Architektur | ❌ Nur eine Version |
| Übersetzung umschalten | ✅ Beim Umschalten wird die Seite neu geladen | — |
| Schutz benutzerdefinierter Titel | ✅ Überschreibt keine Benutzeränderungen | ❌ Könnte überschrieben werden |

---

## Hauptfunktionen

### 🎯 Intelligentes Übersetzungssystem

- **Intelligente Erkennung** — erkennt automatisch bereits übersetzten Text und vermeidet doppelte Übersetzung und unendliche Rekursion
- **Native Kompatibilität** — besteht friedlich neben der offiziellen ComfyUI-Übersetzung ohne gegenseitige Störung
- **Kontextbewusstsein** — wendet je nach Elementtyp (Knoten, Menüs, Widgets usw.) die passende Strategie an
- **Übersetzungsdaten zusammenführen** — Einträge für denselben Knoten werden feldweise zusammengeführt. Ist das Plugin eines Knotens bekannt, hat dessen Wörterbuch Vorrang.
- **Benutzerdefinierte Panels** — Übersetzt Schaltflächen, Beschriftungen, Platzhalter und Pop-ups in Knoten-Panels.
- **Rechtsklickmenüs** — Zeigt übersetzte Beschriftungen an. Aktionen wie Trennen und Umbenennen verwenden die ursprünglichen Einträge und Werte.

### 🎨 Ansprechende Benutzeroberfläche

- **Segmentierter Pillole-Schalter** — ein abgerundeter Pillole-Schalter mit blauem Slider, der sanft zwischen „An/Aus"-Segmenten wechselt, moderner Look
- **Regenbogen-Effekt** — im aktiven Zustand wird eine flüssige Regenbogen-Verlaufsanimation angezeigt
- **Reduziertes graues Design** — im inaktiven Zustand ein eleganter grauer Verlauf
- **Dezenter nativer Modus** — optional eine unaufdringliche Farbgebung passend zum ComfyUI-Standardthema
- **Echtzeit-Rückmeldung** — Schaltflächentext und -farbe spiegeln den aktuellen Übersetzungsstatus wider

### 🔧 Flexible Übersetzungsverwaltung

- **Echtzeit-Umschaltung** — Übersetzung ohne Neustart ein-/ausschalten
- **Dauerhafter Zustand** — Einstellungen werden automatisch gespeichert und überstehen Neustarts
- **Integration ins Einstellungsfenster** — Schalterstil und Dropdown-Übersetzung in den ComfyUI-Einstellungen konfigurierbar (Sprache folgt der offiziellen ComfyUI-Einstellung)
- **Übersetzung pro Plugin** — Knotenübersetzungen lassen sich pro Übersetzungsdatei ein- und ausschalten.
- **Wörterbücher neu laden** — Laden Sie nach dem Hinzufügen oder Ändern von Übersetzungsdateien die Seite neu.

### 🛡️ Stabil und zuverlässig

- **Umfassende Fehlerbehandlung** — alle kritischen Vorgänge sind abgesichert
- **Fehlertolerante Wörterbücher** — Unlesbare oder strukturell fehlerhafte Dateien werden übersprungen und mit Dateinamen protokolliert.
- **Schutz von Benutzerinhalten** — Bearbeitbare Texte, Prompts und selbst vergebene Datei- und Ordnernamen in der Workflow-Seitenleiste bleiben erhalten.
- **Mehrversions-Kompatibilität** — unterstützt alte und neue ComfyUI-Oberflächen

---

## Vorschau
Nur die Darstellungen auf Chinesisch und Englisch werden gezeigt; prüfen Sie andere Sprachen selbst nach dem Umschalten. Der Umschalter folgt der ComfyUI-Spracheinstellung.

### Übersetzungs-Schaltflächen

<img width="150" height="100" alt="zh-schalter-1" src="https://github.com/user-attachments/assets/775bb652-3b66-404c-9531-e6147d1dbeff" />
<img width="150" height="100" alt="en-schalter-1" src="https://github.com/user-attachments/assets/c1bdce29-fb07-4861-9f05-ba87049e4557" />
<img width="150" height="100" alt="zh-schalter-2" src="https://github.com/user-attachments/assets/40c692c6-142b-4512-94a6-ba95800254d8" />
<img width="150" height="100" alt="en-schalter-2" src="https://github.com/user-attachments/assets/18c970d0-a8f8-450d-894c-19aecbd2f80b" />
<img width="150" height="100" alt="zh-schalter-3" src="https://github.com/user-attachments/assets/2e84be85-f06e-4bcd-9d58-bfb6f2ca6170" />
<img width="150" height="100" alt="en-schalter-3" src="https://github.com/user-attachments/assets/bedb11e2-1e34-4558-8bdb-d11f6d3a18fe" />

### Verwaltungsoberfläche

<img width="2000" height="1500" alt="einstellungsoberfläche" src="https://github.com/user-attachments/assets/1c1607a1-9153-4f9a-aeec-cd49458dd5b4" />
<img width="2000" height="1500" alt="einstellungsoberfläche-en" src="https://github.com/user-attachments/assets/71d1c68a-3e3f-41a7-867b-8d42543faba1" />

---

## Installation

### Methode 1: Git-Klon (empfohlen)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Nach der Installation ComfyUI neu starten.

#### Methode 1 — ausführliche Anleitung für Anfänger:

1. Öffnen Sie den Plugin-Ordner `ComfyUI\custom_nodes`
2. Win11: Rechtsklick auf eine freie Fläche und „In Terminal öffnen" wählen. Win10: `cmd` in die Adressleiste eingeben und Enter.
3. Klicken Sie oben rechts auf dieser Seite auf **Code** und kopieren Sie die Adresse (auch die URL kopieren geht)
4. Geben Sie im Terminal `git clone ` ein, fügen Sie die Adresse ein und drücken Enter. Beispiel: `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Fertig — ComfyUI neu starten. (Schlägt die Installation fehl, aktivieren Sie einen Proxy/VPN und versuchen Sie es erneut.)



### Methode 2: ComfyUI Manager

1. ComfyUI Manager öffnen
2. Datenquelle auf: Kanal (Entfernt) umstellen
3. Auf Knoten-Manager klicken
4. Nach **猪的飞行梦** suchen
5. Auf Installieren klicken und ComfyUI neu starten

### Methode 3: Manueller Download (nicht empfohlen, keine Updates)

1. Auf der GitHub-Seite auf **Code → Download ZIP** klicken
2. Nach `ComfyUI/custom_nodes/ComfyUI-Global-Translation` entpacken
3. ComfyUI neu starten

---

## Verwendung

### Übersetzungs-Schalter

Klicken Sie auf den Schalter in der Symbolleiste. Mit Tab fokussieren Sie ihn, mit Eingabe oder Leertaste schalten Sie um. Nach erfolgreichem Speichern lädt die Seite neu.

- **Übersetzung an** — Der Schalter zeigt „Übersetzung An“. Die Oberfläche wird in die in ComfyUI gewählte Sprache übersetzt.
- **Übersetzung aus** — Der Schalter zeigt „Übersetzung Aus“. ComfyUI und Drittanbieter-Knoten zeigen wieder ihre ursprünglichen Texte.

### Übersetzungssprache

Die Übersetzungssprache wird nicht mehr im Plugin eingestellt; sie **folgt automatisch der offiziellen Spracheneinstellung von ComfyUI** (Einstellungen → Allgemein → Sprache / `Comfy.Locale`):

- Das Plugin unterstützt alle 14 offiziell in ComfyUI verfügbaren Sprachen: Vereinfachtes/Traditionelles Chinesisch, Englisch, Japanisch, Koreanisch, Russisch, Französisch, Spanisch, Italienisch, Portugiesisch (Brasilien), Türkisch, Arabisch, Persisch, Hebräisch; nicht abgedeckte Sprachen fallen auf Englisch zurück
- Das Plugin enthält ein deutsches Wörterbuch (`de-DE`). Deutsch ist in den offiziellen Spracheinstellungen von ComfyUI noch nicht auswählbar.
- Nach dem Wechsel der offiziellen Sprache in den ComfyUI-Einstellungen lädt die Seite automatisch neu; Übersetzung und Plugin-Oberflächentexte greifen gleichzeitig, kein manueller Neustart nötig

### Einstellungsfenster

Unter ComfyUI Einstellungen → „🌐 Übersetzungseinstellungen" gibt es zwei Optionen. Die Oberflächentexte sind in die aktuelle Sprache lokalisiert mit einheitlicher Abschnittsreihenfolge über alle Sprachen hinweg:

| Option | Beschreibung | Optionen |
|-------|------|------|
| 🎨 Schalterstil | Aussehen des Schalters wählen; wird live neu gezeichnet, ohne Neuladen | pill (segmentierte Pillole) / gradient (Regenbogen) / plain (dezent nativ) |
| 📋 Dropdown-Optionen | Ob auch Text in COMBO-Auswahllisten übersetzt wird | An / Aus (automatisches Neuladen nach Änderung) |

Der **Plugin-Übersetzungsverwaltung** zeigt verfügbare Knotenübersetzungsdateien an. Entfernen Sie ein Häkchen, um die Knotenübersetzungen dieser Datei zu deaktivieren. Sobald die Liste geladen ist und Einträge enthält, können Sie „Speichern & neu laden“ wählen. Deaktivierungen für andere Sprachen bleiben erhalten. Bei einem Speicherfehler zeigt das Panel einen Hinweis und erlaubt einen neuen Versuch.

### Schaltflächen-Stilübersicht

| Stil | An | Aus | Geeignet für |
|-----|---------|---------|----------|
| **Segmentierte Pillole** | Blauer Slider über „An", fetter weißer Text | Blauer Slider auf „Aus" geschoben, grauer Text | Modern, schlicht, Zustand auf einen Blick |
| **Regenbogen-Verlauf** | Fließende Regenbogen-Animation, weiß fett | Fließende graue Animation, dunkel fett | Auffällig und direkt gewünscht |
| **Dezent nativ** | ComfyUI-Thema-Hintergrund | Dunkler Hintergrund, grauer Text | Sich in die Oberfläche einfügen |

> Die gesamte Fläche des segmentierten Schalters ist anklickbar. Nach erfolgreichem Speichern bewegt sich der Schieber in die neue Position und die Seite lädt neu. Bei einem Fehler bleibt der bisherige Zustand erhalten und Sie können erneut klicken.

---

## Abdeckung der Übersetzung

### Was übersetzt wird

| Kategorie | Abdeckung | Status |
|------|---------|------|
| **Knotennamen** | Titel und Anzeigenamen aller Workflow-Knoten | ✅ |
| **Knoteneigenschaften** | Ein-/Ausgabedaten, Widget-Beschriftungen, Beschreibungen | ✅ |
| **Blueprints und Subgraphen** | Titel offizieller Blueprints und Vorlagen-Subgraphen mit Wörterbucheintrag sowie sichtbare Anschlüsse, Widget-Beschriftungen und Platzhalter in offiziellen und eigenen Subgraphen | ✅ |
| **Menüs** | Hauptmenü, Rechtsklick-Menü, Kontextmenü | ✅ |
| **Einstellungsfenster** | Der ComfyUI-Einstellungsdialog | ✅ |
| **Manager** | Die ComfyUI-Manager-Oberfläche | ✅ |
| **Vorlagenbibliothek** | Workflow-Vorlagennamen | ✅ |
| **Oberflächenelemente** | Schaltflächen, Beschriftungen, Hinweistexte, Suchfeld | ✅ |
| **Benutzerdefinierte Panels** | Schaltflächen, Beschriftungen, Dropdowns, Hinweistexte, Popups in Knoten-DOM-Panels | ✅ |
| **Warteschlangeninfo** | Dynamischer Text wie Warteschlangengröße | ✅ |

### Struktur der Übersetzungsdateien

```
de-DE/
├── Nodes/          # Knotenübersetzung (Titel, Eingaben, Ausgaben, Widgets, benutzerdefinierte Panels)
│   └── internal.json
├── Categories/     # Übersetzung der Knotenkategorien
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Menü- und Oberflächenübersetzung
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── ComfyUI-子图.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> Andere Sprachverzeichnisse (`zh-CN/`, `zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `fr-FR/`, `es-ES/`, `it-IT/`, `pt-BR/`, `ar-SA/`, `tr-TR/`, `fa-IR/`, `he-IL/`) teilen dieselbe Struktur und laden je nach aktueller Sprache; `en-US/` dient dazu, Knoten anderer Plugins ins Englische zurückzuversetzen.

### Eigene Übersetzung hinzufügen

Erstellen Sie eine JSON-Datei unter `de-DE/Nodes/`:

```json
{
  "YourNodeClassName": {
    "title": "Anzeigename des Knotens",
    "inputs": {
      "input_name": "Übersetzung des Eingabenamens"
    },
    "outputs": {
      "output_name": "Übersetzung des Ausgabenamens"
    },
    "widgets": {
      "widget_name": "Übersetzung des Widget-Namens"
    },
    "ui": {
      "English text in panel": "übersetzter Text im Panel"
    }
  }
}
```

> **Hinweise zum Verfassen**
>
> - `widgets`-Schlüssel müssen den **echten Namen** des Widgets verwenden (der Parametername im Quellcode, z. B. `target_language`), nicht den angezeigten display_name (z. B. `Target Language`). Für V3-API-Plugins (io.Schema) schreiben Sie beide Schlüssel — echten Namen und display_name — für beste Kompatibilität
> - Das Feld `ui` übersetzt englischen Text in benutzerdefinierten Panels des Knotens (erstellt über `addDOMWidget`): der Schlüssel ist das angezeigte Englische, der Wert die Übersetzung
> - Fügen Sie keine „Identitätsübersetzungen" hinzu (Wert gleich Schlüssel, z. B. `"cfg": "cfg"`) — sie ergeben keinen Sinn
> - Prüfen Sie die Schlüssel-Schreibweise; eine Abweichung vom Quellcode (z. B. ein zusätzliches `t` in `perturb_atttn`) führt dazu, dass das Widget stillschweigend nicht übersetzt wird

Erstellen Sie eine JSON-Datei unter `de-DE/Menus/`, um Menüübersetzungen hinzuzufügen:

```json
{
  "English Menu Text": "übersetzter Menütext",
  "Another Item": "ein anderer Eintrag"
}
```

Die oberste Ebene eines Wörterbuchs muss ein JSON-Objekt sein. Fehlt eine gültige Übersetzung, erscheint der Originaltext. Fehlerhafte Dateien werden übersprungen und protokolliert. Bei gleichen Schlüsseln gilt die nach Dateinamen später einsortierte Datei. Ist das Plugin eines Knotens bekannt, hat dessen Knotenwörterbuch Vorrang. Andere Einträge ergänzen fehlende Felder.

> Laden Sie die Browserseite nach dem Hinzufügen, Ändern oder Löschen eines Wörterbuchs neu. Starten Sie nach einem Plugin-Update zuerst ComfyUI neu und laden Sie dann die Seite neu.

### Blueprints und Subgraphen übersetzen

Ziehen Sie einen Blueprint aus „Knoten“ → „Comfy Blueprints“ auf die Arbeitsfläche oder öffnen Sie eine offizielle Vorlage oder einen eigenen Workflow mit Subgraphen. Beide Knotenansichten übersetzen sichtbare Anschlüsse, Widget-Beschriftungen und Platzhalter in die aktuelle Sprache, auch bei Elementen aus verschachtelten Subgraphen.

- Titel offizieller Blueprints und erkannter offizieller Vorlagen-Subgraphen werden in `Menus/` der aktuellen Sprache gesucht. Eigene Subgraphen behalten ihre benutzerdefinierten Titel. Vereinfachte chinesische Titel und gemeinsame Begriffe stehen in [ComfyUI-子图.json](zh-CN/Menus/ComfyUI-子图.json).
- Sichtbare Elemente übernehmen vorrangig die Übersetzung des direkt zugehörigen internen Knotens. Fehlt sie, wird der vollständige Anzeigename in `Menus/` gesucht. Groß- und Kleinschreibung, Leerzeichen, Unterstriche und Bindestriche dürfen abweichen. Ein Eintrag kann für mehrere Subgraphen gelten.
- Für unterschiedliche Ein- und Ausgangsübersetzungen stehen `input.` und `output.` zur Verfügung. `output.depth_colored` gilt beispielsweise für den gleichnamigen Ausgang. Der Workflow speichert die ursprünglichen Titel, Anschlussnamen und Parameterwerte.

---

## Architektur

### Gesamtstruktur

```
┌──────────────────────────────────────────────────────┐
│                ComfyUI-Hauptprogramm                  │
│                                                        │
│  Python-Backend (__init__.py)     Front JS (js/)       │
│  ├─ HTTP-API-Routen              ├─ main.js (Engine)   │
│  ├─ Übersetzungs-Kompilierung    ├─ MenuTranslate.js   │
│  └─ Einstellungs-Persistenz      └─ utils.js (Helfer)  │
│         │                             │                │
│         ▼                             ▼                │
│   de-DE/ Übersetzungsdaten       MutationObserver      │
│   ├─ Nodes/*.json              Echtzeit-DOM-Übersetzung │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Kerntechniken

| Technik | Beschreibung |
|------|------|
| **Native Rechtsklickmenüs** | Übersetzt Beschriftungen nach dem Aufbau durch ComfyUI. Menüeinträge, Rückrufe und Dropdown-Werte verwenden die ursprünglichen Daten. |
| **Doppelte Schaltflächen-Architektur** | Unterstützt sowohl das alte `.comfy-menu` als auch das neue `.comfyui-menu` |
| **MutationObserver** | Beobachtet Änderungen der Oberfläche und prüft zusammen eingegangene Menüänderungen in einem Durchlauf. |
| **translatedValueSet** | Nutzt ein Set für O(1)-Prüfung, ob Text bereits übersetzt ist, und vermeidet doppelte Verarbeitung |
| **Blattknoten-Schutz** | Weist `innerText` nur kindlosen Knoten zu und schützt so Vue-Event-Bindings |
| **Übersetzungscache** | Erstellt und komprimiert Übersetzungen im Hintergrund und verwendet sie bei gleichen Wörterbüchern und Deaktivierungen erneut. |
| **Cache für Subgraph-Zuordnungen** | Verwendet Zuordnungen für denselben Subgraphen erneut und ermittelt sie bei Änderungen am Graphnamen oder an Kennungen sichtbarer Anschlüsse neu. |
| **Gzip-Übertragung** | Sendet komprimierte Daten, wenn der Browser Gzip akzeptiert. |

> Vollständige technische Details finden Sie in [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Hinweise

### Kompatibilität

- **Konflikte mit Übersetzungs-Plugins** — dieses Plugin steht in Konflikt mit anderen Übersetzungs-Plugins (z. B. AIGODLIKE-ComfyUI-Translation); deinstallieren Sie diese vorher
- **Bekanntermaßen konfliktbehaftetes Plugin** — `ComfyUI Browser` kann Kompatibilitätsprobleme haben
- **Unterstützte Browser** — Chrome, Edge und 360 Browser empfohlen; andere wurden nicht ausreichend getestet

### Änderungen der Übersetzung fehlen noch

- **Nach dem Neuladen erscheint die alte Übersetzung.** Manche Programme überschreiben Wörterbücher, ohne Dateigröße, Änderungszeit oder Verzeichniseintrag zu ändern. Das Plugin kann dann weiterhin den Cache verwenden. Ein Neustart von ComfyUI liest die Wörterbücher neu ein.
- **Aktualisierter Text in einem Pop-up bleibt auf Englisch.** Manche Pop-ups ändern den Statustext direkt nach dem Öffnen. Der neue Text kann vorübergehend auf Englisch erscheinen.
- **Ein sichtbarer Anschluss zeigt nach dem Umverdrahten die alte Übersetzung.** Die neue Verbindung im Subgraphen gilt sofort. Speichern und öffnen Sie den Workflow erneut, um die Übersetzung neu zu ermitteln.

### Anforderungen

| Komponente | Anforderung |
|------|------|
| ComfyUI | Neueste Version (kompatibel mit alter und neuer UI) |
| Python | 3.8+ |
| Browser | Chrome / Edge (empfohlen) |

---

## Änderungsverlauf

### 2026-11-18

- Sichtbare Elemente in Subgraphen offizieller Workflow-Vorlagen und in eigenen Subgraphen werden übersetzt, einschließlich verschachtelter Subgraphen und neu nach außen geführter Widgets. Begriffe für „Text to Image (MiniMax H3 Image)“ und die zugehörige Prompt-Verbesserung wurden ergänzt.
- Bei fehlender oder beschädigter Vorlagenliste bleiben Übersetzungen für gewöhnliche Knoten, Menüs und Blueprints der Knotenbibliothek verfügbar. Mehrere gleichzeitig hinzugefügte Widgets lösen gemeinsam eine Aktualisierung der Arbeitsfläche aus.
- Fehler bei Rechtsklickmenüs auf der klassischen Arbeitsfläche, fehlende Übersetzungen dynamischer Menüs und doppelt angezeigte Slider-Werte behoben. Prompts, benutzerdefinierte Namen und tatsächliche Dropdown-Werte bleiben erhalten.
- Ein Fehler, durch den der Plugin-Übersetzungs-Manager Deaktivierungen löschen konnte, wurde behoben. Der Übersetzungsschalter ist per Tastatur bedienbar. Fehlgeschlagene Speichervorgänge können wiederholt werden.
- Fehlerhafte Wörterbücher führen nicht mehr zum Ausfall des gesamten Übersetzungspakets. Die Reihenfolge gleichnamiger Einträge wurde vereinheitlicht. Erkennung und Prüfwerkzeuge für Sprachpakete berücksichtigen fehlende Einträge.
- Übersetzungen werden im Hintergrund erstellt und im Cache wiederverwendet. Menüänderungen werden gemeinsam geprüft und wiederholte Suchen für Subgraphen reduziert.
- Fehler aufgrund veralteter Übersetzungen nach Dateiersetzung unter Windows, vorübergehend unlesbarer Wörterbuchverzeichnisse und fehlender Übersetzungen für Hinweise neuer Menüelemente wurden behoben.


### 2026-11-17

- Offizielle Blueprints unterstützen jetzt übersetzte Titel, Anschlüsse, Widget-Beschriftungen und Platzhalter. Die Übersetzungen stammen aus internen Knoten oder dem gemeinsamen Menüwörterbuch. Korrigiert wurden fehlende Übersetzungen beim Einfügen aus der Knotenbibliothek, beim erneuten Öffnen umbenannter Blueprints sowie bei Titeln und Textfeldern in der neuen Knotenansicht.

### 2026-11-16

- Die Übersetzungen für Knoten, Kategorien, Menüs und Einstellungen wurden an die offizielle vereinfachte chinesische Übersetzung von ComfyUI angeglichen. Fehlende Anschlussbeschriftungen einiger integrierter Knoten wurden ergänzt.
- Die Bezeichnungen `Latent` und `采样` wurden im vereinfachten Chinesisch vereinheitlicht. Auch die Sampling-Beschriftungen integrierter Knoten wurden in 13 weiteren Sprachen vereinheitlicht, wobei die Anschlussnummern erhalten blieben.
- Fehlende Übersetzungen nach Aktualisierungen von Oberflächentexten wurden behoben. Für die Werkzeugeinstellungen von VNCCS UniCanvas und die SAM-Hinweise wurden vereinfachte chinesische Texte ergänzt. Knotenspezifische Übersetzungen haben Vorrang, und die tatsächlichen Werte von Dropdown-Optionen werden geschützt. ([#13](https://github.com/a63976659/ComfyUI-Global-Translation/issues/13))
- Ein Fehler wurde behoben, durch den Knotenbeschriftungen mit Nicht-Textwerten das Laden eines Workflows unterbrechen konnten. Zugehörige Bedienelemente werden auch nach dem Umbenennen dynamischer Eingänge übersetzt. ([#14](https://github.com/a63976659/ComfyUI-Global-Translation/issues/14), [#15](https://github.com/a63976659/ComfyUI-Global-Translation/issues/15))

### 2026-11-11

- Fehlende vereinfachte chinesische Übersetzungen für lokale Knoten und Partnerknoten wurden ergänzt. Die Anzeige dynamischer Anschlüsse, Steuerelemente und Prompts in Generate Text V2, Qwen Image 2.1 und MiniMax H3 wurde korrigiert.

### 2026-09-24

- Sicherheitsproblem behoben: Über präparierte Anfragen konnten Dateien außerhalb des Plugin-Ordners gelesen werden; das Plugin liest jetzt ausschließlich Übersetzungsdateien im eigenen Ordner

### 2026-09-21

**Arabisch (ar-SA), Persisch (fa-IR) und Hebräisch (he-IL) hinzugefügt**

- Übersetzungspakete für drei RTL-Sprachen (rechts-nach-links) fertiggestellt, die Knoten, Kategorien, Menüs und das Einstellungsfenster abdecken; stellen Sie die offizielle ComfyUI-Sprache auf `ar-SA` / `fa-IR` / `he-IL`, um sie automatisch zu aktivieren

**Platzierung des Übersetzungsschalters im neuen ComfyUI verbessert**

- Der Schalter wird nun vorrangig in die Befehlsleiste eingesetzt (gleiche Zeile wie der Einstellungs-Button von ComfyUI-Manager); ist der Anker beim Start noch nicht bereit, versetzt ihn der Watchdog automatisch, sobald er verfügbar ist. Zusätzlich Schutz vor Flackern vor dem Mounting und automatische Neuberechnung der Position des Kapsel-Reglers nach dem Mounting

### 2026-09-20

**Japanisch (ja-JP) hinzugefügt**

- Japanisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `ja-JP`

**Spanisch (es-ES) hinzugefügt**

- Spanisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `es-ES`

**Koreanisch (ko-KR) hinzugefügt**

- Koreanisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `ko-KR`

**Türkisch (tr-TR) hinzugefügt**

- Türkisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `tr-TR`

**Italienisch (it-IT) hinzugefügt**

- Italienisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `it-IT`

**Brasilianisches Portugiesisch (pt-BR) hinzugefügt**

- Portugiesisches (Brasilien) Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `pt-BR`

**Deutsch (de-DE) hinzugefügt**

- Deutsches Übersetzungspaket für Knoten, Kategorien, Menüs und das Einstellungsfenster hinzugefügt.

### 2026-09-19

**Sprache folgt der offiziellen Einstellung**

- Die Option „Übersetzungssprache" im Plugin entfernt; die Sprache folgt nun automatisch der offiziellen Spracheneinstellung von ComfyUI (`Comfy.Locale`)
- Nach dem Wechsel der offiziellen Sprache lädt die Seite automatisch neu; Übersetzung und Plugin-Texte greifen gleichzeitig, kein manueller Neustart

**Mehrsprachige Konfigurationsoberfläche und einheitliches Layout**

- Schalterbeschriftung und Einstellungsoberfläche decken 15 Sprachen ab (einschließlich Traditionellem Chinesisch sowie den RTL-Sprachen Arabisch, Persisch, Hebräisch); unbekannte Sprachen fallen auf Englisch zurück
- Die Abschnittsreihenfolge im Einstellungsfenster ist in allen Sprachen einheitlich: Schalterstil → Dropdown-Optionen → Plugin-Übersetzungs-Manager; Abschnittsüberschriften werden übersetzt
- Der „Plugin-Übersetzungs-Manager" wird nicht mehr ein zweites Mal über das Wörterbuch übersetzt und entspricht immer der aktuellen Sprache
- Die Beschriftung des Einschaltzustands lässt den Suffix `(Sprachcode)` weg und behält nur den Text

### 2026-09-12

- Behoben: Verlust von Übersetzungen, wenn mehrere Dateien denselben Knoten enthalten; sie werden nun ergänzend zusammengeführt
- Übersetzung benutzerdefinierter Knoten-Panels hinzugefügt: Schaltflächen, Beschriftungen, Dropdowns, Hinweistexte und Popups werden nun übersetzt
- Behoben: Port-Namen blieben englisch, nachdem ein Widget „in Eingabe umgewandelt" wurde
- Übersetzungs-Wächter hinzugefügt: später erstellte Knoten erhalten ebenfalls Übersetzung
- Dank an 石头 (Q:34720803) für die Optimierung

### 2026-09-07

- Behoben: In der Seitenleistenliste „Workflows" wurden eigene Workflow-Namen fälschlich übersetzt; sie bleiben nun unverändert

### 2026-08-20

- Schalterstil „segmentierte Pillole" hinzugefügt, mit blauem Slider, der sanft zwischen An und Aus gleitet für einen Zustand auf einen Blick

### 2026-07-27

**Fix: Widget-Übersetzung bei V3-API-Knoten funktionierte nicht**

- Behoben: fehlende Widget-Übersetzung bei Plugins der V3-API (io.Schema), z. B. ComfyUI-qwenmultiangle
- **Ursache**: V3-Knoten deklarieren für ein Widget oft einen englischen `display_name` (name `horizontal_angle`, label `Horizontal Angle`); die alte Prüfung wertete jedes „label ≠ name" als native Übersetzung und übersprang es
- **Lösung**: `isAlreadyTranslated` erhält einen normalisierten Vergleich — ein label, das nur eine verschönerte Form des name ist (Unterschiede in Groß/Kleinschreibung/Leerzeichen/Unterstrichen/Bindestrichen), gilt nicht als übersetzt

**Fix: Identitätsübersetzungen verschmutzten die Menge der übersetzten Werte**

- Behoben: bestimmte Widgets (z. B. `cfg`) wurden auf keinem Knoten übersetzt
- **Ursache**: manche Dateien enthielten „Identitätsübersetzungen" (z. B. `"cfg": "cfg"`); sobald ihr Wert in `translatedValueSet` gelangte, wurde der englische Name fälschlich als „bereits übersetzt" eingestuft und blockierte global die Übersetzung dieses Namens
- **Lösung**: Beim Aufbau der Menge werden Einträge übersprungen, deren Wert ihrem Schlüssel gleicht

**Korrekturen an Übersetzungsdateien**

- Tippfehler in ComfyUI-LTXVideo-Schlüsseln behoben (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- Fehlende echte Widget-Namen-Schlüssel in ComfyUI-qwenmultiangle ergänzt (`target_language`, `prompt`)

### 2026-04-08

**Fix: Rechtsklick-Menü-Funktionen ausgefallen**

- Einen schweren Fehler behoben, bei dem mit aktiver Übersetzung die Aktionen „Trennen" und „Port umbenennen" im Rechtsklick-Menü des Ausgabeports nicht mehr reagierten
- **Ursache**: LiteGraph verteilt Rückrufe über den Abgleich des englischen `value.content`; nach Übersetzung schlug der Abgleich fehl
- **Lösung**: Callback Wrapping implementiert — im Moment der Rückruf-Ausführung wird kurzzeitig Englisch wiederhergestellt und nach der Ausführung die Übersetzung zurückgesetzt, was Übersetzungsanzeige und korrektes Verhalten vereint
- Umschließt sowohl `value.callback` (individuell) als auch `options.callback` (geteilt)
- Schutz `_originalContent` vor mehrfachem Übersetzungs-Überschreiben hinzugefügt, damit das Canvas-Menü seinen Originalwert nicht verliert, wenn es die Pipeline zweimal durchläuft

**Fix: DOM-Übersetzung zerstörte Event-Bindings**

- Behoben: die `innerText`-Zuweisung in `replaceText` zerstörte Kindelemente und Vue/PrimeVue-Listener
- **Lösung**: Blattknoten-Prüfung `target.children.length === 0` hinzugefügt, `innerText` nur an kindlose Knoten zugewiesen

### 2025-12-20

**Umbenennung**

- Plugin von `ComfyUI-Translation-node` in `ComfyUI-Chinese-Translation` umbenannt
- Anzeigename von „Translation Node" in „中文翻译" geändert, um der Ausrichtung des Plugins besser zu entsprechen

**Verbesserungen**

- Umstellung auf eine mehrsprachige Dateiarchitektur (Version 2.0)
- Einstellungsfenster hinzugefügt: Sprache und Schaltflächenstil in den ComfyUI-Einstellungen konfigurierbar
- Option für dezenten nativen UI-Stil hinzugefügt
- Behoben: Verlust der Symbol-Einstellungen nach Neustart (Dank an Community-Mitglied 幻影 für den Bericht)

---

## Community und Unterstützung

**Autorenseite**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili**: [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu**: 猪的飞行梦

**Community-Gruppe**

- **ComfyUI QQ-Gruppe**: `202018000`

**Feedback und Beitrag**

- **Fehlerberichte**: [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Übersetzungen beisteuern**: PRs mit zusätzlichen Übersetzungsdateien sind willkommen

**Autor unterstützen**

Wenn Ihnen das Plugin gefällt, vergeben Sie gern einen ⭐ Star und unterstützen Sie den Autor:

- **Unterstützung**:
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## Lizenz

Dieses Projekt wird unter der [MIT-Lizenz](LICENSE) open source veröffentlicht.

Copyright (c) 2025 猪的飞行梦

Jeder darf dieses Projekt frei kopieren, ändern und verbreiten, sofern der ursprüngliche Urheberrechtshinweis beibehalten wird. Details siehe Datei [LICENSE](LICENSE).

---

## Haftungsausschluss

Für diese Übersetzung und die geteilten Inhalte gilt Folgendes:

**Nicht-kommerzieller Charakter**

Diese Übersetzung ist ein persönliches, unbezahltes Werk; es wurde keine Vergütung oder kommerzieller Vorteil erhalten. Sie dient ausschließlich Lernen, Austausch und Wissensweitergabe.

**Keine Genauigkeitsgarantie**

Die Übersetzung bemüht sich um Treue zum Original, garantiert jedoch nicht Richtigkeit, Vollständigkeit, Aktualität oder Eignung für einen Zweck. Jedes Risiko und jede Folge aus Nutzung oder Verlassen auf diese Übersetzung trägt der Nutzer.

**Zugehörigkeit der Originalquelle**

Die Urheberrechte der Originalmaterialien, auf denen diese Übersetzung beruht (einschließlich, aber nicht beschränkt auf Text, Bilder und Videos), liegen bei den jeweiligen Autoren bzw. ursprünglichen Rechteinhabern. Diese Übersetzung erhebt keinen Anspruch auf die Originalinhalte.

**Original konsultieren**

Bei wichtigen Entscheidungen, rechtlicher Wirkung, technischer Umsetzung oder fachlichem Urteil konsultieren und verlassen Sie sich bitte zwingend auf die offizielle Originalversion, nicht auf diese Übersetzung.

**Rechte vorbehalten**

Sollte ein Rechteinhaber der Ansicht sein, dass diese Übersetzung seine berechtigten Rechte verletzt, kontaktieren Sie mich bitte umgehend, und ich werde sie zeitnah entfernen oder regeln.
