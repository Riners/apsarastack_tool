# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, HttpResponse,render_to_response,HttpResponseRedirect
import requests
from django.http import JsonResponse
from django import views

from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from . import models
from .myforms import RegisterForm
# Create your views here.
from .myforms import UserForm
from .models import User

def add_host(request):
    if request.method == "POST":
        new_ip = request.POST.get("ip_addr")
        new_hostname = request.POST.get("hostname")
        new_system_os = request.POST.get("system_os")
        new_port = request.POST.get("port")
        # print("{}---{}----{}----{}".format(new_ip, new_hostname, new_system_os, new_port))
        print("ip_addr: %s" % new_ip)
        print(("hostname: %s" % new_hostname))
        print("system_os: %s" % new_system_os)
        print("port: %s" % new_port)
        models.Server.objects.create(ip_addr=new_ip,
                                     hostname=new_hostname,
                                     system_os=new_system_os,
                                     port=new_port
                                     )
        return redirect("/host_list/")
    # ret = models.Server.objects.all()
    return render(request, 'add_host.html')



def update_host(request):
    product = ["ecs", "minirds", "rds", "vpc", "slb"]
    ips = []
    tianji_api = "http://127.0.0.1:7070/api/v3/column/m.*"
    ret = requests.get(tianji_api).json()
    for i in ret:
        if i['m.machine_type_with_nic_type'] not in 'test_tianji_machin':
            # print (i['m.ip'],i['m.machine_type_with_nic_type'])
            system_os = eval(i.get('m.currentos').encode("utf-8"))['os']
            ret1 = ("project: {}, ip_address: {}, hostname:{}, machine_type:{}, system_os:{}").format(i['m.project'],
                                                                                                      i['m.ip'],
                                                                                                      i['m.id'], i[
                                                                                                          'm.machine_type_with_nic_type'],
                                                                                                      system_os)
            print (ret1)
            new_ip = i['m.ip']
            new_hostname = i['m.id']
            new_product = i['m.project']
            new_system_os = eval(i.get('m.currentos').encode("utf-8"))['os']
            new_machine_type = i['m.machine_type_with_nic_type']


            models.Server.objects.create(ip_addr = new_ip,
                                         hostname= new_hostname,
                                         system_os = new_system_os,
                                         product = new_product,
                                         machine_type= new_machine_type
                                         )
            return redirect("/host_list/")
    return render(request, 'host_list.html')


def check_water(request):
    return render(request, 'check_water.html')


def host_info(request):
    product= ['odps', 'aso', 'ecs']

    return render(request, 'host_info.html',{"product": product})

def host_detail(request):
    return render(request, 'host_info.html')




def pie_test(request):
    return render(request, 'pie-simple.html')


def resource_water(request):
    return render(request, 'resource_water.html')




tianji_api= "http://127.0.0.1:7070/api/v3/column/m.*"
def host_list(request):
    result = requests.get(tianji_api).json()
    all_host = []
    # print result
    for i in result:
        if i['m.machine_type_with_nic_type'] not in'test_tianji_machin':
            new_ip = i['m.ip']
            new_hostname = i['m.id']
            new_product = i['m.project']
            new_system_os = eval(i.get('m.currentos').encode("utf-8"))['os']
            new_machine_type = i['m.machine_type_with_nic_type']
            new_state = i['m.state']
            new_dict = dict(zip(["ip", "hostname", "system_os", "machine_type", "product", "state"],[new_ip, new_hostname, new_system_os, new_machine_type, new_product, new_state]))
            all_host.append(new_dict)
            # print (new_dict)
    # print (all_host)
    # host_list = pag
    paginator = Paginator(all_host, 10)
    page = request.GET.get('page', 1)
    currentPage = int(page)
    try:
        print(page)
        all_host = paginator.page(page)
    except PageNotAnInteger:
        all_host = paginator.page(1)  # 如果用户输入的页码不是整数时,显示第1页的内容
    except EmptyPage:
        all_host = paginator.page(paginator.num_pages)  # 如果用户输入的页数不在系统的页码列表中时,显示最后一页的内容

    return render(request, 'host_list.html', locals())


def login(request):
    # if request.method == 'GET':
    #     next = request.path
    #     return render(request, 'login.html', {'next': next})
    if request.method == 'POST':
        userform = UserForm(request.POST)
        if userform.is_valid():
            username = userform.cleaned_data['username']
            password = userform.cleaned_data['password']
            # user = User.objects.filter(username__exact=username, password__exact=password)
            user = auth.authenticate(username=username, password=password )
            if user:
                return redirect('/resource_water/')
            else:
                return HttpResponse('用户名或密码错误,请重新登录 %s ' %(username))
        next = request.POST['next']
        if next == 'None':
            return HttpResponseRedirect(next)


    else:
        userform = UserForm()
    return render_to_response('login.html', {'userform': userform})








def register(request):
    # if request.session.get('is_login', None):
    #     # 登录状态不允许注册，你可以修改这条原则
    #     return redirect('/user19/index/')

    if request.method == 'POST':
        register_form = RegisterForm(request.POST)
        message = '请检查填写的内容'
        # 获取数据
        if register_form.is_valid():
            username = register_form.cleaned_data['username']

            password1 = register_form.cleaned_data['password1']

            password2 = register_form.cleaned_data['password2']

            email = register_form.cleaned_data['email']
            sex = register_form.cleaned_data['sex']

            # 判断两次密码是否相同
            if password1 != password2:
                message = '两次输入的密码不同'
                return render(request, 'register.html', locals())
            else:

                same_name_user = models.User.objects.filter(username=username)
                print(same_name_user)
                # 用户名唯一
                if same_name_user:
                    message = '用户名已经存在，请重新选择用户名！'
                    # return  HttpResponse("用户名已经存在")
                    return render(request, 'register.html', locals())

                same_email_user = models.User.objects.filter(email=email)
                if same_email_user:
                    message = '该邮箱地址已经被注册，请使用别的邮箱'
                    # return HttpResponse("邮箱地址已经注册")
                    return render(request, 'register.html', locals())
                # 当一切都OK的情况下，创建了新用户
                new_user = models.User.objects.create()
                new_user.username = username
                # 使用加密密码
                # new_user.password = hash_code(password1)
                # new_user.password = password1
                new_user.email = email
                new_user.sex = sex
                new_user.save()
                return redirect('/login/')
    # 如果请求不是POST，则渲染的是一个空的表单。
    register_form = RegisterForm()
    # 如果用户通过表单提交数据，但是数据验证、不合法，则渲染的是一个带有错误信息的表单
    return render(request, 'register.html', locals())
