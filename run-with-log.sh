#!/bin/sh
# Run MkDocs and log all output to log/mkdocs-run-YYYY-MM-DD-HHMMSS.log
# Output is shown on screen and written to a timestamped log file
LOG_DIR="log"
mkdir -p "$LOG_DIR"
LOG_FILE="${LOG_DIR}/mkdocs-run-$(date +%Y-%m-%d-%H%M%S).log"
echo "=== MkDocs serve started at $(date) ===" | tee "$LOG_FILE"
mkdocs serve --dev-addr 0.0.0.0:8123 2>&1 | tee -a "$LOG_FILE"
