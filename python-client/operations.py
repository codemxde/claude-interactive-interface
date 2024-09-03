from ClaudeLLM import ClaudeLLM
from fastapi import status
from fastapi.responses import JSONResponse
from Schema import ClaudeResponse

def redirect_question_to_claude_llm(form_fields: ClaudeResponse):
    claude_llm = ClaudeLLM(
        system_role=form_fields.systemRole,
        user_query=form_fields.userQuery
    )
    response = claude_llm.generate_answer()

    if response.startswith("No content"):
        return JSONResponse(
            status_code=status.HTTP_204_NO_CONTENT,
            content=response
        )
    elif response.startswith("Unexpected content"):
        return JSONResponse(
            status_code=status.HTTP_206_PARTIAL_CONTENT,
            content=response
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content=response
        )

