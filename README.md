# IoT Home Lab

This repository documents my IoT-focused home lab setup. It is designed for testing, learning, and deploying smart home, networking, and sensor platforms using a robust virtualized environment.

## 🧠 Overview

My home lab leverages powerful mini PCs and open-source software to simulate a scalable, secure IoT environment. It includes LoRaWAN integration, smart home automation, monitoring, and network experimentation.

## 🧰 Hardware

- **Router**: UniFi Express Router
- **5G Gateway**: Inseego FX3100 (Ethernet-connected)
- **Compute**: 2x Beelink EQR5 Mini PCs  
  - AMD Ryzen 5 PRO 5650U (6 cores / 12 threads, 2.3–4.2GHz)
  - 32GB DDR4 RAM each
  - 500GB M.2 PCIe 3.0 x4 SSDs
  - Dual Gigabit Ethernet, WiFi 6, Bluetooth 5.2
- **Virtualization**: Proxmox VE (acts as my Hyper-V replacement)
- **Storage**:  
  - 4-bay DAS connected to a **ZimaBoard** running **TrueNAS**
  - Zima also serves as quorum (third node) for Proxmox cluster

## 🛠️ Core Services

| Service        | Description                                     |
|----------------|-------------------------------------------------|
| **Proxmox VE** | Virtualization for all services and containers  |
| **Home Assistant** | Smart home hub for automations and devices |
| **Node-RED**   | Visual automation engine connected to HA & MQTT |
| **ChirpStack** | LoRaWAN Network Server for sensor data ingestion |
| **PostgreSQL** | Database backend for ChirpStack and others      |
| **Grafana**    | Visualization for system metrics and sensor data |

## 📡 IoT & Automation

- Zigbee (via Zigbee2MQTT)
- LoRaWAN (via ChirpStack and RAK gateways)
- MQTT for real-time messaging
- ESPHome, ESPresence, and custom ESP32 nodes
- Frigate for local NVR with object detection

## 🔐 Networking & Access

- VLAN-separated networks
- DNS: Pi-hole
- VPN: Tailscale (remote access)
- Cloudflare Tunnel for secure web access

## 🎯 Goals

- Run self-hosted services with high availability
- Monitor and automate home environment
- Explore LoRaWAN, Zigbee, and Bluetooth integrations
- Maintain full local control and security

## 📁 Repository Structure

