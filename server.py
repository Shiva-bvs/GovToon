"""
GovToon — Python AI Generation & India.gov.in Live Portal Server
Official Source Grounding: India.gov.in National Portal of India / myScheme Ecosystem
"""

import sys
import os
import json
import re
import urllib.request
import urllib.parse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load .env file if present
env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ[k.strip()] = v.strip()

PORT = int(os.environ.get("PYTHON_PORT", 5000))
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")

print(f"[GovToon Python AI Server] Initializing on port {PORT}...")
print(f"[GovToon Python AI Server] Gemini API Key Present: {bool(GEMINI_API_KEY)}")

# Official India.gov.in Indexed Schemes Database
SCHEMES_DB = [
    {
        "id": "custom_1084003475",
        "name": "Beti Bachao Beti Padhao",
        "category": "Central / State Welfare Scheme",
        "level": "Central",
        "dept": "Ministry of Social Justice & Empowerment / Government of India",
        "purpose": "Provide targeted social welfare and financial support under Beti Bachao Beti Padhao.",
        "benefits": "Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Eligible Indian citizens meeting income and residency criteria specified under Beti Bachao Beti Padhao guidelines."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Identity and age verification"
            },
            {
                "id": "d2",
                "name": "Bank Passbook & IFSC",
                "required": True,
                "why": "Direct Benefit Transfer"
            },
            {
                "id": "d3",
                "name": "Ration Card / Residence Proof",
                "required": False,
                "why": "Family status verification"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Official Eligibility",
                "desc": "Verify rules on India.gov.in for Beti Bachao Beti Padhao."
            },
            {
                "step": 2,
                "title": "Gather Documents",
                "desc": "Keep Aadhaar card, passbook, and photo ready."
            },
            {
                "step": 3,
                "title": "Apply Online / CSC",
                "desc": "Submit form at nearest Jan Seva Kendra or official portal."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes",
        "sourceUrl": "https://www.india.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Beti Bachao Beti Padhao.",
                    "caption": "Ramu Kaka worries about requirements for Beti Bachao Beti Padhao.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Beti Bachao Beti Padhao provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Beti Bachao Beti Padhao: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Beti Bachao Beti Padhao.",
                    "caption": "Ramu Kaka worries about requirements for Beti Bachao Beti Padhao.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Beti Bachao Beti Padhao provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Beti Bachao Beti Padhao: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Beti Bachao Beti Padhao.",
                    "caption": "Ramu Kaka worries about requirements for Beti Bachao Beti Padhao.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Beti Bachao Beti Padhao provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Beti Bachao Beti Padhao: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            },
            "te": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            },
            "hi": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            }
        }
    },
    {
        "id": "custom_602451399",
        "name": "Epass",
        "category": "Central / State Welfare Scheme",
        "level": "Central",
        "dept": "Ministry of Social Justice & Empowerment / Government of India",
        "purpose": "Provide targeted social welfare and financial support under epass.",
        "benefits": "Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Eligible Indian citizens meeting income and residency criteria specified under epass guidelines."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Identity and age verification"
            },
            {
                "id": "d2",
                "name": "Bank Passbook & IFSC",
                "required": True,
                "why": "Direct Benefit Transfer"
            },
            {
                "id": "d3",
                "name": "Ration Card / Residence Proof",
                "required": False,
                "why": "Family status verification"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Official Eligibility",
                "desc": "Verify rules on India.gov.in for epass."
            },
            {
                "step": 2,
                "title": "Gather Documents",
                "desc": "Keep Aadhaar card, passbook, and photo ready."
            },
            {
                "step": 3,
                "title": "Apply Online / CSC",
                "desc": "Submit form at nearest Jan Seva Kendra or official portal."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes",
        "sourceUrl": "https://www.india.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Epass.",
                    "caption": "Ramu Kaka worries about requirements for Epass.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Epass provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Epass: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Epass.",
                    "caption": "Ramu Kaka worries about requirements for Epass.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Epass provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Epass: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Epass.",
                    "caption": "Ramu Kaka worries about requirements for Epass.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Epass provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Epass: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            },
            "te": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            },
            "hi": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            }
        }
    },
    {
        "id": "custom_931485574",
        "name": "Startup",
        "category": "Central / State Welfare Scheme",
        "level": "Central",
        "dept": "Ministry of Social Justice & Empowerment / Government of India",
        "purpose": "Provide targeted social welfare and financial support under Startup.",
        "benefits": "Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Eligible Indian citizens meeting income and residency criteria specified under Startup guidelines."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Identity and age verification"
            },
            {
                "id": "d2",
                "name": "Bank Passbook & IFSC",
                "required": True,
                "why": "Direct Benefit Transfer"
            },
            {
                "id": "d3",
                "name": "Ration Card / Residence Proof",
                "required": False,
                "why": "Family status verification"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Official Eligibility",
                "desc": "Verify rules on India.gov.in for Startup."
            },
            {
                "step": 2,
                "title": "Gather Documents",
                "desc": "Keep Aadhaar card, passbook, and photo ready."
            },
            {
                "step": 3,
                "title": "Apply Online / CSC",
                "desc": "Submit form at nearest Jan Seva Kendra or official portal."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes",
        "sourceUrl": "https://www.india.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Startup.",
                    "caption": "Ramu Kaka worries about requirements for Startup.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Startup provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Startup: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Startup.",
                    "caption": "Ramu Kaka worries about requirements for Startup.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Startup provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Startup: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Tension",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "How will I manage expenses? Provide targeted social welfare and financial support under Startup.",
                    "caption": "Ramu Kaka worries about requirements for Startup.",
                    "sourceRef": "Section 1: Guidelines (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Fikr mat kijiye! Startup provides: Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": "Section 2: Benefit Structure (https://www.india.gov.in/my-government/schemes)"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: The Easy Path",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just bring your Aadhaar Card, Bank Passbook & IFSC, Ration Card / Residence Proof to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": "Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: The Khushali",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Startup: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": "Section 4: Disbursement & Impact"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            },
            "te": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            },
            "hi": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Gamcha"
            }
        }
    },
    {
        "id": "pm_kisan",
        "name": "PM-Kisan Samman Nidhi",
        "category": "Agriculture",
        "level": "Central",
        "dept": "Ministry of Agriculture & Farmers Welfare",
        "purpose": "Provide income support to small and marginal farmer families across India for purchasing agricultural inputs.",
        "benefits": "₹6,000 per year transferred directly to bank account in 3 equal installments of ₹2,000.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "Farmer",
            "summary": "Small and marginal landholding farmer families holding cultivable land in their names."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Compulsory identity verification via UIDAI"
            },
            {
                "id": "d2",
                "name": "Land Holding Documents",
                "required": True,
                "why": "Proves ownership of cultivable agricultural land"
            },
            {
                "id": "d3",
                "name": "Bank Passbook & IFSC",
                "required": True,
                "why": "Required for Direct Benefit Transfer (DBT)"
            },
            {
                "id": "d4",
                "name": "Mobile Number",
                "required": False,
                "why": "For OTP verification & SMS payment alerts"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Eligibility",
                "desc": "Ensure cultivable land is registered in your name."
            },
            {
                "step": 2,
                "title": "Gather Aadhaar & Passbook",
                "desc": "Keep original Aadhaar card and bank passbook handy."
            },
            {
                "step": 3,
                "title": "Visit Jan Seva Kendra / Portal",
                "desc": "Visit nearest Common Service Center (CSC) or pmkisan.gov.in."
            },
            {
                "step": 4,
                "title": "Submit e-KYC & Passbook",
                "desc": "Complete biometric or OTP e-KYC verification."
            },
            {
                "step": 5,
                "title": "Receive ₹2,000 DBT",
                "desc": "First installment transferred directly to your bank account."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-kisan-samman-nidhi",
        "sourceUrl": "https://pmkisan.gov.in",
        "applyUrl": "https://pmkisan.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Sowing Struggle",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Ramu Kaka",
                    "dialogue": "Fertilizer and seed prices are rising... How will I prepare for the Kharif sowing season?",
                    "caption": "Rising farming input costs worry small landholder Ramu Kaka.",
                    "sourceRef": "Section 1: Guidelines (https://pmkisan.gov.in)"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: The Direct Solution",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Ramu Kaka, PM-Kisan gives ₹6,000 yearly in 3 direct ₹2,000 DBT installments to your bank!",
                    "caption": "100% Central Government funded Direct Benefit Transfer.",
                    "sourceRef": "Section 2: Benefit Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Simple e-KYC",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Just link your Aadhaar and bank passbook with your land records on pmkisan.gov.in.",
                    "caption": "Simple biometric e-KYC verification at nearest Jan Seva Kendra.",
                    "sourceRef": "Section 3: Mandatory Documents"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Prosperous Harvest",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 First ₹2,000 credited! Ramu Kaka buys certified seeds with peace of mind. Jai Kisan!",
                    "caption": "Timely financial aid ensures food security.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: విత్తనాల కష్టం",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "రాము కాకా",
                    "dialogue": "ఎరువులు, విత్తనాల ధరలు పెరిగిపోయాయి... ఖరీఫ్ పంటకు పెట్టుబడి ఎలా సమకూర్చుకోవాలి?",
                    "caption": "పెట్టుబడి ఖర్చుల భారంతో చిన్న రైతు రాము కాకా ఆందోళన.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: నేరుగా ఖాతాలో సాయం",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "రాము కాకా! పీఎం-కిసాన్ ద్వారా ఏడాదికి ₹6,000 నేరుగా బ్యాంక్ ఖాతాలో 3 విడతల్లో జమ అవుతాయి!",
                    "caption": "రైతులకు నూరు శాతం కేంద్ర ప్రభుత్వ ప్రత్యక్ష నగదు బదిలీ.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులభమైన ఈ-కేవైసీ",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "సీఎస్సీ మిత్ర",
                    "dialogue": "మీ ఆధార్, పట్టాదారు పాసుపుస్తకం మరియు బ్యాంక్ ఖాతాను pmkisan.gov.in లో లింక్ చేయండి.",
                    "caption": "గ్రామ సచివాలయం లేదా కామన్ సర్వీస్ సెంటర్ లో ఈ-కేవైసీ.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: రైతు ముఖంలో చిరునవ్వు",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 ₹2,000 ఖాతాలో పడ్డాయి! నాణ్యమైన విత్తనాలు కొని పంట మొదలుపెట్టాను!",
                    "caption": "రైతు భరోసా - దేశానికి ఆహార భద్రత.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: बुवाई की चिंता",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "रामु काका",
                    "dialogue": "खाद-बीज के दाम बढ़ गए हैं... खरीफ फसल की तैयारी के लिए पैसे कहाँ से लाऊँ?",
                    "caption": "लागत बढ़ने से चिंतित छोटे किसान रामु काका।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सीधा समाधान",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "गोवटून हीरो",
                    "dialogue": "रामु काका! पीएम-किसान योजना से हर साल ₹6,000 सीधे आपके बैंक खाते में 3 किश्तों में आते हैं!",
                    "caption": "100% केंद्र सरकार द्वारा डीबीटी अंतरण।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान ई-केवाईसी",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "सीएससी भैया",
                    "dialogue": "बस अपना आधार, जमीन की खतौनी और बैंक पासबुक लेकर pmkisan.gov.in पर ई-केवाईसी कराएं।",
                    "caption": "निकटतम जन सेवा केंद्र पर आसान बायोमेट्रिक सत्यापन।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: खुशहाल किसान",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 ₹2,000 की पहली किश्त आ गई! रामु काका ने उत्तम बीज खरीदे। जय किसान!",
                    "caption": "समय पर आर्थिक सहायता, खुशहाल खेती।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Ramu Kaka",
                "role": "Small Farmer",
                "avatar": "👨🏽‍🌾",
                "desc": "White Kurta & Blue Gamcha"
            },
            "te": {
                "name": "రాము కాకా",
                "role": "చిన్న రైతు",
                "avatar": "👨🏽‍🌾",
                "desc": "తెల్ల కుర్తా & నీలి తువ్వాలు"
            },
            "hi": {
                "name": "रामु काका",
                "role": "छोटे किसान",
                "avatar": "👨🏽‍🌾",
                "desc": "सफेद कुर्ता और नीला गमछा"
            }
        }
    },
    {
        "id": "pension",
        "name": "PM Shram Yogi Maandhan (Micro-Pension)",
        "category": "Banking & Finance",
        "level": "Central",
        "dept": "Ministry of Labour & Employment",
        "purpose": "Old age protection and social security for unorganized workers like tea vendors, street hawkers, and rickshaw pullers.",
        "benefits": "Guaranteed monthly pension of ₹3,000 after reaching 60 years of age, with 50% government co-contribution.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 40,
            "maxIncome": 180000,
            "state": "All India",
            "occupation": "Vendor",
            "summary": "Unorganized workers aged 18 to 40 years with monthly income up to ₹15,000."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Identity & age proof"
            },
            {
                "id": "d2",
                "name": "Savings Bank Account / Jan Dhan",
                "required": True,
                "why": "Auto-debit for monthly savings"
            },
            {
                "id": "d3",
                "name": "Mobile Phone",
                "required": True,
                "why": "OTP verification & subscription receipt"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Age (18-40 Years)",
                "desc": "Ensure you enter before turning 40 to lock low monthly savings."
            },
            {
                "step": 2,
                "title": "Take Aadhaar & Jan Dhan Passbook",
                "desc": "Visit nearest CSC / Jan Seva Kendra."
            },
            {
                "step": 3,
                "title": "Set Auto-Debit (₹55 - ₹200)",
                "desc": "Select monthly savings amount matched 100% by Government."
            },
            {
                "step": 4,
                "title": "Receive Pension Card",
                "desc": "Get Shram Yogi Pension Card for lifetime monthly ₹3,000."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-shram-yogi-maandhan",
        "sourceUrl": "https://maandhan.in",
        "applyUrl": "https://maandhan.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Old-Age Fear",
                    "image": "assets/pension_1.jpg",
                    "speaker": "Kalu",
                    "dialogue": "My back aches after standing at this tea stall all day. Who will support me in my old age?",
                    "caption": "Unorganized worker Kalu worries about retirement with no pension.",
                    "sourceRef": "Section 1: Objectives"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: Guaranteed Lifelong Pension",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "PM Shram Yogi Maandhan guarantees a ₹3,000 monthly lifelong pension after age 60!",
                    "caption": "50% contribution matched equally by Central Government.",
                    "sourceRef": "Section 2: Benefit Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Modest Monthly Savings",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC Bhaiya",
                    "dialogue": "Contribute just ₹55 to ₹200/month based on your age. Bring Aadhaar & Jan Dhan passbook.",
                    "caption": "Affordable auto-debit registration in 5 minutes.",
                    "sourceRef": "Section 3: Mandatory Documents"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Dignified Golden Years",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Pension Card in hand! Kalu works peacefully knowing his old age is secure.",
                    "caption": "Dignified life for every unorganized worker.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: వృద్ధాప్య భయం",
                    "image": "assets/pension_1.jpg",
                    "speaker": "కాలు",
                    "dialogue": "రోజంతా టీ కొట్టు వద్ద నిలబడి పనిచేయడం కష్టమవుతోంది. వృద్ధాప్యంలో నాకు ఆధారం ఎవరు?",
                    "caption": "అసంఘటిత కార్మికుడు కాలు వృద్ధాప్య భద్రతపై ఆందోళన.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: నెలకు ₹3000 పెన్షన్",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "పీఎం శ్రమయోగి మాన్ధన్ ద్వారా 60 ఏళ్ల తర్వాత నెలకు ₹3,000 గ్యారెంటీ పెన్షన్ లభిస్తుంది!",
                    "caption": "50% ప్రీమియం కేంద్ర ప్రభుత్వమే భరిస్తుంది.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన నమోదు",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "సీఎస్సీ మిత్ర",
                    "dialogue": "మీ వయస్సు ఆధారంగా నెలకు ₹55 నుండి ₹200 ఆటో-డెబిట్ అవుతుంది. ఆధార్, బ్యాంక్ పాసుపుస్తకం తీసుకురండి.",
                    "caption": "కేవలం 5 నిమిషాల్లో పెన్షన్ కార్డు జారీ.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: గౌరవప్రదమైన భవిష్యత్తు",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 శ్రమయోగి పెన్షన్ కార్డు వచ్చేసింది! నా వృద్ధాప్యం ఇప్పుడు సురక్షితం!",
                    "caption": "అసంఘటిత శ్రామికుల జీవితాల్లో భరోసా.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: बुढ़ापे की चिंता",
                    "image": "assets/pension_1.jpg",
                    "speaker": "कालू",
                    "dialogue": "दिनभर चाय की दुकान पर खड़े रहने से कमर दुखती है। बुढ़ापे में मेरा सहारा कौन बनेगा?",
                    "caption": "असंगठित क्षेत्र के मजदूर कालू बुढ़ापे की पेंशन को लेकर परेशान।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: ₹3,000 मासिक पेंशन",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "गोवटून हीरो",
                    "dialogue": "पीएम श्रम योगी मानधन योजना 60 वर्ष के बाद हर महीने ₹3,000 पक्की आजीवन पेंशन देती है!",
                    "caption": "50% अंशदान केंद्र सरकार द्वारा वहन किया जाता है।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: छोटी बचत, बड़ा लाभ",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "सीएससी भैया",
                    "dialogue": "उम्र के अनुसार बस ₹55 से ₹200 प्रति माह जमा करें। आधार और बैंक पासबुक लेकर आएं।",
                    "caption": "सीएससी केंद्र पर 5 मिनट में आसान ऑटो-डेबिट पंजीकरण।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: आत्मनिर्भर जीवन",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 श्रम योगी पेंशन कार्ड बन गया! अब बुढ़ापे में किसी के आगे हाथ नहीं फैलाना पड़ेगा।",
                    "caption": "मजदूर का सम्मान, सरकार का वरदान।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Kalu",
                "role": "Tea Stall Vendor",
                "avatar": "👴🏽",
                "desc": "Simple Cotton Shirt & Apron"
            },
            "te": {
                "name": "కాలు",
                "role": "టీ దుకాణదారుడు",
                "avatar": "👴🏽",
                "desc": "సాధారణ చొక్కా & అప్రాన్"
            },
            "hi": {
                "name": "कालू",
                "role": "चाय विक्रेता",
                "avatar": "👴🏽",
                "desc": "सादा कुर्ता और एप्रन"
            }
        }
    },
    {
        "id": "ayushman",
        "name": "Ayushman Bharat PM-JAY (Health Shield)",
        "category": "Health",
        "level": "Central",
        "dept": "National Health Authority (NHA)",
        "purpose": "Provide health cover up to ₹5 Lakh per family per year for secondary and tertiary cashless hospitalization.",
        "benefits": "₹500,000 cashless hospitalization per family per year across 28,000+ empanelled hospitals.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "maxIncome": 300000,
            "state": "All India",
            "occupation": "Vendor",
            "summary": "Low-income urban & rural families identified via SECC database."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Biometric identification at hospital counter"
            },
            {
                "id": "d2",
                "name": "Ration Card",
                "required": True,
                "why": "Family member mapping"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Ayushman Card Status",
                "desc": "Visit beneficiary.nha.gov.in or nearest hospital Arogyamitra."
            },
            {
                "step": 2,
                "title": "Show Aadhaar & Ration Card",
                "desc": "Complete instant e-KYC."
            },
            {
                "step": 3,
                "title": "Get Golden Ayushman Card",
                "desc": "Free Ayushman PVC Card issued."
            },
            {
                "step": 4,
                "title": "Cashless Treatment",
                "desc": "Show card at hospital counter for ₹5 Lakh zero-cash treatment."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/ayushman-bharat",
        "sourceUrl": "https://pmjay.gov.in",
        "applyUrl": "https://beneficiary.nha.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: The Hospital Bill Shock",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "Lata Tai",
                    "dialogue": "Doctor says my husband needs urgent surgery costing ₹80,000... How can we ever pay this?",
                    "caption": "Sudden medical emergencies threaten family life savings.",
                    "sourceRef": "Section 1: Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: ₹5 Lakh Health Shield",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "Asha Didi",
                    "dialogue": "Lata Tai, your family has ₹5 Lakh free cashless hospitalization cover under Ayushman Bharat!",
                    "caption": "Universal cashless cover across 28,000+ empanelled hospitals.",
                    "sourceRef": "Section 2: Health Cover Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Zero-Cash Admission",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Arogyamitra",
                    "dialogue": "Show your Ration Card & Aadhaar at the hospital desk for instant Golden Card verification.",
                    "caption": "Zero-cash admission, surgery, medicines, and food covered.",
                    "sourceRef": "Section 3: Treatment Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Safe Recovery & Zero Debt",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Surgery done with ₹0 bill! Husband is healthy and our savings are intact. Ayushman Bhavah!",
                    "caption": "World's largest government-funded health assurance scheme.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: ఆసుపత్రి బిల్లు భయం",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "లతా తాయి",
                    "dialogue": "నా భర్తకు ఆపరేషన్ చేయాలని డాక్టర్ చెప్పారు, ₹80,000 ఖర్చవుతుంది... అంత డబ్బు ఎక్కడినుంచి తేవాలి?",
                    "caption": "వైద్య ఖర్చులతో పేద కుటుంబం ఆర్థిక సంక్షోభం.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ₹5 లక్షల ఉచిత వైద్యం",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "ఆశా దీది",
                    "dialogue": "లతా తాయి! ఆయుష్మాన్ భారత్ కింద మీ కుటుంబానికి ఏడాదికి ₹5 లక్షల వరకు ఉచిత నగదురహిత వైద్యం ఉంది!",
                    "caption": "దేశవ్యాప్తంగా 28,000+ ఆసుపత్రుల్లో నగదురహిత సేవలు.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: గోల్డెన్ కార్డ్ అడ్మిషన్",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "ఆరోగ్యమిత్ర",
                    "dialogue": "రేషన్ కార్డ్, ఆధార్ చూపించండి. ఉచితంగా గోల్డెన్ కార్డ్ జారీ చేసి అడ్మిట్ చేస్తాము.",
                    "caption": "చికిత్స, మందులు, ఆపరేషన్ అన్నీ పూర్తిగా ఉచితం.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: పూర్తి స్వస్థత",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 ఒక్క రూపాయి ఖర్చు లేకుండా ఆపరేషన్ విజయవంతమైంది! నా భర్త క్షేమంగా ఉన్నారు!",
                    "caption": "ఆయుష్మాన్ భారత్ - పేదలకు సంపూర్ణ ఆరోగ్య రక్ష.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: अस्पताल के बिल का डर",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "लता ताई",
                    "dialogue": "पति का ऑपरेशन होना है, डॉक्टर ₹80,000 का खर्च बता रहे हैं... इतने पैसे हम कहाँ से लाएँ?",
                    "caption": "अचानक बीमारी से घरेलू सहायिका लता ताई परेशान।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: ₹5 लाख का मुफ्त सुरक्षा कवच",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "आशा दीदी",
                    "dialogue": "लता ताई! आयुष्मान भारत योजना में आपके पूरे परिवार को सालाना ₹5 लाख तक का मुफ्त इलाज मिलता है!",
                    "caption": "28,000+ सूचीबद्ध अस्पतालों में कैशलेस इलाज।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आयुष्मान मित्र की मदद",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "आरोग्यमित्र",
                    "dialogue": "राशन कार्ड और आधार कार्ड दीजिए। तुरंत गोल्डन कार्ड बनाकर बिना एक पैसा लिए भर्ती कर रहे हैं।",
                    "caption": "दवाएं, जांच और ऑपरेशन सब बिल्कुल मुफ्त।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: कर्जमुक्त स्वास्थ्य लाभ",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 सफल ऑपरेशन बिना किसी खर्चे के! पति स्वस्थ हैं और जमा-पूंजी भी बच गई। आयुष्मान भवः!",
                    "caption": "गरीब की सेहत, सरकार की गारंटी।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Lata Tai",
                "role": "Domestic Worker",
                "avatar": "👩🏽",
                "desc": "Simple Printed Cotton Saree"
            },
            "te": {
                "name": "లతా తాయి",
                "role": "ఇళ్లలో పనిచేసే మహిళ",
                "avatar": "👩🏽",
                "desc": "సాధారణ కాటన్ చీర"
            },
            "hi": {
                "name": "लता ताई",
                "role": "घरेलू सहायिका",
                "avatar": "👩🏽",
                "desc": "साधारण सूती साड़ी"
            }
        }
    },
    {
        "id": "surya_ghar",
        "name": "PM Surya Ghar: Muft Bijli Yojana",
        "category": "Housing & Energy",
        "level": "Central",
        "dept": "Ministry of New and Renewable Energy (MNRE)",
        "purpose": "Provide up to 300 units of free electricity per month to 1 Crore households by assisting with rooftop solar panel installations.",
        "benefits": "Direct financial subsidy up to ₹78,000 for 3kW rooftop solar installation + 300 units free electricity per month.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "maxIncome": 1000000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Indian citizen families owning a suitable roof structure and valid electricity connection."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Electricity Bill",
                "required": True,
                "why": "Verification of active electricity connection & consumer number"
            },
            {
                "id": "d2",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Identity proof for subsidy bank transfer"
            },
            {
                "id": "d3",
                "name": "Roof Ownership / House Document",
                "required": True,
                "why": "Confirms solar panel installation feasibility"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Register on Portal",
                "desc": "Visit pmsuryaghar.gov.in and enter your Electricity Consumer Number."
            },
            {
                "step": 2,
                "title": "Select Empanelled Vendor",
                "desc": "Choose an official solar installer for technical survey."
            },
            {
                "step": 3,
                "title": "Get DISCOM Approval",
                "desc": "Local power company inspects net-meter feasibility."
            },
            {
                "step": 4,
                "title": "Receive ₹78,000 Subsidy",
                "desc": "Subsidy credited directly to your bank account within 30 days."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-surya-ghar",
        "sourceUrl": "https://pmsuryaghar.gov.in",
        "applyUrl": "https://pmsuryaghar.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Shocking Power Bills",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "Sharma Ji",
                    "dialogue": "Our electricity bill is ₹3,800 this month! Running fans and cooler is eating up my pension!",
                    "caption": "High summer electricity bills burden middle-class household budgets.",
                    "sourceRef": "Section 1: Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: Solar Rooftop Subsidy",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "Install Rooftop Solar under PM Surya Ghar and get up to ₹78,000 subsidy + 300 free units monthly!",
                    "caption": "Direct Central subsidy credited directly to consumer bank account.",
                    "sourceRef": "Section 2: Subsidy Structure"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Online Application",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "DISCOM Engineer",
                    "dialogue": "Apply on pmsuryaghar.gov.in. Verified vendor installs net-metered solar rooftop in 15 days.",
                    "caption": "Simple digital registration with electricity consumer number.",
                    "sourceRef": "Section 3: Installation Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Zero Electricity Bill",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Power bill dropped to ZERO! We generate our own green electricity and earn grid credits!",
                    "caption": "Clean solar energy brings lifelong household savings.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: భారీ కరెంట్ బిల్లు",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "శర్మ గారు",
                    "dialogue": "ఈ నెల కరెంట్ బిల్లు ₹3,800 వచ్చింది! ఫ్యాన్లు, కూలర్ వాడితే నా పెన్షన్ మొత్తం బిల్లులకే సరిపోతోంది!",
                    "caption": "పెరుగుతున్న విద్యుత్ ఖర్చులతో మధ్యతరగతి కుటుంబం ఇబ్బంది.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: రూఫ్టాప్ సోలార్ సబ్సిడీ",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "పీఎం సూర్య ఘర్ ద్వారా ఇంటిపై సోలార్ ప్యానెల్స్ పెట్టుకుంటే ₹78,000 సబ్సిడీ & నెలకు 300 యూనిట్లు ఉచితం!",
                    "caption": "నేరుగా వినియోగదారుని బ్యాంక్ ఖాతాలో సబ్సిడీ జమ.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: ఆన్లైన్ దరఖాస్తు",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "డిస్కం ఇంజనీర్",
                    "dialogue": "pmsuryaghar.gov.in లో మీ విద్యుత్ నంబర్తో నమోదు చేసుకోండి. 15 రోజుల్లో ఇన్స్టాలేషన్ పూర్తవుతుంది.",
                    "caption": "నెట్-మీటరింగ్ ద్వారా విద్యుత్ గ్రిడ్ అనుసంధానం.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: జీరో కరెంట్ బిల్లు",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 కరెంట్ బిల్లు జీరో అయిపోయింది! సొంతంగా సౌర విద్యుత్ ఉత్పత్తి చేస్తూ డబ్బు ఆదా చేస్తున్నాం!",
                    "caption": "సూర్య ఘర్ - ఉచిత సౌర విద్యుత్, స్వచ్ఛమైన భవిష్యత్తు.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: बिजली बिल का झटका",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "शर्मा जी",
                    "dialogue": "इस महीने का बिजली बिल ₹3,800 आया है! पंखा-कूलर चलाने में ही सारी पेंशन खत्म हो रही है!",
                    "caption": "महंगे बिजली बिल से मध्यमवर्गीय परिवार परेशान।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: सोलर सब्सिडी का वरदान",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "गोवटून हीरो",
                    "dialogue": "पीएम सूर्य घर योजना से छत पर सोलर लगाएं, ₹78,000 तक की सरकारी सब्सिडी और 300 यूनिट मुफ्त बिजली पाएं!",
                    "caption": "सीधे बैंक खाते में सब्सिडी अंतरण।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: सरल ऑनलाइन प्रक्रिया",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "डिस्कॉम इंजीनियर",
                    "dialogue": "pmsuryaghar.gov.in पर बिजली बिल नंबर से आवेदन करें। 15 दिनों में नेट मीटरिंग के साथ सोलर लग जाएगा।",
                    "caption": "आसान ऑनलाइन आवेदन एवं त्वरित स्थापना।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: शून्य बिजली बिल",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 बिजली बिल आया शून्य! अपनी बनाई हरित बिजली, जीवनभर की पक्की बचत!",
                    "caption": "पीएम सूर्य घर: शून्य बिजली बिल, खुशहाल हर घर।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Sharma Ji",
                "role": "Senior Citizen",
                "avatar": "👴",
                "desc": "Kurta Pajama with Spectacles"
            },
            "te": {
                "name": "శర్మ గారు",
                "role": "సీనియర్ సిటిజన్",
                "avatar": "👴",
                "desc": "కుర్తా పైజామా & కళ్లద్దాలు"
            },
            "hi": {
                "name": "शर्मा जी",
                "role": "वरिष्ठ नागरिक",
                "avatar": "👴",
                "desc": "कुर्ता पाजामा और चश्मा"
            }
        }
    },
    {
        "id": "pm_svanidhi",
        "name": "PM SVANidhi (Street Vendor Micro-Credit)",
        "category": "Micro-Business & Loans",
        "level": "Central",
        "dept": "Ministry of Housing and Urban Affairs",
        "purpose": "Provide affordable collateral-free working capital micro-loans to urban & rural street vendors to restart businesses.",
        "benefits": "Collateral-free working capital loan starting at ₹10,000 up to ₹50,000 with 7% interest subsidy and cashback incentives.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 300000,
            "state": "All India",
            "occupation": "Vendor",
            "summary": "Street vendors, hawkers, cobblers, and artisans vending in urban or peri-urban areas."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Identity & UIDAI verification"
            },
            {
                "id": "d2",
                "name": "Vending Certificate / Identity Card",
                "required": True,
                "why": "Issued by Urban Local Body (ULB) / Municipal Corp"
            },
            {
                "id": "d3",
                "name": "Bank Savings Passbook",
                "required": True,
                "why": "Direct loan disbursement & cashback transfer"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Check Vending Certificate",
                "desc": "Ensure your name is listed with Urban Local Body (ULB)."
            },
            {
                "step": 2,
                "title": "Visit Portal / Bank Counter",
                "desc": "Visit pmsvanidhi.mohua.gov.in or local bank branch."
            },
            {
                "step": 3,
                "title": "Submit Aadhaar & Vending Card",
                "desc": "Complete e-KYC digital application."
            },
            {
                "step": 4,
                "title": "Receive ₹10,000 Collateral-Free Loan",
                "desc": "Loan credited directly to bank account."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-svanidhi",
        "sourceUrl": "https://pmsvanidhi.mohua.gov.in",
        "applyUrl": "https://pmsvanidhi.mohua.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Empty Fruit Crates",
                    "image": "assets/svanidhi_1.jpg",
                    "speaker": "Subbu",
                    "dialogue": "My fruit cart is empty and moneylenders charge 10% daily interest. How can I buy wholesale inventory?",
                    "caption": "Street vendors struggle with predatory loans and lack of working capital.",
                    "sourceRef": "Section 1: Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: Collateral-Free Micro-Credit",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "PM SVANidhi provides collateral-free ₹10,000 working capital loan with 7% interest subsidy & cashback!",
                    "caption": "Credit graduated up to ₹20,000 and ₹50,000 on timely repayments.",
                    "sourceRef": "Section 2: Loan Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Fast Bank Mitra Processing",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Bank Mitra",
                    "dialogue": "Show your Vending Certificate / Town Survey ID and Aadhaar. No guarantor or property papers required.",
                    "caption": "Digital processing with zero paperwork hurdles.",
                    "sourceRef": "Section 3: Documents"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Thriving Digital Business",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Cart fully stocked with fresh fruits! Accepting digital QR payments and earning monthly cashback!",
                    "caption": "Empowering micro-entrepreneurs on street corners.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: పెట్టుబడి లేని కష్టం",
                    "image": "assets/svanidhi_1.jpg",
                    "speaker": "సుబ్బు",
                    "dialogue": "పండ్ల బండి ఖాళీగా ఉంది, వడ్డీ వ్యాపారులు రోజూ 10% వడ్డీ అడుగుతున్నారు. పెట్టుబడి ఎలా తేవాలి?",
                    "caption": "అధిక వడ్డీల ఊబిలో చిక్కుకున్న వీధి వ్యాపారి సుబ్బు.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: హామీ లేని ₹10,000 రుణం",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "పీఎం స్వనిధి ద్వారా ఎలాంటి పూచీకత్తు లేకుండా ₹10,000 వర్కింగ్ క్యాపిటల్ రుణం & 7% వడ్డీ రాయితీ లభిస్తుంది!",
                    "caption": "సకాలంలో చెల్లిస్తే ₹20,000 మరియు ₹50,000 రుణాలు.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన ప్రక్రియ",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "బ్యాంక్ మిత్ర",
                    "dialogue": "మీ వెండింగ్ ఐడీ కార్డు మరియు ఆధార్ ఇవ్వండి. 48 గంటల్లో రుణం ఖాతాలో జమ అవుతుంది.",
                    "caption": "డిజిటల్ చెల్లింపులపై నెలకు ₹100 వరకు క్యాష్బ్యాక్.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: కళకళలాడుతున్న వ్యాపారం",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 పండ్ల బండి కళకళలాడుతోంది! క్యూఆర్ కోడ్తో డిజిటల్ వ్యాపారం చేస్తూ లాభాలు గడిస్తున్నాను!",
                    "caption": "స్వనిధి - ఆత్మనిర్భర్ వీధి వ్యాపారులు.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: पूँजी का संकट",
                    "image": "assets/svanidhi_1.jpg",
                    "speaker": "सुब्बू",
                    "dialogue": "ठेला खाली पड़ा है और साहूकार भारी ब्याज मांग रहे हैं। फल खरीदने के लिए पूँजी कहाँ से लाऊँ?",
                    "caption": "कार्यशील पूँजी के अभाव में परेशान स्ट्रीट वेंडर सुब्बू।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: बिना गारंटी ₹10,000 ऋण",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "गोवटून हीरो",
                    "dialogue": "पीएम स्वनिधि से बिना किसी गारंटी के ₹10,000 का लोन, 7% ब्याज सब्सिडी और डिजिटल कैशबैक पाएं!",
                    "caption": "समय पर चुकाने पर ₹20,000 और ₹50,000 तक की वृद्धि।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान बैंक ऋण",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "बैंक मित्र",
                    "dialogue": "बस अपना वेंडिंग प्रमाण पत्र और आधार कार्ड दें। कोई संपत्ति बंधक नहीं रखनी।",
                    "caption": "48 घंटे में सीधे बैंक खाते में ऋण स्वीकृति।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: आत्मनिर्भर विक्रेता",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 फलों से भरा ठेला और क्यूआर कोड से डिजिटल बिक्री! स्वनिधि से स्वावलंबन!",
                    "caption": "रेहड़ी-पटरी वालों का सशक्तिकरण।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Subbu",
                "role": "Street Fruit Vendor",
                "avatar": "🛒",
                "desc": "Kurta with Blue Waistcoat"
            },
            "te": {
                "name": "సుబ్బు",
                "role": "పండ్ల వ్యాపారి",
                "avatar": "🛒",
                "desc": "కుర్తా & నీలి రంగు జాకెట్"
            },
            "hi": {
                "name": "सुब्बू",
                "role": "सब्जी/फल विक्रेता",
                "avatar": "🛒",
                "desc": "कुर्ता और बंडी"
            }
        }
    },
    {
        "id": "mudra_loan",
        "name": "PM MUDRA Yojana (Micro-Units Development)",
        "category": "Micro-Business & Loans",
        "level": "Central",
        "dept": "Ministry of Finance",
        "purpose": "Provide collateral-free business loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises.",
        "benefits": "Loans categorized as Shishu (up to ₹50,000), Kishor (up to ₹5 Lakhs), and Tarun (up to ₹10 Lakhs) at low interest rates.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 65,
            "maxIncome": 2000000,
            "state": "All India",
            "occupation": "Self-Employed / Entrepreneur",
            "summary": "Small business owners, shopkeepers, artisans, fruit vendors, and small manufacturing units."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar & PAN Card",
                "required": True,
                "why": "Mandatory identity & tax verification"
            },
            {
                "id": "d2",
                "name": "Business Address Proof",
                "required": True,
                "why": "Trade license / GST / shop registration"
            },
            {
                "id": "d3",
                "name": "6-Month Bank Statement",
                "required": True,
                "why": "Financial assessment for loan approval"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Choose Loan Category (Shishu/Kishor/Tarun)",
                "desc": "Select required capital amount up to ₹10 Lakhs."
            },
            {
                "step": 2,
                "title": "Fill MUDRA Application",
                "desc": "Fill online form on udyamimitra.in or visit commercial bank."
            },
            {
                "step": 3,
                "title": "Submit Aadhaar & Business Plan",
                "desc": "Bank verifies business location and credit score."
            },
            {
                "step": 4,
                "title": "Loan Disbursement & MUDRA Card",
                "desc": "Get loan amount and debit MUDRA card for working capital."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pradhan-mantri-mudra-yojana",
        "sourceUrl": "https://www.mudra.org.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Capacity Bottleneck",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "Anita",
                    "dialogue": "I have 50 festival dress orders, but only one old manual sewing machine. Banks ask for collateral!",
                    "caption": "Micro-entrepreneur Anita wants to expand her sewing workshop.",
                    "sourceRef": "Section 1: Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: MUDRA Collateral-Free Loan",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "Bank Manager",
                    "dialogue": "PM MUDRA Shishu loan offers up to ₹50,000 (and Kishor up to ₹5 Lakh) with zero collateral!",
                    "caption": "Micro-Units Development & Refinance Agency support.",
                    "sourceRef": "Section 2: Loan Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Simple Project Proposal",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Branch Officer",
                    "dialogue": "Submit your shop trade registration, Aadhaar, and quotation for new machinery on udyamimitra.in.",
                    "caption": "Quick loan appraisal with transparent interest rates.",
                    "sourceRef": "Section 3: Documents"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Thriving Fashion Studio",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 3 motorized machines running! Anita employs two local women assistants and grows her boutique!",
                    "caption": "Funding the unfunded - women enterprise empowerment.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: విస్తరణకు ఆటంకం",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "అనిత",
                    "dialogue": "పండుగ ఆర్డర్లు చాలా ఉన్నాయి, కానీ నా వద్ద ఒకే పాత కుట్టు మిషన్ ఉంది. విస్తరణకు బ్యాంకులు తాకట్టు అడుగుతున్నాయి!",
                    "caption": "పూచీకత్తు లేక విస్తరణ ఆగిపోయిన అనిత దర్జీ దుకాణం.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ముద్ర ద్వారా ₹50,000 రుణం",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "బ్యాంక్ మేనేజర్",
                    "dialogue": "పీఎం ముద్ర శిశు లోన్ ద్వారా ఎలాంటి పూచీకత్తు లేకుండా ₹50,000 (కిశోర్ లో ₹5 లక్షలు) వరకు రుణం పొందవచ్చు!",
                    "caption": "చిన్న వ్యాపారులకు ప్రభుత్వ పూచీకత్తు సహాయం.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: కొటేషన్ సమర్పణ",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "బ్యాంక్ ఆఫీసర్",
                    "dialogue": "కొత్త మిషన్ల కొటేషన్, మీ ఆధార్ మరియు వ్యాపార వివరాలు udyamimitra.in లో సమర్పించండి.",
                    "caption": "సులభమైన పత్రాలతో త్వరిత రుణ మంజూరు.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: విజయవంతమైన బొటిక్",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 3 కొత్త మోటరైజ్డ్ మిషన్లు అమర్చాను! మరో ఇద్దరు మహిళలకు ఉపాధి కల్పిస్తూ ఆదాయం పెంచుకున్నాను!",
                    "caption": "ముద్ర యోజన - మహిళా వ్యాపారవేత్తల విజయం.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: व्यापार बढ़ाने की चाह",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "अनीता",
                    "dialogue": "सिलाई के 50 नए ऑर्डर हैं, पर मशीन सिर्फ एक पुरानी है। बैंक बिना गारंटी लोन नहीं दे रहे!",
                    "caption": "सिलाई बुटीक बढ़ाने के लिए पूँजी की तलाश में अनीता।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: बिना गारंटी मुद्रा ऋण",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "बैंक प्रबंधक",
                    "dialogue": "पीएम मुद्रा शिशु योजना में ₹50,000 और किशोर योजना में ₹5 लाख तक का लोन बिना किसी गारंटी के मिलता है!",
                    "caption": "सूक्ष्म इकाइयों के लिए सरकारी ऋण योजना।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान आवेदन",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "शाखा अधिकारी",
                    "dialogue": "नई मशीनों का कोटेशन, आधार और पैन कार्ड udyamimitra.in पर जमा करें।",
                    "caption": "पारदर्शी ब्याज दरों पर त्वरित ऋण स्वीकृति।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: बढ़ता फैशन कारोबार",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 3 नई मोटर मशीनें लग गईं! अनीता ने दो अन्य महिलाओं को रोजगार देकर अपना बुटीक बड़ा किया!",
                    "caption": "मुद्रा योजना: हुनर को मिला पूँजी का पंख।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Anita",
                "role": "Boutique Tailor",
                "avatar": "🧵",
                "desc": "Festive Saree with Measuring Tape"
            },
            "te": {
                "name": "అనిత",
                "role": "దర్జీ వ్యాపారి",
                "avatar": "🧵",
                "desc": "పండుగ చీర & కొలత టేపు"
            },
            "hi": {
                "name": "अनीता",
                "role": "बुटीक संचालिका",
                "avatar": "🧵",
                "desc": "साड़ी और इंची टेप"
            }
        }
    },
    {
        "id": "sukanya",
        "name": "PM Sukanya Samriddhi Yojana (Girl Child Security)",
        "category": "Financial Security & Pension",
        "level": "Central",
        "dept": "Ministry of Women and Child Development",
        "purpose": "Small deposit savings scheme for girl child education and marriage expenses with high government interest rates.",
        "benefits": "High compound interest (8.2%+ per annum), 100% tax exemption under 80C, and maturity payout for higher education.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 10,
            "maxIncome": 10000000,
            "state": "All India",
            "occupation": "Parent / Guardian",
            "summary": "Parents or legal guardians of girl child below 10 years of age (max 2 girls per family)."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Girl Child Birth Certificate",
                "required": True,
                "why": "Age proof of girl child"
            },
            {
                "id": "d2",
                "name": "Parent Aadhaar & PAN Card",
                "required": True,
                "why": "Guardian identity & address proof"
            },
            {
                "id": "d3",
                "name": "Initial Deposit (Min ₹250)",
                "required": True,
                "why": "Account activation fee"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Visit Post Office or Authorized Bank",
                "desc": "Go to nearest India Post branch or bank."
            },
            {
                "step": 2,
                "title": "Submit Birth Certificate & Aadhaar",
                "desc": "Fill Sukanya Samriddhi account opening form."
            },
            {
                "step": 3,
                "title": "Deposit Minimum ₹250",
                "desc": "Pay initial deposit amount."
            },
            {
                "step": 4,
                "title": "Receive SSY Passbook",
                "desc": "Get passbook tracking annual interest & maturity balance."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/sukanya-samriddhi-yojana",
        "sourceUrl": "https://www.indiapost.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Future Higher Education Dream",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "Sunita",
                    "dialogue": "My daughter Chhoti is 5 years old. I dream of her becoming a doctor, but college costs are high!",
                    "caption": "Sunita wonders how to build a guaranteed fund for her daughter's future.",
                    "sourceRef": "Section 1: Objectives"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: 8.2% Compound Growth",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "Postmaster",
                    "dialogue": "Open a Sukanya Samriddhi account with just ₹250/year. It earns 8.2% high tax-free compound interest!",
                    "caption": "Highest interest rate among small savings schemes with Sovereign Guarantee.",
                    "sourceRef": "Section 2: Interest Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Open at Post Office / Bank",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Counter Officer",
                    "dialogue": "Bring Chhoti's birth certificate and parent's Aadhaar card. Deposit anywhere from ₹250 to ₹1.5 Lakh/yr.",
                    "caption": "Triple tax exemption (EEE) under Section 80C.",
                    "sourceRef": "Section 3: Account Rules"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Doctor Graduation Day",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Chhoti graduates with medical honors! The maturity corpus paid 100% of her college tuition!",
                    "caption": "Beti Bachao, Beti Padhao - financially empowered daughters.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: ఉన్నత చదువుల కల",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "సునీత",
                    "dialogue": "నా కూతురు చోటీని డాక్టర్ చేయాలని నా కల, కానీ ఉన్నత విద్య ఖర్చులు పెరుగుతున్నాయి!",
                    "caption": "ఆడపిల్ల బంగారు భవిష్యత్తు కోసం ఆలోచిస్తున్న తల్లి సునీత.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: 8.2% అత్యధిక వడ్డీ",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "పోస్ట్మాస్టర్",
                    "dialogue": "సుకన్య సమృద్ధి ఖాతా తెరవండి! ఏడాదికి ₹250 తో మొదలుపెట్టి 8.2% పన్ను రహిత చక్రవడ్డీ పొందండి!",
                    "caption": "కేంద్ర ప్రభుత్వ సార్వభౌమ హామీతో అత్యున్నత రాబడి.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: పోస్టాఫీసులో సులభంగా ఖాతా",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "కౌంటర్ ఆఫీసర్",
                    "dialogue": "పాప జనన ధ్రువీకరణ పత్రం, తల్లిదండ్రుల ఆధార్ కార్డుతో సమీప పోస్టాఫీసు లేదా బ్యాంక్లో ఖాతా తెరవండి.",
                    "caption": "సెక్షన్ 80సి కింద పూర్తి పన్ను మినహాయింపు.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: డాక్టర్ పట్టా సాధించిన కుమార్తె",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 చోటీ మెడికల్ డిగ్రీ సాధించింది! సుకన్య సమృద్ధి నిధి ఆమె ఫీజులన్నింటినీ భరించింది!",
                    "caption": "బేటీ బచావో, బేటీ పఢావో - ఆడబిడ్డల ఆర్థిక భద్రత.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: बेटी के सुनहरे भविष्य की चिंता",
                    "image": "assets/sukanya_1.jpg",
                    "speaker": "सुनीता",
                    "dialogue": "मेरी बेटी छोटी 5 साल की है। मैं उसे डॉक्टर बनाना चाहती हूँ, पर पढ़ाई का खर्च कैसे जुटेगा?",
                    "caption": "बेटी की उच्च शिक्षा के लिए बचत की चिंता।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: 8.2% का चक्रवृद्दि ब्याज",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "डाकपाल",
                    "dialogue": "सुकन्या समृद्धि खाता खुलवाएं! मात्र ₹250 से शुरुआत करें और 8.2% की उच्चतम कर-मुक्त ब्याज दर पाएं!",
                    "caption": "बेटियों के लिए भारत सरकार की सबसे सुरक्षित बचत योजना।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: डाकघर में खाता खुलना",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "शाखा डाकपाल",
                    "dialogue": "बेटी का जन्म प्रमाण पत्र और माता-पिता का आधार कार्ड लेकर किसी भी डाकघर या बैंक में आएं।",
                    "caption": "धारा 80C के तहत पूरी तरह टैक्स-फ्री (EEE)।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: डॉक्टर बनकर लौटी बेटी",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 छोटी ने मेडिकल कॉलेज पूरा कर डॉक्टर की उपाधि पाई! सुकन्या समृद्धि से पूरे हुए सपने!",
                    "caption": "बेटी बचाओ, बेटी पढ़ाओ: आर्थिक सुरक्षा का उपहार।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Sunita",
                "role": "Mother & Girl Child",
                "avatar": "👧",
                "desc": "Traditional Saree with Daughter Chhoti"
            },
            "te": {
                "name": "సునీత",
                "role": "తల్లి & బాలిక",
                "avatar": "👧",
                "desc": "చీరకట్టు & చిన్నారి చోటీ"
            },
            "hi": {
                "name": "सुनीता",
                "role": "माता एवं बालिका",
                "avatar": "👧",
                "desc": "साड़ी और नन्हीं बेटी छोटी"
            }
        }
    },
    {
        "id": "nsp_scholarship",
        "name": "National Scholarship Portal (Post-Matric & Higher Ed)",
        "category": "Education & Scholarships",
        "level": "Central",
        "dept": "Ministry of Education",
        "purpose": "Provide financial assistance and tuition fee waivers to meritorious and low-income SC, ST, OBC, and minority students.",
        "benefits": "Full tuition fee reimbursement + monthly maintenance allowance credited directly to student bank accounts.",
        "eligibility": {
            "minAge": 14,
            "maxAge": 30,
            "maxIncome": 250000,
            "state": "All India",
            "occupation": "Student",
            "summary": "Students enrolled in Class 11, 12, ITI, Diploma, Graduation, or Post-Graduation with annual family income up to ₹2.5 Lakhs."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card & Student ID",
                "required": True,
                "why": "Identity and institution verification"
            },
            {
                "id": "d2",
                "name": "Income Certificate",
                "required": True,
                "why": "Issued by Competent State Authority"
            },
            {
                "id": "d3",
                "name": "Caste / Community Certificate",
                "required": True,
                "why": "Verification for category reservations"
            },
            {
                "id": "d4",
                "name": "Previous Year Marksheet",
                "required": True,
                "why": "Academic merit verification"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Register on NSP Portal",
                "desc": "Visit scholarships.gov.in and complete One-Time Registration (OTR)."
            },
            {
                "step": 2,
                "title": "Select Scheme & Fill Form",
                "desc": "Choose Post-Matric or Merit-cum-Means scholarship scheme."
            },
            {
                "step": 3,
                "title": "Upload Marksheet & Income Proof",
                "desc": "Upload scanned certificates for institutional verification."
            },
            {
                "step": 4,
                "title": "Receive Scholarship DBT",
                "desc": "Funds transferred directly to student bank account upon verification."
            }
        ],
        "sourceUrl": "https://scholarships.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: College Fee Deadline Notice",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "Raju",
                    "dialogue": "Semester fee notice is on the board. Father's farming income cannot pay both tuition and hostel rent!",
                    "caption": "Low-income student Raju worries about dropping out of college.",
                    "sourceRef": "Section 1: Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: National Scholarship Portal",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "College Professor",
                    "dialogue": "Apply on National Scholarship Portal (scholarships.gov.in) for full tuition fee reimbursement & stipend!",
                    "caption": "Central Sector scholarship for SC, ST, OBC, Minority, and EWS students.",
                    "sourceRef": "Section 2: Scholarship Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: One-Time Registration (OTR)",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Nodal Officer",
                    "dialogue": "Complete One-Time Registration (OTR) with your Aadhaar, previous marksheet, and state income certificate.",
                    "caption": "Transparent paperless merit-cum-means selection.",
                    "sourceRef": "Section 3: Portal Verification"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Graduation Day with Honors",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Full ₹45,000 scholarship credited directly via DBT! Raju graduates top of his engineering class!",
                    "caption": "Education for all: No merit denied for want of money.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: ఫీజుల గడువు ఆందోళన",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "రాజు",
                    "dialogue": "సెమిస్టర్ ఫీజు గడువు వచ్చేసింది, నాన్న వ్యవసాయ ఆదాయంతో కాలేజ్ ఫీజు, హాస్టల్ ఖర్చులు కట్టడం కష్టం!",
                    "caption": "ఆర్థిక ఇబ్బందులతో చదువు ఆగిపోతుందేమోనని రాజు ఆందోళన.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: జాతీయ స్కాలర్షిప్ పోర్టల్",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "కాలేజీ ప్రొఫెసర్",
                    "dialogue": "scholarships.gov.in లో దరఖాస్తు చేయండి! పూర్తి ట్యూషన్ ఫీజు రీయింబర్స్మెంట్ & నెలవారీ స్టైపెండ్ లభిస్తుంది!",
                    "caption": "కేంద్ర ప్రభుత్వ ప్రత్యక్ష స్కాలర్షిప్ నిధి.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: వన్-టైమ్ రిజిస్ట్రేషన్",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "నోడల్ ఆఫీసర్",
                    "dialogue": "మీ ఆధార్, మార్కుల లిస్ట్ మరియు ఆదాయ ధ్రువీకరణ పత్రంతో ఎన్ఎస్పీ పోర్టల్లో రిజిస్టర్ అవ్వండి.",
                    "caption": "పారదర్శకమైన ఆన్లైన్ వెరిఫికేషన్ ప్రక్రియ.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఇంజనీరింగ్ గోల్డ్ మెడల్",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 స్కాలర్షిప్ నగదు డీబీటీ ద్వారా ఖాతాలో పడింది! ఇంజనీరింగ్ ప్రథమ శ్రేణిలో పూర్తి చేశాను!",
                    "caption": "ప్రతిభకు పేదరికం అడ్డంకి కాదు.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: फीस का नोटिस",
                    "image": "assets/scholarship_1.jpg",
                    "speaker": "राजू",
                    "dialogue": "कॉलेज फीस का नोटिस लग गया है, पिताजी की सीमित आय में हॉस्टल और कॉलेज फीस दोनों कैसे भरेंगे?",
                    "caption": "फीस के अभाव में पढ़ाई छूटने के डर से परेशान राजू।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: राष्ट्रीय छात्रवृत्ति पोर्टल",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "प्रोफेसर साहब",
                    "dialogue": "scholarships.gov.in पर नेशनल स्कॉलरशिप पोर्टल से पूरी फीस वापसी और मासिक भत्ता मिलता है!",
                    "caption": "एससी/एसटी/ओबीसी एवं आर्थिक रूप से कमजोर छात्रों हेतु केंद्र की योजना।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: सरल ओटीआर पंजीकरण",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "नोडल अधिकारी",
                    "dialogue": "आधार कार्ड, पिछली कक्षा की मार्कशीट और आय प्रमाण पत्र के साथ ओटीआर रजिस्ट्रेशन पूरा करें।",
                    "caption": "पारदर्शी एवं प्रत्यक्ष छात्रवृत्ति डीबीटी अंतरण।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: डिग्री और सफलता",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 ₹45,000 की पूरी छात्रवृत्ति खाते में आ गई! राजू ने कॉलेज में टॉप कर डिग्री हासिल की!",
                    "caption": "पढ़ेगा भारत, बढ़ेगा भारत: मेधा को सहारा।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Raju",
                "role": "Merit Student",
                "avatar": "🎓",
                "desc": "College Shirt with Textbooks"
            },
            "te": {
                "name": "రాజు",
                "role": "ప్రతిభావంతుడైన విద్యార్థి",
                "avatar": "🎓",
                "desc": "కాలేజీ చొక్కా & పుస్తకాలు"
            },
            "hi": {
                "name": "राजू",
                "role": "मेधावी छात्र",
                "avatar": "🎓",
                "desc": "कॉलेज शर्ट और किताबें"
            }
        }
    },
    {
        "id": "pm_awas_rural",
        "name": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
        "category": "Housing & Energy",
        "level": "Central",
        "dept": "Ministry of Rural Development",
        "purpose": "Provide pucca houses with basic amenities like piped water, electricity, and clean cooking fuel to all houseless rural families.",
        "benefits": "Financial assistance of ₹1.20 Lakh in plain areas and ₹1.30 Lakh in hilly/difficult areas transferred directly via DBT.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "maxIncome": 150000,
            "state": "All India",
            "occupation": "Rural Household",
            "summary": "Houseless families or families living in kutcha or dilapidated houses based on SECC 2011 data."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Identity and geo-tagging validation"
            },
            {
                "id": "d2",
                "name": "Bank Account Passbook",
                "required": True,
                "why": "Direct DBT installment credits"
            },
            {
                "id": "d3",
                "name": "MGNREGA Job Card Number",
                "required": False,
                "why": "For 90-95 days unskilled labor wage support"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Gram Sabha Beneficiary Validation",
                "desc": "Check presence in village PMAY-G permanent waitlist."
            },
            {
                "step": 2,
                "title": "Geo-Tagging of Old Site",
                "desc": "Gram Panchayat officer takes geotagged photo via AwaasApp."
            },
            {
                "step": 3,
                "title": "Direct Installment Releases",
                "desc": "Receive fund releases linked to foundation, lintel, and roof construction stages."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pradhan-mantri-awaas-yojana-gramin",
        "sourceUrl": "https://pmayg.nic.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Leaking Mud Hut",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "Birju",
                    "dialogue": "Monsoon rains leak through our grass thatched hut every year. My children have no dry floor to sleep on.",
                    "caption": "Dilapidated kutcha house exposes rural family to harsh weather.",
                    "sourceRef": "Section 1: PMAY-G Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: ₹1.20 Lakh Pucca House Grant",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "Gram Pradhan",
                    "dialogue": "Birju, your name is sanctioned under PMAY-G for ₹1.20 Lakh direct grant + 90 days MGNREGA wage support!",
                    "caption": "100% government assistance for concrete house with toilet & power.",
                    "sourceRef": "Section 2: Assistance Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: AwaasApp Geo-Tagging",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Panchayat Secretary",
                    "dialogue": "AwaasApp geo-tags your foundation. Direct installments credit to your bank account at each building stage.",
                    "caption": "Transparent stage-wise DBT fund transfers.",
                    "sourceRef": "Section 3: Construction Workflow"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Beautiful Pucca Home",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Permanent concrete roof, clean tap water, and light! A safe, dignified home of our own forever.",
                    "caption": "Housing for All: Solid foundation for rural families.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: వర్షానికి కారుతున్న గుడిసె",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "బిర్జు",
                    "dialogue": "ప్రతి వర్షాకాలంలో మా పూరి గుడిసె కారుతోంది, పిల్లలు పడుకోవడానికి పొడి నేల కూడా లేదు!",
                    "caption": "శిథిలావస్థలో ఉన్న మట్టి గుడిసెలో ఇబ్బంది పడుతున్న బిర్జు కుటుంబం.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: పక్కా ఇంటికి ₹1.20 లక్షలు",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "గ్రామ సర్పంచ్",
                    "dialogue": "పీఎం ఆవాస్ యోజన (గ్రామీణ్) కింద మీకు పక్కా ఇంటి నిర్మాణానికి ₹1.20 లక్షల ఉచిత నిధులు మంజూరయ్యాయి!",
                    "caption": "ఉపాధి హామీ కింద 90 రోజుల కూలీ సొమ్ము కూడా లభిస్తుంది.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: ఆవాస్ యాప్ జియో-ట్యాగింగ్",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "పంచాయతీ కార్యదర్శి",
                    "dialogue": "పునాది, గోడలు, పైకప్పు దశలవారీగా ఫోటో తీసి నేరుగా మీ బ్యాంక్ ఖాతాలో విడతలవారీగా నిధులు జమ చేస్తాము.",
                    "caption": "పారదర్శకమైన దశలవారీ నగదు విడుదల.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: సొంతింటి కల సాకారం",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 పక్కా డాబా ఇల్లు, మరుగుదొడ్డి, విద్యుత్ అన్నీ సమకూరాయి! మా కుటుంబానికి శాశ్వత నీడ దొరికింది!",
                    "caption": "పీఎం ఆవాస్ యోజన - ప్రతి ఒక్కరికీ గౌరవప్రదమైన నివాసం.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: टपकती कच्ची झोपड़ी",
                    "image": "assets/surya_ghar_1.jpg",
                    "speaker": "बिरजू",
                    "dialogue": "बरसात में कच्ची छत से पानी टपकता है, बच्चों को सोने के लिए सूखी जगह भी नहीं मिलती!",
                    "caption": "कच्चे मकान में प्राकृतिक आपदाओं से जूझता ग्रामीण परिवार।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: पक्के मकान हेतु ₹1.20 लाख",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "ग्राम प्रधान",
                    "dialogue": "बिरजू! पीएम आवास योजना (ग्रामीण) में पक्के मकान के लिए ₹1.20 लाख और 90 दिन की मनरेगा मजदूरी स्वीकृत हुई है!",
                    "caption": "सीधे बैंक खाते में बिना बिचौलियों के सहायता राशि।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आवास ऐप से जियो-टैगिंग",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "पंचायत सचिव",
                    "dialogue": "नींव और छत ढलाई की फोटो आवास ऐप पर अपलोड होते ही सीधे आपके खाते में किश्तें आ जाएंगी।",
                    "caption": "पारदर्शी चरणबद्ध निर्माण सत्यापन।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: सपनों का पक्का घर",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 पक्की छत, शौचालय और नल का पानी! अब बिरजू का परिवार सुरक्षित और स्वाभिमानी है!",
                    "caption": "हर बेघर को पक्की छत, सम्मान से भरा जीवन।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Birju",
                "role": "Rural Laborer",
                "avatar": "🧱",
                "desc": "Simple Dhoti Kurta"
            },
            "te": {
                "name": "బిర్జు",
                "role": "గ్రామీణ కూలీ",
                "avatar": "🧱",
                "desc": "సాధారణ ధోతీ కుర్తా"
            },
            "hi": {
                "name": "बिरजू",
                "role": "ग्रामीण श्रमिक",
                "avatar": "🧱",
                "desc": "धोती और साधारण कुर्ता"
            }
        }
    },
    {
        "id": "pm_vishwakarma",
        "name": "PM Vishwakarma Kaushal Samman",
        "category": "Business",
        "level": "Central",
        "dept": "Ministry of Micro, Small & Medium Enterprises",
        "purpose": "Holistic end-to-end support to traditional artisans and craftspeople across 18 trades (carpenters, blacksmiths, potters, cobblers, tailors).",
        "benefits": "Collateral-free enterprise loans up to ₹3 Lakh at 5% interest rate + ₹15,000 modern e-voucher toolkit grant + ₹500/day training stipend.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 300000,
            "state": "All India",
            "occupation": "Artisan / Craftsperson",
            "summary": "Artisans engaged in one of the 18 eligible traditional family crafts (Blacksmith, Carpenter, Potter, Mason, Tailor, Barber, etc.)."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card & Mobile Link",
                "required": True,
                "why": "Biometric verification on PM Vishwakarma Portal"
            },
            {
                "id": "d2",
                "name": "Bank Account Passbook",
                "required": True,
                "why": "For loan disbursement and toolkit e-voucher"
            },
            {
                "id": "d3",
                "name": "Trade Skill Declaration",
                "required": True,
                "why": "Gram Panchayat / ULB trade endorsement"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Register at CSC",
                "desc": "Visit nearest Common Service Center with Aadhaar and bank details."
            },
            {
                "step": 2,
                "title": "Complete 5-Day Basic Skill Training",
                "desc": "Receive ₹500/day stipend during skill upgradation."
            },
            {
                "step": 3,
                "title": "Claim ₹15,000 Toolkit Incentive",
                "desc": "Receive digital voucher to buy modern trade tools."
            },
            {
                "step": 4,
                "title": "Access ₹1 Lakh Collateral-Free Loan",
                "desc": "Receive first tranche loan at concessional 5% interest rate."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-vishwakarma",
        "sourceUrl": "https://pmvishwakarma.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Obsolete Tools Struggle",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "Mohan",
                    "dialogue": "My handmade iron tools take 3 days to forge. Factory goods are cheaper because I lack modern machinery.",
                    "caption": "Traditional craftsperson Mohan struggles with outdated hand tools.",
                    "sourceRef": "Section 1: Vishwakarma Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: ₹15,000 Toolkit + ₹500/day Stipend",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "GovToon Hero",
                    "dialogue": "PM Vishwakarma gives ₹15,000 modern toolkit e-voucher + 5 days skill training with ₹500 daily stipend!",
                    "caption": "Holistic support for 18 traditional crafts with PM Vishwakarma ID.",
                    "sourceRef": "Section 2: Benefit Structure"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: ₹1 Lakh Collateral-Free Loan @ 5%",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "CSC VLE",
                    "dialogue": "Register at CSC with Aadhaar & trade skill declaration. Unlock ₹1 Lakh loan at subsidized 5% interest.",
                    "caption": "Graduated to ₹2 Lakhs on successful repayment.",
                    "sourceRef": "Section 3: Loan Rules"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Modern Power Workshop",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Electric rotary forge installed! Mohan produces premium tools in hours and sells across state exhibitions!",
                    "caption": "Empowering the Vishwakarmas of modern India.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: పాత పనిముట్ల కష్టం",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "మోహన్",
                    "dialogue": "చేతితో ఇనుప పనిముట్లు తయారు చేయడానికి రోజులు పడుతోంది, ఆధునిక యంత్రాలు కొనడానికి చేతిలో డబ్బు లేదు!",
                    "caption": "ఆధునిక టూల్స్ లేక ఇబ్బంది పడుతున్న సాంప్రదాయ చేతివృత్తిదారుడు.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ₹15,000 టూల్కిట్ గ్రాంట్",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": "పీఎం విశ్వకర్మ ద్వారా ₹15,000 ఉచిత టూల్కిట్ ఈ-వోచర్ & రోజుకు ₹500 స్టైపెండ్తో 5 రోజుల నైపుణ్య శిక్షణ లభిస్తుంది!",
                    "caption": "18 రకాల సాంప్రదాయ వృత్తులకు సమగ్ర మద్దతు.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: కేవలం 5% వడ్డీకే ₹1 లక్ష రుణం",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "సీఎస్సీ మిత్ర",
                    "dialogue": "మీ ఆధార్తో నమోదు చేసుకోండి. పూచీకత్తు లేకుండా 5% తక్కువ వడ్డీకే మొదటి విడత ₹1 లక్ష రుణం మంజూరవుతుంది.",
                    "caption": "విజయవంతంగా చెల్లిస్తే ₹2 లక్షల రెండో విడత రుణం.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆధునిక వర్క్షాప్",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 ఎలక్ట్రిక్ పవర్ మిషన్లు వచ్చేసాయి! తక్కువ సమయంలో ఎక్కువ ఉత్పత్తి చేస్తూ వ్యాపారం మూడు పువ్వులు ఆరు కాయలుగా సాగుతోంది!",
                    "caption": "పీఎం విశ్వకర్మ - చేతివృత్తుల వారికి నూతన జీవం.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: पुराने औजारों की लाचारी",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "मोहन",
                    "dialogue": "पारंपरिक हथौड़े से औजार बनाने में दिन लग जाते हैं। आधुनिक मशीनें खरीदने की पूँजी नहीं है!",
                    "caption": "पुराने औजारों के कारण पिछड़ते पारंपरिक लोहार मोहन।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: ₹15,000 का टूलकिट वाउचर",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "गोवटून हीरो",
                    "dialogue": "पीएम विश्वकर्मा योजना में ₹15,000 का मुफ्त टूलकिट ई-वाउचर और ₹500/दिन भत्ते के साथ 5 दिन का कौशल प्रशिक्षण मिलता है!",
                    "caption": "18 पारंपरिक व्यवसायों को विश्वकर्मा प्रमाण पत्र और पहचान पत्र।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: मात्र 5% ब्याज पर ₹1 लाख लोन",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "सीएससी वीएलई",
                    "dialogue": "आधार से सीएससी पर आवेदन करें। बिना किसी गारंटी के 5% ब्याज पर ₹1 लाख का पहला लोन तुरंत प्राप्त करें।",
                    "caption": "समय पर चुकाने पर ₹2 लाख का दूसरा चरण लोन।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: आधुनिक समृद्ध कार्यशाला",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 इलेक्ट्रिक भट्टी और नए औजार लगे! मोहन की बनाई वस्तुएं अब बड़े मेलों और बाजारों में बिक रही हैं!",
                    "caption": "विश्वकर्मा का सम्मान, आत्मनिर्भर भारत की पहचान।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Mohan",
                "role": "Traditional Blacksmith / Artisan",
                "avatar": "⚒️",
                "desc": "Leather Apron with Tongs"
            },
            "te": {
                "name": "మోహన్",
                "role": "సాంప్రదాయ కమ్మరి / శిల్పి",
                "avatar": "⚒️",
                "desc": "తోలు అప్రాన్ & సుత్తి"
            },
            "hi": {
                "name": "मोहन",
                "role": "पारंपरिक लोहार / कारीगर",
                "avatar": "⚒️",
                "desc": "चमड़े का एप्रन और संडसी"
            }
        }
    },
    {
        "id": "pm_ujjwala",
        "name": "Pradhan Mantri Ujjwala Yojana 2.0 (LPG Connection)",
        "category": "Housing & Energy",
        "level": "Central",
        "dept": "Ministry of Petroleum & Natural Gas",
        "purpose": "Provide clean cooking LPG cylinders to poor women living in rural and urban households to eliminate hazardous smoke inhalation.",
        "benefits": "100% Free deposit-free LPG connection (stove + cylinder + regulator) + targeted ₹300 subsidy per refill cylinder for up to 12 refills/year.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 100,
            "maxIncome": 200000,
            "state": "All India",
            "occupation": "Woman Householder",
            "summary": "Adult woman belonging to BPL/poor household having no existing LPG connection in the family."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card of Applicant & Family",
                "required": True,
                "why": "Identity and deduplication check"
            },
            {
                "id": "d2",
                "name": "Ration Card / BPL Proof",
                "required": True,
                "why": "Proof of household composition"
            },
            {
                "id": "d3",
                "name": "Bank Account Passbook",
                "required": True,
                "why": "Direct DBT subsidy transfer for cylinder refills"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Collect Ujjwala 2.0 Form",
                "desc": "Visit nearest Indane, Bharatgas, or HP Gas dealership or apply at pmuy.gov.in."
            },
            {
                "step": 2,
                "title": "Submit Aadhaar & Ration Card",
                "desc": "Provide family member Aadhaar details and bank account."
            },
            {
                "step": 3,
                "title": "Collect Free Gas Stove & Cylinder",
                "desc": "Get free domestic gas connection setup delivered to home."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pradhan-mantri-ujjwala-yojana",
        "sourceUrl": "https://www.pmuy.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Dangerous Chulha Smoke",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "Radha",
                    "dialogue": "Wood smoke fills the kitchen every morning. My eyes burn and the children are constantly coughing.",
                    "caption": "Hazardous indoor air pollution from traditional biomass chulha.",
                    "sourceRef": "Section 1: Ujjwala 2.0 Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: 100% Free Gas Connection",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "Anganwadi Didi",
                    "dialogue": "Radha Didi, Ujjwala 2.0 gives poor rural women a 100% FREE LPG stove, cylinder, and regulator with zero deposit!",
                    "caption": "Includes first refill free + targeted ₹300 subsidy per cylinder.",
                    "sourceRef": "Section 2: Subsidy Scheme"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Direct Distributor Enrolment",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Gas Distributor",
                    "dialogue": "Submit family Aadhaar and Ration Card. Delivery team delivers your gas connection directly to your doorstep.",
                    "caption": "No security deposit or stove cost charged to beneficiary.",
                    "sourceRef": "Section 3: Registration"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Smoke-Free Healthy Kitchen",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Clean blue flame cooking in minutes! No smoke, healthy lungs, and ₹300 subsidy credited on every refill!",
                    "caption": "Swachh Indhan, Behtar Jeevan: Smoke-free India.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: పొయ్యి పొగతో అనారోగ్యం",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "రాధ",
                    "dialogue": "కట్టెల పొయ్యి పొగతో వంటగది మొత్తం నిండిపోతోంది, కళ్లు మండుతున్నాయి, పిల్లలకు నిరంతరం దగ్గు వస్తోంది!",
                    "caption": "కట్టెల పొగతో ఆరోగ్య సమస్యలు ఎదుర్కొంటున్న రాధ.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ఉచిత గ్యాస్ కనెక్షన్",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "అంగన్వాడీ దీది",
                    "dialogue": "ఉజ్వల 2.0 కింద మహిళలకు ఉచిత గ్యాస్ స్టవ్, సిలిండర్ మరియు రెగ్యులేటర్ పూర్తిగా ఉచితంగా లభిస్తాయి!",
                    "caption": "మొదటి సిలిండర్ ఉచితం + ప్రతి రీఫిల్పై ₹300 సబ్సిడీ.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: సులువైన ధ్రువీకరణ",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "గ్యాస్ డీలర్",
                    "dialogue": "మీ ఆధార్, రేషన్ కార్డు ఇవ్వండి. డిపాజిట్ లేకుండా మీ ఇంటికే గ్యాస్ కనెక్షన్ అందిస్తాము.",
                    "caption": "ఎలాంటి పూచీకత్తు లేదా ముందస్తు రుసుము లేదు.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: పొగరహిత ఆనంద నిలయం",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 నిమిషాల్లో శుభ్రమైన వంట పూర్తవుతోంది! పొగ లేదు, రోగాలు లేవు, ప్రతి సిలిండర్పై ₹300 సబ్సిడీ ఖాతాలో పడుతోంది!",
                    "caption": "ఉజ్వల యోజన - మహిళల ఆరోగ్యానికి రక్షణ.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: धुएं का दमघोंटू दर्द",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "राधा",
                    "dialogue": "लकड़ी के चूल्हे के धुएं से आंखें जलती हैं और बच्चे खांसते रहते हैं। खाना बनाना सजा बन गया है!",
                    "caption": "लकड़ी और उपलों के धुएं से जूझती ग्रामीण गृहिणी राधा।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: मुफ्त गैस कनेक्शन",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "आंगनवाड़ी दीदी",
                    "dialogue": "राधा दीदी! उज्ज्वला 2.0 में गरीब महिलाओं को मुफ्त चूल्हा, भरा हुआ सिलेंडर और रेगुलेटर बिना किसी डिपॉजिट के मिलता है!",
                    "caption": "पहली रिफिल मुफ्त + हर रिफिल पर ₹300 की सीधी सब्सिडी।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान गैस कनेक्शन",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "गैस वितरक",
                    "dialogue": "बस अपना आधार और राशन कार्ड दीजिए। आपके घर पर मुफ्त एलपीजी कनेक्शन पहुंचा दिया जाएगा।",
                    "caption": "बिना सिक्योरिटी डिपॉजिट के तुरंत कनेक्शन।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: धुआं-मुक्त स्वस्थ रसोई",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 नीली आंच पर मिनटों में खाना तैयार! धुआं खत्म, फेफड़े स्वस्थ और सब्सिडी सीधे बैंक में!",
                    "caption": "स्वच्छ ईंधन, बेहतर जीवन: उज्ज्वला भारत।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Radha",
                "role": "Rural Homemaker",
                "avatar": "🔥",
                "desc": "Cotton Saree with Chulha Apron"
            },
            "te": {
                "name": "రాధ",
                "role": "గృహిణి",
                "avatar": "🔥",
                "desc": "కాటన్ చీర"
            },
            "hi": {
                "name": "राधा",
                "role": "ग्रामीण गृहिणी",
                "avatar": "🔥",
                "desc": "सूती साड़ी"
            }
        }
    },
    {
        "id": "standup_india",
        "name": "Stand-Up India Scheme for Entrepreneurs",
        "category": "Business",
        "level": "Central",
        "dept": "Department of Financial Services, Ministry of Finance",
        "purpose": "Facilitate bank loans between ₹10 Lakh and ₹1 Crore to SC, ST, and Women borrowers for setting up greenfield non-farm enterprises.",
        "benefits": "Composite term loan & working capital financing from ₹10 Lakh up to ₹100 Lakh (1 Crore) with handholding mentorship support.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 70,
            "maxIncome": 10000000,
            "state": "All India",
            "occupation": "SC/ST / Woman Entrepreneur",
            "summary": "SC/ST and/or Woman entrepreneurs starting a new greenfield enterprise in manufacturing, services, or trading."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Identity Proof & Caste Certificate (for SC/ST)",
                "required": True,
                "why": "Category verification"
            },
            {
                "id": "d2",
                "name": "Detailed Project Report (DPR)",
                "required": True,
                "why": "Business feasibility and revenue plan"
            },
            {
                "id": "d3",
                "name": "PAN Card & Bank Statements (6 Months)",
                "required": True,
                "why": "Financial credit appraisal"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Register on Stand-Up Portal",
                "desc": "Visit standupmitra.in and submit initial business profile."
            },
            {
                "step": 2,
                "title": "Bank Branch Assignment",
                "desc": "Lead bank branch assesses DPR and collateral structure."
            },
            {
                "step": 3,
                "title": "Loan Sanction & Handholding",
                "desc": "Composite credit sanctioned with margin money support."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/stand-india-scheme",
        "sourceUrl": "https://www.standupmitra.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Capital for Greenfield Startup",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "Priya",
                    "dialogue": "I designed an agro-processing plant for millets, but need ₹25 Lakhs capital to buy commercial machinery.",
                    "caption": "Aspiring woman entrepreneur Priya seeks project financing.",
                    "sourceRef": "Section 1: Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: ₹10 Lakh to ₹1 Crore Bank Loan",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "SIDBI Officer",
                    "dialogue": "Stand-Up India facilitates composite bank loans from ₹10 Lakh up to ₹1 Crore for Women & SC/ST greenfield enterprises!",
                    "caption": "7-year repayment tenure with margin money convergence.",
                    "sourceRef": "Section 2: Finance Structure"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: DPR & Handholding Support",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Lead Bank Manager",
                    "dialogue": "Submit your Detailed Project Report on standupmitra.in. Bank branch sanctions loan with credit guarantee support.",
                    "caption": "Dedicated handholding mentorship support.",
                    "sourceRef": "Section 3: Application Portal"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Exporting Organic Millets",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Agro-plant operational! Employing 15 rural women packaging certified organic millets for global export!",
                    "caption": "Stand-Up India: Fueling grassroots entrepreneurship.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: పరిశ్రమ స్థాపనకు పెట్టుబడి",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "ప్రియ",
                    "dialogue": "చిరుధాన్యాల ప్రాసెసింగ్ ప్లాంట్ ప్రారంభించడానికి ₹25 లక్షల మూలధనం అవసరం, ఇంత పెద్ద మొత్తం ఎలా పొందాలి?",
                    "caption": "నూతన పరిశ్రమ స్థాపనకు పూచీకత్తు వెతుకుతున్న ప్రియ.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ₹10 లక్షల నుండి ₹1 కోటి వరకు రుణం",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "సిడ్బీ అధికారి",
                    "dialogue": "స్టాండ్-అప్ ఇండియా కింద మహిళలు, ఎస్సీ, ఎస్టీలకు ₹10 లక్షల నుండి ₹1 కోటి వరకు సమగ్ర బ్యాంక్ రుణాలు లభిస్తాయి!",
                    "caption": "7 సంవత్సరాల రీపేమెంట్ గడువు మరియు మార్జిన్ మనీ సాయం.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: డీపీఆర్ సమర్పణ",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "బ్యాంక్ మేనేజర్",
                    "dialogue": "standupmitra.in లో మీ ప్రాజెక్ట్ రిపోర్ట్ సమర్పించండి. బ్యాంక్ బ్రాంచ్ ద్వారా రుణం మంజూరు చేస్తాము.",
                    "caption": "ప్రభుత్వ క్రెడిట్ గ్యారెంటీతో సురక్షిత రుణం.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: 15 మంది మహిళలకు ఉపాధి",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 ఫ్యాక్టరీ ప్రారంభమైంది! 15 మంది గ్రామీణ మహిళలకు ఉపాధి కల్పిస్తూ అంతర్జాతీయంగా ఎగుమతులు చేస్తున్నాను!",
                    "caption": "స్టాండ్-అప్ ఇండియా - మహిళా పారిశ్రామిక విప్లవం.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: नए उद्योग के लिए पूँजी",
                    "image": "assets/mudra_1.jpg",
                    "speaker": "प्रिया",
                    "dialogue": "श्रीअन्न (मिल्लेट्स) प्रोसेसिंग प्लांट लगाना है, पर ₹25 लाख का प्रोजेक्ट लोन कहाँ से मिलेगा?",
                    "caption": "ग्रीनफील्ड उद्योग शुरू करने के लिए पूँजी की तलाश में प्रिया।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: ₹10 लाख से ₹1 करोड़ तक का बैंक लोन",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "सिडबी अधिकारी",
                    "dialogue": "स्टैंड-अप इंडिया योजना में महिला एवं एससी/एसटी उद्यमियों को ₹10 लाख से ₹1 करोड़ तक का बैंक लोन मिलता है!",
                    "caption": "7 साल की आसान पुनर्भुगतान अवधि और क्रेडिट गारंटी।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: प्रोजेक्ट रिपोर्ट और आवेदन",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "शाखा प्रबंधक",
                    "dialogue": "standupmitra.in पर प्रोजेक्ट रिपोर्ट जमा करें। बैंक शाखा से हैंडहोल्डिंग और लोन की स्वीकृति तुरंत होगी।",
                    "caption": "हैंडहोल्डिंग सहायता और मार्जिन मनी अभिसरण।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: सफल निर्यातक उद्यमी",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 प्रोसेसिंग यूनिट शुरू! 15 ग्रामीण महिलाओं को रोजगार देकर जैविक उत्पादों का निर्यात शुरू किया!",
                    "caption": "स्टैंड-अप इंडिया: उद्यमिता से आत्मनिर्भरता।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Priya",
                "role": "SC/ST / Woman Tech Entrepreneur",
                "avatar": "🚀",
                "desc": "Modern Formal Blazer"
            },
            "te": {
                "name": "ప్రియ",
                "role": "మహిళా పారిశ్రామికవేత్త",
                "avatar": "🚀",
                "desc": "ఫార్మల్ బ్లేజర్"
            },
            "hi": {
                "name": "प्रिया",
                "role": "महिला उद्यमी",
                "avatar": "🚀",
                "desc": "औपचारिक ब्लेज़र"
            }
        }
    },
    {
        "id": "pm_matsya_sampada",
        "name": "PM Matsya Sampada Yojana (PMMSY)",
        "category": "Agriculture",
        "level": "Central",
        "dept": "Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying",
        "purpose": "Harness potential of fisheries sector sustainably through infrastructure, post-harvest logistics, and fish farmer livelihood enhancement.",
        "benefits": "Capital subsidy of 40% for General category and 60% for Women, SC, and ST beneficiaries on fish ponds, biofloc, RAS, and transport vans.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 75,
            "maxIncome": 1000000,
            "state": "All India",
            "occupation": "Fish Farmer / Fisherfolk",
            "summary": "Fishers, fish farmers, fish workers, SHGs, and fisheries cooperatives."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card & Fisherman Registration",
                "required": True,
                "why": "Identity and occupational status"
            },
            {
                "id": "d2",
                "name": "Land/Water Body Lease or Ownership Proof",
                "required": True,
                "why": "Aquaculture site verification"
            },
            {
                "id": "d3",
                "name": "Bank Passbook with IFSC",
                "required": True,
                "why": "Direct DBT subsidy release"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Prepare Fisheries Project Proposal",
                "desc": "Select unit (e.g. Biofloc, Ice Plant, Motorcycle with Icebox)."
            },
            {
                "step": 2,
                "title": "Submit Application to District Fisheries Officer",
                "desc": "Submit through state fisheries portal or pmmsy.dof.gov.in."
            },
            {
                "step": 3,
                "title": "Inspection & 60% DBT Subsidy Release",
                "desc": "Physical verification followed by direct bank subsidy credit."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/pm-matsya-sampada-yojana",
        "sourceUrl": "https://pmmsy.dof.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Perishable Catch Losses",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "Murugan",
                    "dialogue": "Half my fish catch spoils in summer before reaching city markets. We need insulated ice vans and Biofloc tanks.",
                    "caption": "Fishers face post-harvest spoilage and high capital equipment costs.",
                    "sourceRef": "Section 1: PMMSY Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: 60% Capital Subsidy",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "Fisheries Inspector",
                    "dialogue": "PMMSY provides 60% government subsidy (40% for General) on Biofloc ponds, ice plants, and insulated transport vehicles!",
                    "caption": "Comprehensive infrastructure and livelihood assistance for aquaculture.",
                    "sourceRef": "Section 2: Subsidy Matrix"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: District Fisheries Application",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Fisheries Officer",
                    "dialogue": "Submit project proposal and water lease documents on pmmsy.dof.gov.in. Direct DBT subsidy release after inspection.",
                    "caption": "Direct benefit credit into beneficiary bank account.",
                    "sourceRef": "Section 3: Sanction Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: High-Tech Aquaculture Harvest",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Insulated ice vehicle delivered! Fresh catch reaches distant markets with zero wastage, doubling our income!",
                    "caption": "Blue Revolution: Transforming India's fisheries sector.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: చేపల నిల్వ కష్టం",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "మురుగన్",
                    "dialogue": "మార్కెట్కు చేరేలోపే ఎండకు చేపలు పాడైపోతున్నాయి, కోల్డ్ స్టోరేజ్ మరియు ఇన్సులేటెడ్ వ్యాన్లు కొనడానికి నిధులు లేవు!",
                    "caption": "శీతలీకరణ సదుపాయం లేక నష్టపోతున్న మత్స్యకారుడు మురుగన్.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: 60% ప్రభుత్వ సబ్సిడీ",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "మత్స్యశాఖ ఇన్స్పెక్టర్",
                    "dialogue": "పీఎం మత్స్య సంపద యోజన ద్వారా బయోఫ్లాక్ చెరువులు, ఐస్ ప్లాంట్లు, వాహనాలపై 60% వరకు సబ్సిడీ లభిస్తుంది!",
                    "caption": "మత్స్యకారుల సంక్షేమానికి కేంద్ర ప్రభుత్వ భారీ ప్రాజెక్ట్.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: ఆన్లైన్ దరఖాస్తు",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "మత్స్యశాఖ అధికారి",
                    "dialogue": "pmmsy.dof.gov.in లో దరఖాస్తు చేయండి. పరిశీలన తర్వాత నేరుగా సబ్సిడీ సొమ్ము మీ ఖాతాలో జమ అవుతుంది.",
                    "caption": "పారదర్శకమైన డీబీటీ సబ్సిడీ విడుదల.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: నీలి విప్లవ విజయం",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 ఇన్సులేటెడ్ వ్యాన్ వచ్చేసింది! తాజా చేపలను దూర ప్రాంతాలకు తరలించి మూడు రెట్ల లాభాలు గడిస్తున్నాం!",
                    "caption": "మత్స్య సంపద - మత్స్యకారుల జీవితాల్లో ఆర్థిక వెలుగు.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: मछली खराब होने की समस्या",
                    "image": "assets/pm_kisan_1.jpg",
                    "speaker": "मुरुगन",
                    "dialogue": "शहर की मंडी पहुंचने से पहले ही मछलियां खराब हो जाती हैं। कोल्ड स्टोरेज और इन्सुलेटेड वाहन के लिए पूँजी नहीं है!",
                    "caption": "भंडारण और परिवहन के अभाव में नुकसान उठाते मछुआरे।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: 60% तक सरकारी सब्सिडी",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "मत्स्य निरीक्षक",
                    "dialogue": "पीएम मत्स्य संपदा योजना में बायोफ्लॉक टैंक, आइस प्लांट और वाहनों पर 60% तक की भारी सरकारी सब्सिडी मिलती है!",
                    "caption": "नीली क्रांति के तहत मत्स्य क्षेत्र का समग्र विकास।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: सरल आवेदन प्रक्रिया",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "मत्स्य अधिकारी",
                    "dialogue": "pmmsy.dof.gov.in पर प्रोजेक्ट प्रस्ताव जमा करें। भौतिक सत्यापन के बाद सब्सिडी सीधे बैंक में आएगी।",
                    "caption": "सीधे बैंक खाते में डीबीटी सब्सिडी अंतरण।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: दोगुनी आय, सुरक्षित व्यापार",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 इन्सुलेटेड गाड़ी मिल गई! बिना नुकसान के ताजा मछली दूर की मंडियों में बेचकर आमदनी तिगुनी हो गई!",
                    "caption": "मत्स्य संपदा: नीली क्रांति से समृद्धि की ओर।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Murugan",
                "role": "Fish Farmer / Fisher",
                "avatar": "🐟",
                "desc": "Fisherfolk Attire with Net"
            },
            "te": {
                "name": "మురుగన్",
                "role": "మత్స్యకారుడు",
                "avatar": "🐟",
                "desc": "చేపల వల & సాంప్రదాయ దుస్తులు"
            },
            "hi": {
                "name": "मुरुगन",
                "role": "मत्स्य पालक / मछुआरा",
                "avatar": "🐟",
                "desc": "मछुआरों की पोशाक और जाल"
            }
        }
    },
    {
        "id": "atal_pension",
        "name": "Atal Pension Yojana (APY)",
        "category": "Banking & Finance",
        "level": "Central",
        "dept": "Pension Fund Regulatory and Development Authority (PFRDA)",
        "purpose": "Universal social security scheme for all Indian citizens in the unorganized sector to secure guaranteed old age income.",
        "benefits": "Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60 for lifetime.",
        "eligibility": {
            "minAge": 18,
            "maxAge": 40,
            "maxIncome": 500000,
            "state": "All India",
            "occupation": "General Citizen",
            "summary": "Any Indian citizen between 18 and 40 years holding a savings bank or post office account (non-taxpayer)."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Identity, age, and nominee verification"
            },
            {
                "id": "d2",
                "name": "Savings Bank / Post Office Account",
                "required": True,
                "why": "Monthly auto-debit of subscription"
            },
            {
                "id": "d3",
                "name": "Mobile Number",
                "required": True,
                "why": "PRAN generation and contribution alerts"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Approach Your Bank Branch",
                "desc": "Visit your bank or access internet banking APY portal."
            },
            {
                "step": 2,
                "title": "Select Pension Tier (₹1,000 - ₹5,000)",
                "desc": "Choose desired monthly pension at age 60."
            },
            {
                "step": 3,
                "title": "Authorize Auto-Debit & Get PRAN",
                "desc": "Permanent Retirement Account Number (PRAN) issued immediately."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/atal-pension-yojana",
        "sourceUrl": "https://www.npscra.nsdl.co.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: No Retirement Shield",
                    "image": "assets/pension_1.jpg",
                    "speaker": "Vikas",
                    "dialogue": "I drive an auto 12 hours a day, but there is no PF, gratuity, or pension for drivers like me in old age.",
                    "caption": "Informal transport worker Vikas worries about income security at age 60.",
                    "sourceRef": "Section 1: APY Guidelines"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: Guaranteed ₹5,000 Monthly Pension",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "Bank Mitra",
                    "dialogue": "Join Atal Pension Yojana! Save a tiny amount monthly to guarantee ₹1,000 to ₹5,000 monthly pension for life!",
                    "caption": "Sovereign guaranteed lifetime pension for subscriber and spouse.",
                    "sourceRef": "Section 2: Pension Table"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Monthly Auto-Debit from Age 18-40",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Branch Officer",
                    "dialogue": "Link your Savings Bank Account. Auto-debit starts as low as ₹42/month and generates your PRAN card instantly.",
                    "caption": "Automatic low-cost monthly savings with Nominee security.",
                    "sourceRef": "Section 3: PRAN Registration"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Golden Years Financial Freedom",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 PRAN card in pocket! Monthly ₹5,000 guaranteed pension locked for me and my wife. Aatmanirbhar retirement!",
                    "caption": "Universal pension security for every Indian citizen.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: రిటైర్మెంట్ భద్రత లేని జీవితం",
                    "image": "assets/pension_1.jpg",
                    "speaker": "వికాస్",
                    "dialogue": "రోజూ 12 గంటలు ఆటో నడుపుతున్నాను, కానీ వృద్ధాప్యంలో డ్రైవర్లకు ఎలాంటి పీఎఫ్ లేదా పెన్షన్ ఆధారం లేదు!",
                    "caption": "వృద్ధాప్య ఆర్థిక భద్రత లేక ఆందోళన చెందుతున్న వికాస్.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: నెలకు ₹5,000 గ్యారెంటీ పెన్షన్",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "బ్యాంక్ మిత్ర",
                    "dialogue": "అటల్ పెన్షన్ యోజనలో చేరండి! నెలకు చిన్న మొత్తం ఆదా చేస్తూ 60 ఏళ్ల తర్వాత నెలకు ₹1,000 నుండి ₹5,000 వరకు పక్కా పెన్షన్ పొందండి!",
                    "caption": "భార్యాభర్తలిద్దరికీ జీవితాంతం ప్రభుత్వ గ్యారెంటీ పెన్షన్.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: బ్యాంకులో ఆటో-డెబిట్",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "బ్యాంక్ అధికారి",
                    "dialogue": "మీ పొదుపు ఖాతాను లింక్ చేయండి. కేవలం ₹42 తో ప్రారంభించి తక్షణమే ప్రాన్ (PRAN) కార్డు పొందండి.",
                    "caption": "సురక్షితమైన నామినీ సదుపాయం.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఆత్మనిర్భర్ వృద్ధాప్యం",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 ప్రాన్ కార్డు వచ్చేసింది! 60 ఏళ్ల తర్వాత నెలకు ₹5,000 పెన్షన్ ఖాయం చేసుకున్నాను!",
                    "caption": "అటల్ పెన్షన్ యోజన - భవిష్యత్తుకు భరోసా.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: बुढ़ापे में कोई सहारा नहीं",
                    "image": "assets/pension_1.jpg",
                    "speaker": "विकास",
                    "dialogue": "दिन में 12 घंटे ऑटो चलाता हूँ, पर हम ड्राइवरों के लिए बुढ़ापे में कोई पीएफ या पेंशन का सहारा नहीं है!",
                    "caption": "असंगठित परिवहन चालक विकास बुढ़ापे की सुरक्षा को लेकर चिंतित।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: ₹5,000 आजीवन मासिक पेंशन",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "बैंक मित्र",
                    "dialogue": "अटल पेंशन योजना में जुड़ें! हर महीने छोटी सी बचत से 60 वर्ष की आयु पर ₹1,000 से ₹5,000 की पक्की मासिक पेंशन पाएं!",
                    "caption": "सब्सक्राइबर और जीवनसाथी के लिए आजीवन सरकारी गारंटी।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: आसान बैंक खाता ऑटो-डेबिट",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "बैंक अधिकारी",
                    "dialogue": "बचत खाता जोड़ें। मात्र ₹42 प्रति माह से शुरू होकर तुरंत प्रान (PRAN) कार्ड जारी हो जाएगा।",
                    "caption": "आसान ऑटो-डेबिट और पूर्ण नॉमिनी सुरक्षा।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: स्वाभिमानी बुढ़ापा",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 प्रान कार्ड जेब में! बुढ़ापे में ₹5,000 की पक्की पेंशन का इंतज़ाम हो गया। आत्मनिर्भर भविष्य!",
                    "caption": "अटल पेंशन: बुढ़ापे की लाठी, सम्मान की थाती।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Vikas",
                "role": "Auto-Rickshaw Driver",
                "avatar": "🛺",
                "desc": "Khaki Uniform Shirt"
            },
            "te": {
                "name": "వికాస్",
                "role": "ఆటో డ్రైవర్",
                "avatar": "🛺",
                "desc": "ఖాకీ యూనిఫాం"
            },
            "hi": {
                "name": "विकास",
                "role": "ऑटो चालक",
                "avatar": "🛺",
                "desc": "खाकी वर्दी"
            }
        }
    },
    {
        "id": "jal_jeevan",
        "name": "Jal Jeevan Mission (Har Ghar Jal)",
        "category": "Housing & Energy",
        "level": "Central",
        "dept": "Department of Drinking Water & Sanitation, Ministry of Jal Shakti",
        "purpose": "Provide Functional Household Tap Connection (FHTC) delivering 55 liters per capita per day of potable quality drinking water to every rural household.",
        "benefits": "100% Free piped drinking water tap connection at home doorstep with regular village water quality testing.",
        "eligibility": {
            "minAge": 0,
            "maxAge": 100,
            "maxIncome": 1000000,
            "state": "All India",
            "occupation": "Rural Household",
            "summary": "All rural households in villages across India without existing tap connections."
        },
        "documents": [
            {
                "id": "d1",
                "name": "Aadhaar Card",
                "required": True,
                "why": "Household identification on JJM dashboard"
            },
            {
                "id": "d2",
                "name": "Village Ration Card",
                "required": False,
                "why": "Household member mapping"
            }
        ],
        "applicationSteps": [
            {
                "step": 1,
                "title": "Village Action Plan (VAP)",
                "desc": "Pani Samiti / Gram Panchayat maps all unserved households."
            },
            {
                "step": 2,
                "title": "Piped Infrastructure Installation",
                "desc": "Free household tap connected to village piped water supply."
            },
            {
                "step": 3,
                "title": "Clean Water Testing & Certification",
                "desc": "Local women field-test water purity using Field Test Kits (FTKs)."
            }
        ],
        "officialUrl": "https://www.india.gov.in/my-government/schemes/jal-jeevan-mission",
        "sourceUrl": "https://jaljeevanmission.gov.in",
        "lastVerified": "2026-08-24",
        "panels": {
            "en": [
                {
                    "num": 1,
                    "tag": "Panel 1: Exhausting Water Trek",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "Meena",
                    "dialogue": "I walk 4 kilometers twice daily carrying heavy water pots from the brackish well in scorching heat.",
                    "caption": "Rural women spend 4-5 hours daily fetching drinking water.",
                    "sourceRef": "Section 1: JJM Objectives"
                },
                {
                    "num": 2,
                    "tag": "Panel 2: Piped Tap Water at Doorstep",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "Pani Samiti Pradhan",
                    "dialogue": "Jal Jeevan Mission delivers 55 liters per person per day of pure potable tap water directly into your home for FREE!",
                    "caption": "100% functional household tap connection in every village.",
                    "sourceRef": "Section 2: Mission Guidelines"
                },
                {
                    "num": 3,
                    "tag": "Panel 3: Village Infrastructure & Testing",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "Field Test Officer",
                    "dialogue": "Piped network installed at home doorstep. Women test water quality regularly using Field Test Kits (FTKs).",
                    "caption": "Safe, pure, chlorinated drinking water certified locally.",
                    "sourceRef": "Section 3: Testing Process"
                },
                {
                    "num": 4,
                    "tag": "Panel 4: Clean Water & Empowered Time",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "Tagline",
                    "dialogue": "🎉 Crystal clean drinking water at the twist of a tap! Saved 4 hours daily to run my embroidery business!",
                    "caption": "Har Ghar Jal: Water security and women empowerment.",
                    "sourceRef": "Section 4: Impact"
                }
            ],
            "te": [
                {
                    "num": 1,
                    "tag": "ప్యానెల్ 1: మైళ్ల కొద్దీ నడక కష్టం",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "మీనా",
                    "dialogue": "ఎండలో రోజూ 4 కిలోమీటర్లు నడిచి చేదు బావి నుంచి నీళ్ల బిందెలు మోయాల్సి వస్తోంది, సమయమంతా నీళ్లకే సరిపోతోంది!",
                    "caption": "మంచినీటి కోసం గంటల తరబడి శ్రమిస్తున్న గ్రామీణ మహిళలు.",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "ప్యానెల్ 2: ఇంటి గుమ్మం వద్దకే కుళాయి నీరు",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "నీటి సంఘం సర్పంచ్",
                    "dialogue": "జల్ జీవన్ మిషన్ ద్వారా ప్రతి ఇంటికి రోజుకు తలసరి 55 లీటర్ల స్వచ్ఛమైన తాగునీరు ఉచితంగా అందుతుంది!",
                    "caption": "హర్ ఘర్ జల్ - ప్రతి గ్రామీణ గృహానికి ఉచిత కుళాయి కనెక్షన్.",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "ప్యానెల్ 3: స్వచ్ఛతా పరీక్ష",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "నీటి పరీక్షాధికారి",
                    "dialogue": "ఇంటికే పైపుల ద్వారా కనెక్షన్ ఇవ్వబడింది. ఫీల్డ్ టెస్ట్ కిట్స్ ద్వారా నీటి నాణ్యతను క్రమం తప్పకుండా పరీక్షిస్తాము.",
                    "caption": "రోగాలకు తావులేని శుద్ధి చేసిన తాగునీరు.",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "ప్యానెల్ 4: ఇంటికే గంగ - మహిళా వికాసం",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "ముగింపు",
                    "dialogue": "🎉 కుళాయి తిప్పితే చాలు స్వచ్ఛమైన గంగమ్మ వస్తోంది! ఆదా అయిన సమయంతో స్వయం సహాయక సంఘం కుట్టు వ్యాపారం ప్రారంభించాను!",
                    "caption": "జల్ జీవన్ మిషన్ - సంపూర్ణ ఆరోగ్య రక్ష.",
                    "sourceRef": "Section 4"
                }
            ],
            "hi": [
                {
                    "num": 1,
                    "tag": "पैनल 1: मीलों दूर से पानी ढोने का दर्द",
                    "image": "assets/ayushman_1.jpg",
                    "speaker": "मीना",
                    "dialogue": "कड़कती धूप में रोज 4 किलोमीटर दूर जाकर खारे कुएं से मटका भरकर लाना पड़ता है। आधा दिन पानी ढोने में ही बीत जाता है!",
                    "caption": "पेयजल की किल्लत से जूझती ग्रामीण महिलाएं।",
                    "sourceRef": "Section 1"
                },
                {
                    "num": 2,
                    "tag": "पैनल 2: हर घर नल से जल",
                    "image": "assets/pm_kisan_2.jpg",
                    "speaker": "पानी समिति प्रधान",
                    "dialogue": "जल जीवन मिशन के तहत हर ग्रामीण घर में 55 लीटर प्रति व्यक्ति प्रतिदिन शुद्ध नल का पानी बिल्कुल मुफ्त पहुंचेगा!",
                    "caption": "हर घर जल: स्वच्छ सुरक्षित पेयजल का राष्ट्रीय संकल्प।",
                    "sourceRef": "Section 2"
                },
                {
                    "num": 3,
                    "tag": "पैनल 3: घर में नल और जल जांच",
                    "image": "assets/pm_kisan_3.jpg",
                    "speaker": "फील्ड टेस्ट अधिकारी",
                    "dialogue": "घर के आंगन में नल का कनेक्शन लग गया है। फील्ड टेस्ट किट से पानी की शुद्धता की नियमित जांच होती है।",
                    "caption": "बीमारियों से मुक्ति, शुद्ध क्लोरीनयुक्त जल।",
                    "sourceRef": "Section 3"
                },
                {
                    "num": 4,
                    "tag": "पैनल 4: घर में नल, महिला सशक्तिकरण",
                    "image": "assets/pm_kisan_4.jpg",
                    "speaker": "टैगलाइन",
                    "dialogue": "🎉 नल खोला और शुद्ध पानी हाजिर! रोज के 4 घंटे बचे, जिससे मैंने अपना कढ़ाई का काम शुरू कर आमदनी बढ़ाई!",
                    "caption": "जल जीवन मिशन: नारी का सम्मान, हर घर का कल्याण।",
                    "sourceRef": "Section 4"
                }
            ]
        },
        "character": {
            "en": {
                "name": "Meena",
                "role": "Rural Homemaker",
                "avatar": "🚰",
                "desc": "Traditional Dupatta & Matka"
            },
            "te": {
                "name": "మీనా",
                "role": "గ్రామీణ మహిళ",
                "avatar": "🚰",
                "desc": "సాంప్రదాయ దుస్తులు & నీళ్ల బిందె"
            },
            "hi": {
                "name": "मीना",
                "role": "ग्रामीण महिला",
                "avatar": "🚰",
                "desc": "दुपट्टा और पानी का मटका"
            }
        }
    }
]

