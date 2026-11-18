<div align="center">

# 🌐 ComfyUI-Global-Translation

**ComfyUI için çok dilli arayüz çevirisi**

> ComfyUI’de seçilen dilde düğümlere, planlara, iş akışı alt grafiklerine, menülere, ayarlara ve üçüncü taraf düğümlerin arayüzlerine çeviri ekler.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.5.3-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#kullanım)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 语言 · Language

[简体中文](README.md) · [English](README.en-US.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [Español](README.es-ES.md) · [Italiano](README.it-IT.md) · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · **Türkçe** · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Yazar: **猪的飞行梦** — Bu proje, [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) ve [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation) temel alınarak değiştirilmiştir. Açık kaynak topluluğuna üstün katkıları için yazarlarına özel teşekkürler. Bu proje açık kaynak olarak kalmaya devam edecek.

</div>

---

## İçindekiler

- [Eklenti Tanıtımı](#eklenti-tanıtımı)
- [Temel Özellikler](#temel-özellikler)
- [Vitrin](#vitrin)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Çeviri Kapsamı](#çeviri-kapsamı)
- [Mimari](#mimari)
- [Notlar](#notlar)
- [Değişiklik Günlüğü](#değişiklik-günlüğü)
- [Topluluk ve Destek](#topluluk-ve-destek)
- [Lisans](#lisans)
- [Yasal Uyarı](#yasal-uyarı)

---

## Eklenti Tanıtımı

ComfyUI-Global-Translation, çok dilli bir arayüz çevirisi eklentisidir. ComfyUI’nin dil ayarını (Ayarlar → Genel → `Comfy.Locale`) izleyerek düğümlere, menülere, ayar paneline, yöneticiye ve üçüncü taraf düğümlerin arayüzlerine çeviri ekler. Üçüncü taraf düğümlerin dinamik olarak güncellediği arayüz metinlerini de çevirir. Eklentinin kendi arayüzü 15 dili destekler. Çevirinin kapsamı her dilin sözlüğüne bağlıdır.

### Bu eklentiyi neden seçmelisiniz?

| Özellik | Bu eklenti | Diğer çeviri eklentileri |
|------|--------|-------------|
| Resmi çeviriyle uyumlu | ✅ ComfyUI’de seçilen dilde arayüz çevirileri ekler | ❌ Çakışabilir |
| Sağ tık menüsü işlevleri | ✅ Çeviriden sonra da çalışmaya devam eder | ❌ Bazı işlevler bozulur |
| Eski ve yeni arayüz uyumu | ✅ Çift buton mimarisi | ❌ Yalnızca tek sürüm |
| Çeviri anahtarı | ✅ Çeviri açılıp kapatılınca sayfa yenilenir | — |
| Özel başlık koruması | ✅ Kullanıcı düzenlemelerinin üzerine yazmaz | ❌ Üzerine yazılabilir |

---

## Temel Özellikler

### 🎯 Akıllı çeviri sistemi

- **Akıllı algılama** — zaten çevrilmiş metni otomatik olarak tanır, tekrarlayan çeviriyi ve sonsuz özyinelemeyi önler
- **Yerel uyumluluk** — ComfyUI'nin resmi çevirisiyle karşılıklı müdahale olmadan mükemmel biçimde bir arada yaşar
- **Bağlam farkındalığı** — öğe türüne göre (düğümler, menüler, widgetlar vb.) en uygun stratejiyi uygular
- **Çeviri verilerini birleştirme** — Aynı adlı düğümlerin çevirileri alan bazında birleştirilir. Düğümün ait olduğu eklenti belirlenebiliyorsa o eklentinin sözlüğüne öncelik verilir
- **Özel panel çevirisi** — Düğümlerin özel panellerindeki butonlar, denetim etiketleri, yer tutucular ve açılır pencereler çevrilebilir
- **Sağ tık menüsü çevirisi** — Menü çevrilmiş etiketleri gösterir. Bağlantıyı kesme ve yeniden adlandırma gibi işlemler özgün menü öğelerini ve değerlerini kullanır

### 🎨 Güzel kullanıcı arayüzü

- **Segmentli hap kontrolü** — "açık/kapalı" segmentleri arasında mavi bir kaydırıcının yumuşakça kaydığı, yuvarlak hatlı hap biçimli anahtar; modern görünüm
- **Gökkuşağı efekti** — etkin durumda akıcı bir gökkuşağı gradyan animasyonu gösterir
- **Minimal gri tasarım** — etkisiz durumda zarif bir gri gradyan kullanır
- **Sade yerel mod** — isteğe bağlı olarak ComfyUI'nin varsayılan temasına uygun sakin bir renk paleti
- **Gerçek zamanlı geri bildirim** — buton metni ve rengi, güncel çeviri durumunu anında yansıtır

### 🔧 Esnek çeviri yönetimi

- **Gerçek zamanlı değiştirme** — yeniden başlatmadan çeviriyi açma/kapama
- **Kalıcı durum** — ayarlar otomatik olarak kaydedilir ve yeniden başlatmalarda korunur
- **Ayar paneli entegrasyonu** — anahtar stilini ve açılır menü seçeneklerinin çevirisini ComfyUI ayarlarından yapılandırma (dil, ComfyUI'nin resmi ayarını izler)
- **Eklentiye göre çeviri anahtarı** — Düğüm çevirileri, eklentinin çeviri dosyası bazında açılıp kapatılabilir
- **Sözlüğü yenileme** — Çeviri dosyası ekledikten veya düzenledikten sonra çevirileri yüklemek için sayfayı yenileyin

### 🛡️ Kararlı ve güvenilir

- **Sağlam hata yönetimi** — tüm kritik işlemler koruma altındadır
- **Sözlük hatalarına tolerans** — Geçersiz yapıya sahip veya okunamayan sözlükler atlanır ve dosya adları günlüğe yazılır
- **Kullanıcı içeriğini koruma** — Düzenlenebilir metinler, istemler ve iş akışı kenar çubuğunda kullanıcıların adlandırdığı dosya ve klasörler korunur
- **Çoklu sürüm uyumluluğu** — ComfyUI'nin hem eski hem yeni arayüzlerini destekler

---

## Vitrin
Yalnızca Çince ve İngilizce görünümler gösterilmektedir; diğer diller için değiştirip kendiniz kontrol edin. Anahtar, ComfyUI dil ayarını izler.

### Çeviri etkinleştirme butonları

<img width="150" height="100" alt="çince-anahtar-1" src="https://github.com/user-attachments/assets/775bb652-3b66-404c-9531-e6147d1dbeff" />
<img width="150" height="100" alt="ingilizce-anahtar-1" src="https://github.com/user-attachments/assets/c1bdce29-fb07-4861-9f05-ba87049e4557" />
<img width="150" height="100" alt="çince-anahtar-2" src="https://github.com/user-attachments/assets/40c692c6-142b-4512-94a6-ba95800254d8" />
<img width="150" height="100" alt="ingilizce-anahtar-2" src="https://github.com/user-attachments/assets/18c970d0-a8f8-450d-894c-19aecbd2f80b" />
<img width="150" height="100" alt="çince-anahtar-3" src="https://github.com/user-attachments/assets/2e84be85-f06e-4bcd-9d58-bfb6f2ca6170" />
<img width="150" height="100" alt="ingilizce-anahtar-3" src="https://github.com/user-attachments/assets/bedb11e2-1e34-4558-8bdb-d11f6d3a18fe" />

### Yönetim arayüzü

<img width="2000" height="1500" alt="ayar-ekranı" src="https://github.com/user-attachments/assets/1c1607a1-9153-4f9a-aeec-cd49458dd5b4" />
<img width="2000" height="1500" alt="ayar-ekranı-ingilizce" src="https://github.com/user-attachments/assets/71d1c68a-3e3f-41a7-867b-8d42543faba1" />

---

## Kurulum

### Yöntem 1: Git ile klonlama (önerilen)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Kurulumdan sonra ComfyUI'yi yeniden başlatın.

#### Yöntem 1 — yeni başlayanlar için ayrıntılı anlatım:

1. Eklenti klasörünü açın: `ComfyUI\custom_nodes`
2. Win11'de boş bir alana sağ tıklayıp "Terminalde Aç" seçeneğini seçin. Win10'da adres çubuğuna `cmd` yazıp Enter'a basın.
3. Bu sayfanın sağ üst köşesindeki **Code** butonuna tıklayın ve adresi kopyalayın (URL'yi de kopyalayabilirsiniz)
4. Terminale `git clone ` yazın, adresi yapıştırın ve Enter'a basın. Örnek: `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Kurulum tamamlandı, ComfyUI'yi yeniden başlatın. (Kurulum başarısız olursa bir vekil sunucu/VPN etkinleştirip tekrar deneyin.)



### Yöntem 2: ComfyUI Manager

1. ComfyUI Manager'ı açın
2. Veri kaynağını değiştirin: Kanal (Uzak)
3. Düğüm Yöneticisi'ne tıklayın
4. Şunu arayın: **猪的飞行梦**
5. Yükle'ye tıklayın ve ComfyUI'yi yeniden başlatın

### Yöntem 3: Manuel indirme (önerilmez, güncelleme yok)

1. GitHub sayfasında **Code → Download ZIP** seçeneğine tıklayın
2. `ComfyUI/custom_nodes/ComfyUI-Global-Translation` konumuna açın
3. ComfyUI'yi yeniden başlatın

---

## Kullanım

### Çeviri anahtarı

Çeviriyi açıp kapatmak için araç çubuğundaki çeviri anahtarına tıklayın. Klavyeyle `Tab` tuşuyla düğmeye odaklanın, ardından `Enter` veya boşluk tuşuna basın. Ayar kaydedildiğinde sayfa otomatik olarak yenilenir.

- **Çeviri açık** — Düğme «Çeviri Açık» durumunu gösterir ve arayüz metni ComfyUI’de seçilen dile çevrilir.
- **Çeviri kapalı** — Düğme «Çeviri Kapalı» durumunu gösterir ve ComfyUI ile üçüncü taraf düğümler özgün metinlerine döner.

### Çeviri dili

Çeviri dili artık eklenti içinde ayarlanmıyor; **ComfyUI'nin resmi dil ayarını otomatik olarak izler** (Ayarlar → Genel → Dil / `Comfy.Locale`):

- Resmi olarak desteklenen tüm dillerle eşleşir: Basitleştirilmiş Çince, Geleneksel Çince, İngilizce, Japonca, Korece, Rusça, Fransızca, Almanca, İspanyolca, İtalyanca, Portekizce (Brezilya), Türkçe, Arapça, Farsça, İbranice; kapsanmayan diller İngilizce'ye geri döner
- ComfyUI ayarlarında resmi dil değiştirildikten sonra sayfa otomatik olarak yenilenir; çeviri ve eklenti metinleri birlikte uygulanır, elle yeniden başlatma gerekmez

### Ayar paneli

ComfyUI Ayarlar → «🌐 Çeviri Ayarları» bölümünde iki seçenek bulunur. Arayüz metinleri güncel dile yerelleştirilir (15 dil) ve tüm dillerde tutarlı bir bölüm sırası korunur:

| Seçenek | Açıklama | Seçimler |
|-------|------|------|
| 🎨 Anahtar stili | Görünümü seçin; yenilemeden anında yeniden çizilir | pill (segmentli hap) / gradient (gökkuşağı) / plain (sade yerel) |
| 📋 Açılır menü seçenekleri | COMBO açılır menülerindeki seçenek metinlerinin de çevrilip çevrilmeyeceği | Açık / Kapalı (değişiklikte otomatik yeniler) |

Ayarların altındaki **Eklenti çeviri yönetimi**, kullanılabilir düğüm çeviri dosyalarını listeler. Bir dosyanın düğüm çevirilerini kapatmak için işaretini kaldırın. Liste yüklendiğinde ve seçilebilir öğeler olduğunda «Kaydet ve yenile» düğmesine tıklayabilirsiniz. Diğer dillerde devre dışı bırakılan çeviriler korunur. Kaydetme başarısız olursa panel bir uyarı gösterir ve yeniden denemenize olanak tanır.

### Buton stili referansı

| Stil | Açık | Kapalı | En uygun olduğu durum |
|-----|---------|---------|----------|
| **Segmentli hap** | "açık" segmentinin üzerinde mavi kaydırıcı, kalın beyaz metin | Mavi kaydırıcı "kapalı"ya kaymış, gri metin | Modern ve minimal, duruma tek bakışta hakimiyet |
| **Gökkuşağı gradyanı** | Akıcı gökkuşağı animasyonu, kalın beyaz | Akıcı gri animasyon, kalın koyu metin | Dikkat çekici bir şey istiyorsanız |
| **Sade yerel** | ComfyUI tema rengi arka planı | Koyu arka plan, gri metin | Arayüze karışmak istiyorsanız |

> Durumu değiştirmek için hap biçimli düğmenin herhangi bir yerine tıklayabilirsiniz. Ayar kaydedildiğinde kaydırıcı yeni konuma geçer ve sayfa yenilenir. Kaydetme başarısız olursa önceki durum korunur. Yeniden denemek için tekrar tıklayın.

---

## Çeviri Kapsamı

### Neler çevrilir

| Kategori | Kapsam | Durum |
|------|---------|------|
| **Düğüm adları** | Tüm iş akışı düğümlerinin başlıkları ve görünen adları | ✅ |
| **Düğüm özellikleri** | Giriş/çıkış portları, widget etiketleri, açıklamalar | ✅ |
| **Planlar ve alt grafikler** | Sözlükte eşleşmesi bulunan resmî plan ve şablon alt grafiği başlıkları ile resmî ve kullanıcı yapımı alt grafiklerin dışa açılan portları, denetim etiketleri ve metin alanı yer tutucuları | ✅ |
| **Menüler** | Ana menü, sağ tık menüsü, bağlam menüsü | ✅ |
| **Ayar paneli** | ComfyUI ayarlar penceresi | ✅ |
| **Yönetici** | ComfyUI Manager arayüzü | ✅ |
| **Şablon kitaplığı** | İş akışı şablonu adları | ✅ |
| **Arayüz öğeleri** | Butonlar, etiketler, araç ipuçları, arama kutusu | ✅ |
| **Özel paneller** | Düğüm içinde oluşturulan DOM panellerindeki butonlar, etiketler, açılır menüler, ipuçları, açılır pencereler | ✅ |
| **Kuyruk bilgisi** | Kuyruk boyutu gibi dinamik metinler | ✅ |

### Çeviri dosyası yapısı

```
tr-TR/
├── Nodes/          # Düğüm çevirileri (başlık, girişler, çıkışlar, widgetlar, özel paneller)
│   └── internal.json
├── Categories/     # Düğüm kategorisi çevirileri
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Menü ve arayüz çevirileri
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── ComfyUI-子图.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> Diğer dil klasörleri (`zh-CN/`, `zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `fr-FR/`, `de-DE/`, `es-ES/`, `it-IT/`, `pt-BR/`, `ar-SA/`, `fa-IR/`, `he-IL/`) aynı yapıyı paylaşır ve güncel dile göre yüklenir; `en-US/`, Çin dışı eklentilerin düğümlerini İngilizce'ye geri döndürmek için kullanılır. Yalnızca `Menus/` veya `Categories/` içeren dil klasörleri de tanınır.

### Özel çeviri ekleme

`tr-TR/Nodes/` altında bir JSON dosyası oluşturun:

```json
{
  "YourNodeClassName": {
    "title": "Düğüm görünen adınız",
    "inputs": {
      "input_name": "çevrilmiş giriş adı"
    },
    "outputs": {
      "output_name": "çevrilmiş çıkış adı"
    },
    "widgets": {
      "widget_name": "çevrilmiş widget adı"
    },
    "ui": {
      "English text in panel": "çevrilmiş panel metni"
    }
  }
}
```

> **Yazım ipuçları**
>
> - `widgets` anahtarları, widgetın **gerçek adını** (kaynaktaki parametre adı, örn. `target_language`) kullanmalıdır, ekrandaki display_name'i (örn. `Target Language`) değil. V3 API (io.Schema) kullanan eklentiler için en iyi uyumluluk adına hem gerçek adı hem de display_name'i anahtar olarak yazın
> - `ui` alanı, özel panellerdeki (`addDOMWidget` ile oluşturulan) İngilizce metinleri çevirir; anahtar ekranda görünen İngilizce metin, değer ise çevirisidir
> - "Kimlik çevirileri" (değeri anahtarına eşit, örn. `"cfg": "cfg"`) eklemeyin — hiçbir anlam taşımazlar
> - Anahtar yazımını iki kez kontrol edin; kaynakla farklı olan bir anahtar (örn. `perturb_atttn` içindeki fazladan `t`) sessizce çeviriyi başarısız kılar

`tr-TR/Menus/` altında bir JSON dosyası oluşturun ve menü çevirileri ekleyin:

```json
{
  "English Menu Text": "çevrilmiş menü metni",
  "Another Item": "başka bir öğe"
}
```

> Sözlük ekledikten, düzenledikten veya sildikten sonra güncel çevirileri yüklemek için tarayıcı sayfasını yenileyin. Eklentiyi güncelledikten sonra önce ComfyUI’yi yeniden başlatın, ardından sayfayı yenileyin.

### Planların ve alt grafiklerin çevirisi

Kenar çubuğunda **Düğümler → Comfy Şablonları** bölümünden bir planı tuvale sürükleyin veya alt grafik içeren resmî bir şablonu ya da kendi iş akışınızı açın. Hem klasik tuval hem yeni düğüm arayüzü, iç içe alt grafiklerden dışa açılanlar da dahil olmak üzere portları, denetim etiketlerini ve metin alanı yer tutucularını geçerli dile çevirir.

- Resmî planların ve tanınabilen resmî şablon alt grafiklerinin başlıkları için geçerli dilin `Menus/` klasörüne bakılır. Kendi oluşturduğunuz alt grafikler, verdiğiniz başlıkları korur. Basitleştirilmiş Çince başlıklar ve ortak terimler [ComfyUI-子图.json](zh-CN/Menus/ComfyUI-子图.json) dosyasındadır.
- Dışa açılan bileşenlerde önce doğrudan karşılık gelen iç düğüm çevirisi kullanılır. Bu çeviri bulunamazsa görünen adın tamamı geçerli dilin `Menus/` klasöründe aranır. Eşleştirme büyük-küçük harf, boşluk, alt çizgi ve kısa çizgi farklarını tanır. Bir sözlük girdisi birden çok alt grafikte kullanılabilir.
- Giriş ve çıkış için farklı çeviriler gerekiyorsa ortak girdiye `input.` veya `output.` önekini ekleyin. Örneğin `output.depth_colored`, ilgili çıkışı «Renkli derinlik haritası» olarak göstermek için kullanılabilir. İş akışına özgün başlıklar, port adları ve parametre değerleri kaydedilir.

---

## Mimari

### Genel yapı

```
┌──────────────────────────────────────────────────────┐
│                   ComfyUI ana programı                │
│                                                        │
│  Python arka yüzü (__init__.py)   Ön yüz JS (js/)      │
│  ├─ HTTP API rotaları             ├─ main.js (motor)   │
│  ├─ çeviri derleme                 ├─ MenuTranslate.js  │
│  └─ ayar kalıcılığı                └─ utils.js (yardımcı)│
│         │                             │                │
│         ▼                             ▼                │
│   tr-TR/ çeviri verisi         MutationObserver        │
│   ├─ Nodes/*.json              gerçek zamanlı DOM çevirisi
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Temel teknikler

| Teknik | Açıklama |
|------|------|
| **Yerel sağ tık menüsü** | Etiketler ComfyUI menüyü oluşturduktan sonra çevrilir. Menü öğeleri, geri çağırmalar ve açılır liste değerleri özgün verileri kullanır |
| **Çift buton mimarisi** | Hem eski `.comfy-menu` hem yeni `.comfyui-menu` arayüzlerini destekler |
| **MutationObserver** | Arayüz değişikliklerini izler ve aynı gruptaki menü değişikliklerini tek taramada işler |
| **translatedValueSet** | Bir metnin çevrilip çevrilmediğini O(1) hızında denetlemek için Set kullanır, tekrarlayan işlemi önler |
| **Yaprak düğüm koruması** | `innerText` atamasını yalnızca çocuğu olmayan düğümlere yapar, Vue olay bağlarını korur |
| **Çeviri önbelleği** | Çeviriler arka planda derlenip sıkıştırılır. Sözlükler ve devre dışı bırakılan öğeler aynıysa sonuç yeniden kullanılır |
| **Alt grafik eşleştirme önbelleği** | Aynı alt grafiğin eşleşmeleri yeniden kullanılır. Grafik adı veya dışa açılan port tanımlayıcıları değiştiğinde yeniden eşleştirme yapılır |
| **Gzip aktarımı** | Tarayıcı Gzip kabul ediyorsa aktarım maliyetini azaltmak için veriler sıkıştırılmış gönderilir |

> Tam teknik ayrıntılar için bkz. [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Notlar

### Uyumluluk

- **Çeviri eklentisi çakışmaları** — bu eklenti diğer çeviri eklentileriyle (örn. AIGODLIKE-ComfyUI-Translation) çakışır; kullanmadan önce onların kurulumunu kaldırın
- **Bilinen çakışan eklenti** — `ComfyUI Browser` uyumluluk sorunları yaşatabilir
- **Tarayıcı desteği** — Chrome, Edge ve 360 Browser önerilir; diğerleri tam olarak test edilmemiştir

### Çeviriler güncel görünmüyorsa

- **Sayfayı yeniledikten sonra eski çeviri görünüyor.** Bazı eşitleme araçları sözlükleri değiştirirken dosya boyutunu, son değiştirme zamanını ve dizin kayıtlarını korur. Eklenti eski önbelleği kullanmaya devam edebilir. Sözlükleri yeniden okutmak için ComfyUI’yi yeniden başlatın.
- **Açılır pencere güncellendikten sonra metin İngilizce kalıyor.** Bazı pencereler açıldıktan sonra durum metnini doğrudan değiştirir. Yeni metin geçici olarak İngilizce kalabilir.
- **Alt grafik bağlantısı değiştiği halde port eski çeviriyi gösteriyor.** Bir port alt grafikte başka bir düğüme bağlanınca bağlantı hemen etkinleşir. Dışa açılan portun çevirisini yeniden eşleştirmek için iş akışını kaydedip yeniden açın.

### Gereksinimler

| Bileşen | Gereksinim |
|------|------|
| ComfyUI | En son sürüm (eski ve yeni arayüzle uyumlu) |
| Python | 3.8+ |
| Tarayıcı | Chrome / Edge (önerilir) |

---

## Değişiklik Günlüğü

### 2026-11-18

- Resmî iş akışı şablonlarındaki ve kullanıcıların oluşturduğu alt grafiklerdeki dışa açılan bileşenler çevriliyor. İç içe alt grafikler ve yeni dışa açılan denetimler de kapsama dahil. «Metinden Görüntüye (MiniMax H3 Image)» ve ilgili istem geliştirme terimleri eklendi.
- Şablon listesi eksik veya bozuk olduğunda normal düğümler, menüler ve düğüm kitaplığındaki planlar çevrilmeye devam ediyor. Aynı anda eklenen birden fazla denetimin tetiklediği tuval yenilemeleri birleştiriliyor.
- Klasik tuvalde sağ tık menüsünün çalışmaması, dinamik menülerde eksik çeviriler ve kaydırıcı değerlerinin iki kez gösterilmesi düzeltildi. İstemler, kullanıcıların verdiği adlar ve açılır liste seçeneklerinin gerçek değerleri korunuyor.
- Eklenti çeviri yöneticisinin devre dışı bırakılan öğeleri silebilmesi düzeltildi. Çeviri anahtarı klavyeyle kullanılabiliyor ve ayarlar kaydedilemediğinde yeniden denenebiliyor.
- Hatalı bir sözlüğün tüm çeviri paketini devre dışı bırakması düzeltildi. Aynı adlı girdilerin eşleştirme sırası birleştirildi. Dil paketi algılama ve denetim aracındaki eksik öğe kontrolleri tamamlandı.
- Çeviriler arka planda derleniyor ve önbellekten yeniden kullanılıyor. Aynı gruptaki menü taramaları birleştiriliyor ve tekrarlanan alt grafik aramaları azaltılıyor.
- Windows’ta sözlük dosyası değiştirilerek kaydedildiğinde eski çevirilerin kullanılmasına, sözlük dizini geçici olarak okunamadığında tüm paketin hata vermesine ve yeni eklenen menü denetimlerinin ipuçlarının çevrilmemesine yol açan sorunlar düzeltildi.

### 2026-11-17

- Resmî alt grafik şablonları için iç düğüm çevirilerinden ve ortak menü sözlüğünden yararlanan çeviri desteği eklendi. Başlıklar, portlar, widget etiketleri ve yer tutucular çevrilebiliyor. Düğüm kitaplığından şablon eklerken, şablonu yeniden adlandırıp kaydettikten sonra açarken ve yeni arayüzde başlıklarla metin alanları görüntülenirken karşılaşılan çeviri eksiklikleri giderildi.

### 2026-11-16

- Düğüm, kategori, menü ve ayar çevirileri ComfyUI’nin resmî Basitleştirilmiş Çince çevirisiyle uyumlu hâle getirildi. Bazı yerleşik düğümlerin eksik bağlantı noktası etiketleri eklendi.
- Basitleştirilmiş Çincede `Latent` ve `采样` etiketleri standartlaştırıldı. Diğer 13 dilde de yerleşik düğümlerin örnekleme etiketleri, bağlantı noktası numaraları korunarak standartlaştırıldı.
- Arayüz metinleri güncellendiğinde çevirilerin eksik kalmasına yol açan sorun giderildi. VNCCS UniCanvas araç ayarları ve SAM iletileri için Basitleştirilmiş Çince çeviri eklendi. Düğüme özgü çevirilere öncelik veriliyor ve açılır liste seçeneklerinin gerçek değerleri korunuyor. ([#13](https://github.com/a63976659/ComfyUI-Global-Translation/issues/13))
- Düğüm etiketleri metin dışı değerler içerdiğinde iş akışının yüklenmesini kesintiye uğratabilen hata giderildi. Dinamik girişler yeniden adlandırıldığında ilişkili denetimler de çevriliyor. ([#14](https://github.com/a63976659/ComfyUI-Global-Translation/issues/14), [#15](https://github.com/a63976659/ComfyUI-Global-Translation/issues/15))

### 2026-11-11

- Yerel düğümlerin ve iş ortağı düğümlerinin eksik Basitleştirilmiş Çince çevirileri tamamlandı. Generate Text V2, Qwen Image 2.1 ve MiniMax H3’te dinamik bağlantı noktalarının, denetimlerin ve istemlerin görüntülenmesi düzeltildi.

### 2026-09-24

- Bir güvenlik sorunu giderildi: özenle hazırlanmış bir istekle eklentinin kendi klasörü dışındaki dosyalar okunabiliyordu; artık eklenti yalnızca kendi klasöründeki çeviri dosyalarını okuyor

### 2026-09-21

**Arapça (ar-SA), Farsça (fa-IR) ve İbranice (he-IL) çevirileri eklendi**

- Sağdan sola yazılan (RTL) üç dil için düğümleri, kategorileri, menüleri ve ayar panelini kapsayan çeviri paketleri tamamlandı; otomatik olarak etkinleştirmek için ComfyUI'nin resmi dilini `ar-SA` / `fa-IR` / `he-IL` olarak ayarlayın

**Yeni ComfyUI'de çeviri anahtarı konumu iyileştirildi**

- Anahtar artık öncelikle komut çubuğuna (ComfyUI-Manager ayar düğmesiyle aynı satıra) eklenir; başlangıçta çapa hazır değilse bekçi, hazır olduğunda onu otomatik olarak taşır. Montaj öncesi titreme koruması ve montaj sonrası kapsül kaydırıcı konumunun otomatik yeniden hesaplanması eklendi

### 2026-09-20

**Japonca (ja-JP) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Japonca çeviri paketi tamamlandı; Japonca arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `ja-JP` olarak ayarlayın

**İspanyolca (es-ES) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan İspanyolca çeviri paketi tamamlandı; İspanyolca arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `es-ES` olarak ayarlayın

**Korece (ko-KR) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Korece çeviri paketi tamamlandı; Korece arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `ko-KR` olarak ayarlayın

**Türkçe (tr-TR) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Türkçe çeviri paketi tamamlandı; Türkçe arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `tr-TR` olarak ayarlayın

**İtalyanca (it-IT) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan İtalyanca çeviri paketi tamamlandı; İtalyanca arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `it-IT` olarak ayarlayın

**Brezilya Portekizcesi (pt-BR) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Brezilya Portekizcesi çeviri paketi tamamlandı; Portekçe arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `pt-BR` olarak ayarlayın

**Almanca (de-DE) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Almanca çeviri paketi tamamlandı; Almanca arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `de-DE` olarak ayarlayın

### 2026-09-19

**Dil, resmi ayarı izliyor**

- Eklenti içindeki "çeviri dili" seçeneği kaldırıldı; çeviri dili artık ComfyUI'nin resmi dil ayarını (`Comfy.Locale`) izliyor
- Resmi dil değiştirildikten sonra sayfa otomatik olarak yenilenir; çeviri ve eklenti arayüz metinleri birlikte uygulanır, elle yeniden başlatma gerekmez

**Çok dilli ayar arayüzü ve birleşik düzen**

- Anahtar etiketleri ve ayar arayüzü metinleri 15 dili kapsıyor (Geleneksel Çince ile sağdan sola yazılan Arapça, Farsça ve İbranice dahil); bilinmeyen diller İngilizce'ye geri döner
- Ayar paneli, tüm dillerde tutarlı bir bölüm sırasını korur: anahtar stili → açılır menü seçenekleri → eklenti yöneticisi; bölüm başlıkları çevrilir
- "Eklenti Çeviri Yöneticisi" artık çift çevrilmiyor ve her zaman güncel arayüz diliyle eşleşiyor
- Anahtarın açık durumundaki etiketi `(dil kodu)` sonekini bırakıyor, yalnızca metni koruyor

### 2026-09-12

- Birden fazla çeviri dosyası aynı düğümü içerdiğinde çevirilerin kaybolması düzeltildi; artık bütünleyici biçimde birleştiriliyor
- Özel panel çevirisi desteği eklendi: paneller içindeki butonlar, etiketler, açılır menüler, ipuçları ve açılır pencereler artık otomatik olarak çevriliyor
- Bir widget "girişe dönüştürüldükten" sonra port adlarının İngilizce kalması düzeltildi
- Daha sonra oluşturulan düğümlerin de çevrilmesini sağlamak için bir çeviri koruyucusu eklendi
- Optimizasyon için 石头 (Q:34720803) kullanıcısına teşekkürler

### 2026-09-07

- Kenar çubuğundaki "İş Akışları" listesinin kendi iş akışı adlarınızı Çince'ye yanlışlıkla çevirmesi düzeltildi; artık olduğu gibi korunuyor

### 2026-08-20

- Açık ve kapalı arasında kayan mavi bir kaydırıcıya sahip "segmentli hap" anahtar stili eklendi, duruma tek bakışta hakimiyet

### 2026-07-27

**Düzeltme: V3 API düğüm widget çevirisinin başarısız olması**

- V3 API (io.Schema) ile yazılmış eklentilerde widgetların çevrilmemesi düzeltildi, örn. ComfyUI-qwenmultiangle
- **Kök neden**: V3 düğümleri genellikle bir widget için İngilizce bir `display_name` bildirir (ad `horizontal_angle`, etiket `Horizontal Angle`); eski "zaten çevrilmiş" denetimi, "etiket ≠ ad" olan her şeyi yerel bir çeviri olarak yorumlayıp atlıyordu
- **Düzeltme**: `isAlreadyTranslated` normalize edilmiş bir karşılaştırma ekledi — yalnızca adı güzelleştirilmiş (büyük/küçük harf/boşluk/alt çizgi/tire farkları) bir etiket çevrilmiş sayılmaz

**Düzeltme: Kimlik çevirilerinin "zaten çevrilmiş" kümesini kirletmesi**

- Belirli widgetların (örn. `cfg`) hiçbir düğümde hiç çevrilmemesi düzeltildi
- **Kök neden**: bazı dosyalarda kimlik girdileri (örn. `"cfg": "cfg"`) vardı; değeri `translatedValueSet` içine girdiğinde, İngilizce ad "zaten çevrilmiş" olarak yanlış yorumlanıp genel olarak engelleniyordu
- **Düzeltme**: kümeyi oluştururken değeri anahtarına eşit olan girdiler atlanır

**Çeviri dosyası düzeltmeleri**

- ComfyUI-LTXVideo içindeki anahtar yazım hataları düzeltildi (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- ComfyUI-qwenmultiangle için eksik gerçek widget adı anahtarları eklendi (`target_language`, `prompt`)

### 2026-04-08

**Düzeltme: sağ tık menüsü işlevlerinin bozulması**

- Çeviri açıkken, çıkış yuvası sağ tık menüsündeki "bağlantıyı kes" ve "portu yeniden adlandır" gibi eylemlerin yanıt vermemesine yol açan ciddi bir hata düzeltildi
- **Kök neden**: LiteGraph geri çağırmaları İngilizce `value.content` ile eşleştirerek dağıtır; çeviriden sonra eşleşme başarısız oldu
- **Düzeltme**: Geri Çağırma Sarmalama uygulandı — geri çağırma çalıştırıldığı anda İngilizce geçici olarak geri yüklenir, ardından Çince geri yüklenir; böylece hem çevrilmiş gösterim hem de doğru davranış korunur
- Hem `value.callback` (bireysel) hem `options.callback` (paylaşılan) modlarını sarar
- Tuval menüsünün iş hattından iki kez geçtikten sonra orijinal değerini kaybetmemesi için `_originalContent` çoklu çeviri üzerine yazma koruması eklendi

**Düzeltme: DOM çevirisi olay bağlarını bozuyor**

- `replaceText`'in `innerText` atamasının alt öğeleri ve Vue/PrimeVue dinleyicilerini yok etmesi düzeltildi
- **Düzeltme**: bir yaprak düğüm denetimi `target.children.length === 0` eklendi; `innerText` yalnızca çocuğu olmayan düğümlere atanır

### 2025-12-20

**Yeniden adlandırma**

- Eklentinin adı `ComfyUI-Translation-node`'den `ComfyUI-Chinese-Translation` olarak değiştirildi
- Görünen ad, eklentinin konumuyla daha iyi eşleşmesi için "Translation Node"dan "Chinese Translation"a değiştirildi

**İyileştirmeler**

- Çok dilli dosya mimarisine yeniden yapıldı (sürüm 2.0)
- ComfyUI ayarları içinde dili ve buton stilini yapılandırmak için bir ayar paneli eklendi
- Sade yerel arayüz stili seçeneği eklendi
- Yeniden başlatma sonrası simge ayarlarının kaybolması düzeltildi (topluluk üyesi 幻影'in bildirimi sayesinde)

---

## Topluluk ve Destek

**Yazarın sayfası**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili**: [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu**: 猪的飞行梦

**Topluluk grubu**

- **ComfyUI QQ grubu**: `202018000`

**Geri bildirim ve katkı**

- **Hata raporları**: [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Çeviriye katkı**: çeviri dosyaları ekleyen PR'lar bekleniyor

**Yazarı destekleyin**

Eklentiyi faydalı buluyorsanız, lütfen bir ⭐ Star vermeyi ve yazarı desteklemeyi düşünün:

- **Destek**:
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında açık kaynak olarak yayımlanmıştır.

Telif hakkı (c) 2025 猪的飞行梦

Orijinal telif hakkı bildirimini koruduğunuz sürece bu projeyi özgürce kopyalayabilir, değiştirebilir ve dağıtabilirsiniz. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

---

## Yasal Uyarı

Bu çeviri ve paylaşılan içerik aşağıdakilere tabidir:

**Ticari değil**

Bu çeviri kişisel, ücretsiz bir çalışmadır; hiçbir ücret veya ticari fayda alınmamıştır. Yalnızca öğrenme, tartışma ve bilgi paylaşımı amaçlıdır.

**Doğruluk garantisi yok**

Çeviri, orijinale sadık kalmaya özen gösterir ancak doğruluk, tamlık, güncellik veya bir amaca uygunluk konusunda hiçbir garanti vermez. Bu çevirinin kullanımı veya buna güvenmeden doğan her türlü risk ve sonuç kullanıcıya aittir.

**Orijinal kaynak atfı**

Bu çevirinin dayandığı orijinal materyallerin (metin, görüntü ve videolar dahil ancak bunlarla sınırlı olmamak üzere) telif hakkı ilgili yazarlara veya orijinal hak sahiplerine aittir. Bu çeviri, orijinal içerik üzerinde hak iddia etmez.

**Orijinale başvurun**

Önemli kararlar, yasal etki, teknik uygulama veya profesyonel yargı için lütfen her zaman bu çeviri yerine resmi orijinal sürüme danışın ve ona güvenin.

**Haklar saklıdır**

Bir hak sahibi, bu çevirinin yasal haklarını ihlal ettiğine inanıyorsa lütfen beni derhal bilgilendirin; uygun şekilde kaldırır veya düzeltirim.
