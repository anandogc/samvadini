# Generated by Django 4.1 on 2022-09-01 23:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scientific', '0005_alter_part_category'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Image',
        ),
        migrations.AlterField(
            model_name='project',
            name='category',
            field=models.CharField(choices=[('paper', 'Research Paper'), ('thesis', 'Thesis')], default=0, max_length=16),
        ),
    ]
