import http from 'k6/http';
import { check, sleep } from 'k6';
import {
  baseUrl,
  loginAndGetAuthDetailsAdm1,
  loginAndGetAuthDetailsAdm2,
  companyId,
  pole1ID,
  pole2ID,
} from '../utils/helper.js';

export const options = {
  vus: 10,
  duration: '30s',
};

function uuidV4() {
  const uuid = new Array(36);
  for (let i = 0; i < 36; i++) {
    uuid[i] = Math.floor(Math.random() * 16);
  }
  uuid[14] = 4;
  uuid[19] = (uuid[19] & 0x3) | 0x8;
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
  return uuid.map((x) => x.toString(16)).join('');
};

const imgData = open('../files/16Mb.jpeg', 'b');

export default function () {
  const data1 = {
    id: uuidV4(), // ✅ Unique per upload
    'data[phoneAngle]': '45',
    'data[bottomX]': '100',
    'data[bottomY]': '200',
    'data[points][0][x]': '150',
    'data[points][0][y]': '250',
    'data[points][0][distance]': '10',
    type: 'measure',
    range_finder_distance_feet: '12',
    range_finder_distance_inch: '6',
    comment: 'Test image upload',
    'tracking[excessive_motion]': 0,
    'tracking[focus_out]': 0,
    'tracking[hold_straight]': 0,
    'tracking[front_rotation]': '0',
    'tracking[side_rotation]': '0',
    'condition[focus_distance]': '1.2',
    'condition[took_photo_time]': '1617181920',
    'condition[front_tilt_angle]': '90',
    'condition[back_tilt_angle]': '90',
    'condition[side_left_tilt_angle]': '0',
    'condition[side_right_tilt_angle]': '0',
    'condition[max_front_tilt_angle]': '0',
    'condition[max_back_tilt_angle]': '0',
    'condition[max_side_left_tilt_angle]': '0',
    'condition[max_side_right_tilt_angle]': '0',
    'condition[light_lux]': '500',
    'condition[light_kelvin]': '5500',
    'condition[max_angular_velocity]': '0.01',
    'condition[max_device_acceleration]': '0.02',
    'condition[max_interference_acceleration]': '0.01',
    'condition[battery_heat]': 0,
    'condition[roulette_front_tilt_angle]': '0',
    'condition[roulette_side_tilt_angle]': '0',
    'condition[focus_position_x]': '0.0',
    'condition[focus_position_y]': '0.0',
    'condition[focus_position_z]': '0.0',
    'condition[camera_position_x]': '0.0',
    'condition[camera_position_y]': '0.0',
    'condition[camera_position_z]': '0.0',
    'correction[base_correction]': '0.0000',
    'raw_points[raw_points_device_placed]': '1',
    'raw_points[raw_points_photo_taken]': '1',
    'locations[ruler_location][lat]': '37.7749',
    'locations[ruler_location][lng]': '-122.4194',
    'locations[device_location][lat]': '37.7749',
    'locations[device_location][lng]': '-122.4194',
  };
const data2 =  { ...data1, id: uuidV4() }; // ✅ Unique ID for pole2
  const { token: token1 } = loginAndGetAuthDetailsAdm1();
  const { token: token2 } = loginAndGetAuthDetailsAdm2();

  console.log(`🔐 Token1: ${token1}`);
  console.log(`🔐 Token2: ${token2}`);

  const headers1 = {
    Authorization: `Bearer ${token1}`,
    'x-company': companyId,
    accept: 'application/json',
  };

  const headers2 = {
    Authorization: `Bearer ${token2}`,
    'x-company': companyId,
    accept: 'application/json',
  };

  const files = {
    file: http.file(imgData, '16Mb.jpeg', 'image/jpeg'),
  };

  const res1 = http.post(`${baseUrl}/pole/${pole1ID}/photo`, { ...data1, ...files }, { headers: headers1 });
  const res2 = http.post(`${baseUrl}/pole/${pole2ID}/photo`, { ...data2, ...files }, { headers: headers2 });

  check(res1, {
    'Upload to pole1 succeeded': (r) => r.status === 201,
  });

  check(res2, {
    'Upload to pole2 succeeded': (r) => r.status === 201,
  });

  console.log(`📸 Pole1 response status: ${res1.status}`);
  console.log(`📸 Pole2 response status: ${res2.status}`);
  console.log(`Request duration (total): ${res1.timings.duration} ms`);
  console.log(`Request duration (total): ${res2.timings.duration} ms`);
  //console.log(`📸 Pole1 response body: ${res1.body}`);
  //console.log(`📸 Pole2 response body: ${res2.body}`);

  //sleep(1);
}
