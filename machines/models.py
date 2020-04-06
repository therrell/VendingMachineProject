from django.db import models

#user is a keyword for django; model does not appear
class User(models.Model):
    userID = models.IntegerField(primary_key=True)
    loginName = models.CharField(max_length=16)
    password = models.CharField(max_length=256)

class CRN(models.Model):
    crnID = models.IntegerField(primary_key=True)
    subject = models.CharField(max_length=4)
    number = models.IntegerField()
    buildingID = models.ForeignKey('Building', on_delete = models.CASCADE)

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

    productID = models.IntegerField(primary_key=True)
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
