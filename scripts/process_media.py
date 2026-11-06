import os
import re
import subprocess
import json

SOURCE_DIR = "/Users/ndecr_/Desktop/grossesse_emma"
PROJECT_DIR = "/Users/ndecr_/working_directory--local/perso/grossesse-emma"
MEDIA_DIR = os.path.join(PROJECT_DIR, "public", "media")
FULL_DIR = os.path.join(MEDIA_DIR, "full")
THUMB_DIR = os.path.join(MEDIA_DIR, "thumb")
DATA_FILE = os.path.join(PROJECT_DIR, "src", "data", "pregnancyData.ts")

os.makedirs(FULL_DIR, exist_ok=True)
os.makedirs(THUMB_DIR, exist_ok=True)
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

MONTH_METADATA = {
    "02_mois": {
        "monthNumber": 2,
        "title": "2ème Mois",
        "badge": "1er Trimestre",
        "tagline": "Les premiers battements & le doux secret",
        "babyComparison": "Une petite framboise",
        "babySize": "~1.5 cm",
        "dateRange": "Décembre 2025",
        "quote": "Un tout petit cœur commence à battre au creux du ventre... Le début d'un amour sans limite.",
        "icon": "FaHeart"
    },
    "03_mois": {
        "monthNumber": 3,
        "title": "3ème Mois",
        "badge": "1er Trimestre",
        "tagline": "La fin du premier trimestre",
        "babyComparison": "Une belle prune",
        "babySize": "~6 à 7 cm",
        "dateRange": "Janvier - Février 2026",
        "quote": "Les petits doigts et les orteils sont formés, tout devient si concret et merveilleux.",
        "icon": "FaRegSmileBeam"
    },
    "04_mois": {
        "monthNumber": 4,
        "title": "4ème Mois",
        "badge": "2ème Trimestre",
        "tagline": "La silhouette qui s'arrondit doucement",
        "babyComparison": "Un petit avocat",
        "babySize": "~13 cm",
        "dateRange": "Janvier 2026",
        "quote": "Le deuxième trimestre s'ouvre avec sérénité et une silhouette qui commence délicatement à se deviner.",
        "icon": "FaSparkles"
    },
    "05_mois": {
        "monthNumber": 5,
        "title": "5ème Mois",
        "badge": "2ème Trimestre",
        "tagline": "La douce mi-parcours & premiers petits coups",
        "babyComparison": "Une belle mangue",
        "babySize": "~25 cm",
        "dateRange": "Février - Mars 2026",
        "quote": "Des papillons dans le ventre qui se transforment en petits frémissements inoubliables.",
        "icon": "FaBaby"
    },
    "06_mois": {
        "monthNumber": 6,
        "title": "6ème Mois",
        "badge": "2ème Trimestre",
        "tagline": "Bébé s'exprime et danse dans le ventre",
        "babyComparison": "Un épi de maïs",
        "babySize": "~30 cm",
        "dateRange": "Mars - Avril 2026",
        "quote": "Bébé reconnaît les voix douces de papa et maman, et réagit à chaque caresse.",
        "icon": "FaMusic"
    },
    "07_mois": {
        "monthNumber": 7,
        "title": "7ème Mois",
        "badge": "3ème Trimestre",
        "tagline": "Le troisième trimestre & le nid qui se prépare",
        "babyComparison": "Une noix de coco",
        "babySize": "~38 cm",
        "dateRange": "Avril 2026",
        "quote": "Un ventre magnifiquement rond, des petits pieds qu'on devine sous la peau et des instants magiques en vidéo.",
        "icon": "FaVideo"
    },
    "08_mois": {
        "monthNumber": 8,
        "title": "8ème Mois",
        "badge": "3ème Trimestre",
        "tagline": "La dernière ligne droite dans le cocon",
        "babyComparison": "Un bel ananas",
        "babySize": "~44 cm",
        "dateRange": "Avril - Juin 2026",
        "quote": "Tout s'accélère doucement : la chambre est presque prête, nos cœurs débordent d'impatience.",
        "icon": "FaHome"
    },
    "09_mois": {
        "monthNumber": 9,
        "title": "9ème Mois",
        "badge": "3ème Trimestre",
        "tagline": "L'ultime attente : prêts pour la rencontre !",
        "babyComparison": "Une pastèque d'amour",
        "babySize": "~50 cm",
        "dateRange": "Juin 2026",
        "quote": "Chaque jour nous rapproche de tes premiers regards et de tes premiers sourires. On t'attend avec tant d'amour.",
        "icon": "FaStar"
    }
}

