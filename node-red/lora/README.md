# Node-RED LoRaWAN Sensors Workflow

This folder contains the full Node-RED flow configuration for decoding and routing data from Dragino LHT65N LoRaWAN sensors. The flow is designed to ingest uplinks via MQTT, decode the payload, and publish data to Home Assistant and MQTT topics based on the device EUI.

---

## Overview

This flow handles the following:

- **MQTT Ingest** from Dragino LHT65N devices (uplinks via `application/+/device/+/rx`)
- **Payload Decoding** using a custom JavaScript decoder compatible with Dragino's format
- **Data Normalization** to convert and rename fields into a friendly, structured format
- **Routing** by device EUI to link each device with its specific Home Assistant entity and MQTT topic
- **MQTT Output** for temperature and humidity topics
- **Home Assistant Sensor Updates** with full attributes including temperature, humidity, battery, and signal quality

---

## Components Used

- **MQTT Broker**: Receives LoRa uplinks (default: `10.69.2.69:1883`)
- **Function Node**: Decodes Dragino LHT65N payloads and transforms them into human-readable format
- **Switch Node**: Routes messages based on `deviceEUI` to appropriate sensors
- **Home Assistant Nodes**: Push updates to sensors like fridge, garage, backyard, etc.
- **MQTT Out Nodes**: Publish sensor data to specific topics for external use

---

## Payload Decoding Highlights

The flow decodes these fields (with conversions):

| Raw Field       | Renamed Output            | Description                          |
|----------------|---------------------------|--------------------------------------|
| `BatV`         | `battery_voltage_v`       | Battery voltage in volts             |
| `Bat_status`   | `battery_status_code`     | Raw battery health code              |
| `TempC_SHT`    | `temperature_c`           | Internal sensor temperature (°C)     |
| `TempF_SHT`    | `temperature_f`           | Internal sensor temperature (°F)     |
| `Hum_SHT`      | `humidity_percent`        | Internal sensor humidity (%)         |
| `TempC_DS`     | `external_temperature_c`  | External DS18B20 temp sensor (°C)    |
| `TempF_DS`     | `external_temperature_f`  | External DS18B20 temp sensor (°F)    |
| `ILL_lx`       | `illuminance_lux`         | Illumination in lux (if present)     |
| `ADC_mV`       | `adc_millivolts`          | ADC voltage reading in mV            |
| `Count`        | `pulse_count`             | Interrupt pulse count (if present)   |

Also includes metadata like:

- `deviceEUI`
- `timestamp`
- `raw_hex` of payload
- `battery_status` (mapped text: Ultra Low, Low, OK, Good)

---

## Integrated Home Assistant Sensors

The flow maps each device EUI to corresponding HA sensors, such as:

- **GE Fridge**
- **Deep Freezer**
- **Garage Temp & Humidity**
- **Backyard & Front Yard Sensors**

Attributes sent to HA include temperature, humidity, battery info, and device EUI.

---

## MQTT Topics (Output)

Example topics:
- `home/deepfreezer/temperature/<deviceEUI>`
- `home/garage/temperature/<deviceEUI>`
- `home/backyard/temperature/<deviceEUI>`

Payloads are JSON and match the transformed `msg.payload`.

---

## Notes

- Ensure MQTT and HA integrations are correctly configured and credentials are securely stored.
- Add or update `deviceEUI` values in the **Switch Node** to match new sensors.
- This flow expects base64-encoded `data` in the uplink payload (standard with ChirpStack or TTN MQTT integration).

---

## Security & Performance

- Set MQTT authentication as needed.
- Ensure Home Assistant has appropriate entity IDs configured.
- Flow designed for low-latency decode & push (<500ms typical)

---

## File Type

This file is exported from Node-RED and stored in `.json` format. Import it into Node-RED via:

**Menu → Import → Paste JSON**

---

## License

MIT or your project-specific license.

---

## Support

For help, reach out via your standard support channel or repository issues tab.
