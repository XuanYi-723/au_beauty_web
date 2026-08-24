import json
import re
import sys

# Change standard output encoding
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

with open('prices.txt', 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

word_prices = []
i = 0
while i < len(lines):
    line = lines[i]
    if "系列" in line or "於美" in line or "品名" in line or "容量" in line or "定價" in line or "9折" in line or "85折" in line or "旅行套組" in line or "黑科技" in line or "CICA發光套組" in line:
        i += 1
        continue
    
    if i + 2 < len(lines) and (lines[i+2].isdigit() or lines[i+1].isdigit()):
        if lines[i+1].isdigit():
             name = line
             volume = ""
             price = int(lines[i+1])
             i += 4
        else:
             name = line
             volume = lines[i+1]
             price = int(lines[i+2])
             i += 5
        word_prices.append({"name": name, "volume": volume, "price": price})
    else:
        i += 1

def clean_name(name):
    name = re.sub(r'\(.*?\)', '', name)
    name = re.sub(r'（.*?）', '', name)
    name = name.replace('彩', '采').replace('粹', '萃').replace('水亮', '水量')
    return name.strip()

changes = []

for product in products:
    p_name = clean_name(product['name'])
    
    match = None
    for wp in word_prices:
        wp_name = clean_name(wp['name'])
        if wp_name in p_name or p_name in wp_name:
            match = wp
            # Ensure it's not a generic match
            if "面膜" in p_name and "面膜" in wp_name and p_name != wp_name:
                pass
            else:
                break
        
        # Manual mappings
        if p_name == '高效卸潔蜜' and '高效潔顏蜜' in wp_name: match = wp; break
        if '超水感精華安瓶' in p_name and '超水感精華安瓶' in wp_name: match = wp; break
        if '光感透亮防曬乳' in p_name and '光感透亮防曬乳' in wp_name: match = wp; break
        if '清透淨白防曬乳' in p_name and '清透淨白防曬乳' in wp_name: match = wp; break
        if '3D積雪草蝸牛修護面膜' in p_name and '3D積雪草蝸牛專液面膜' in wp_name: match = wp; break
        if '蓮花水亮霜' in p_name and '蓮花水量霜' in wp_name: match = wp; break
            
    if match:
        old_price = product['price']
        new_price = match['price']
        
        # Always re-sync price just in case
        product['price'] = new_price
        
        old_display = product['priceDisplay']
        if '/片' in old_display:
            product['priceDisplay'] = f"NT$ {new_price}/片"
        elif '/盒' in old_display:
            parts = old_display.split('/盒')
            suffix = '/盒' + parts[1] if len(parts) > 1 else '/盒'
            product['priceDisplay'] = f"NT$ {new_price:,}{suffix}"
        else:
            product['priceDisplay'] = f"NT$ {new_price:,}"
            
        if old_price != new_price:
            changes.append({
                "product_name": product['name'],
                "old_price": old_price,
                "new_price": new_price
            })

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

with open('report.json', 'w', encoding='utf-8') as f:
    json.dump(changes, f, ensure_ascii=False, indent=2)

print(f"Total updated: {len(changes)}")