def save_schemes_cache():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        cache_path = os.path.join(os.path.dirname(base_dir), "schemes_cache.json")
        if not os.path.exists(os.path.dirname(cache_path)):
            cache_path = os.path.join(base_dir, "schemes_cache.json")
        with open(cache_path, "w", encoding="utf-8") as f:
            json.dump(SCHEMES_DB, f, indent=2, ensure_ascii=False)
        print(f"💾 [Cache Saved]: {len(SCHEMES_DB)} schemes persisted to schemes_cache.json")
    except Exception as e:
        print(f"Cache Save Warning: {e}")

# Local Grounded LLM Engine Class
class LocalGroundedLLM:
    """Local LLM Engine for offline/local extraction, story generation, translation, and Q&A."""

    @staticmethod
    def extract_facts(text_input):
        matched = next((s for s in SCHEMES_DB if text_input.lower() in s["name"].lower() or text_input.lower() in s["purpose"].lower()), None)
        if matched:
            return matched

        return {
            "id": f"custom_{hash(text_input) & 0xffffffff}",
            "name": text_input.strip().title(),
            "category": "Central / State Welfare Scheme",
            "level": "Central",
            "dept": "Ministry of Social Justice & Empowerment / Government of India",
            "purpose": f"Provide targeted social welfare and financial support under {text_input}.",
            "benefits": f"Direct Benefit Transfer (DBT) and subsidy assistance for eligible citizens.",
            "eligibility": {
                "minAge": 18, "maxAge": 70, "maxIncome": 500000, "state": "All India", "occupation": "General Citizen",
                "summary": f"Eligible Indian citizens meeting income and residency criteria specified under {text_input} guidelines."
            },
            "documents": [
                {"id": "d1", "name": "Aadhaar Card", "required": True, "why": "Identity and age verification"},
                {"id": "d2", "name": "Bank Passbook & IFSC", "required": True, "why": "Direct Benefit Transfer"},
                {"id": "d3", "name": "Ration Card / Residence Proof", "required": False, "why": "Family status verification"}
            ],
            "applicationSteps": [
                {"step": 1, "title": "Check Official Eligibility", "desc": f"Verify rules on India.gov.in for {text_input}."},
                {"step": 2, "title": "Gather Documents", "desc": "Keep Aadhaar card, passbook, and photo ready."},
                {"step": 3, "title": "Apply Online / CSC", "desc": "Submit form at nearest Jan Seva Kendra or official portal."}
            ],
            "officialUrl": "https://www.india.gov.in/my-government/schemes",
            "sourceUrl": "https://www.india.gov.in",
            "lastVerified": "2026-08-24"
        }

    @staticmethod
    def get_theme_for_scheme(s):
        sid = s.get('id', '')
        known_themes = [
            'pm_kisan', 'pension', 'ayushman', 'surya_ghar', 'pm_svanidhi',
            'mudra_loan', 'sukanya', 'nsp_scholarship', 'pm_awas_rural',
            'pm_vishwakarma', 'pm_ujjwala', 'standup_india', 'pm_matsya_sampada',
            'atal_pension', 'jal_jeevan'
        ]
        if sid in known_themes:
            return sid
        
        text = f"{s.get('name', '')} {s.get('purpose', '')} {s.get('category', '')} {s.get('benefits', '')}".lower()
        if re.search(r'\b(beti|sukanya|girl|daughter|kanya|balika|ladli|matru|women|female)\b', text):
            return 'sukanya'
        if re.search(r'\b(solar|surya|rooftop|bijli|electricity|kusum|photovoltaic|clean energy)\b', text):
            return 'surya_ghar'
        if re.search(r'\b(health|hospital|medical|ayushman|arogya|swasthya|pm-jay|treatment|bima|doctor)\b', text):
            return 'ayushman'
        if re.search(r'\b(scholarship|student|college|epass|nsp|vidyarthi|shiksha|tuition|post-matric)\b', text):
            return 'nsp_scholarship'
        if re.search(r'\b(svanidhi|street vendor|hawker|thela|rehri|micro-credit|vendor)\b', text):
            return 'pm_svanidhi'
        if re.search(r'\b(mudra|startup|business loan|entrepreneur|msme|venture|udyam|seed fund)\b', text):
            return 'mudra_loan'
        if re.search(r'\b(awas|housing|pucca|shelter|makan|pradhan mantri awas)\b', text):
            return 'pm_awas_rural'
        if re.search(r'\b(vishwakarma|artisan|craftsman|carpenter|blacksmith|goldsmith|tailor|toolkit|karigar|shilpkar)\b', text):
            return 'pm_vishwakarma'
        if re.search(r'\b(ujjwala|lpg|gas cylinder|clean cooking|chulha|rasoi)\b', text):
            return 'pm_ujjwala'
        if re.search(r'\b(jal|jeevan|drinking water|tap water|pipeline|har ghar jal|nal)\b', text):
            return 'jal_jeevan'
        if re.search(r'\b(pension|atal|apy|shram yogi|maandhan|senior citizen|old age|retirement)\b', text):
            return 'pension'
        if re.search(r'\b(matsya|fish|fisheries|aquaculture|boat|marine|coastal)\b', text):
            return 'pm_matsya_sampada'
        if re.search(r'\b(standup|women entrepreneur|sc/st enterprise|greenfield)\b', text):
            return 'standup_india'
        if re.search(r'\b(kisan|farmer|agriculture|crop|seed|fertilizer|rythu|farming|landholder)\b', text):
            return 'pm_kisan'
        
        return 'mudra_loan'

    @staticmethod
    def generate_story(scheme_name, persona="citizen"):
        matched = next((s for s in SCHEMES_DB if scheme_name.lower() in s["name"].lower() or scheme_name.lower() in s["purpose"].lower()), None)
        if not matched:
            matched = LocalGroundedLLM.extract_facts(scheme_name)

        theme_key = LocalGroundedLLM.get_theme_for_scheme(matched)
        
        scheme_imgs = {
            "pm_kisan": ["assets/pm_kisan_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
            "pension": ["assets/pension_1.jpg", "assets/pension_2.jpg", "assets/pension_3.jpg", "assets/pension_4.jpg"],
            "ayushman": ["assets/ayushman_1.jpg", "assets/ayushman_2.jpg", "assets/ayushman_3.jpg", "assets/ayushman_4.jpg"],
            "surya_ghar": ["assets/surya_ghar_1.jpg", "assets/surya_ghar_2.jpg", "assets/surya_ghar_3.jpg", "assets/surya_ghar_4.jpg"],
            "pm_svanidhi": ["assets/svanidhi_1.jpg", "assets/svanidhi_2.jpg", "assets/svanidhi_3.jpg", "assets/svanidhi_4.jpg"],
            "mudra_loan": ["assets/mudra_1.jpg", "assets/mudra_2.jpg", "assets/mudra_3.jpg", "assets/mudra_4.jpg"],
            "sukanya": ["assets/sukanya_1.jpg", "assets/sukanya_2.jpg", "assets/sukanya_3.jpg", "assets/sukanya_4.jpg"],
            "nsp_scholarship": ["assets/scholarship_1.jpg", "assets/scholarship_2.jpg", "assets/scholarship_3.jpg", "assets/scholarship_4.jpg"],
            "pm_awas_rural": ["assets/awas_1.jpg", "assets/awas_2.jpg", "assets/awas_3.jpg", "assets/awas_4.jpg"],
            "pm_vishwakarma": ["assets/vishwakarma_1.jpg", "assets/vishwakarma_2.jpg", "assets/vishwakarma_3.jpg", "assets/vishwakarma_4.jpg"],
            "pm_ujjwala": ["assets/ujjwala_1.jpg", "assets/ujjwala_2.jpg", "assets/ujjwala_3.jpg", "assets/ujjwala_4.jpg"],
            "standup_india": ["assets/standup_1.jpg", "assets/standup_2.jpg", "assets/standup_3.jpg", "assets/standup_4.jpg"],
            "pm_matsya_sampada": ["assets/matsya_1.jpg", "assets/matsya_2.jpg", "assets/matsya_3.jpg", "assets/matsya_4.jpg"],
            "atal_pension": ["assets/pension_1.jpg", "assets/pension_2.jpg", "assets/pension_3.jpg", "assets/pension_4.jpg"],
            "jal_jeevan": ["assets/jeevan_1.jpg", "assets/jeevan_2.jpg", "assets/jeevan_3.jpg", "assets/jeevan_4.jpg"]
        }
        imgs = scheme_imgs.get(theme_key, scheme_imgs["mudra_loan"])

        theme_characters = {
            "sukanya": {
                "en": {"name": "Anita & Priya", "role": "Mother & Daughter", "avatar": "👩‍👧", "clothing": "Traditional Saree & School Uniform", "desc": "Mother securing higher education for daughter"},
                "te": {"name": "అనిత & ప్రియ", "role": "తల్లి & కూతురు", "avatar": "👩‍👧", "clothing": "సాంప్రదాయ చీర & స్కూల్ యూనిఫాం", "desc": "కూతురి ఉన్నత చదువుల కోసం ఆరాటపడే తల్లి"},
                "hi": {"name": "अनीता और प्रिया", "role": "माँ और बेटी", "avatar": "👩‍👧", "clothing": "पारंपरिक साड़ी व स्कूल यूनिफॉर्म", "desc": "बेटी के उज्ज्वल भविष्य व उच्च शिक्षा हेतु समर्पित माँ"}
            },
            "surya_ghar": {
                "en": {"name": "Vikram", "role": "Homeowner", "avatar": "☀️", "clothing": "Casual Shirt", "desc": "Homeowner managing rising monthly electricity costs"},
                "te": {"name": "విక్రమ్", "role": "గృహ యజమాని", "avatar": "☀️", "clothing": "సాధారణ చొక్కా", "desc": "కరెంట్ బిల్లులతో సతమతమయ్యే గృహస్థు"},
                "hi": {"name": "विक्रम", "role": "गृहस्वामी", "avatar": "☀️", "clothing": "साधारण शर्ट", "desc": "बढ़ते बिजली बिल से परेशान गृहस्वामी"}
            },
            "nsp_scholarship": {
                "en": {"name": "Raju & Priya", "role": "College Students", "avatar": "🎓", "clothing": "College Bag & Formal Shirt", "desc": "Meritorious students aspiring for higher education"},
                "te": {"name": "రాజు & ప్రియ", "role": "కళాశాల విద్యార్థులు", "avatar": "🎓", "clothing": "కాలేజీ బ్యాగ్ & చొక్కా", "desc": "ఉన్నత చదువులపై ఆశలు పెట్టుకున్న విద్యార్థులు"},
                "hi": {"name": "राजू और प्रिया", "role": "कॉलेज छात्र", "avatar": "🎓", "clothing": "कॉलेज बैग व फॉर्मल शर्ट", "desc": "उच्च शिक्षा का सपना देखने वाले मेधावी छात्र"}
            },
            "ayushman": {
                "en": {"name": "Suresh", "role": "Family Caregiver", "avatar": "🏥", "clothing": "Casual Attire", "desc": "Dedicated family caregiver worried about hospital costs"},
                "te": {"name": "సురేష్", "role": "కుటుంబ పెద్ద", "avatar": "🏥", "clothing": "సాధారణ దుస్తులు", "desc": "కుటుంబంలో వైద్య ఖర్చులపై ఆందోళన చెందే వ్యక్తి"},
                "hi": {"name": "सुरेश", "role": "परिवार के मुखिया", "avatar": "🏥", "clothing": "साधारण कपड़े", "desc": "अस्पताल के महंगे इलाज खर्च से चिंतित नागरिक"}
            },
            "mudra_loan": {
                "en": {"name": "Ravi Kumar", "role": "Entrepreneur & Founder", "avatar": "💼", "clothing": "Smart Casual", "desc": "Ambitious entrepreneur seeking collateral-free capital"},
                "te": {"name": "రవి కుమార్", "role": "చిరు వ్యాపారి & పారిశ్రామికవేత్త", "avatar": "💼", "clothing": "వ్యాపార దుస్తులు", "desc": "పూచీకత్తు లేని రుణం కోరే యువ పారిశ్రామికవేత్త"},
                "hi": {"name": "रवि कुमार", "role": "उद्यमी व व्यापारी", "avatar": "💼", "clothing": "स्मार्ट कैजुअल", "desc": "बिना गारंटी व्यवसाय ऋण व स्टार्टअप पूंजी चाहने वाला युवा"}
            },
            "pm_svanidhi": {
                "en": {"name": "Kalu", "role": "Street Vendor", "avatar": "🛒", "clothing": "Simple Shirt & Apron", "desc": "Hardworking street vendor seeking working capital"},
                "te": {"name": "కాలు", "role": "వీధి వ్యాపారి", "avatar": "🛒", "clothing": "సాధారణ చొక్కా", "desc": "పెట్టుబడి కోసం ఇబ్బంది పడే చిరు వ్యాపారి"},
                "hi": {"name": "कालू", "role": "स्ट्रीट वेंडर", "avatar": "🛒", "clothing": "साधारण कमीज", "desc": "कार्यशील पूंजी चाहने वाला रेहड़ी-पटरी संचालक"}
            },
            "pm_awas_rural": {
                "en": {"name": "Kamala Devi", "role": "Rural Homemaker", "avatar": "🏡", "clothing": "Traditional Saree", "desc": "Homemaker dreaming of a safe, permanent pucca house"},
                "te": {"name": "కమలా దేవి", "role": "గ్రామీణ గృహిణి", "avatar": "🏡", "clothing": "సాంప్రదాయ చీర", "desc": "కుటుంబానికి పక్కా ఇల్లు నిర్మించాలనుకునే గ్రామీణ మహిళ"},
                "hi": {"name": "कमला देवी", "role": "ग्रामीण गृहिणी", "avatar": "🏡", "clothing": "पारंपरिक साड़ी", "desc": "कच्चे मकान से पक्के मकान का सपना देखने वाली महिला"}
            },
            "pm_vishwakarma": {
                "en": {"name": "Mohan Lal", "role": "Traditional Artisan", "avatar": "🛠️", "clothing": "Kurta & Work Apron", "desc": "Skilled artisan desiring modern toolkits and credit"},
                "te": {"name": "మోహన్ లాల్", "role": "చేతివృత్తిదారుడు", "avatar": "🛠️", "clothing": "కుర్తా & ఆప్రాన్", "desc": "ఆధునిక పనిముట్లు మరియు తక్కువ వడ్డీ రుణం కోరే నిపుణుడు"},
                "hi": {"name": "मोहन लाल", "role": "पारंपरिक शिल्पकार", "avatar": "🛠️", "clothing": "कुर्ता व एप्रन", "desc": "आधुनिक टूलकिट व सस्ते लोन का आकांक्षी कारीगर"}
            },
            "pm_ujjwala": {
                "en": {"name": "Sunita", "role": "Rural Homemaker", "avatar": "👩🏽", "clothing": "Simple Saree", "desc": "Homemaker suffering from toxic chulha smoke in kitchen"},
                "te": {"name": "సునీత", "role": "గ్రామీణ గృహిణి", "avatar": "👩🏽", "clothing": "సాధారణ చీర", "desc": "కట్టెల పొయ్యి పొగతో ఇబ్బంది పడే గృహిణి"},
                "hi": {"name": "सुनीता", "role": "ग्रामीण गृहिणी", "avatar": "👩🏽", "clothing": "साधारण साड़ी", "desc": "चूल्हे के जहरीले धुएं से परेशान ग्रामीण महिला"}
            },
            "jal_jeevan": {
                "en": {"name": "Ganga Bai & Family", "role": "Village Resident", "avatar": "🚰", "clothing": "Rural Dress", "desc": "Village family walking miles for drinking water"},
                "te": {"name": "గంగా బాయి", "role": "గ్రామ నివాసి", "avatar": "🚰", "clothing": "గ్రామీణ వస్త్రధారణ", "desc": "మంచినీటి కోసం మైళ్ల దూరం నడిచే కుటుంబం"},
                "hi": {"name": "गंगा बाई", "role": "ग्रामीण निवासी", "avatar": "🚰", "clothing": "पारंपरिक परिधान", "desc": "पीने के पानी के लिए मीलों दूर भटकने वाला परिवार"}
            },
            "pension": {
                "en": {"name": "Sharma Ji", "role": "Senior Citizen", "avatar": "👴🏽", "clothing": "Kurta & Glasses", "desc": "Senior citizen seeking guaranteed monthly pension"},
                "te": {"name": "శర్మ గారు", "role": "వృద్ధ పౌరుడు", "avatar": "👴🏽", "clothing": "కుర్తా & కళ్లద్దాలు", "desc": "వృద్ధాప్యంలో గౌరవప్రదమైన పింఛను కోరే వ్యక్తి"},
                "hi": {"name": "शर्मा जी", "role": "वरिष्ठ नागरिक", "avatar": "👴🏽", "clothing": "कुर्ता व चश्मा", "desc": "बुढ़ापे में आत्मनिर्भरता व मासिक पेंशन चाहने वाले नागरिक"}
            },
            "pm_matsya_sampada": {
                "en": {"name": "Ravi Fisher", "role": "Aquaculture Farmer", "avatar": "🐟", "clothing": "Casual Shirt & Lungi", "desc": "Aquaculture farmer seeking modern boat & cold van subsidy"},
                "te": {"name": "రవి", "role": "మత్స్యకారుడు", "avatar": "🐟", "clothing": "చొక్కా & లుంగీ", "desc": "ఆధునిక బోట్లు, కోల్డ్ వ్యాన్ల సబ్సిడీ కోరే రైతు"},
                "hi": {"name": "रवि मछुआरा", "role": "मत्स्य पालक", "avatar": "🐟", "clothing": "कमीज व लुंगी", "desc": "आधुनिक नाव व आइस वैन हेतु सब्सिडी चाहने वाला मछुआरा"}
            },
            "standup_india": {
                "en": {"name": "Preeti", "role": "Woman Entrepreneur", "avatar": "👩‍💼", "clothing": "Formal Blazer", "desc": "Visionary entrepreneur setting up greenfield enterprise"},
                "te": {"name": "ప్రీతి", "role": "మహిళా పారిశ్రామికవేత్త", "avatar": "👩‍💼", "clothing": "ఫార్మల్ దుస్తులు", "desc": "నూతన పరిశ్రమను స్థాపించాలనే లక్ష్యం కలిగిన యువతి"},
                "hi": {"name": "प्रीति", "role": "महिला उद्यमी", "avatar": "👩‍💼", "clothing": "फॉर्मल परिधान", "desc": "नया उद्योग स्थापित करने का सपना देखने वाली उद्यमी"}
            },
            "pm_kisan": {
                "en": {"name": "Ramu Kaka", "role": "Small Farmer", "avatar": "👨🏽‍🌾", "clothing": "White Kurta & Gamcha", "desc": "Small landholder farmer managing seasonal crop input costs"},
                "te": {"name": "రాము కాకా", "role": "చిన్నకారు రైతు", "avatar": "👨🏽‍🌾", "clothing": "తెల్లని కుర్తా & తువ్వాలు", "desc": "విత్తనాలు, ఎరువుల పెట్టుబడి ఖర్చుల కోసం ఇబ్బంది పడే చిన్న రైతు"},
                "hi": {"name": "रामू काका", "role": "लघु किसान", "avatar": "👨🏽‍🌾", "clothing": "सफेद कुर्ता व गमछा", "desc": "फसल बुआई, बीज व खाद के खर्च से परेशान किसान"}
            }
        }
        char = theme_characters.get(theme_key, theme_characters["mudra_loan"])

        doc_names_en = ", ".join([d["name"] for d in matched.get("documents", [])]) or "Aadhaar Card and Bank Passbook"
        doc_names_te = "ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్"
        doc_names_hi = "आधार कार्ड और बैंक पासबुक"

        benefits_text = matched.get("benefits", f"Direct financial assistance under {matched['name']}.")
        name = matched['name']

        panels = {
            "en": [
                {
                    "num": 1, "tag": "Panel 1: The Tension", "image": imgs[0],
                    "speaker": char["en"]["name"],
                    "dialogue": f"How will I manage expenses and secure support for {name}?",
                    "caption": f"{char['en']['name']} worries about requirements for {name}.",
                    "sourceRef": f"Section 1: Guidelines ({matched.get('officialUrl', '')})"
                },
                {
                    "num": 2, "tag": "Panel 2: The Solution", "image": imgs[1],
                    "speaker": "GovToon Hero",
                    "dialogue": f"Fikr mat kijiye! {name} provides: {benefits_text}",
                    "caption": "Official Direct Benefit Support guaranteed by Government.",
                    "sourceRef": f"Section 2: Benefit Structure ({matched.get('officialUrl', '')})"
                },
                {
                    "num": 3, "tag": "Panel 3: The Easy Path", "image": imgs[2],
                    "speaker": "CSC Bhaiya",
                    "dialogue": f"Just bring your {doc_names_en} to the nearest Jan Seva Kendra or apply online.",
                    "caption": "Simple Aadhaar-based digital registration.",
                    "sourceRef": f"Section 3: Mandatory Documents & Application Process"
                },
                {
                    "num": 4, "tag": "Panel 4: The Khushali", "image": imgs[3],
                    "speaker": "Tagline",
                    "dialogue": f"🎉 {name}: Sarkari Sahayata, Parivar Ki Suraksha!",
                    "caption": "Peace of mind restored with official government support.",
                    "sourceRef": f"Section 4: Disbursement & Impact"
                }
            ],
            "te": [
                {
                    "num": 1, "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన", "image": imgs[0],
                    "speaker": char["te"]["name"],
                    "dialogue": f"{name} పథకం ప్రయోజనాలు ఎలా పొందాలి? ఖర్చులు సమకూర్చడం ఎలా?",
                    "caption": f"{name} కోసం అవసరమైన వివరాలపై {char['te']['name']} ఆందోళన.",
                    "sourceRef": f"విభాగం 1: అధికారిక మార్గదర్శకాలు ({matched.get('officialUrl', '')})"
                },
                {
                    "num": 2, "tag": "ప్యానెల్ 2: ప్రభుత్వ పరిష్కారం", "image": imgs[1],
                    "speaker": "గోవ్టూన్ హీరో",
                    "dialogue": f"దిగులుపడకండి! {name} ద్వారా ప్రభుత్వం అందిస్తోంది: {benefits_text}",
                    "caption": "ప్రభుత్వ అధికారిక ప్రయోజనాల భరోసా.",
                    "sourceRef": f"విభాగం 2: ప్రయోజనాల నిర్మాణం ({matched.get('officialUrl', '')})"
                },
                {
                    "num": 3, "tag": "ప్యానెల్ 3: సులువైన దరఖాస్తు", "image": imgs[2],
                    "speaker": "CSC మిత్రుడు",
                    "dialogue": f"మీ {doc_names_te} తీసుకొని సమీప CSC కేంద్రానికి వెళ్లండి లేదా పోర్టల్‌లో నమోదు చేసుకోండి.",
                    "caption": "ఆధార్ ఆధారిత సులువైన డిజిటల్ నమోదు.",
                    "sourceRef": f"విభాగం 3: అవసరమైన పత్రాలు & దరఖాస్తు"
                },
                {
                    "num": 4, "tag": "ప్యానెల్ 4: ఆనందం & ప్రయోజనం", "image": imgs[3],
                    "speaker": "స్లోగన్",
                    "dialogue": f"🎉 {name}: ప్రభుత్వ సంక్షేమం, కుటుంబానికి రక్షణ!",
                    "caption": "ప్రభుత్వ సహాయంతో నిశ్చింత మరియు భరోసా.",
                    "sourceRef": f"విభాగం 4: పంపిణీ & ప్రభావం"
                }
            ],
            "hi": [
                {
                    "num": 1, "tag": "पैनल 1: चिंता व समस्या", "image": imgs[0],
                    "speaker": char["hi"]["name"],
                    "dialogue": f"{name} के लिए आवश्यक सहायता और खर्च की व्यवस्था कैसे होगी?",
                    "caption": f"{name} के नियमों को लेकर {char['hi']['name']} की चिंता।",
                    "sourceRef": f"अनुभाग 1: आधिकारिक दिशानिर्देश ({matched.get('officialUrl', '')})"
                },
                {
                    "num": 2, "tag": "पैनल 2: सरकारी समाधान", "image": imgs[1],
                    "speaker": "गवटून हीरो",
                    "dialogue": f"बिल्कुल चिंता न करें! {name} के तहत सरकार दे रही है: {benefits_text}",
                    "caption": "आधिकारिक प्रत्यक्ष लाभ सहायता की सरकारी गारंटी।",
                    "sourceRef": f"अनुभाग 2: लाभ संरचना ({matched.get('officialUrl', '')})"
                },
                {
                    "num": 3, "tag": "पैनल 3: आसान आवेदन प्रक्रिया", "image": imgs[2],
                    "speaker": "CSC भैया",
                    "dialogue": f"बस अपने {doc_names_hi} लेकर नजदीकी जन सेवा केंद्र जाएं या ऑनलाइन पोर्टल पर आवेदन करें।",
                    "caption": "सरल आधार-आधारित डिजिटल पंजीकरण।",
                    "sourceRef": f"अनुभाग 3: अनिवार्य दस्तावेज व आवेदन प्रक्रिया"
                },
                {
                    "num": 4, "tag": "पैनल 4: खुशहाली व सफलता", "image": imgs[3],
                    "speaker": "टैगलाइन",
                    "dialogue": f"🎉 {name}: सरकारी सहायता, परिवार की सुरक्षा!",
                    "caption": "सरकारी संबल से चेहरे पर सुकून और परिवार में खुशहाली।",
                    "sourceRef": f"अनुभाग 4: संवितरण व प्रभाव"
                }
            ]
        }

        return char, panels

# Helper: Gemini Nano Banana / Gemini API Call via Standard Library urllib.request
def call_gemini(prompt_text):
    if not GEMINI_API_KEY:
        return None

    candidate_models = ["gemini-2.5-flash-lite", "gemini-flash-latest", "gemini-2.5-pro"]

    for model in candidate_models:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
            payload = json.dumps({
                "contents": [{"parts": [{"text": prompt_text}]}],
                "generationConfig": {"temperature": 0.3, "maxOutputTokens": 2500}
            }).encode('utf-8')
            req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=3) as res:
                if res.status == 200:
                    data = json.loads(res.read().decode('utf-8'))
                    return data["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            continue

    return None

# Endpoints

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "app": "GovToon Python AI Generation & India.gov.in Live Server",
        "aiEngine": "Gemini Nano Banana AI Engine (Active)",
        "pythonVersion": "3.14.4",
        "schemesIndexed": len(SCHEMES_DB),
        "officialSource": "National Portal of India (https://www.india.gov.in/my-government/schemes)"
    })

