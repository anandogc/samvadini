from django.db import models
from django.core.validators import FileExtensionValidator
import django.utils.timezone as timezone

from home.models import User

# Create your models here.
class Project(models.Model):
    CATEGORIES = [
        ("self", "Self"),
        ("paper", "Research Paper"),
        ("thesis", "Thesis")
    ]
    title = models.CharField(max_length=128)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    category = models.CharField(choices=CATEGORIES, default=0, max_length=16)
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)

    class Meta:
        ordering = ('title', )

    def __str__(self):
        return self.title

class Part(models.Model):
    CATEGORIES = [
        ("text", "Text"),
        ("properties", "Properties"),
        ("outline", "Section"),
        ("equation", "Equation"),
        ("figure", "Figure"),
        ("image", "Image"),
        ("table", "Table"),
        ("algorithm", "Algorithm"),
        ("bibliography", "Bibliography"),

        ("tool", "Toolbar")
    ]

    order = models.IntegerField(default=1000)

    label = models.CharField(max_length=128)
    content = models.TextField(blank=True, null=True)

    image = models.ImageField(upload_to='images', blank=True, null=True)
    video = models.FileField(upload_to='videos', blank=True, null=True,
        validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])])
    document = models.FileField(upload_to='documents', blank=True, null=True)

    category = models.CharField(choices=CATEGORIES, default="txt", max_length=16)
    of = models.ForeignKey(Project, on_delete=models.CASCADE)

    date_created = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(User,on_delete= models.CASCADE)


    class Meta:
        ordering = ('order', 'label')
