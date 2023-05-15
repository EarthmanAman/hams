from django.shortcuts import render

from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from .serializers import UserDetSer
from .models import User

class UserDetView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetSer
    queryset = User.objects.all()
    lookup_field = 'user_id'
    