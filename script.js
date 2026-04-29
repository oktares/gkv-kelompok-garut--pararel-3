// Memanggil file data CSV
Plotly.d3.csv("AHH_Dataset_2020_2024.csv", function(err, rows) {
    if (err) throw err;

    // 1. FILTER: Ambil hanya tahun 2024 dan tingkat Kabupaten/Kota
    const dataFiltered = rows.filter(d => d.tahun === "2024" && d.tipe === "Kabupaten/Kota");

    // 2. SORTING: Urutkan dari yang tertinggi agar grafik rapi
    const sortedData = dataFiltered.sort((a, b) => b.ahh_gabungan - a.ahh_gabungan).slice(0, 15);

    // 3. DEFINISIKAN TRACE (Grafik Sumbu X-Y)
    var trace = {
        x: sortedData.map(d => d.wilayah), // Nama wilayah di sumbu X
        y: sortedData.map(d => d.ahh_gabungan), // Nilai AHH di sumbu Y
        mode: 'markers+lines', // Titik yang terhubung garis agar terlihat trennya
        type: 'scatter', // Pastikan 'scatter' agar tidak ke laut
        marker: {
            size: 15,
            color: '#00d4ff', // Warna biru cerah sesuai tema dashboard
            line: { color: 'white', width: 1 }
        },
        line: { shape: 'spline', color: '#00d4ff' } // Garis melengkung halus
    };

    // 4. ATUR LAYOUT (Agar pas dengan dashboard gelap)
    var layout = {
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: { color: '#e2e8f0' },
        xaxis: { 
            tickangle: -45,
            gridcolor: 'rgba(255,255,255,0.05)'
        },
        yaxis: { 
            range: [60, 80],
            gridcolor: 'rgba(255,255,255,0.05)',
            title: 'Tahun Harapan Hidup'
        },
        margin: { t: 50, b: 150, l: 50, r: 50 }
    };

    // 5. RENDER: Gunakan ID 'main-chart' yang ada di HTML-mu
    Plotly.newPlot('main-chart', [trace], layout, {responsive: true});
});