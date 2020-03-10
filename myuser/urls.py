#!/home/tops/bin/python
# -*- coding: utf-8 -*-
# Create Time: 2020/3/10 19:46
# Author: Riners

from django.conf.urls import url
from django.contrib import admin
from myuser import views

urlpatterns = [
    # url(r'login/', views.login),
    url(r'my_login/', views.mylogin),
    url(r'login2/', views.login2),
    # url(r'regist/', views.reg),
    # # url(r'index', views.index),
    # url(r'add_host/', views.add_host),
    # url(r'host_list/', views.host_list),
    # # url(r'check_water/', views.check_water),
    # # url(r'host_detail/', views.host_detail),
    # # url(r'pie_test/', views.pie_test),
    # url(r'resource_water/', views.resource_water),
    # # url(r'login/', views.login),
    # # url(r'register/', views.register),
    # url(r'host_info/', views.host_info),
    # url(r'update_host/', views.update_host),
]