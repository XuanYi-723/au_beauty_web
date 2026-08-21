import json

# Mapping extracted by browser subagent
mapping = {
    "ampoule-de-1": "/images/ca4938e96b15c7ed6d897629de7e1674.png",
    "ampoule-de-2": "/images/25a03b5d4bd7f091e4333c7d1b9a36c0.png",
    "ampoule-de-3": "/images/6d1729b18ab97be8da45f72757d82625.png",
    "ampoule-fr-1": "/images/19e374cd202da2bc247cc2e1c44d750e.png",
    "ampoule-fr-2": "/images/a811215a6a00cdf11d2955e50845bfc6.png",
    "ampoule-fr-3": "/images/48667b7699d198f241c922959d270c0b.png",
    "ampoule-fr-4": "/images/093befffa1a89d4a03b9023f4d0f7163.png",
    "ampoule-fr-5": "/images/a98b368eeae5a81ed70fe36091a5322f.png",
    "lotion-1": "/images/65e2ebd65221011a3dc48ab027df3675.png",
    "lotion-2": "/images/a7428593272353c618bd46336ef64226.png",
    "lotion-3": "/images/077d4d4c549fd3490a7b547bfe38c3ce.png",
    "cream-1": "/images/8ccc6ba6aab9379cacb53fe6c2c4d0bd.png",
    "cream-2": "/images/b5be7641d9dea786d05e10573ac968df.png",
    "cream-3": "/images/2eb429be5959dca710ccfaba44d7b17c.png",
    "cream-4": "/images/96bcc86c1fd09eb9bba1f2d9bf226854.png",
    "repair-1": "/images/cbee6c050c64d287e41210b48db7776a.png",
    "repair-2": "/images/b37352078b5717e6d7e8977aca96f3e9.png",
    "repair-3": "/images/a74df3e197eeedf0a39d21af7cb23fcc.png",
    "acne-1": "/images/28d8af5abedda25cbb2022a71d7e2982.png",
    "acne-2": "/images/aa03cb9be240df85d693eb7b6fa6584f.png",
    "eye-1": "/images/247f13a718459287bf5391a17cb92026.png",
    "sun-1": "/images/96307d67c76398424008eca58c12eb32.png",
    "sun-2": "/images/2d2ee83d7bac2134758988a8cca29b0a.png",
    "body-1": "/images/e280dd8e11ab862964f4f5be659ca648.png",
    "body-2": "/images/75b95e9819ab9252ee85f16d97cec7c2.png",
    "mask-1": "/images/3fa16dd18f5ac4a017b875f8caca8d7d.png",
    "mask-2": "/images/80d8664f2113c7f79e0acab4071d46ee.png",
    "mask-3": "/images/0494cfc246cc163d995c5c448e3474f0.png",
    "mask-4": "/images/6233f667428d3ba0f51d6a11321c2089.png",
    "mask-5": "/images/c7899c01417d5a10f1c643336b1fddaf.png",
    "mask-6": "/images/0ff02a299261c54f2c21c632cf41425b.png"
}

json_path = r'C:\Users\Edwin\Desktop\web\src\data\products.json'

with open(json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

for product in products:
    if product['id'] in mapping:
        product['image'] = mapping[product['id']]

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Updated products.json successfully.")
