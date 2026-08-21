import os

img_dir = r'C:\Users\Edwin\Desktop\web\public\images'
files = [f for f in os.listdir(img_dir) if f.startswith('imgi_') and (f.endswith('.png') or f.endswith('.jpg'))]

# Sort by the integer index in the filename
def extract_idx(f):
    parts = f.split('_')
    if len(parts) > 1 and parts[1].isdigit():
        return int(parts[1])
    return 999

files.sort(key=extract_idx)

html_content = '<html><body><h1>Image Preview</h1>\n'
for f in files:
    html_content += f'<div style="margin-bottom: 20px;"><h3>{f}</h3><img src="{f}" style="max-width: 400px;" /></div>\n'
html_content += '</body></html>'

with open(r'C:\Users\Edwin\Desktop\web\public\images\preview.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
