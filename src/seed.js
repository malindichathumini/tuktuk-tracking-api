import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Province from './models/Province.js';
import District from './models/District.js';
import PoliceStation from './models/PoliceStation.js';
import TukTuk from './models/TukTuk.js';
import LocationPing from './models/LocationPing.js';

dotenv.config({ path: './.env' });

const provinces = [
  { name: 'Western', code: 'WP' },
  { name: 'Central', code: 'CP' },
  { name: 'Southern', code: 'SP' },
  { name: 'Northern', code: 'NP' },
  { name: 'Eastern', code: 'EP' },
  { name: 'North Western', code: 'NWP' },
  { name: 'North Central', code: 'NCP' },
  { name: 'Uva', code: 'UP' },
  { name: 'Sabaragamuwa', code: 'SGP' },
];

const districtsByProvince = {
  WP: ['Colombo', 'Gampaha', 'Kalutara'],
  CP: ['Kandy', 'Matale', 'Nuwara Eliya'],
  SP: ['Galle', 'Matara', 'Hambantota'],
  NP: ['Jaffna', 'Kilinochchi', 'Mannar'],
  EP: ['Trincomalee', 'Batticaloa', 'Ampara'],
  NWP: ['Kurunegala', 'Puttalam'],
  NCP: ['Anuradhapura', 'Polonnaruwa'],
  UP: ['Badulla', 'Monaragala'],
  SGP: ['Ratnapura', 'Kegalle'],
};

const stationsByDistrict = {
  Colombo: ['Colombo Fort PS', 'Wellawatte PS', 'Borella PS'],
  Gampaha: ['Gampaha PS', 'Negombo PS'],
  Kandy: ['Kandy PS', 'Peradeniya PS'],
  Galle: ['Galle PS', 'Hikkaduwa PS'],
  Jaffna: ['Jaffna PS', 'Nallur PS'],
  Kurunegala: ['Kurunegala PS', 'Kuliyapitiya PS'],
  Anuradhapura: ['Anuradhapura PS', 'Medawachchiya PS'],
  Badulla: ['Badulla PS', 'Bandarawela PS'],
  Ratnapura: ['Ratnapura PS', 'Embilipitiya PS'],
  Trincomalee: ['Trincomalee PS', 'Kinniya PS'],
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    await Province.deleteMany({});
    await District.deleteMany({});
    await PoliceStation.deleteMany({});
    await TukTuk.deleteMany({});
    await LocationPing.deleteMany({});
    console.log('Cleared old data');

    const createdProvinces = await Province.insertMany(provinces);
    console.log('Provinces created');

    const provinceMap = {};
    createdProvinces.forEach(p => provinceMap[p.code] = p._id);

    const districtDocs = [];
    for (const [code, districts] of Object.entries(districtsByProvince)) {
      for (const name of districts) {
        districtDocs.push({
  name,
  code: name.substring(0, 3).toUpperCase() + '_' + code,
  province: provinceMap[code]
});
      }
    }
    const createdDistricts = await District.insertMany(districtDocs);
    console.log('Districts created');

    const districtMap = {};
    createdDistricts.forEach(d => districtMap[d.name] = d);

    const stationDocs = [];
    for (const [districtName, stations] of Object.entries(stationsByDistrict)) {
      const district = districtMap[districtName];
      if (district) {
        for (const name of stations) {
          stationDocs.push({
            name,
            code: name.replace(/\s/g, '').substring(0, 6).toUpperCase(),
            district: district._id,
            province: district.province
          });
        }
      }
    }
    await PoliceStation.insertMany(stationDocs);
    console.log('Police stations created');

    const tukTukDocs = [];
    for (let i = 1; i <= 200; i++) {
      const district = createdDistricts[i % createdDistricts.length];
      tukTukDocs.push({
        registrationNumber: `WP-${String(i).padStart(4, '0')}`,
        driverName: `Driver ${i}`,
        driverNIC: `${900000000 + i}V`,
        driverPhone: `07${String(10000000 + i)}`,
        district: district._id,
        province: district.province,
        deviceId: `DEVICE-${String(i).padStart(4, '0')}`,
        status: 'active'
      });
    }
    const createdTukTuks = await TukTuk.insertMany(tukTukDocs);
    console.log('200 TukTuks created');

    const pingDocs = [];
    const now = new Date();
    for (const tukTuk of createdTukTuks) {
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour += 4) {
          pingDocs.push({
            tukTuk: tukTuk._id,
            latitude: 6.9271 + (Math.random() - 0.5) * 2,
            longitude: 79.8612 + (Math.random() - 0.5) * 2,
            speed: Math.floor(Math.random() * 60),
            timestamp: new Date(now - (day * 24 + hour) * 3600000),
            district: tukTuk.district,
            province: tukTuk.province
          });
        }
      }
    }
    await LocationPing.insertMany(pingDocs);
    console.log('Location pings created');

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();