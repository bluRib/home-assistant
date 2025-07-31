// Full Node-RED Function: Dragino payload decoder

function int16(b1, b2) {
  let v = (b1 << 8) | b2;
  if (v & 0x8000) v -= 0x10000;
  return v;
}

function Decode(fPort, bytes) {
  const d = {};
  if (!bytes || bytes.length < 7) {
    d.error = "payload too short";
    return d;
  }

  const batRaw = ((bytes[0] << 8) | bytes[1]) & 0x3FFF;
  d.BatV = batRaw / 1000;
  d.Bat_status = (bytes[0] >> 6) & 0x03; // 0..3

  d.TempC_SHT = parseFloat((int16(bytes[2], bytes[3]) / 100).toFixed(2));
  d.Hum_SHT = parseFloat((((bytes[4] << 8) | bytes[5]) / 10).toFixed(1));

  const extByte = bytes[6];
  d.poll_message_status = (extByte & 0x40) >> 6;
  d.Connect = (extByte & 0x80) >> 7;
  const Ext = extByte & 0x7F;

  if (bytes.length >= 9) {
    if (Ext === 0) {
      d.Ext_sensor = "No external sensor";
    } else if (Ext === 1) {
      d.Ext_sensor = "Temperature Sensor";
      d.TempC_DS = parseFloat((int16(bytes[7], bytes[8]) / 100).toFixed(2));
    } else if (Ext === 4) {
      d.Ext_sensor = "Interrupt Sensor send";
      d.Exti_pin_level = bytes[7] ? "High" : "Low";
      d.Exti_status = bytes[8] ? "True" : "False";
    } else if (Ext === 5) {
      d.Ext_sensor = "Illumination Sensor";
      d.ILL_lx = (bytes[7] << 8) | bytes[8];
    } else if (Ext === 6) {
      d.Ext_sensor = "ADC Sensor";
      d.ADC_mV = (bytes[7] << 8) | bytes[8];
    } else if (Ext === 7) {
      d.Ext_sensor = "Interrupt Sensor count";
      d.Count = (bytes[7] << 8) | bytes[8];
    } else {
      d.Ext_sensor = `Unknown (${Ext})`;
      d.Ext_raw_7 = bytes[7];
      d.Ext_raw_8 = bytes[8];
    }
  } else {
    d.Ext_sensor = "Payload ended before external fields";
  }

  return d;
}

function batteryStatusText(code) {
  const map = ["Ultra Low", "Low", "OK", "Good"];
  return map[code] || "Unknown";
}

const payload = msg.payload;


const bytes = Buffer.from(payload.data, "base64");


const decoded = Decode(payload.fPort, bytes);

if (decoded.TempC_SHT != null) {
  decoded.TempF_SHT = parseFloat((decoded.TempC_SHT * 9 / 5 + 32).toFixed(2));
}
if (decoded.TempC_DS != null) {
  decoded.TempF_DS = parseFloat((decoded.TempC_DS * 9 / 5 + 32).toFixed(2));
}

decoded.Bat_status_text = batteryStatusText(decoded.Bat_status);

const renameMap = {
  BatV: "battery_voltage_v",
  Bat_status: "battery_status_code",
  Bat_status_text: "battery_status",
  TempC_SHT: "temperature_c",
  TempF_SHT: "temperature_f",
  Hum_SHT: "humidity_percent",
  TempC_DS: "external_temperature_c",
  TempF_DS: "external_temperature_f",
  ILL_lx: "illuminance_lux",
  ADC_mV: "adc_millivolts",
  Count: "pulse_count",
  Ext_sensor: "external_sensor_type",
  Connect: "external_connected",
  poll_message_status: "poll_message_status",
  Exti_pin_level: "ext_interrupt_pin_level",
  Exti_status: "ext_interrupt_status",
  Ext_raw_7: "ext_raw_7",
  Ext_raw_8: "ext_raw_8"
};

const friendly = {
  timestamp: payload.timestamp,
  deviceEUI: payload.devEUI,
  fPort: payload.fPort,
  raw_hex: Buffer.from(bytes).toString("hex")
};

for (const [oldKey, newKey] of Object.entries(renameMap)) {
  if (decoded[oldKey] !== undefined) {
    friendly[newKey] = decoded[oldKey];
  }
}
// msg.payload = { ...decoded, ...friendly };
msg.payload = friendly;
return msg;
