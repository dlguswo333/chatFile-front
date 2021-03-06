import re
regex = re.compile(r"data\['(.+)'\].*=.*'(.+)'")
with open('src/data.json', 'r') as f:
    while True:
        line = f.readline()
        if not line:
            break
        rst = regex.match(line)
        if rst:
            print('"', rst.groups()[0], '"', ':', '"', rst.groups()[1], '",', sep='')
