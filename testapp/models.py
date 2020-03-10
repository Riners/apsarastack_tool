# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Server(models.Model):
    id = models.AutoField(primary_key=True)
    ip_addr = models.CharField(max_length=20, null=False, unique=True)
    hostname = models.CharField(max_length=25, null=False, unique=True)
    system_os = models.CharField(max_length=15, null=False)
    # port = models.CharField(max_length=10, null=False, default='22')
    product = models.CharField(max_length=10, null=False, default='default')
    machine_type = models.CharField(max_length=10, null=False, default='nc')



class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.EmailField()