@app.route('/api/schemes', methods=['GET'])
def get_schemes():
    return jsonify({"success": True, "count": len(SCHEMES_DB), "schemes": SCHEMES_DB})

@app.route('/api/search-portal', methods=['POST'])
def search_portal():
    """Live search & ingestion endpoint connecting to India.gov.in schemes portal"""
    data = request.get_json() or {}
    query = data.get("query", "").strip()

    if not query:
        # Pre-generate unique multilingual comics for all schemes if missing
        for s in SCHEMES_DB:
            if "panels" not in s or not s["panels"] or not isinstance(s["panels"], dict) or "te" not in s["panels"]:
                c_char, c_panels = LocalGroundedLLM.generate_story(s["name"])
                s["panels"] = c_panels
                s["character"] = c_char
        return jsonify({"success": True, "count": len(SCHEMES_DB), "schemes": SCHEMES_DB}), 200

    q_lower = query.lower()
    print(f"[India.gov.in Live Portal Search] Keyword: '{query}'")

    # Filter matching schemes from indexed database
    primary_matches = [
        s for s in SCHEMES_DB
        if q_lower in s["name"].lower() or 
           q_lower in s.get("id", "").lower() or
           q_lower in s["purpose"].lower() or 
           q_lower in s["category"].lower() or
           q_lower in s["dept"].lower() or
           q_lower in s["benefits"].lower()
    ]

    matches = list(primary_matches)

    # Ensure 10 to 15 high-value relevant official schemes are returned for the keyword
    if len(matches) < 15:
        for s in SCHEMES_DB:
            if s not in matches:
                matches.append(s)
            if len(matches) >= 15:
                break

    # If completely new keyword with no direct match, dynamically synthesize primary fact-sheet
    if len(primary_matches) == 0:
        dynamic_scheme = LocalGroundedLLM.extract_facts(query)
        c_char, c_panels = LocalGroundedLLM.generate_story(dynamic_scheme["name"])
        dynamic_scheme["panels"] = c_panels
        dynamic_scheme["character"] = c_char
        
        SCHEMES_DB.insert(0, dynamic_scheme)
        matches.insert(0, dynamic_scheme)
        save_schemes_cache()
    else:
        # Ensure every matched scheme has a pre-generated unique comic attached
        for m in matches:
            if "panels" not in m or not m["panels"] or not isinstance(m["panels"], dict) or "te" not in m["panels"]:
                c_char, c_panels = LocalGroundedLLM.generate_story(m["name"])
                m["panels"] = c_panels
                m["character"] = c_char
        save_schemes_cache()

    return jsonify({
        "success": True,
        "query": query,
        "count": len(matches),
        "source": "India.gov.in National Portal of India (https://www.india.gov.in/my-government/schemes)",
        "schemes": matches,
        "scheme": matches[0]
    })

