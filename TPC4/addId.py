import json

file = open('cinema.json', 'r', encoding='utf-8') 
data = json.load(file)
file.close()

for i, movie in enumerate(data['filmes']):
    movie['id'] = 'f' + str(i)  
file = open('cinema.json', 'w', encoding='utf-8') 
json.dump(data, file, indent= 2, ensure_ascii=False)
file.close()