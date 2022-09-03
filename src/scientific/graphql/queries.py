import json
import graphene
from graphene_django.types import DjangoObjectType, ObjectType

from ..models import Project
from ..models import Part



class PartType(graphene.ObjectType):
    content = graphene.String()
    category = graphene.String()

    def resolve_content(part, info):
        return part.content

    def resolve_category(part, info):
        return part.category

class ProjectType(graphene.ObjectType):
    title = graphene.String()
    parts = graphene.List(PartType)

    def resolve_parts(project, info):
        print("Project", project)
        return project.part_set.all()

class Query(ObjectType):
    projects = graphene.List(ProjectType)
    project = graphene.Field(ProjectType, id=graphene.Int())

    def resolve_projects(root, info):
        return Question.objects.all()

    def resolve_project(root, info, id):
        return Project.objects.get(pk=id)   

"""
class CustomObject(graphene.ObjectType):
    id = graphene.Int()
    title = graphene.String()
    part_set = graphene.List(PartType)

        
class Query(ObjectType):
    projects = graphene.List(ProjectType)
    project_search = graphene.Field(CustomObject, id=graphene.Int())
    projects_search = graphene.List(CustomObject, category=graphene.Int())
    
    def resolve_projects(self, info, **kwargs):
        return Project.objects.all()

    def resolve_project_search(self, info, **kwargs):
        id = kwargs.get("id", 0)
        project = Project.objects.filter(pk=id).first()

        print(project.part_set.all())
        return CustomObject(
            id=project.pk,
            title=project.title,
            part_set=project.part_set.all())
    
    def resolve_projects_search(self, info, **kwargs):
        category = kwargs.get("category", 0)
        projects = Project.objects.filter(category=category)
        return [CustomObject(
            id=project.pk,
            title=project.title,
            part_set="project.part_set",
        ) for project in projects]    
"""