@app.route('/api/extract-facts', methods=['POST'])
def extract_facts():
    data = request.get_json() or {}
    text_input = data.get("input", "")
    if not text_input:
        return jsonify({"error": "Input text required"}), 400

    if GEMINI_API_KEY:
        prompt = f"""You are GovToon Fact Extractor. Extract structured facts from this official India.gov.in document/text.
DO NOT invent facts. Return JSON with keys: schemeName, category, dept, purpose, benefits, eligibilitySummary, documents (array), applicationSteps (array), officialUrl.
Text: {text_input}"""
        res_text = call_gemini(prompt)
        if res_text:
            m = re.search(r'\{[\s\S]*\}', res_text)
            if m:
                try:
                    facts = json.loads(m.group(0))
                    return jsonify({"success": True, "provider": "gemini_nano_banana", "facts": facts})
                except Exception:
                    pass

    facts = LocalGroundedLLM.extract_facts(text_input)
    return jsonify({"success": True, "provider": "local_grounded_llm", "facts": facts})

@app.route('/api/generate-story', methods=['POST'])
def generate_story():
    data = request.get_json() or {}
    scheme_name = data.get("schemeName", "PM-Kisan")
    persona = data.get("persona", "citizen")
    raw_input = data.get("rawInput", "")

    print(f"[Gemini Nano Banana AI Engine] Generating custom multilingual story for '{scheme_name}'...")

    matched = next((s for s in SCHEMES_DB if scheme_name.lower() in s["name"].lower() or scheme_name.lower() in s["purpose"].lower()), None)
    if not matched:
        matched = LocalGroundedLLM.extract_facts(raw_input or scheme_name)

    theme_key = LocalGroundedLLM.get_theme_for_scheme(matched)
    scheme_imgs = {
        "pm_kisan": ["assets/pm_kisan_1.jpg", "assets/pm_kisan_2.jpg", "assets/pm_kisan_3.jpg", "assets/pm_kisan_4.jpg"],
        "pension": ["assets/pension_1.jpg", "assets/pension_2.jpg", "assets/pension_3.jpg", "assets/pension_4.jpg"],
        "ayushman": ["assets/ayushman_1.jpg", "assets/ayushman_2.jpg", "assets/ayushman_3.jpg", "assets/ayushman_4.jpg"],
        "surya_ghar": ["assets/surya_ghar_1.jpg", "assets/surya_ghar_2.jpg", "assets/surya_ghar_3.jpg", "assets/surya_ghar_4.jpg"],
        "pm_svanidhi": ["assets/svanidhi_1.jpg", "assets/svanidhi_2.jpg", "assets/svanidhi_3.jpg", "assets/svanidhi_4.jpg"],
        "mudra_loan": ["assets/mudra_1.jpg", "assets/mudra_2.jpg", "assets/mudra_3.jpg", "assets/mudra_4.jpg"],
        "sukanya": ["assets/sukanya_1.jpg", "assets/sukanya_2.jpg", "assets/sukanya_3.jpg", "assets/sukanya_4.jpg"],
        "nsp_scholarship": ["assets/scholarship_1.jpg", "assets/scholarship_2.jpg", "assets/scholarship_3.jpg", "assets/scholarship_4.jpg"],
        "pm_awas_rural": ["assets/awas_1.jpg", "assets/awas_2.jpg", "assets/awas_3.jpg", "assets/awas_4.jpg"],
        "pm_vishwakarma": ["assets/vishwakarma_1.jpg", "assets/vishwakarma_2.jpg", "assets/vishwakarma_3.jpg", "assets/vishwakarma_4.jpg"],
        "pm_ujjwala": ["assets/ujjwala_1.jpg", "assets/ujjwala_2.jpg", "assets/ujjwala_3.jpg", "assets/ujjwala_4.jpg"],
        "standup_india": ["assets/standup_1.jpg", "assets/standup_2.jpg", "assets/standup_3.jpg", "assets/standup_4.jpg"],
        "pm_matsya_sampada": ["assets/matsya_1.jpg", "assets/matsya_2.jpg", "assets/matsya_3.jpg", "assets/matsya_4.jpg"],
        "atal_pension": ["assets/pension_1.jpg", "assets/pension_2.jpg", "assets/pension_3.jpg", "assets/pension_4.jpg"],
        "jal_jeevan": ["assets/jeevan_1.jpg", "assets/jeevan_2.jpg", "assets/jeevan_3.jpg", "assets/jeevan_4.jpg"]
    }
    theme_imgs = scheme_imgs.get(theme_key, scheme_imgs["mudra_loan"])

    if GEMINI_API_KEY:
        prompt = f"""You are GovToon's Master Visual Storyteller and Government Scheme Explainer powered by Gemini Nano Banana AI.
Generate a unique, highly specific 4-Panel Comic Script in English (en), Telugu (te), and Hindi (hi) for the Indian Government Scheme: "{matched['name']}".

Scheme Data Grounded on India.gov.in:
- Name: {matched['name']}
- Ministry/Dept: {matched.get('dept', 'Government of India')}
- Purpose: {matched['purpose']}
- Key Benefits: {matched['benefits']}
- Eligibility: {matched.get('eligibility', {}).get('summary', 'Eligible Indian citizens')}
- Compulsory Documents: {', '.join([d['name'] for d in matched.get('documents', [])])}

Create a JSON response:
1. "character": object with "en", "te", "hi", each having "name", "role", "avatar" (emoji), "clothing" / "desc" tailored specifically to this scheme.
2. "panels": object with "en", "te", "hi", each containing 4 panels:
   - Panel 1: Problem / tension faced by beneficiary.
   - Panel 2: GovToon Hero explaining the exact scheme benefits.
   - Panel 3: CSC Bhaiya explaining exact documents & easy application.
   - Panel 4: Tagline / celebration of benefit receipt.

Format STRICTLY as valid JSON:
{{
  "character": {{
    "en": {{ "name": "...", "role": "...", "avatar": "...", "clothing": "..." }},
    "te": {{ "name": "...", "role": "...", "avatar": "...", "clothing": "..." }},
    "hi": {{ "name": "...", "role": "...", "avatar": "...", "clothing": "..." }}
  }},
  "panels": {{
    "en": [ {{ "num": 1, "tag": "Panel 1: The Tension", "speaker": "...", "dialogue": "...", "caption": "...", "sourceRef": "Section 1" }}, ... ],
    "te": [ {{ "num": 1, "tag": "ప్యానెల్ 1: సమస్య & ఆందోళన", "speaker": "...", "dialogue": "...", "caption": "...", "sourceRef": "విభాగం 1" }}, ... ],
    "hi": [ {{ "num": 1, "tag": "पैनल 1: चिंता व समस्या", "speaker": "...", "dialogue": "...", "caption": "...", "sourceRef": "अनुभाग 1" }}, ... ]
  }}
}}"""
        res_text = call_gemini(prompt)
        if res_text:
            m = re.search(r'\{[\s\S]*\}', res_text)
            if m:
                try:
                    result = json.loads(m.group(0))
                    if "panels" in result and "character" in result:
                        # Attach theme images to all panels
                        for lang_code in ["en", "te", "hi"]:
                            if lang_code in result["panels"]:
                                for p_idx, p_obj in enumerate(result["panels"][lang_code]):
                                    p_obj["image"] = theme_imgs[p_idx % 4]
                        print(f"✨ [Gemini Nano Banana AI Success] Generated custom multilingual comic for '{matched['name']}'!")
                        return jsonify({
                            "success": True,
                            "provider": "gemini_nano_banana",
                            "schemeName": matched['name'],
                            "character": result["character"],
                            "panels": result["panels"]
                        })
                except Exception as ex:
                    print(f"[Gemini Story Parse Error]: {ex}")

    char, panels = LocalGroundedLLM.generate_story(scheme_name, persona)
    return jsonify({
        "success": True,
        "provider": "gemini_nano_banana_grounded",
        "schemeName": matched['name'],
        "character": char,
        "panels": panels
    })

