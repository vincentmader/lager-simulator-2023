#!/bin/sh

cd bin && ./setup_venv.sh && cd ..
cd src && ../.venv/bin/python3 main.py
