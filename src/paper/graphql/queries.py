import json
import graphene
from graphene_django.types import DjangoObjectType, ObjectType

from ..models import Project

class CustomObject(graphene.ObjectType):
    id = graphene.Int()
    title = graphene.String()
    category = graphene.String()
    text = graphene.String()
    configuration = graphene.String()

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        
        
class Query(ObjectType):
    projects = graphene.List(ProjectType)
    project_search = graphene.Field(CustomObject, id=graphene.Int())
    projects_search = graphene.List(CustomObject, category=graphene.Int())
    
    def resolve_projects(self, info, **kwargs):
        return Project.objects.all()

    def resolve_project_search(self, info, **kwargs):
        id = kwargs.get("id", 0)
        project = Project.objects.filter(pk=id).first()

        return CustomObject(
            id=project.pk,
            title=project.title,
            category=project.category,
            text=project.text,
            configuration=project.configuration)
    
    def resolve_projects_search(self, info, **kwargs):
        category = kwargs.get("category", 0)
        projects = Project.objects.filter(category=category)
        return [CustomObject(
            id=project.pk,
            title=project.title,
            category=project.category,
            text=json.loads(project.text) if project.text else {},
            configuration=json.loads(project.text) if project.text else {}
        ) for project in projects]    
    