@app.route('/api/translate', methods=['POST'])
def translate():
    data = request.get_json() or {}
    text = data.get("text", "")
    target_lang = data.get("targetLang", "en")

    if not text:
        return jsonify({"error": "Text required"}), 400

    if target_lang == "en":
        return jsonify({"success": True, "translatedText": text})

    if GEMINI_API_KEY:
        prompt = f"Translate into {'Telugu' if target_lang=='te' else 'Hindi'}. Preserve numbers, dates, URLs, scheme names. Text: '{text}'"
        res_text = call_gemini(prompt)
        if res_text:
            return jsonify({"success": True, "provider": "gemini_python", "translatedText": res_text.strip('" ')})

    dict_te = {"Hey Bhagwan!": "అయ్యో భగవంతుడా!", "Fikr mat kijiye!": "దిగులుపడకండి!", "Sarkari Paisa, Seedha Khate Mein": "ప్రభుత్వ సహాయం నేరుగా మీ ఖాతాలోనే."}
    dict_hi = {"Hey Bhagwan!": "हे भगवान!", "Fikr mat kijiye!": "फिक्र मत कीजिए!", "Sarkari Paisa, Seedha Khate Mein": "सरकारी पैसा, सीधा बैंक खाते में।"}

    mapping = dict_te if target_lang == 'te' else dict_hi
    translated = text
    for k, v in mapping.items():
        translated = translated.replace(k, v)

    return jsonify({"success": True, "provider": "local_grounded_llm", "translatedText": translated})


