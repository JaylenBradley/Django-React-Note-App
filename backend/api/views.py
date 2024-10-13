from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] #Only authenticated users can access this view

    def get_queryset(self):
        user = self.request.user #Get the user that is currently authenticated, returns user object
        return Note.objects.all().filter(author=user) #Return all notes that belong to the user, can only view notes written by you not someone else
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user) #Save the note with the user that is currently authenticated
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] #Only authenticated users can access this view

    def get_queryset(self):
        user = self.request.user
        return Note.objects.all().filter(author=user)

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #list of all objects looking at when creating a new one
    serializer_class = UserSerializer #What kind of data needs to be accepted when creating a new user (User and Password)
    permission_classes = [AllowAny] #Allows anyone to create a new user even without authentication 