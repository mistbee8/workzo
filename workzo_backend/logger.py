import logging
import os
from logging.handlers import TimedRotatingFileHandler

# Ensure log directories exist
log_dirs = ["logs/info", "logs/warning", "logs/error"]
for log_dir in log_dirs:
    os.makedirs(log_dir, exist_ok=True)

def setup_logger():
    """Sets up logging with separate handlers for different log levels."""
    
    logger = logging.getLogger("JobScriptLogger")
    logger.setLevel(logging.DEBUG)  # Capture all levels

    log_format = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

    # INFO log handler (Fix: Use delay=True)
    info_handler = TimedRotatingFileHandler("logs/info/info.log", when="midnight", backupCount=7, delay=True)
    info_handler.setLevel(logging.INFO)
    info_handler.setFormatter(log_format)

    # WARNING log handler (Fix: Use delay=True)
    warning_handler = TimedRotatingFileHandler("logs/warning/warning.log", when="midnight", backupCount=7, delay=True)
    warning_handler.setLevel(logging.WARNING)
    warning_handler.setFormatter(log_format)

    # ERROR log handler (Fix: Use delay=True)
    error_handler = TimedRotatingFileHandler("logs/error/error.log", when="midnight", backupCount=7, delay=True)
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(log_format)

    # Console log handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    console_handler.setFormatter(log_format)

    # Attach handlers
    logger.addHandler(info_handler)
    logger.addHandler(warning_handler)
    logger.addHandler(error_handler)
    logger.addHandler(console_handler)

    return logger

logger = setup_logger()
