from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

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

    productName = models.CharField(primary_key=True, max_length=255, unique=True)
    productType = models.CharField(choices = TYPE_CHOICES, default=FOOD, max_length=2)
    price = models.DecimalField(max_digits=5, decimal_places=2)


class Includes(models.Model):
    vmID = models.ForeignKey('VendingMachine', on_delete = models.CASCADE)
    productName = models.ForeignKey('Product', on_delete = models.CASCADE, to_field="productName", db_column="productName")


class Likes(models.Model):
    user_id = models.ForeignKey(User, on_delete = models.CASCADE)
    productName = models.ForeignKey('Product', on_delete = models.CASCADE)

class Takes(models.Model):
    user_id = models.ForeignKey(User, on_delete = models.CASCADE)
    crnID = models.ForeignKey('CRN', on_delete = models.CASCADE)

class Distance(models.Model):
    buildingID = models.ForeignKey('Building', on_delete=models.CASCADE)
    distance = models.DecimalField(max_digits=10, decimal_places=5)
