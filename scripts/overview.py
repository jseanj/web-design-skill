#!/usr/bin/env python3
"""Compose the README overview from the actual desktop screenshots.

Optional authoring dependency: Pillow. No dependency is required by the site.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parent.parent
previews = root / 'docs/previews'
cases = [
    ('coffee-passport', '01 抄现实 / 咖啡订阅'),
    ('offgrid-festival', '02 圆、方、三角 / 创意设计节'),
    ('aperture-lens', '03 断臂之美 / 摄影镜头'),
    ('sol-fragrance', '04 欲擒故纵 / 独立香氛'),
    ('shift-running', '05 乾坤大挪移 / 城市跑团'),
    ('field-notes', '06 杂志版式 / 建筑杂志'),
    ('north-travel', '07 全屏大视野 / 户外旅行'),
    ('kaiwu-workshop', '08 文字衣橱 / 工作坊报名'),
    ('loop-impact', '09 信息图形化 / 环保报告'),
    ('crumb-bakery', '10 钉钉铆铆 / 手作烘焙'),
]

def font(candidates, size):
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default(size=size)

zh = font([
    '/System/Library/Fonts/Supplemental/Songti.ttc',
    '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',
    'C:/Windows/Fonts/msyh.ttc',
], 23)
latin = font(['/System/Library/Fonts/HelveticaNeue.ttc', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'], 48)
small = font(['/System/Library/Fonts/HelveticaNeue.ttc', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'], 14)
output = Image.new('RGB', (1600, 2630), '#e8e9e0')
draw = ImageDraw.Draw(output)
draw.text((44, 35), 'WEB DESIGN SKILL', font=latin, fill='#2c3d2c')
draw.text((46, 102), 'TEN METHODS / TEN CONTEXTS / INTERACTIVE CONCEPTS', font=small, fill='#65745b')
for index, (slug, label) in enumerate(cases):
    x, y = 35 + index % 2 * 785, 150 + index // 2 * 487
    with Image.open(previews / f'{slug}.jpg') as source:
        thumb = source.crop((0, 0, 1440, 850)).resize((750, 443), Image.Resampling.LANCZOS)
        output.paste(thumb, (x, y))
    draw.text((x + 4, y + 452), label, font=zh, fill='#33472e')
draw.text((44, 2600), 'CONCEPT EXAMPLES / SOURCE, PROMPTS & VERIFICATION INCLUDED', font=small, fill='#65745b')
output.save(previews / 'overview.jpg', quality=92)
print('Created docs/previews/overview.jpg from browser captures.')
