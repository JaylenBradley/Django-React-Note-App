from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"), #Url that will call a function or do a specific operation
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"), #Url that will return a new token
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"), #Url that will refresh an existing token
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")), #If the path doesn't fit the ones above, it'll go to the api urls and parse those for a match
]

# python manage.py makemigrations
# python manage.py migrate       
# backend python manage.py runserver 
# Use the above codes in terminal when making updates to database    