MONTHS_FR = {
    '01': 'Janvier', '02': 'Février', '03': 'Mars', '04': 'Avril',
    '05': 'Mai', '06': 'Juin', '07': 'Juillet', '08': 'Août',
    '09': 'Septembre', '10': 'Octobre', '11': 'Novembre', '12': 'Décembre'
}

DAYS_FR = {
    'lundi': 'Lundi', 'mardi': 'Mardi', 'mercredi': 'Mercredi', 'merdredi': 'Mercredi',
    'jeudi': 'Jeudi', 'vendredi': 'Vendredi', 'samedi': 'Samedi', 'dimanche': 'Dimanche'
}

def parse_filename_info(filename, month_folder):
    isVideo = filename.lower().endswith('.mov') or filename.lower().endswith('.mp4')
    
    # Try date pattern DDMMYY
    date_match = re.search(r'(\d{2})(\d{2})(\d{2})', filename)
    day_match = re.search(r'(lundi|mardi|mercredi|merdredi|jeudi|vendredi|samedi|dimanche)', filename.lower())
    seq_match = re.search(r'_(\d+)_(lundi|mardi|mercredi|merdredi|jeudi|vendredi|samedi|dimanche)', filename.lower())
    
    day_name = DAYS_FR.get(day_match.group(1), '') if day_match else ''
    seq_num = seq_match.group(1) if seq_match else ''
    
    if date_match:
        d, m, y = date_match.group(1), date_match.group(2), date_match.group(3)
        year_full = "20" + y
        month_name = MONTHS_FR.get(m, m)
        date_iso = f"{year_full}-{m}-{d}"
        
        display_date = f"{day_name} {int(d)} {month_name} {year_full}".strip()
        short_date = f"{int(d)} {month_name}"
        if seq_num:
            title = f"{display_date} • Souvenir #{seq_num}"
        else:
            title = display_date
    else:
        # Milestone intro photo
        month_info = MONTH_METADATA.get(month_folder, {})
        m_num = month_info.get("monthNumber", "")
        title = f"Capsule souvenir • Mois {m_num}"
        display_date = f"Mois {m_num} de grossesse"
        short_date = f"Mois {m_num}"
        date_iso = f"2026-{month_folder[:2]}-01"
    
    return {
        "title": title,
        "displayDate": display_date,
        "shortDate": short_date,
        "dateIso": date_iso,
        "isVideo": isVideo
    }

