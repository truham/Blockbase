from flask import Blueprint, request
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")


chat_routes = Blueprint("chat", __name__)


@chat_routes.route("/", methods=["POST"])
def chat():
    message = request.json["message"]
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: What time is it?\nMarv:",
        temperature=0.5,
        max_tokens=60,
        top_p=0.3,
        frequency_penalty=0.5,
        presence_penalty=0.0,
    )
    return {"message": response.choices[0].text.strip()}
