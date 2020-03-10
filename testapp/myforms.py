#!/home/tops/bin/python
# -*- coding: utf-8 -*-
# Create Time: 2020/3/9 0:56
# Author: Riners

from django import forms
# from captcha.fields import CaptchaField


class UserForm(forms.Form):
    username = forms.CharField(label='用户名', max_length=128,
                               widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label='密码', max_length=256,
                               widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    # captcha = CaptchaField(label='验证码')


# class RegisterForm(forms.Form):
#     gender = (
#         ('male', '男'),
#         ('female', '女'),
#     )
#
#     username = forms.CharField(max_length=128, label='用户名',
#                                widget=forms.TextInput(attrs={'class': 'form-control'}))
#     password1 = forms.CharField(max_length=256, label='密码',
#                                 widget=forms.PasswordInput(attrs={'class': 'form-control'}))
#     password2 = forms.CharField(max_length=256, label='确认密码',
#                                 widget=forms.PasswordInput(attrs={'class': 'form-control'}))
#     email = forms.EmailField(label='邮箱地址', widget=forms.EmailInput(attrs={'class': 'form-control'}))
#     sex = forms.ChoiceField(choices=gender, label='性别')
    # captcha = CaptchaField(label="验证码")