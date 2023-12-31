from django.shortcuts import render, get_object_or_404
from .models import Chat, Contact
from django.contrib.auth import get_user_model

User = get_user_model()


def get_all_messages(chatId):
    chat = get_object_or_404(Chat, id = chatId)
    return chat.messages.order_by('-timestamp').all()

def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)

def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)