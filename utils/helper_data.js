import http from 'k6/http';

function uuidV4() {
    const uuid = new Array(36);
    for (let i = 0; i < 36; i++) {
      uuid[i] = Math.floor(Math.random() * 16);
    }
    uuid[14] = 4; // set bits 12-15 of time-high-and-version to 0100
    uuid[19] = uuid[19] &= ~(1 << 2); // set bit 6 of clock-seq-and-reserved to zero
    uuid[19] = uuid[19] |= (1 << 3); // set bit 7 of clock-seq-and-reserved to one
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    return uuid.map((x) => x.toString(16)).join('');
  }

export const fileData = open('../files/16Mb.jpeg', 'b');
export const data = {
    id: uuidV4(), // Replace with actual id
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

    // Boolean fields as explicit strings:
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
