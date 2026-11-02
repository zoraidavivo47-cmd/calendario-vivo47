VIVO 47 — Dashboard Calendario 2027

PUBLICACIÓN EN GITHUB PAGES
1. Crea un repositorio público nuevo en GitHub (por ejemplo: calendario-vivo47).
2. Sube los archivos index.html, styles.css, app.js, data.js y calendario.csv en la raíz.
3. En Settings > Pages > Build and deployment elige Deploy from a branch, main y /(root). Guarda.
4. Espera la publicación y comparte la URL que muestre GitHub.

DATOS
Esta versión contiene una copia del calendario exportado desde Google Sheets el 2 de noviembre de 2026. Se utiliza como respaldo si Google Sheets no está disponible; la web consulta también la fuente publicada actualizada.
Para actualizar: descarga la pestaña Lista de Google Sheets como CSV y ejecuta el script opcional actualizar_datos.py con Python 3, o solicita regenerar data.js. Luego sube el nuevo data.js a GitHub.
No publiques información sensible: GitHub Pages público permite que cualquier persona lea los datos del sitio.

ARCHIVO ORIGINAL
https://docs.google.com/spreadsheets/d/1qm0XuBPnbMGwpTr-xz6oTNQUgctQ6z-hAoEGCmpYU6E/edit

ACTUALIZACIÓN AUTOMÁTICA
La web lee la publicación CSV de la pestaña Lista de Google Sheets al abrirse, cada 60 segundos mientras está visible y al volver a la pestaña. Google puede tardar unos minutos en republicar los cambios. Mantener las columnas FECHA, DÍA, ACTIVIDAD, HORARIO, LUGAR, PARTICIPANTES y DURACIÓN. La publicación automática de Lista debe permanecer activa. Si la conexión falla, se conserva la última copia disponible y se muestra un aviso. REVISAR y LÉEME no están publicadas.
