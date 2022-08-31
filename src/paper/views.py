import json
from jsonrpcclient import request as rpcrequest, parse, Ok

import logging
import requests

from django.shortcuts import render
from django.http import JsonResponse

from .models import Project
from .models import Image

from .forms import ImageForm

def TOC():
    # root_type = Type.objects.get(name="Root")
    projects = Project.objects.filter(category=0)

    return projects


# Create your views here.
def edit(request):
    imageform = ImageForm(request.POST or None, request.FILES or None)
    context = {
        'imageform': imageform,
    }

    # projects = TOC()

    # if id is not None:
    #     try:
    #         content = Project.objects.get(pk=id)
    #     except:
    #         content = None
    # else:
    #     content = None

    # print(projects)

    return render(request, 'paper/scientific.html', {'imageform': imageform})


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def upload_image(request):
    imageform = ImageForm(request.POST or None, request.FILES or None)
    if is_ajax(request):
        if imageform.is_valid():
            imageform.save()
            return JsonResponse({'message': 'IMage Saved'})
        else:
            print(imageform.errors)
            # raise ValidationError
    context = {
        'imageform': imageform,
    }
    return render(request, 'uploads/main.html', context)    

def get_images(request):
    print("get_images")
    if request.method == "GET":
        images = list(Image.objects.values('image').order_by('image'))
        for image in images:
            image['image'] = image['image'].replace('images/','')
        return JsonResponse({'images': images })
    else:
        return JsonResponse({})

def save(request):
    id = request.POST['id']
    content = request.POST['content']
    project = Project.objects.get(pk=id)
    project.text = content
    project.save()

    # response = requests.post("http://localhost:5000/api", json=rpcrequest("App.LaTeX", params=(Project.text,)))

    # parsed = parse(response.json())
    # if isinstance(parsed, Ok):
    #     print(parsed.result)
    # else:
    #     logging.error(parsed.message)

    return JsonResponse({"Message": "Saved"})

def save_config(request):
    id = request.POST['id']
    content = request.POST['content']
    project = Project.objects.get(pk=id)
    project.configuration = content
    project.save()
    return JsonResponse({"Message": "Saved"})

def parameters_edit(request, id):
    imageform = ImageForm(request.POST or None, request.FILES or None)
    context = {
        'imageform': imageform,
    }

    pads = TOC()

    if id is not None:
        try:
            content = Project.objects.get(pk=id)
        except:
            content = None
    else:
        content = None

    return render(request, 'paper/scientific/parameters.html', {'pads': pads, 'imageform': imageform, "cells": "scientific", "content": content})
