from rest_framework import serializers

from chat.models import Chat
from chat.views import get_user_contact

class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value
    
class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)
    
    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id')
        
    def create(self, validated_data):
        print(validated_data)
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for username in participants:
            contact = get_user_contact(username)
            chat.participants.add(contact)
        chat.save()
        return chat
        
        
        
 # {'id': 1, 'messages': [82, 83, 84, 88, 91, 92, 94, 95, 97, 98, 99, 102, 105, 108, 109], 'participants': ['jatin', 'palak']}
 
#  {'messages': [], 'participants': ['tom', 'jatin']}
# Not Found: /chat/create/
# HTTP POST /chat/create/ 404 [0.04, 127.0.0.1:49465]