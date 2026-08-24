# GovToon — Root Python Server Launcher
# Delegates execution to modular backend/server.py
import sys
import os

backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_dir)

from server import app

if __name__ == '__main__':
    port = int(os.environ.get('PYTHON_PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
