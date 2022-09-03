import graphene

from .queries import ProjectType
from ..models import Project


class ProjectInput(graphene.InputObjectType):
    id = graphene.ID()
    title = graphene.String()


class CreateProject(graphene.Mutation):
    class Arguments:
        input = ProjectInput(required=True)

    author = graphene.Field(ProjectType)

    @staticmethod
    def mutate(root, info, input=None):
        section_instance = Project(title=input.title)
        section_instance.save()
        return CreateProject(section=section_instance)
   
 
class Mutation(graphene.ObjectType):
    create_author = CreateProject.Field()