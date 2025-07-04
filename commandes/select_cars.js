// Dictionnaire des engins avec leurs liens et catégorie

const select_cars = {
    'SUPERCARS': {
        'PREMUIM': {
            'BUGATTI_CHIRON': { lien: 'https://i.ibb.co/8ncyNX8S/Image-2025-02-17-13-54-01-6.jpg' },
            'MCLAREN_P1': { lien: 'https://i.ibb.co/TnG8sT3/Image-2025-02-17-13-54-01-7.jpg' },
            'KOENIGSEGG_JESKO': { lien: 'https://i.ibb.co/Xrq4MTX5/20250620-043731.jpg' },
            'ASTON_MARTIN_VALKYRIE': { lien: 'https://i.ibb.co/TqMWMHq7/20250620-044418.jpg' }
        },
        'STANDARD': {
            'LAMBORGHINI_AVENTADOR': { lien: 'https://i.ibb.co/MyBYFBqM/Image-2025-02-17-13-54-01-1.jpg' },
            'FERRARI_SF90_STRADALE': { lien: 'https://i.ibb.co/3xKZSQ1/Image-2025-02-17-13-54-01-0.jpg' },
            'PORSCHE_911_TURBO_S': { lien: 'https://i.ibb.co/Dggyqtyx/Image-2025-02-17-13-54-01-5.jpg' },
            'AUDI_R8_V10_PLUS': { lien: 'https://i.ibb.co/RGhTxTjr/20250620-050230.jpg' },
            'NISSAN_GT-R_R35': { lien: 'https://i.ibb.co/fdkLCmzs/20250620-050425.jpg' },
            'CHEVROLET_CORVETTE_C8': { lien: 'https://i.ibb.co/Hf24Kvf0/20250620-050646.jpg' }
        }
    },

    'MOTOS': {
        'PREMUIM': {
            'YAMAHA_YZF-R1': { lien: 'https://i.ibb.co/hJF7mVjD/Image-2025-02-17-13-54-02-8.jpg' },
            'BMW_S1000RR': { lien: 'https://i.ibb.co/S4jb040f/Image-2025-02-17-13-54-01-4.jpg' },
            'DUCATI_1199_SUPERLEGGERA': { lien: 'https://i.ibb.co/5x57Q0WC/20250620-044855.jpg' },
            'SUZUKI_HAYABUSA': { lien: 'https://i.ibb.co/QjJ9Q8mk/20250620-045301.jpg' }
        },
        'STANDARD': {
            'KAWASAKI_NINJA_H2R': { lien: 'https://i.ibb.co/20y2cRs/Image-2025-02-17-13-54-02-9.jpg' },
            'DUCATI_PANIGALE_V4': { lien: 'https://i.ibb.co/Hfshwqsb/Image-2025-02-17-13-54-01-3.jpg' },
            'HONDA_CBR1000RR-R': { lien: 'https://i.ibb.co/G4w850Sn/Image-2025-02-17-13-54-01-2.jpg' },
            'APRILIA_RSV4': { lien: 'https://i.ibb.co/tMfb5t5P/20250620-050942.jpg' },
            'KTM_RC_8C': { lien: 'https://i.ibb.co/35tRVzH5/20250620-051201.jpg' },
            'SUZUKI_GSX-R1000': { lien: 'https://i.ibb.co/zzY4LmH/20250620-051502.jpg' }
        }
    }
};

module.exports = {
    select_cars
};