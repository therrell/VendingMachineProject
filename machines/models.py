from django.db import models

import uuid
# UUID is unique user id
# might have to change to int primary key if it doesn't work

# it doesn't work

class User(models.Model):
    userID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    loginName = models.CharField(max_length=16)
    password = models.CharField(max_length=256)

class CRN(models.Model):
    crnID = models.IntegerField(primary_key=True)
    enrollmentNumber = models.IntegerField()
    subject = models.CharField(max_length=4)
    number = models.IntegerField()
    buildingID = models.ForeignKey('Building', on_delete = models.CASCADE)

#UUID is unintelligible in website editor
class Building(models.Model):
    buildingID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    buildingName = models.CharField(max_length=256)
    buildingLocation = models.CharField(max_length=256)
    city = models.CharField(max_length=256)

#fix buildingID
class VendingMachine(models.Model):
    WORKING = 'WO'
    MAINTENANCE = 'MA'
    DOWN = 'DO'
    STATUS_CHOICES = [(WORKING, 'WORKING'), (MAINTENANCE, 'MAINTENANCE'), (DOWN, 'DOWN')]

    DRINK = 'DR'
    FOOD = 'FO'
    TYPE_CHOICES = [(DRINK, 'DRINK'), (FOOD, 'FOOD')]

    buildingID = models.ForeignKey('Building', on_delete=models.CASCADE)
    vmID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    VM_Location = models.CharField(max_length=256)
    status = models.CharField(choices=STATUS_CHOICES, default=WORKING, max_length=2)
    type = models.CharField(choices = TYPE_CHOICES, default=FOOD, max_length=2)

class Product(models.Model):
    DRINK = 'DR'
    FOOD = 'FO'
    TYPE_CHOICES = [(DRINK, 'DRINK'), (FOOD, 'FOOD')]

    productID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    productName = models.CharField(max_length=256)
    productType = models.CharField(choices = TYPE_CHOICES, default=FOOD, max_length=2)
    price = models.DecimalField(max_digits=5, decimal_places=2)

class Likes(models.Model):
    userID = models.ForeignKey('User', on_delete = models.CASCADE)
    productID = models.ForeignKey('Product', on_delete = models.CASCADE)

class Takes(models.Model):
    userID = models.ForeignKey('User', on_delete = models.CASCADE)
    crnID = models.ForeignKey('CRN', on_delete = models.CASCADE)

class Includes(models.Model):
    vmID = models.ForeignKey('VendingMachine', on_delete = models.CASCADE)
    productID = models.ForeignKey('Product', on_delete = models.CASCADE)
