// Nilai default untuk informasi sampel Wastewater
export const defaultWastewaterSampleInfo = {
  sampleNo: '',
  samplingLocation: '',
  samplingTime: '',
  notes: '', // Untuk catatan kaki dinamis yang diisi pengguna
};

// Setiap array merepresentasikan satu standar regulasi
// 1. KI JABABEKA Estate Regulation
export const wastewaterParamsJababeka = [
  { category: 'Physical Parameters', name: 'Temperature*', unit: '°C', standard: '40', method: 'SNI 06-6989.23-2005' },
  { name: 'Total Suspended Solids (TSS)*', unit: 'mg/L', standard: '400', method: 'SNI 6989.3:2019' },
  { name: 'Total Dissolved Solids (TDS)*', unit: 'mg/L', standard: '2000', method: 'SNI 6989.27:2019' },
  { name: 'Color*', unit: 'Pt-Co', standard: '300', method: 'SNI 6989.80-2011' },
  { category: 'Chemistry Parameters', name: 'Biological Oxygen Demand (BOD)', unit: 'mg/L', standard: '500', method: 'SNI 6989.72.2009' },
  { name: 'Chemical Oxygen Demand (COD)', unit: 'mg/L', standard: '800', method: 'SNI 6989.2-2019' },
  { name: 'pH*', unit: '-', standard: '6-9', method: 'SNI 6989.11-2019' },
  { name: 'Ammoniac (NH3-N)*', unit: 'mg/L', standard: '10', method: 'SNI 06-6989.30-2005' },
  { name: 'Detergent (MBAS)', unit: 'mg/L', standard: '5', method: 'SNI 06-6989.51 - 2005' },
  { name: 'Phenol', unit: 'mg/L', standard: '0.5', method: 'SNI 06-6989.21-2004' },
  { name: 'Vegetable Oil', unit: 'mg/L', standard: '5', method: 'SNI 6989.10 - 2011' },
  { name: 'Mineral Oil', unit: 'mg/L', standard: '15', method: 'SNI 6989.10 - 2011' },
  { name: 'Nitrate (NO3)', unit: 'mg/L', standard: '30', method: 'SNI 6989.79-2011' },
  { name: 'Nitrite (NO2)*', unit: 'mg/L', standard: '2', method: 'SNI-06 6989.9-2004' },
  { name: 'Sulfide (H2S)', unit: 'mg/L', standard: '0.1', method: 'Spectrophotometry' },
  { name: 'Arsenic (As)', unit: 'mg/L', standard: '0.1', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Barium (Ba)', unit: 'mg/L', standard: '2', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Cadmium (Cd)', unit: 'mg/L', standard: '0.05', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Chromium (Cr)', unit: 'mg/L', standard: '0.5', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Chromium Hexavalent (Cr 6+)', unit: 'mg/L', standard: '0.1', method: 'SNI 6989.71-2009' },
  { name: 'Cobalt (Co)', unit: 'mg/L', standard: '0.4', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Copper (Cu)', unit: 'mg/L', standard: '2', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Cyanide (CN)', unit: 'mg/L', standard: '0.05', method: 'SNI 6989.77 - 2011' },
  { name: 'Fluoride (F)', unit: 'mg/L', standard: '2', method: 'SNI 06-6989.29 - 2005' },
  { name: 'Iron (Fe)', unit: 'mg/L', standard: '5', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Lead (Pb)', unit: 'mg/L', standard: '0.1', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Manganese (Mn)', unit: 'mg/L', standard: '2', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Mercury (Hg)', unit: 'mg/L', standard: '0.002', method: 'Atomic Fluorescence Spectrophotometry' },
  { name: 'Nickel (Ni)', unit: 'mg/L', standard: '0.2', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Zinc (Zn)', unit: 'mg/L', standard: '5', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Stannum (Sn)', unit: 'mg/L', standard: '2', method: 'SM Sec. 3120B 23rd, 2017' },
  { name: 'Selenium (Se)', unit: 'mg/L', standard: '0.05', method: 'Atomic Fluorescence Spectrophotometry' },
];

// 2. Surya Cipta Swadaya Karawang Industrial Estate Regulation
export const wastewaterParamsSuryaCipta = [
    { category: 'Physical Parameters', name: 'Temperature*', unit: '°C', standard: '40', method: 'SNI 06-6989.23-2005' },
    { name: 'Total Dissolved Solids (TDS)*', unit: 'mg/L', standard: '2000', method: 'SNI 6989.27:2019' },
    { name: 'Total Suspended Solids (TSS)*', unit: 'mg/L', standard: '400', method: 'SNI 6989.3:2019' },
    { name: 'Color*', unit: 'Pt-Co', standard: '300', method: 'SNI 6989.80-2011' },
    { category: 'Chemistry Parameters', name: 'pH*', unit: '-', standard: '6.0-9.0', method: 'SNI 6989.11:2019' },
    { name: 'Biological Oxygen Demand (BOD)', unit: 'mg/L', standard: '600', method: 'SNI 6989.72.2009' },
    { name: 'Chemical Oxygen Demand (COD)', unit: 'mg/L', standard: '900', method: 'SNI 6989.2:2019' },
    { name: 'Detergent (MBAS)', unit: 'mg/L', standard: '5', method: 'SNI 06-6989.51-2005' },
    { name: 'Iron (Fe)', unit: 'mg/L', standard: '5', method: 'SM 23rd 3120B-2017' },
    { name: 'Manganese (Mn)', unit: 'mg/L', standard: '2', method: 'SM 23rd 3120B-2017' },
    { name: 'Copper (Cu)', unit: 'mg/L', standard: '2', method: 'SM 23rd 3120B - 2017' },
    { name: 'Zinc (Zn)', unit: 'mg/L', standard: '5', method: 'SM 23rd 3120B-2017' },
    { name: 'Chromium Hexavalent (Cr 6+)', unit: 'mg/L', standard: '0.1', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Chromium (Cr)', unit: 'mg/L', standard: '0.5', method: 'SM 23rd 3120B - 2017' },
    { name: 'Cadmium (Cd)', unit: 'mg/L', standard: '0.05', method: 'SM 23rd 3120B-2017' },
    { name: 'Mercury (Hg)', unit: 'mg/L', standard: '0.002', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Total Lead (Pb)', unit: 'mg/L', standard: '0.1', method: 'SM 23rd 3120B-2017' },
    { name: 'Stannum (Sn)', unit: 'mg/L', standard: '2', method: 'SM 23rd 3120B - 2017' },
    { name: 'Nickel (Ni)', unit: 'mg/L', standard: '0.2', method: 'SM 23rd 3120B - 2017' },
    { name: 'Arsenic (As)', unit: 'mg/L', standard: '0.1', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Selenium (Se)', unit: 'mg/L', standard: '0.05', method: 'Atomic Fluorescence Spectrophotometry' },
    { name: 'Barium (Ba)', unit: 'mg/L', standard: '2', method: 'SM 23rd 3120B - 2017' },
    { name: 'Cyanide (CN)', unit: 'mg/L', standard: '0.05', method: 'SNI 6989.77-2011' },
    { name: 'Sulfide (H2S)', unit: 'mg/L', standard: '0.05', method: 'Spectrophotometry' },
    { name: 'Fluoride (F)', unit: 'mg/L', standard: '2', method: 'SNI 06-6989.29-2005' },
    { name: 'Cobalt (Co)', unit: 'mg/L', standard: '0.4', method: 'SM 23rd 3120B - 2017' },
    { name: 'Free Chlorine (Cl2)', unit: 'mg/L', standard: '1', method: 'APHA 23rd- 4500 2017' },
    { name: 'Total Ammonia (NH3-N)*', unit: 'mg/L', standard: '30', method: 'SNI 06-6989.30:2005' },
    { name: 'Nitrate (NO3-N)', unit: 'mg/L', standard: '20', method: 'SNI 6989.79-2011' },
    { name: 'Nitrite (NO2-N)*', unit: 'mg/L', standard: '1', method: 'SNI 06-6989.9-2004' },
    { name: 'Phenol', unit: 'mg/L', standard: '0.5', method: 'SNI 06-6989.21-2004' },
    { name: 'Mineral Oil', unit: 'mg/L', standard: '5', method: 'SNI 6989.10 - 2011' },
    { name: 'Vegetable Oil', unit: 'mg/L', standard: '5', method: 'SNI 6989.10 - 2012' },
];

// 3. Minister of Environmental and Forestry Decree of Republic Indonesia No. P.68/Menlhk/Setjen/Kum.1/8/2016
export const wastewaterParamsMenlhkP68 = [
  { category: 'Physical Parameters', name: 'Total Suspended Solids (TSS)*', unit: 'mg/L', standard: '30', method: 'SNI 6989.3:2019' },
  { category: 'Chemistry Parameters', name: 'pH*', unit: '-', standard: '6-9', method: 'SNI 6989.11:2019' },
  { name: 'Biological Oxygen Demand (BOD)', unit: 'mg/L', standard: '30', method: 'SNI 6989.72.2009' },
  { name: 'Chemical Oxygen Demand (COD)', unit: 'mg/L', standard: '100', method: 'SNI 6989.2:2019' },
  { name: 'Oil and Grease', unit: 'mg/L', standard: '5', method: 'SNI 6989.10 - 2011' },
  { name: 'Ammonia (NH3)*', unit: 'mg/L', standard: '10', method: 'SNI 06-6989.30- 2005' },
  { name: 'Debit', unit: 'L/Orang/Hari', standard: '100', method: 'Direct Reading' },
  { category: 'Microbiology Parameters', name: 'Total Coliform', unit: 'MPN/100 ml', standard: '3000', method: 'SM 23rd 9221B - 2017' },
];

// ... (Tambahkan array untuk setiap regulasi lain dengan cara yang sama)
// wastewaterParamsMM2100, wastewaterParamsMM2100CatC, wastewaterParamsLippo, dst.
