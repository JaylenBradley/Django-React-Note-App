from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}} #Write only = shouldn't be able to read the password
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #** splits up keywords arguments and passing them in from a dictionary
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}} #Read only = should be able to read the author but not write to it