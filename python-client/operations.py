from ClaudeLLM import ClaudeLLM
from fastapi import status
from fastapi.responses import JSONResponse
from Schema import ClaudeResponse

def redirect_question_to_claude_llm(form_fields: ClaudeResponse):

    if not form_fields.userQuery:
        return JSONResponse(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            content="You think you're funny huh, asking a question without any input? I ain't wasting precious tokens for this!"
        )

    claude_llm = ClaudeLLM(
        user_query=form_fields.userQuery,
        system_role=form_fields.systemRole
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

