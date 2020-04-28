# Generated by Django 3.0.5 on 2020-04-28 22:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import machines.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('name', models.CharField(max_length=100)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', machines.models.UserManager()),
            ],
        ),
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
                ('productID', models.IntegerField()),
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
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.Product')),
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Includes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.Product')),
                ('vmID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='machines.VendingMachine')),
            ],
        ),
    ]
