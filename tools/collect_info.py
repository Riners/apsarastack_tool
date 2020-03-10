#!/home/tops/bin/python
# -*- coding: utf-8 -*-
# Create Time: 2020/3/7 23:56
# Author: Riners

import requests, json

tianji_api= "http://127.0.0.1:7070/api/v3/column/m.*"

products = ['aso', 'asd', 'ecs', 'oss', 'tianji', 'odps', 'rds', 'minirds-mt']

class GetInfo(object):
    def request_api(self):
        ret = requests.get(tianji_api)
        return ret.json()

    def get_v3_ips(self):
        ips = []
        result = self.request_api()
        # print result
        for i in result:
            # print type(i)
            # print i.get('m.currentos')
            # print (type(i.get('m.m.currentos')))
            # ss = i.get('m.currentos').encode("utf-8")
            # print ss, type(eval((ss)))
            # machine_type = eval(ss)['os']
            # print (machine_type)
            # print (machine_type)
            # print (type(ss.encode("utf-8")))
            # print ("project: {}, ip_address: {}, hostname:{}, machine_type:{}").format(i['m.project'], i['m.ip'], i['m.id'],i['m.machine_type_with_nic_type'])
            if i['m.machine_type_with_nic_type'] not in'test_tianji_machin':
                # print (i['m.ip'],i['m.machine_type_with_nic_type'])
                # system_os = eval(i.get('m.currentos').encode("utf-8"))['os']
                # ret1 = ("project: {}, ip_address: {}, hostname:{}, machine_type:{}, system_os:{}").format(i['m.project'], i['m.ip'], i['m.id'],i['m.machine_type_with_nic_type'],system_os)
                # print (ret1)
                # print (i)
                new_ip = i['m.ip']
                new_hostname = i['m.id']
                new_product = i['m.project']
                new_system_os = eval(i.get('m.currentos').encode("utf-8"))['os']
                new_machine_type = i['m.machine_type_with_nic_type']
                new_dict = dict(zip(["ip", "hostname", "system_os", "machine_type", "product"],[new_ip, new_hostname, new_system_os, new_machine_type, new_product]))
                # print (new_dict)
                print (i['m.state'])
                # machine_type = eval(i.get('m.currentos').encode("utf-8"))['os']
                # print (machine_type)
                # os_type = i['']
                # # print (i['m.expectedos'])
                # a = i['m.expectedos']
                # b = a.encode("utf-8")
                # print (b.encode("utf-8"))
                # print (type(b))
                # print (eval((b.encode("utf-8"))))
                # print (eval(b))
                # print (type(a.encode("utf-8")))
                # print (json.load(str(a)))
                # print (type(a))
                # print (eval(str(a)))
                # print (ip, hostname, product, machine_type)
            # print i['m.']
            if i['m.project'] in products:
                ips.append((i['m.project'], i['m.ip']))
                # break
        return ips


    def main(self):
        res = self.get_v3_ips()
        # print res


if __name__ == '__main__':
    getinfo = GetInfo()
    getinfo.main()
