from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
import datetime
#userID breaks authentication

class UserManager(BaseUserManager):

    use_in_migrations = True
    def create_user(self, username, email, name, password=None):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, username, email, name, password):
        user = self.create_user(
            username=username,
            email=self.normalize_email(email),
            name=name,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, name, password):
        user = self.create_user(
            username=username,
            email=self.normalize_email(email),
            name="True",
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True, primary_key=True)
    email = models.EmailField(('email address'), unique=True)
    name = models.CharField(max_length=100)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name']

    def __str__(self):
        return self.username

    objects = UserManager()



class CRN(models.Model):
    crnID = models.IntegerField(primary_key=True)
    subject = models.CharField(max_length=4)
    number = models.IntegerField()
    buildingID = models.ForeignKey('Building', on_delete = models.CASCADE)

    def __str__(self):
        course_name = str(self.subject + " " + str(self.number))
        return course_name

class Building(models.Model):
    buildingID = models.IntegerField(primary_key=True)
    buildingName = models.CharField(max_length=256)
    buildingLocation = models.CharField(max_length=256)
    city = models.CharField(max_length=256)

class VendingMachine(models.Model):
    WORKING = 'WO'
    MAINTENANCE = 'MA'
    DOWN = 'DO'
    STATUS_CHOICES = [(WORKING, 'WORKING'), (MAINTENANCE, 'MAINTENANCE'), (DOWN, 'DOWN')]

    DRINK = 'DR'
    FOOD = 'FO'
    TYPE_CHOICES = [(DRINK, 'DRINK'), (FOOD, 'FOOD')]

    buildingID = models.ForeignKey('Building', on_delete=models.CASCADE)
    vmID = models.IntegerField(primary_key=True)
    VMLocation = models.CharField(max_length=256)
    status = models.CharField(choices=STATUS_CHOICES, default=WORKING, max_length=2)
    type = models.CharField(choices = TYPE_CHOICES, default=FOOD, max_length=2)

class Product(models.Model):
    DRINK = 'DR'
    FOOD = 'FO'
    TYPE_CHOICES = [(DRINK, 'DRINK'), (FOOD, 'FOOD')]

    productID = models.IntegerField(null=False)
    productName = models.CharField(primary_key=True, max_length=255, unique=True)
    productType = models.CharField(choices = TYPE_CHOICES, default=FOOD, max_length=2)
    price = models.DecimalField(max_digits=5, decimal_places=2)


#change this to user username instead of userID
class Likes(models.Model):
    username = models.ForeignKey('User', on_delete = models.CASCADE)
    productName = models.ForeignKey('Product', on_delete = models.CASCADE)

class Takes(models.Model):
    username = models.ForeignKey('User', on_delete = models.CASCADE)
    crnID = models.ForeignKey('CRN', on_delete = models.CASCADE)

class Includes(models.Model):
    vmID = models.ForeignKey('VendingMachine', on_delete = models.CASCADE)
    productName = models.ForeignKey('Product', on_delete = models.CASCADE)
