from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .models import User

# Create your views here.
def index(request):
    return render(request, 'home/index.html', { 'user': request.user })

@login_required
def profile(request):
    user = request.user
    return render(request, 'home/profile.html', { 'user': request.user })

def signin(request):
    if request.method == "POST":
        print(request.POST)
        user = authenticate(email=request.POST['email-address'], password=request.POST['password'])
        print("user", user)
        if user is not None:
            login(request, user)
            return redirect('/')

        else:
            return render(request, 'home/signin.html')

    if request.user.is_authenticated:
        return redirect('/')

    return render(request, 'home/signin.html')

@login_required
def signout(request):
    logout(request)
    return redirect('/')

def signup(request):
    if request.method == "POST":
        user = User.objects.create_user(request.POST["email-address"],
                                  email=request.POST['email-address'],
                                  password=request.POST['password'])
        user.first_name=request.POST["first-name"]
        user.last_name=request.POST["last-name"]
        user.official_email=request.POST["official-email-address"]
        user.save()

        return redirect('/signin')
    else:
        return render(request, 'home/signup.html')