def get_dimensions(filepath):
    try:
        out = subprocess.check_output(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', filepath], text=True)
        w = re.search(r'pixelWidth:\s*(\d+)', out)
        h = re.search(r'pixelHeight:\s*(\d+)', out)
        if w and h:
            return int(w.group(1)), int(h.group(1))
    except Exception as e:
        pass
    return 1200, 1600

months_list = sorted([d for d in os.listdir(SOURCE_DIR) if os.path.isdir(os.path.join(SOURCE_DIR, d)) and not d.startswith('.')])
all_data = []

total_count = 0
for m_dir in months_list:
    m_path = os.path.join(SOURCE_DIR, m_dir)
    files = sorted([f for f in os.listdir(m_path) if not f.startswith('.')])
    
    meta = MONTH_METADATA.get(m_dir, {
        "monthNumber": int(m_dir[:2]),
        "title": f"Mois {m_dir[:2]}",
        "badge": "Grossesse",
        "tagline": "Souvenirs de grossesse",
        "babyComparison": "Petit trésor",
        "babySize": "--",
        "dateRange": "",
        "quote": "Chaque jour est une merveille.",
        "icon": "FaBaby"
    })
    
    month_items = []
    
    for f in files:
        total_count += 1
        src_file = os.path.join(m_path, f)
        info = parse_filename_info(f, m_dir)
        
        # Clean safe ID
        safe_name = re.sub(r'[^a-zA-Z0-9_-]', '_', os.path.splitext(f)[0])
        file_id = f"{m_dir}_{safe_name}"
        
        if info["isVideo"]:
            # Video: convert to MP4 & extract thumb
            dst_full_rel = f"media/full/{file_id}.mp4"
            dst_thumb_rel = f"media/thumb/{file_id}.jpg"
            dst_full_abs = os.path.join(PROJECT_DIR, "public", dst_full_rel)
            dst_thumb_abs = os.path.join(PROJECT_DIR, "public", dst_thumb_rel)
            
            print(f"Converting video {f} -> {dst_full_rel}...")
            subprocess.run([
                'ffmpeg', '-y', '-i', src_file,
                '-vcodec', 'libx264', '-crf', '24', '-preset', 'fast',
                '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                '-acodec', 'aac', '-b:a', '128k',
                '-vf', 'scale=-2:720',
                dst_full_abs
            ], check=True, stderr=subprocess.DEVNULL)
            
            # Extract poster frame at 0.5s
            subprocess.run([
                'ffmpeg', '-y', '-ss', '00:00:00.5', '-i', src_file,
                '-vframes', '1', '-q:v', '2',
                dst_thumb_abs
            ], check=True, stderr=subprocess.DEVNULL)
            
            w, h = get_dimensions(dst_thumb_abs)
        else:
            # Image: convert with sips
            dst_full_rel = f"media/full/{file_id}.jpg"
            dst_thumb_rel = f"media/thumb/{file_id}.jpg"
            dst_full_abs = os.path.join(PROJECT_DIR, "public", dst_full_rel)
            dst_thumb_abs = os.path.join(PROJECT_DIR, "public", dst_thumb_rel)
            
            print(f"Optimizing image {f}...")
            # High-res full version max 1600px
            subprocess.run([
                'sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '85',
                '-Z', '1600', src_file, '--out', dst_full_abs
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            # Thumb version max 480px
            subprocess.run([
                'sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '80',
                '-Z', '480', src_file, '--out', dst_thumb_abs
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
            w, h = get_dimensions(dst_full_abs)
        
        item = {
            "id": file_id,
            "filename": f,
            "title": info["title"],
            "displayDate": info["displayDate"],
            "shortDate": info["shortDate"],
            "dateIso": info["dateIso"],
            "monthId": m_dir,
            "monthNumber": meta["monthNumber"],
            "isVideo": info["isVideo"],
            "fullUrl": dst_full_rel,
            "thumbUrl": dst_thumb_rel,
            "width": w,
            "height": h,
            "aspectRatio": round(w / h, 3) if h else 0.75
        }
        month_items.append(item)
    
    month_data = {
        "id": m_dir,
        "monthNumber": meta["monthNumber"],
        "title": meta["title"],
        "badge": meta["badge"],
        "tagline": meta["tagline"],
        "babyComparison": meta["babyComparison"],
        "babySize": meta["babySize"],
        "dateRange": meta["dateRange"],
        "quote": meta["quote"],
        "icon": meta["icon"],
        "items": month_items,
        "totalItems": len(month_items)
    }
    all_data.append(month_data)

ts_content = f"""// Données générées automatiquement à partir des photos de grossesse d'Emma
export interface MediaItem {{
  id: string;
  filename: string;
  title: string;
  displayDate: string;
  shortDate: string;
  dateIso: string;
  monthId: string;
  monthNumber: number;
  isVideo: boolean;
  fullUrl: string;
  thumbUrl: string;
  width: number;
  height: number;
  aspectRatio: number;
}}

export interface MonthSection {{
  id: string;
  monthNumber: number;
  title: string;
  badge: string;
  tagline: string;
  babyComparison: string;
  babySize: string;
  dateRange: string;
  quote: string;
  icon: string;
  totalItems: number;
  items: MediaItem[];
}}

export const PREGNANCY_MONTHS: MonthSection[] = {json.dumps(all_data, indent=2, ensure_ascii=False)};

export const ALL_MEDIA_ITEMS: MediaItem[] = PREGNANCY_MONTHS.flatMap(m => m.items);

export const TOTAL_PHOTOS = ALL_MEDIA_ITEMS.filter(m => !m.isVideo).length;
export const TOTAL_VIDEOS = ALL_MEDIA_ITEMS.filter(m => m.isVideo).length;
export const TOTAL_MONTHS = PREGNANCY_MONTHS.length;
"""

with open(DATA_FILE, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Finished processing! Total items: {total_count}. Data saved to {DATA_FILE}")
