import csv,json,pathlib,sys
p=pathlib.Path(sys.argv[1] if len(sys.argv)>1 else "calendario.csv")
with p.open(encoding="utf-8-sig",newline="") as f: rows=list(csv.reader(f))
pathlib.Path("data.js").write_text("window.CALENDAR_DATA = "+json.dumps(rows[1:],ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf-8")
print(f"Actualizadas {len(rows)-1} actividades")
