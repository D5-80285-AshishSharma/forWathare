**Summary**

The bar graph (stacked) in the `GraphComplete` folder takes data from a MySQL database - `server.js` exposes the endpoints and displays it using the React app - `frontend` folder.

In the new "Frontend", the canvas (HTML) container broke on Firefox but worked fine on Chrome. If you want your presentation layer to be in Firefox, use a previous version of the component such as "HorizontalStackedBarChart copy 4" which is in the same folder.

For MongoDB, you can use `mongosh` and `mongoimport`:

```bash
mongoimport "file path" -d databaseNaamDb -c collectionNaam --jsonArray --drop
```
Use this command to  store the JSON directly into your database (before the server.js does the operations to enter it into MySQL) and then export a JSON file:

```bash
mongoexport "file path" -db databaseNaamDb -collection collectionNaam --out ourData.json
```
Then expose it using Node.js.



