from pydantic import BaseModel, Field

class ClaudeResponse(BaseModel):
    systemRole : str = Field(...)
    userQuery: str = Field(...)