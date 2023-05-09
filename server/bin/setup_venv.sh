#!/bin/sh

# Install `virtualenv` module (if not already installed).
pip3 install virtualenv

# Create virtual environment for python (if not already done).
[ -d ../.venv ] || python3 -m virtualenv ../.venv

# Install python requirements.
../.venv/bin/pip install -r ../requirements.txt