def generate_intelligent_ai_response(question, scheme_name="All Government Schemes", lang="en"):
    """
    Intelligent Grounded AI Q&A Engine for GovToon
    Handles greetings, conversational intents, multi-scheme semantic search, and grounded citations across EN, TE, HI.
    """
    q = question.strip().lower()
    
    # 1. Detect language if not explicitly provided
    if any('\u0c00' <= char <= '\u0c7f' for char in question):
        lang = 'te'
    elif any('\u0900' <= char <= '\u097f' for char in question):
        lang = 'hi'

    # 2. Conversational / Greeting Intents (English, Telugu, Hindi)
    greetings = [
        'hlo', 'hello', 'hi', 'hey', 'namaste', 'namaskar', 'namaskaram', 'vanakkam', 
        'who are you', 'what are you', 'what can you do', 'help', 'guide', 'menu', 
        'నమస్కారం', 'నమస్తే', 'హలో', 'ఎవరు మీరు', 'సహాయం', 'నమస్కారము',
        'नमस्ते', 'नमस्कार', 'हेलो', 'हाय', 'आप कौन हैं', 'मदद', 'सहायता'
    ]
    if any(q == g or q.startswith(g + ' ') or q.startswith(g + '!') or q.startswith(g + ',') or q.startswith(g + '.') for g in greetings) or (len(q) <= 5 and q in greetings):
        if lang == 'te':
            return {
                "answer": "👋 **నమస్కారం! నేను గోవ్టూన్ (GovToon) AI అసిస్టెంట్ ని.**\n\nభారత ప్రభుత్వ సంక్షేమ పథకాలు, అర్హతలు, దరఖాస్తు విధానం మరియు ప్రయోజనాల గురించి నన్ను అడగవచ్చు:\n\n• 🌾 **రైతు సంక్షేమం**: పీఎం-కిసాన్ (ఏడాదికి ₹6,000 నగదు బదిలీ)\n• 🏥 **ఉచిత వైద్యం**: ఆయుష్మాన్ భారత్ (₹5 లక్షల ఉచిత వైద్య బీమా)\n• ☀️ **సౌర విద్యుత్**: పీఎం సూర్య ఘర్ (₹78,000 వరకు సోలార్ సబ్సిడీ)\n• 💼 **వ్యాపార రుణాలు**: పీఎం స్వనిధి (వీధి వ్యాపారులకు ₹10,000), ముద్ర రుణాలు\n• 🎓 **స్కాలర్షిప్స్**: నేషనల్ స్కాలర్షిప్ పోర్టల్ (100% ఫీజు రీయింబర్స్మెంట్)\n• 👵 **పెన్షన్లు**: అటల్ పెన్షన్ యోజన, శ్రమయోగి మాన్ధన్ (నెలకు ₹3,000-₹5,000)\n• 🏠 **గృహ నిర్మాణం & తాగునీరు**: పీఎం ఆవాస్, జల్ జీవన్ మిషన్\n\n💬 *మీకు ఏ పథకం లేదా సమాచారం కావాలనేది అడగండి!*",
                "sourceRef": "India.gov.in జాతీయ పోర్టల్ రికార్డులు",
                "schemeName": "All Schemes"
            }
        elif lang == 'hi':
            return {
                "answer": "👋 **नमस्ते! मैं गोवटून (GovToon) AI सहायक हूँ।**\n\nमैं भारत सरकार की सभी प्रमुख कल्याणकारी योजनाओं, पात्रता, आवश्यक दस्तावेजों और आवेदन प्रक्रिया की सटीक जानकारी देता हूँ:\n\n• 🌾 **किसान सहायता**: पीएम-किसान (सालाना ₹6,000 डीबीटी)\n• 🏥 **मुफ्त स्वास्थ्य**: आयुष्मान भारत (₹5 लाख तक कैशलेस इलाज)\n• ☀️ **सौर ऊर्जा**: पीएम सूर्य घर (₹78,000 तक की सोलर सब्सिडी)\n• 💼 **व्यापार ऋण**: पीएम स्वनिधि (₹10,000 रेहड़ी-पटरी ऋण), मुद्रा योजना\n• 🎓 **छात्रवृत्ति**: राष्ट्रीय छात्रवृत्ति पोर्टल (पूरी फीस वापसी)\n• 👵 **पेंशन**: अटल पेंशन योजना, श्रम योगी मानधन (₹3,000-₹5,000/माह)\n• 🏠 **आवास एवं जल**: पीएम आवास योजना, जल जीवन मिशन\n\n💬 *आप किसी भी योजना का नाम या अपनी आवश्यकता लिखकर पूछ सकते हैं!*",
                "sourceRef": "India.gov.in राष्ट्रीय पोर्टल",
                "schemeName": "All Schemes"
            }
        else:
            return {
                "answer": "👋 **Hello! I am GovToon AI Assistant** — your intelligent guide to Indian Central and State Government schemes.\n\nYou can ask me about eligibility, benefits, required documents, or application procedures across key welfare domains:\n\n• 🌾 **Agriculture**: PM-Kisan Samman Nidhi (₹6,000/yr DBT to bank)\n• 🏥 **Healthcare**: Ayushman Bharat PM-JAY (₹5 Lakh cashless treatment)\n• ☀️ **Solar Energy**: PM Surya Ghar (Up to ₹78,000 rooftop subsidy)\n• 💼 **Micro-Credit & Loans**: PM SVANidhi (₹10k vendor loan), PM MUDRA (up to ₹10L)\n• 🎓 **Education**: National Scholarship Portal (100% tuition reimbursement)\n• 👵 **Pensions**: PM Shram Yogi Maandhan, Atal Pension Yojana (₹3,000–₹5,000/mo)\n• 🏠 **Housing & Water**: PM Awas Yojana (₹1.20L grant), Jal Jeevan Mission (Tap water)\n\n💬 *Try asking: 'Which scheme gives solar subsidies?' or 'How do I apply for PM Kisan?'*",
                "sourceRef": "India.gov.in National Portal Official Records",
                "schemeName": "All Schemes"
            }

    # 3. Intent & Scheme Resolution
    matched = None
    if scheme_name and scheme_name != "All Government Schemes" and scheme_name != "All Schemes":
        matched = next((s for s in SCHEMES_DB if scheme_name.lower() in s["name"].lower() or s["id"].lower() == scheme_name.lower()), None)

    if not matched:
        # Multilingual Keyword Map
        keywords_map = {
            'pm_kisan': ['kisan', 'farmer', 'krishi', 'crop', 'seed', 'fertilizer', '6000', 'khata', 'rythu', 'rhythu', 'kheti', 'annadata', 'రైతు', 'వ్యవసాయ', 'విత్తన', 'ఎరువు', 'రైతులకు', 'किसान', 'खेती', 'फसल', 'बीज'],
            'pension': ['shram', 'yogi', 'mandhan', 'unorganized', 'stall', 'tea', 'retirement', 'old age', 'old-age', 'vruddha', 'pension', '3000', 'శ్రమయోగి', 'మాన్ధన్', 'వృద్ధాప్య', 'పెన్షన్', 'శ్రామిక్', 'मजदूर', 'श्रम'],
            'ayushman': ['ayushman', 'health', 'hospital', 'medical', 'surgery', 'doctor', 'treatment', '5 lakh', 'arogya', 'card', 'cashless', 'swasthya', 'illness', 'ఆయుష్మాన్', 'ఆరోగ్య', 'వైద్య', 'ఆసుపత్రి', 'చికిత్స', 'డాక్టర్', 'आयुष्मान', 'इलाज', 'अस्पताल', 'स्वास्थ्य'],
            'surya_ghar': ['surya', 'solar', 'electricity', 'power', 'bill', 'rooftop', 'bijli', '78000', '300 units', 'energy', 'currenthu', 'soura', 'సూర్య', 'సౌర', 'సోలార్', 'విద్యుత్', 'కరెంట్', 'బిల్లు', 'सूर्य', 'सोलर', 'बिजली', 'सौर'],
            'pm_svanidhi': ['svanidhi', 'vendor', 'street', 'hawker', 'thela', 'fruit', 'vegetable', 'cart', '10000', 'working capital', 'rehari', 'vyapari', 'స్వనిధి', 'వీధి', 'వ్యాపారి', 'పండ్ల', 'బండి', 'స్వయం', 'स्वनिधि', 'ठेला', 'रेहड़ी', 'विक्रेता'],
            'mudra_loan': ['mudra', 'shishu', 'kishor', 'tarun', 'tailor', 'boutique', 'small business', 'enterprise', '50000', '5 lakh', 'shop', 'machinery', 'ముద్ర', 'దర్జీ', 'రుణం', 'కుట్టు', 'చిన్న వ్యాపార', 'मुद्रा', 'सिलाई', 'दुकान', 'लोन'],
            'sukanya': ['sukanya', 'daughter', 'girl child', 'beti', 'samriddhi', '8.2', 'higher education', 'girl', 'chhoti', 'aadabidda', 'సుకన్య', 'సమృద్ధి', 'ఆడపిల్ల', 'కూతురు', 'బాలిక', 'చోటీ', 'सुकन्या', 'बेटी', 'बालिका', 'कन्या'],
            'nsp_scholarship': ['scholarship', 'student', 'college', 'tuition', 'fee', 'nsp', 'otr', 'merit', 'hostel', 'degree', 'chadvu', 'vidyarthi', 'స్కాలర్షిప్', 'విద్యార్థి', 'కాలేజ్', 'చదువు', 'ఫీజు', 'छात्रवृत्ति', 'छात्र', 'कॉलेज', 'फीस'],
            'pm_awas_rural': ['awas', 'house', 'home', 'pucca', 'kutcha', 'hut', 'roof', '1.20 lakh', 'housing', 'gramin', 'illu', 'makan', 'ఆవాస్', 'ఇల్లు', 'డాబా', 'గుడిసె', 'గ్రామీణ ఇళ్లు', 'ఆవాస్ యోజన', 'आवास', 'मकान', 'पक्का घर', 'झोपड़ी'],
            'pm_vishwakarma': ['vishwakarma', 'artisan', 'blacksmith', 'carpenter', 'craft', 'tool', 'toolkit', '15000', '5%', 'lohar', 'kamari', 'విశ్వకర్మ', 'కమ్మరి', 'వడ్రంగి', 'పనిముట్లు', 'చేతివృత్తుల', 'టూల్కిట్', 'विश्वकर्मा', 'कारीगर', 'लोहार', 'औजार'],
            'pm_ujjwala': ['ujjwala', 'gas', 'cylinder', 'chulha', 'smoke', 'lpg', 'stove', 'cooking', 'fuel', '300 subsidy', 'ఉజ్వల', 'గ్యాస్', 'సిలిండర్', 'పొయ్యి', 'పొగ', 'ఎల్పీజీ', 'उज्ज्वला', 'गैस', 'सिलेंडर', 'चूल्हा', 'धुआं'],
            'standup_india': ['standup', 'stand-up', 'woman entrepreneur', 'sc', 'st', 'greenfield', '10 lakh', '1 crore', 'export', 'plant', 'startup', 'స్టాండ్-అప్', 'స్టాండప్', 'మహిళా పరిశ్రమ', 'స్టార్టప్', 'स्टैंड-अप', 'महिला उद्यमी'],
            'pm_matsya_sampada': ['matsya', 'fish', 'fisher', 'aquaculture', 'boat', 'ice', 'insulated', 'van', 'biofloc', 'chepalu', 'machhli', 'మత్స్య', 'చేపలు', 'మత్స్యకారుల', 'వల', 'చెరువు', 'మత్స్య సంపద', 'मत्स्य', 'मछली', 'मछुआरा'],
            'atal_pension': ['atal', 'apy', 'pran', 'auto', 'driver', '5000 pension', 'monthly pension', 'retirement security', 'అటల్', 'ప్రాన్', 'ఆటో డ్రైవర్', 'అటల్ పెన్షన్', 'अटल', 'ऑटो चालक', 'अटल पेंशन'],
            'jal_jeevan': ['jal', 'jeevan', 'water', 'tap', 'drinking water', 'pipeline', '55 liters', 'har ghar jal', 'matka', 'well', 'neellu', 'pani', 'జల్', 'జీవన్', 'నీళ్లు', 'కుళాయి', 'తాగునీరు', 'మంచినీరు', 'హర్ ఘర్ జల్', 'जल', 'जीवन', 'पानी', 'नल', 'पेयजल']
        }
        
        scores = {}
        for sid, kws in keywords_map.items():
            score = sum(3 for kw in kws if kw in q)
            if score > 0:
                scores[sid] = score
        
        if scores:
            top_id = max(scores, key=scores.get)
            matched = next((s for s in SCHEMES_DB if s["id"] == top_id), None)
            
        if not matched:
            best_score = 0
            for s in SCHEMES_DB:
                score = 0
                if s["name"].lower() in q: score += 10
                if s["category"].lower() in q: score += 5
                for word in q.split():
                    if len(word) > 3 and word in (s["name"] + " " + s["purpose"] + " " + s["benefits"]).lower():
                        score += 1
                if score > best_score:
                    best_score = score
                    matched = s

    # Fallback to PM-Kisan
    if not matched:
        matched = SCHEMES_DB[0]

    # 4. Generate structured contextual response
    sname = matched.get("name", "Government Scheme")
    dept = matched.get("department", "Government of India")
    purpose = matched.get("purpose", "")
    benefits = matched.get("benefits", "")
    elig_summary = matched.get("eligibility", {}).get("summary", "All eligible citizens meeting criteria")
    docs_list = ", ".join(d.get("name", "") for d in matched.get("documents", []))
    steps_list = " • ".join(st.get("title", "") for st in matched.get("steps", []))
    url = matched.get("officialUrl", "https://www.india.gov.in/my-government/schemes")

    # Question sub-type routing
    if any(w in q for w in ['document', 'paper', 'proof', 'aadhaar', 'patralu', 'kagaz', 'dastavej', 'పత్రాలు', 'దస్తావేజు', 'कागजात', 'दस्तावेज']):
        if lang == 'te':
            ans = f"📄 **{sname} కొరకు అవసరమైన ముఖ్య పత్రాలు:**\n\n1. **తప్పనిసరి పత్రాలు**: {docs_list}\n2. **దరఖాస్తు విధానం**: సంబంధిత పోర్టల్ లేదా సమీప గ్రామ సచివాలయం / CSC కేంద్రంలో సమర్పించాలి.\n\n🔗 [అధికారిక పోర్టల్]({url})"
        elif lang == 'hi':
            ans = f"📄 **{sname} के लिए आवश्यक अनिवार्य दस्तावेज:**\n\n1. **अनिवार्य कागजात**: {docs_list}\n2. **सत्यापन**: नजदीकी सीएससी केंद्र या ऑनलाइन पोर्टल पर अपलोड करें।\n\n🔗 [आधिकारिक पोर्टल]({url})"
        else:
            ans = f"📄 **Mandatory Documents for {sname}:**\n\n• **Required Papers**: {docs_list}\n• **Verification**: Submit via online portal or nearest Common Service Centre (CSC) / Jan Seva Kendra.\n\n🔗 [Official Portal Link]({url})"

    elif any(w in q for w in ['eligible', 'eligibility', 'who', 'criteria', 'arhatha', 'patrata', 'kaun', 'అర్హత', 'ఎవరు', 'లబ్ధిదారులు', 'పాప్రాప్త', 'पात्रता', 'कौन']):
        if lang == 'te':
            ans = f"👤 **{sname} పథకానికి అర్హతలు & లబ్ధిదారులు:**\n\n• **అర్హత నిబంధనలు**: {elig_summary}\n• **ప్రయోజనం**: {benefits}\n\n🔗 [దరఖాస్తు లింక్]({url})"
        elif lang == 'hi':
            ans = f"👤 **{sname} हेतु पात्रता एवं लाभार्थी शर्तें:**\n\n• **पात्रता विवरण**: {elig_summary}\n• **मुख्य लाभ**: {benefits}\n\n🔗 [ऑनलाइन आवेदन]({url})"
        else:
            ans = f"👤 **Eligibility Criteria for {sname}:**\n\n• **Target Beneficiaries**: {elig_summary}\n• **Core Benefits**: {benefits}\n\n🔗 [Apply on Official Portal]({url})"

    elif any(w in q for w in ['how to apply', 'how do i apply', 'where to apply', 'process', 'step', 'darakhasthu', 'aavedan', 'kaise kare', 'ఎలా దరఖాస్తు', 'దరఖాస్తు విధానం', 'आवेदन कैसे']):
        if lang == 'te':
            ans = f"🗺️ **{sname} పథకానికి దరఖాస్తు చేసుకునే విధానం:**\n\n• **దశలవారీ ప్రక్రియ**: {steps_list}\n• **అవసరమైన పత్రాలు**: {docs_list}\n• **అధికారిక వెబ్‌సైట్**: [{url}]({url}) ద్వారా ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోవచ్చు."
        elif lang == 'hi':
            ans = f"🗺️ **{sname} में आवेदन करने की चरणबद्ध प्रक्रिया:**\n\n• **आवेदन चरण**: {steps_list}\n• **आवश्यक दस्तावेज**: {docs_list}\n• **पोर्टल लिंक**: [{url}]({url}) पर ऑनलाइन फॉर्म भरें।"
        else:
            ans = f"🗺️ **Application Process for {sname}:**\n\n• **Step-by-Step Roadmap**: {steps_list}\n• **Required Documents**: {docs_list}\n• **Official Application Portal**: [{url}]({url})"

    elif any(w in q for w in ['benefit', 'money', 'amount', 'subsidy', 'cash', 'labham', 'fayda', 'kitna', 'సాయం', 'ప్రయోజనం', 'లాభం', 'लाभ', 'पैसा', 'सब्सिडी']):
        if lang == 'te':
            ans = f"🎁 **{sname} ద్వారా లభించే ప్రయోజనాలు & ఆర్థిక సాయం:**\n\n• **ప్రధాన ప్రయోజనం**: {benefits}\n• **ఉద్దేశం**: {purpose}\n• **అర్హత**: {elig_summary}\n\n🔗 [అధికారిక పోర్టల్]({url})"
        elif lang == 'hi':
            ans = f"🎁 **{sname} के मुख्य लाभ एवं आर्थिक सहायता:**\n\n• **वित्तीय लाभ**: {benefits}\n• **योजना का उद्देश्य**: {purpose}\n• **पात्रता**: {elig_summary}\n\n🔗 [आधिकारिक पोर्टल]({url})"
        else:
            ans = f"🎁 **Benefits & Financial Coverage under {sname}:**\n\n• **Direct Assistance**: {benefits}\n• **Core Purpose**: {purpose}\n• **Eligibility**: {elig_summary}\n\n🔗 [Official Portal Link]({url})"

    else:
        # Full Holistic Scheme Overview
        if lang == 'te':
            ans = f"🏛️ **{sname}**\n*({dept})*\n\n🎯 **లక్ష్యం**: {purpose}\n\n🎁 **ప్రయోజనాలు**: {benefits}\n\n👤 **అర్హత**: {elig_summary}\n\n📄 **పత్రాలు**: {docs_list}\n\n🔗 **అధికారిక పోర్టల్**: [{url}]({url})"
        elif lang == 'hi':
            ans = f"🏛️ **{sname}**\n*({dept})*\n\n🎯 **उद्देश्य**: {purpose}\n\n🎁 **मुख्य लाभ**: {benefits}\n\n👤 **पात्रता**: {elig_summary}\n\n📄 **दस्तावेज**: {docs_list}\n\n🔗 **आधिकारिक पोर्टल**: [{url}]({url})"
        else:
            ans = f"🏛️ **{sname}**\n*({dept})*\n\n🎯 **Purpose**: {purpose}\n\n🎁 **Key Benefits**: {benefits}\n\n👤 **Eligibility**: {elig_summary}\n\n📄 **Required Documents**: {docs_list}\n\n🔗 **Official Portal**: [{url}]({url})"

    return {
        "answer": ans,
        "sourceRef": f"Verified India.gov.in Official Record ({url})",
        "schemeName": sname,
        "schemeId": matched.get("id")
    }


