from django.db import models

# Create your models here.
class Project(models.Model):
    CATEGORIES = [
        (0, "Research Paper"),
        (1, "Thesis")
    ]
    title = models.CharField(max_length=128)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    childrens = models.TextField(blank=True, null=True)
    category = models.IntegerField(choices=CATEGORIES, default=0)
    text = models.TextField(blank=True, null=True)
    configuration = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ('title', )

    def __str__(self):
        return self.title

class Image(models.Model):
    image = models.ImageField(upload_to='images')

    def __str__(self):
        return str(self.image)