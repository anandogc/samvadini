# Generated by Django 4.1 on 2022-09-01 11:23

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('scientific', '0002_remove_project_childrens_project_owner_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='image',
        ),
        migrations.RemoveField(
            model_name='project',
            name='shared_with',
        ),
        migrations.CreateModel(
            name='Part',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=128)),
                ('content', models.TextField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images')),
                ('video', models.FileField(blank=True, null=True, upload_to='videos', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])])),
                ('document', models.FileField(blank=True, null=True, upload_to='documents')),
                ('category', models.CharField(choices=[('txt', 'Text'), ('conf', 'Configuration'), ('head', 'Header'), ('eqn', 'Equation'), ('img', 'Image'), ('tab', 'Table'), ('algo', 'Algorithm'), ('bib', 'Bibliography')], default='txt', max_length=4)),
                ('date_uploaded', models.DateTimeField(default=django.utils.timezone.now)),
                ('of', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scientific.project')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
