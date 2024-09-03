from fastapi import APIRouter
from Schema import ClaudeResponse
from operations import redirect_question_to_claude_llm

router = APIRouter()

@router.post('/ask-claude')
def ask_claude(form_fields: ClaudeResponse):
    return redirect_question_to_claude_llm(form_fields)