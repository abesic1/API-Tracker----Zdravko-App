const express=require("express");
const app=express();
const cors = require('cors');
const axios=require("axios");
const PORT=3000;
const {parse}=require("csv-parse/sync");

const CSV_URL="https://opendata.arcgis.com/api/v3/datasets/fcadb80196684cc09f8c8a76852a4aa9_0/downloads/data?format=csv&spatialRefId=4326&where=1%3D1";

app.use(express.static('public'));

app.use(cors());

app.use(express.json());

//napišimo funkciju koja dohvaća CSV i parsira u JSON

async function fetchCSV()
{
    const response=await axios.get(CSV_URL);
    const csvData=response.data;

    //sada ide parsiranje u JSON
    const json=parse(csvData,{
        columns:true,
        skip_empty_lines:true,
        delimiter:","
    });

    return json;
}

//ruta ili endpoint
app.get('/ustanove', async (req, res) => {
    try {
        const data = await fetchCSV();
        // Filtriraj samo Zagreb (Y koordinate ~45.7-45.85, X ~15.9-16.1)
        const zagrebUstanove = data.filter(ustanova => {
            const lat = parseFloat(ustanova.Y);
            const lng = parseFloat(ustanova.X);
            return lat >= 45.70 && lat <= 45.85 && lng >= 15.90 && lng <= 16.10;
        });
        res.json(zagrebUstanove);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




app.listen(PORT, ()=>
{
    console.log(`Server radi na portu ${PORT}`);
});
