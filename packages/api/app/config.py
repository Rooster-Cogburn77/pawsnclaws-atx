"""
Configuration management for PawsNClaws ATX.

Loads settings from environment variables.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment."""

    # App
    app_name: str = "PawsNClaws ATX"
    debug: bool = False

    # Supabase
    supabase_url: str = ""
    supabase_key: str = ""
    supabase_service_key: str = ""

    # Stripe (for donations)
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""

    # SendGrid (emails)
    sendgrid_api_key: str = ""
    from_email: str = "hello@pawsnclaws.org"

    # Twilio (SMS alerts)
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_phone_number: str = ""

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
