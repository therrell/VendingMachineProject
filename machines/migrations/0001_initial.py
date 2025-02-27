# Generated by Django 3.0.5 on 2020-05-05 01:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Building',
            fields=[
                ('buildingID', models.IntegerField(primary_key=True, serialize=False)),
                ('buildingName', models.CharField(max_length=256)),
                ('buildingLocation', models.CharField(max_length=256)),
                ('city', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='CRN',
            fields=[
                ('crnID', models.IntegerField(primary_key=True, serialize=False)),
                ('subject', models.CharField(max_length=4)),
                ('number', models.IntegerField()),
                ('buildingID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.Building')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('productName', models.CharField(max_length=255, primary_key=True, serialize=False, unique=True)),
                ('productType', models.CharField(choices=[('DR', 'DRINK'), ('FO', 'FOOD')], default='FO', max_length=2)),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
        migrations.CreateModel(
            name='VendingMachine',
            fields=[
                ('vmID', models.IntegerField(primary_key=True, serialize=False)),
                ('VMLocation', models.CharField(max_length=256)),
                ('status', models.CharField(choices=[('WO', 'WORKING'), ('MA', 'MAINTENANCE'), ('DO', 'DOWN')], default='WO', max_length=2)),
                ('type', models.CharField(choices=[('DR', 'DRINK'), ('FO', 'FOOD')], default='FO', max_length=2)),
                ('buildingID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.Building')),
            ],
        ),
        migrations.CreateModel(
            name='Takes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('crnID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.CRN')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.Product')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Includes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productName', models.ForeignKey(db_column='productName', on_delete=django.db.models.deletion.CASCADE, to='machines.Product')),
                ('vmID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.VendingMachine')),
            ],
        ),
        migrations.CreateModel(
            name='Distance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distance', models.DecimalField(decimal_places=5, max_digits=10)),
                ('buildingID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.Building')),
            ],
        ),
    ]
