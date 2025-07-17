// Nilai default untuk informasi sampel Vibration
export const defaultVibrationSampleInfo = {
  sampleNo: '',
  samplingLocation: '', // Ditambahkan
  samplingTime: '',   // Ditambahkan
  notes: '', 
};

// Regulasi: Permenaker No. 05 Tahun 2018 (Getaran Seluruh Tubuh)
export const vibrationParamsPermenaker5 = [
  { location: '', time: '', unit: 'm/s2', testingResult: '', method: 'Direct Reading' },
];

// Data referensi untuk Permenaker No. 05/2018
export const vibrationReferencePermenaker5 = [
    { exposure: '0.5', threshold: '3.4644' },
    { exposure: '1', threshold: '2.4497' },
    { exposure: '2', threshold: '1.7322' },
    { exposure: '4', threshold: '1.2249' },
    { exposure: '8', threshold: '0.8661' },
];

// Regulasi: KepmenLH No. 49/1996 (Getaran Kejut)
export const vibrationParamsKepmenlh49_Kejut = [
    { location: '', description: 'Vibration at Frequency (Hz)', unit: 'm/s', testingResult: '', time: '', standard: { A: '<2', B: '2-27', C: '>27-40', D: '>140' }, method: 'Direct Reading' },
];

// Regulasi: KepmenLH No. 49/1996 (Kelas III)
export const vibrationParamsKepmenlh49_Class3 = [
    { location: '', testingResult: '', time: '', standard: { foundation_lt_10: '<10 Hz', foundation_10_15: '10-15 Hz', foundation_50_100: '50-100 Hz', foundation_mix: 'Frequency Mix' }, unit: 'Hz', method: 'Direct Reading' },
];

// Regulasi: KepmenLH No. 49/1996 (Kelas II)
export const vibrationParamsKepmenlh49_Class2 = [
    { location: '', time: '', frequency: '4', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 2', B: '2 – 27', C: '>27 - 40', D: '>140' } },
    { location: '', time: '', frequency: '5', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 7.5', B: '< 7.5 – 25', C: '>24 – 130', D: '>130' } },
    { location: '', time: '', frequency: '6.3', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 7', B: '< 7 – 21', C: '>21 – 110', D: '>110' } },
    { location: '', time: '', frequency: '8', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 6', B: '< 6 - 19', C: '>19 – 100', D: '>100' } },
    { location: '', time: '', frequency: '10', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 5.2', B: '< 5.2 – 16', C: '>16 – 90', D: '>90' } },
    { location: '', time: '', frequency: '12.5', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 4.8', B: '< 4.8 – 15', C: '>15 – 80', D: '>80' } },
    { location: '', time: '', frequency: '16', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 4', B: '< 4 – 14', C: '>14 – 70', D: '>70' } },
    { location: '', time: '', frequency: '20', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 3.8', B: '< 3.8 – 12', C: '>12 – 67', D: '>67' } },
    { location: '', time: '', frequency: '25', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 3.2', B: '<3.2 – 10', C: '>10 – 60', D: '>60' } },
    { location: '', time: '', frequency: '31.5', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 3', B: '< 3 – 9', C: '>9 – 53', D: '>53' } },
    { location: '', time: '', frequency: '40', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 2', B: '< 2 – 8', C: '>8 – 50', D: '>50' } },
    { location: '', time: '', frequency: '50', unit: 'mm/s', method: 'Direct Reading', peakLimit: { A: '< 1', B: '< 1 - 7', C: '>7 - 42', D: '>42' } },
];
