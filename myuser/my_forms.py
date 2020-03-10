#!/home/tops/bin/python
# -*- coding: utf-8 -*-
# Create Time: 2020/3/10 20:35
# Author: Riners

from django import forms
# from captcha.fields import CaptchaField


class UserForm(forms.Form):
    username = forms.CharField(label='用户名', max_length=128,
                               widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label='密码', max_length=256,
                               widget=forms.PasswordInput(attrs={'class': 'form-control'}))