import json
from jsonrpcclient import request as rpcrequest, parse, Ok

import logging
import requests

from django.shortcuts import render
from django.http import JsonResponse

from .models import Project
from .models import Part

# from .forms import ImageForm

def TOC():
    # root_type = Type.objects.get(name="Root")
    projects = Project.objects.filter(category=0)

    return projects


# Create your views here.
def edit(request):
    return render(request, 'scientific/edit.html', { 'user': request.user })


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

# def upload_image(request):
#     imageform = ImageForm(request.POST or None, request.FILES or None)
#     if is_ajax(request):
#         if imageform.is_valid():
#             imageform.save()
#             return JsonResponse({'message': 'IMage Saved'})
#         else:
#             print(imageform.errors)
#             # raise ValidationError
#     context = {
#         'imageform': imageform,
#     }
#     return render(request, 'uploads/main.html', context)    

# def get_images(request):
#     print("get_images")
#     if request.method == "GET":
#         images = list(Image.objects.values('image').order_by('image'))
#         for image in images:
#             image['image'] = image['image'].replace('images/','')
#         return JsonResponse({'images': images })
#     else:
#         return JsonResponse({})

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

# REST API
def get_project(request, id):
    project = Project.objects.filter(pk=id).first()

    parts = {}

    return JsonResponse({
        'title': project.title,
        'parts': {
            part.pk: {
             'id': part.pk,
             'label': part.label,
             'content': part.content,
             'image': part.image.url if part.image.name else None,
             'video': part.video.url if part.video.name else None,
             'document': part.document.url if part.document.name else None,
             'category': part.category} for part in project.part_set.all()}
        }, safe=False)

def get_projects(request, category):
    projects = Project.objects.filter(category=category)

    return JsonResponse([
        {
            'id': project.pk,
            'title': project.title,
        } for project in projects], safe=False)


def get_part(request, id):
    if request.method == "GET":
        part = Part.objects.filter(pk=id).first()

        return JsonResponse({'id': part.pk, 'label': part.label, 'content': part.content, 'category': part.category}, safe=False)

    else:
        return JsonResponse({'message': "Invalid request"})

def put_part(request):
    if request.method == "POST":
        if 'id' in request.POST:
            part = Part.objects.filter(pk=request.POST['id']).first()
            if part is not None:
                part.content = request.POST['content']
                part.save()

                return JsonResponse({'message': "Saved"}, safe=False)
        else:
            project = Project(pk=int(request.POST['of']))
            part = Part(label=request.POST['label'],
                        content=request.POST['content'],
                        category=request.POST['category'],
                        of=project,
                        owner=request.user)
            part.save()
            
            return JsonResponse({'message': "Created"}, safe=False)

        return JsonResponse({"message": "Invalid id"})
    else:
        return JsonResponse({"message": "Invalid request"})