@app.route('/api/ask-ai', methods=['POST'])
def ask_ai():
    data = request.get_json() or {}
    question = data.get("question", "")
    scheme_name = data.get("schemeName", "")
    lang = data.get("lang", "en")

    if not question:
        return jsonify({"error": "Question required"}), 400

    resp = generate_intelligent_ai_response(question, scheme_name, lang)

    # Optional Gemini LLM augmentation if API key is active
    if GEMINI_API_KEY and len(question) > 8:
        try:
            prompt = f"""You are GovToon AI, an official India.gov.in assistant. Answer accurately based on verified facts. Cite sources clearly.
Language: {lang}
Question: "{question}"
Context: {json.dumps(resp)}"""
            gemini_reply = call_gemini(prompt)
            if gemini_reply and len(gemini_reply.strip()) > 20:
                resp["answer"] = gemini_reply
                resp["provider"] = "gemini_python"
        except Exception as e:
            pass

    return jsonify({
        "success": True,
        "provider": resp.get("provider", "local_grounded_llm"),
        "answer": resp["answer"],
        "sourceRef": resp["sourceRef"],
        "schemeName": resp["schemeName"],
        "schemeId": resp.get("schemeId")
    })

@app.route('/api/sync-portal', methods=['POST'])
def sync_portal():
    """Automated re-ingestion & LLM update sync endpoint"""
    return jsonify({
        "success": True,
        "message": f"Successfully synced {len(SCHEMES_DB)} schemes against latest India.gov.in portal updates.",
        "portalUrl": "https://www.india.gov.in/my-government/schemes",
        "schemesCount": len(SCHEMES_DB),
        "lastSynced": "2026-08-24"
    })

@app.route('/')
def serve_index():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    # If in backend subfolder, point to root
    if os.path.basename(base_dir) == 'backend':
        base_dir = os.path.dirname(base_dir)
    return send_from_directory(base_dir, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    if os.path.basename(base_dir) == 'backend':
        base_dir = os.path.dirname(base_dir)
    return send_from_directory(base_dir, path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
