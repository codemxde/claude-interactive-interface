import anthropic
import os
from dotenv import load_dotenv
from typing import Optional

class ClaudeLLM:
    def __init__(self, user_query: str, system_role: Optional[str] = None) -> None:
        load_dotenv()
        self.client = anthropic.Anthropic(
            api_key=os.getenv("api_key")
        )
        self.user_query = user_query

        if system_role != "":
            self.system_role = system_role
        else:
            self.system_role = os.getenv("default_prompt")
        

    def generate_answer(self):
        message = self.client.messages.create(
            model="claude-3-5-sonnet-20240620",
            max_tokens=1000,
            temperature=0,
            system=self.system_role,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": self.user_query
                        }
                    ]
                }
            ]
        )

        # Extract and print only the text content
        if message.content and len(message.content) > 0:
            text_block = message.content[0]
            if isinstance(text_block, anthropic.types.TextBlock):
                return text_block.text
            else:
                return "Unexpected content type in the message"
        else:
            return "No content found in the message"
        
# Testing the client
# claude_llm = ClaudeLLM(
#     system_role="You give good advises and always ahve a solution for everything",
#     user_query="I want to build an army of ants, such that they always listen to me and protect me whenevr possible. Please tell me step by step how i should proceed"
# )
# print(claude_llm.generate_answer())
