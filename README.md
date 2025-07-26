# Home Assistant Configuration

This repository contains the configuration files and custom components used in a personal instance of [Home Assistant](https://www.home-assistant.io/), a powerful open-source platform for smart home automation.

## Overview

This setup is designed to provide reliable and flexible automation for a variety of smart home devices and integrations. It includes structured YAML files for organizing automations, sensors, scripts, and scenes, along with optional custom components and themes.

## Repository Structure

```
home-assistant-config/
│
├── configuration.yaml         # Main configuration file
├── secrets.yaml               # Sensitive variables (not tracked)
├── automations.yaml           # Automation rules
├── scripts.yaml               # Custom scripts
├── scenes.yaml                # Scenes configuration
│
├── custom_components/         # Optional custom integrations
│
├── packages/                  # Logical grouping of configuration
│
├── themes/                    # UI themes for Lovelace
│
└── www/                       # Static files for frontend (icons, images)
```

## Features

- Organized YAML-based configuration
- Automation for lighting, security, presence, and environment control
- Custom sensors, binary sensors, and templates
- Support for MQTT, ESPHome, Zigbee, and other integrations
- Lovelace UI customizations and themes
- Secure use of secrets and token management

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/home-assistant-config.git
cd home-assistant-config
```

2. Review and update `secrets.yaml` with your environment-specific credentials.

3. Validate the configuration:

```bash
ha core check
```

Or using Docker:

```bash
docker run --rm -v $(pwd):/config homeassistant/home-assistant:stable --config /config --script check_config
```

4. Restart Home Assistant to apply changes.

## Recommendations

- Use Git to version control and back up your configuration.
- Use `secrets.yaml` for all sensitive credentials or keys.
- Keep `custom_components` and `www` organized for performance and clarity.

## Contributing

This repository is maintained as a personal project. Feel free to fork it or use the structure as a reference for your own Home Assistant setup.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
