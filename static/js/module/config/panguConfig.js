'use strict';
myApp.constant('apis',{
	panguOperateConf:{
		listTab:[
			{"name":"Master运维","color":"","showClass":true,"key":"Master"},
			{"name":"ChunkServer运维","color":"","showClass":false,"key":"Chunkserver"},
			{"name":"Supervisor运维","color":"","showClass":false,"key":"supervisor"},
			{"name":"数据安全","color":"","showClass":false,"key":"DataSafe"},
			{"name":"Rebalance","color":"","showClass":false,"key":"Rebalance"},
			{"name":"文件运维","color":"","showClass":false,"key":"File_system"},
		]
	},
	allJsonData:{//所有请求数据json
		"list_master":{
		   "get_opr_write_token":{"token": "0"},	
		   "get_opr_write_token1":{"token": "1"},
		   "master_elec" :{
			    "PrimaryId": "tcp", 
			    "ElectConsentNumber": "2", 
			    "PrimaryLogId": "56490", 
			    "ElectMasterStatus": "ELECT_MASTER_OVER_ELECTION", 
			    "PreferedWorkerid": "", 
			    "TotalWokerNumber": "3", 
			    "SyncConsentNumber": "2", 
			    "ElectSequence": "[085475db-eb12-4750-ad07-027b3d3424ae,7,994636040]", 
			    "WorkerStatus": {
			            "tcp://100.81.240.141:10260": "ELECT_WORKER_STATUS_PRIMARY", 
			            "tcp://100.81.240.142:10260": "ELECT_WORKER_STATUS_DISCONNECTED", 
			            "tcp://100.81.240.146:10260": "ELECT_WORKER_STATUS_SECONDARY"
			    }
			},
			"get_flag":[
			        {
			            "Status": "OK", 
			            "Value": "102400", 
			            "Server": "nuwa://localcluster/sys/pangu/PanguMasterRole/e46e05338.cloud.nu17"
			        },
			        {
			            "Status": "OK", 
			            "Value": "1024", 
			            "Server": "nuwa://localcluster/sys/pangu/PanguMasterRole/e46e05338.cloud.nu17"
			        },
			        {
			            "Status": "OK1", 
			            "Value": "102400", 
			            "Server": "nuwa://localcluster/sys/pangu/PanguMasterRole/e46e05338.cloud.nu17"
			        }
			    ],
			"buildInfo":[{
			    "buildInfo": {
			        "ReleaseName": "private_build", 
			        "Target": "64", 
			        "TiantengId": "243217", 
			        "HostName": "rs1i01317.et2sqa", 
			        "Mode": "release", 
			        "Time": "2017/08/14 16:42:57+0800", 
			        "Path": "/apsarapangu/disk4/slave/workspace/Fastwork_Template_Apsara_Official_Build/build243217", 
			        "BuildInfo": "{\"env\": {\"kernel\": \"Linux 2.6.32-220.23.2.ali1089.el5.x86_64 under x86_64\", \"gcc\": \"gcc (GCC) 4.1.2 20080704 (Red Hat 4.1.2-51)\", \"tianteng_id\": \"243217\"},\n\"base\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/base\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"234138938fa79f7216a5b76df67ff59281b6de3b\"},\n\"pangu\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/base\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"234138938fa79f7216a5b76df67ff59281b6de3b\"},\n\"authentication\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/authentication\", \"Branch\": \"master\", \"Revision\": \"a1e4af3fa4e250e547a47d4aba97e20a5b4f8bd2\"},\n\"cangjie\": null,\n\"common\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/common\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"a9654d778b473751dcd971eea5c4cf87ede4fe9b\"},\n\"fuxi\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/fuxi\", \"Branch\": \"Release-0.15.7\", \"Revision\": \"30cffbc6089efbf148017b2c09534c8aaad4d03f\"},\n\"image_service\": null,\n\"kuafu\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/kuafu\", \"Branch\": \"Release-0.16\", \"Revision\": \"63c11ce5838b3ba08aee448ab88924092aeba029\"},\n\"kvengine\": null,\n\"nuwa\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/nuwa\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"8c767b6e755a2833351ee935fa6323719ac2cd99\"},\n\"open_storage_service\": null,\n\"pangu\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/pangu\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"a4f046ce1284be4ecd5127db7be732d575841cb6\"},\n\"shennong\": null,\n\"sqlonline\": null,\n\"youchao_storage\": null}"
			    }, 
			    "lsServer": [
			        "tcp://100.81.240.139:10260", 
			        "tcp://100.81.240.140:10260", 
			        "tcp://100.81.240.144:10260", 
			        "tcp://100.81.240.138:10260", 
			        "tcp://100.81.240.143:10260", 
			        "tcp://100.81.240.145:10260", 
			        "tcp://100.81.240.144:10260", 
			        "tcp://100.81.240.138:10260", 
			        "tcp://100.81.240.143:10260", 
			        "tcp://100.81.240.145:10260"
			    ]
				},{
			    "buildInfo": {
			        "ReleaseName": "private_build", 
			        "Target": "61", 
			        "TiantengId": "2", 
			        "HostName": "rs1i01317.et2sqa", 
			        "Mode": "release111", 
			        "Time": "2017/08/14 16:42:57+0800", 
			        "Path": "/apsarapangu/disk4/slave/workspace/Fastwork_Template_Apsara_Official_Build/build243217", 
			        "BuildInfo": "{\"env\": {\"kernel\": \"Linux 2.6.32-220.23.2.ali1089.el5.x86_64 under x86_64\", \"gcc\": \"gcc (GCC) 4.1.2 20080704 (Red Hat 4.1.2-51)\", \"tianteng_id\": \"243217\"},\n\"base\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/base\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"234138938fa79f7216a5b76df67ff59281b6de3b\"},\n\"pangu\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/base\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"234138938fa79f7216a5b76df67ff59281b6de3b\"},\n\"authentication\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/authentication\", \"Branch\": \"master\", \"Revision\": \"a1e4af3fa4e250e547a47d4aba97e20a5b4f8bd2\"},\n\"cangjie\": null,\n\"common\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/common\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"a9654d778b473751dcd971eea5c4cf87ede4fe9b\"},\n\"fuxi\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/fuxi\", \"Branch\": \"Release-0.15.7\", \"Revision\": \"30cffbc6089efbf148017b2c09534c8aaad4d03f\"},\n\"image_service\": null,\n\"kuafu\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/kuafu\", \"Branch\": \"Release-0.16\", \"Revision\": \"63c11ce5838b3ba08aee448ab88924092aeba029\"},\n\"kvengine\": null,\n\"nuwa\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/nuwa\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"8c767b6e755a2833351ee935fa6323719ac2cd99\"},\n\"open_storage_service\": null,\n\"pangu\": {\"URL\": \"ssh://apsara.gerrit@yuncode.alibaba-inc.com:29418/Apsara/pangu\", \"Branch\": \"Release-0.16.1\", \"Revision\": \"a4f046ce1284be4ecd5127db7be732d575841cb6\"},\n\"shennong\": null,\n\"sqlonline\": null,\n\"youchao_storage\": null}"
			    }, 
			    "lsServer": [
			         "tcp://100.81.240.139:10260", 
			        "tcp://100.81.240.140:10260", 
			        "tcp://100.81.240.144:10260", 
			        "tcp://100.81.240.138:10260", 
			        "tcp://100.81.240.143:10260", 
			        "tcp://100.81.240.145:10260", 
			        "tcp://100.81.240.144:10260", 
			        "tcp://100.81.240.138:10260", 
			        "tcp://100.81.240.143:10260", 
			        "tcp://100.81.240.145:10260"
			    ]
			}],
			// "buildInfo":{'show_type' : 'link', 'title' : '高危操作主管审批', 'url':'strBpmsUrl', 'desc' : '前往工作流审批链接'},
			"switch_history":{
			  "switch_history": [
			    {
			      "to": "tcp://10.101.194.161:10260",
			      "from": "tcp://10.101.194.164:10260",
			      "time": "2018-02-17 06:29:52"
			    }
			  ],
			  "monitor_log": {
			    "tcp://10.101.194.161:10260": "daffsdafasdgadsf",
			    "tcp://10.101.194.162:10260": "daffsdafasdgadsf",
			    
			  }
			},
			"sync_status":{
			  "WorkerSyncStatus": {
			    "tcp://10.101.192.102:10260": {
			      "WorkerType": "NORMAL",
			      "LastFailTime": "1970-01-01 08:00:00",
			      "SyncedLogId": 8090
			    },
			    "tcp://10.101.192.98:10260": {
			      "WorkerType": "NORMAL",
			      "LastFailTime": "1970-01-01 08:00:00",
			      "SyncedLogId": 8091
			    }
			  },
			  "PrimaryStatus": "PRIMARY_STARTUP_SERVICE_STARTED",
			  "PrimaryCurrentLogId": 8090
			},
			"cs":{
			    "total_rack_number": 4, 
			    "abnormal_disk_map": {
			        "DISK_ERROR": {
			            "b23d04515.na62": [
			                "2"
			            ]
			        }
			    }, 
			    "total_usable_rack_number": 4, 
			    "total_non_temp_chunk_number": "13356594", 
			    "abnormal_cs_map": {}, 
			    "total_chunk_number": "13356594", 
			    "abnormal_disk_count": 1, 
			    "total_size": "1010244 GB", 
			    "abnormal_cs_count": 0, 
			    "total_free_size": "426893 GB", 
			    "total_file_size": "520200 GB", 
			    "total_machine_size_std": 0.031275702521285684, 
			    "total_non_chunk_size": "520200 GB", 
			    "total_temp_chunk_size": "0 GB", 
			    "cs": {
			        "b23c13577.na62": {
			            "status": "READONLY", 
			            "sendbuff": "NA", 
			            "host": "b23c13577.na62", 
			            "ttl": "154", 
			            "total_size": 45355071897600.0, 
			            "total_garbage_size": 0.0, 
			            "ip": "11.142.153.215", 
			            "total_used_percent": 0.3834640691737127, 
			            "disk": {
			                "disk1": {
			                    "status": "DISK_SHUTDOWN", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1835", 
			                    "temp_chunk_size": "0", 
			                    "garbage_size": "0", 
			                    "non_temp_chunk_number": "47625", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47625", 
			                    "non_temp_chunk_size": "1835", 
			                    "id": "11", 
			                    "free_size": "1571326246912"
			                }, 
			                "disk2": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1854", 
			                    "temp_chunk_size": "0", 
			                    "garbage_size": "0", 
			                    "non_temp_chunk_number": "48263", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "48263", 
			                    "non_temp_chunk_size": "1854", 
			                    "id": "12", 
			                    "free_size": "1550183550976"
			                }, 
			                "disk3": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1848", 
			                    "temp_chunk_size": "0", 
			                    "garbage_size": "0", 
			                    "non_temp_chunk_number": "47875", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47875", 
			                    "non_temp_chunk_size": "1848", 
			                    "id": "13", 
			                    "free_size": "1557774778368"
			                }, 
			                "disk4": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1838", 
			                    "temp_chunk_size": "0", 
			                    "garbage_size": "0", 
			                    "non_temp_chunk_number": "47802", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47802", 
			                    "non_temp_chunk_size": "1838", 
			                    "id": "14", 
			                    "free_size": "1567703597056"
			                }, 
			                "disk5": {
			                    "status": "DISK_ERROR", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1840", 
			                    "temp_chunk_size": "0", 
			                    "garbage_size": "0", 
			                    "non_temp_chunk_number": "47684", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47684", 
			                    "non_temp_chunk_size": "1840", 
			                    "id": "15", 
			                    "free_size": "1565677006848"
			                }, 
			                "disk6": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1814", 
			                    "temp_chunk_size": "0", 
			                    "garbage_size": "0", 
			                    "non_temp_chunk_number": "47534", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47534", 
			                    "non_temp_chunk_size": "1814", 
			                    "id": "16", 
			                    "free_size": "1594263535616"
			                }, 
			                "disk7": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1819", 
			                    "temp_chunk_size": "0", 
			                    "garbage_size": "0", 
			                    "non_temp_chunk_number": "47422", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47422", 
			                    "non_temp_chunk_size": "1819", 
			                    "id": "17", 
			                    "free_size": "1588985233408"
			                }
			            }, 
			            "ssdcache": {}, 
			            "total_free_size": 18892017090560.0
			        },
			        "b23c13577.na63": {
			            "status": "NORMAL", 
			            "sendbuff": "NA", 
			            "host": "b23c13577.na63", 
			            "ttl": "154", 
			            "total_garbage_size": 0.0, 
			            "total_size": 45355071897600.0, 
			            "ip": "11.142.153.211", 
			            "total_used_percent": 0.9834640691737127, 
			            "disk": {
			                "disk1": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1835", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47625", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47625", 
			                    "non_temp_chunk_size": "1835", 
			                    "id": "21", 
			                    "free_size": "1571326246912"
			                }, 
			                "disk2": {
			                    "status": "DISK_ERROR", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1854", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "48263", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "48263", 
			                    "non_temp_chunk_size": "1854", 
			                    "id": "22", 
			                    "free_size": "1550183550976"
			                }, 
			                "disk3": {
			                    "status": "DISK_SHUTDOWN", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1848", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47875", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47875", 
			                    "non_temp_chunk_size": "1848", 
			                    "id": "23", 
			                    "free_size": "1557774778368"
			                }, 
			                "disk4": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1838", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47802", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47802", 
			                    "non_temp_chunk_size": "1838", 
			                    "id": "24", 
			                    "free_size": "1567703597056"
			                }, 
			                "disk5": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1840", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47684", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47684", 
			                    "non_temp_chunk_size": "1840", 
			                    "id": "25", 
			                    "free_size": "1565677006848"
			                }, 
			                "disk6": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1814", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47534", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47534", 
			                    "non_temp_chunk_size": "1814", 
			                    "id": "26", 
			                    "free_size": "1594263535616"
			                }, 
			                "disk7": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1819", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47422", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47422", 
			                    "non_temp_chunk_size": "1819", 
			                    "id": "27", 
			                    "free_size": "1588985233408"
			                }
			            }, 
			            "ssdcache": {}, 
			            "total_free_size": 18892017090560.0
			        },
			        "b23c13577.na64": {
			            "status": "NORMAL", 
			            "sendbuff": "NA", 
			            "host": "b23c13577.na64", 
			            "ttl": "154", 
			            "total_size": 45355071897600.0, 
			            "ip": "11.142.153.214", 
			            "total_used_percent": 0.1834640691737127, 
			            "disk": {
			                "disk1": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1835", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47625", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47625", 
			                    "non_temp_chunk_size": "1835", 
			                    "id": "31", 
			                    "free_size": "1571326246912"
			                }, 
			                "disk2": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1854", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "48263", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "48263", 
			                    "non_temp_chunk_size": "1854", 
			                    "id": "32", 
			                    "free_size": "1550183550976"
			                }, 
			                "disk3": {
			                    "status": "DISK_HANG", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1848", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47875", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47875", 
			                    "non_temp_chunk_size": "1848", 
			                    "id": "38", 
			                    "free_size": "1557774778368"
			                }, 
			                "disk4": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1838", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47802", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47802", 
			                    "non_temp_chunk_size": "1838", 
			                    "id": "34", 
			                    "free_size": "1567703597056"
			                }, 
			                "disk5": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1840", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47684", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47684", 
			                    "non_temp_chunk_size": "1840", 
			                    "id": "39", 
			                    "free_size": "1565677006848"
			                }, 
			                "disk6": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1814", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47534", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47534", 
			                    "non_temp_chunk_size": "1814", 
			                    "id": "36", 
			                    "free_size": "1594263535616"
			                }, 
			                "disk7": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1819", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47422", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47422", 
			                    "non_temp_chunk_size": "1819", 
			                    "id": "30", 
			                    "free_size": "1588985233408"
			                }
			            }, 
			            "ssdcache": {}, 
			            "total_free_size": 18892017090560.0
			        },
			        "b23c13577.na65": {
			            "status": "SHUTDOWN", 
			            "sendbuff": "NA", 
			            "host": "b23c13577.na65", 
			            "ttl": "154", 
			            "total_size": 45355071897600.0, 
			            "ip": "11.142.153.218", 
			            "total_used_percent": 0.8834640691737127, 
			            "disk": {
			                "disk1": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1835", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47625", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47625", 
			                    "non_temp_chunk_size": "1835", 
			                    "id": "41", 
			                    "free_size": "1571326246912"
			                }, 
			                "disk2": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1854", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "48263", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "48263", 
			                    "non_temp_chunk_size": "1854", 
			                    "id": "42", 
			                    "free_size": "1550183550976"
			                }, 
			                "disk3": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1848", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47875", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47875", 
			                    "non_temp_chunk_size": "1848", 
			                    "id": "49", 
			                    "free_size": "1557774778368"
			                }, 
			                "disk4": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1838", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47802", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47802", 
			                    "non_temp_chunk_size": "1838", 
			                    "id": "44", 
			                    "free_size": "1567703597056"
			                }, 
			                "disk5": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1840", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47684", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47684", 
			                    "non_temp_chunk_size": "1840", 
			                    "id": "48", 
			                    "free_size": "1565677006848"
			                }, 
			                "disk6": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1814", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47534", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47534", 
			                    "non_temp_chunk_size": "1814", 
			                    "id": "46", 
			                    "free_size": "1594263535616"
			                }, 
			                "disk7": {
			                    "status": "DISK_OK", 
			                    "temp_chunk_number": "0", 
			                    "chunk_file_size": "1819", 
			                    "temp_chunk_size": "0", 
			                    "non_temp_chunk_number": "47422", 
			                    "total_size": "3779589324800", 
			                    "chunk_file_number": "47422", 
			                    "non_temp_chunk_size": "1819", 
			                    "id": "40", 
			                    "free_size": "1588985233408"
			                }
			            }, 
			            "ssdcache": {}, 
			            "total_free_size": 18892017090560.0
			        }
			    }, 
			    "total_temp_chunk_number": "0", 
			    "rack": {
			        "b23d07": {
			            "total_disk": "72", 
			            "total_free_size": "111503", 
			            "name": "b23d07", 
			            "total_size": "253441", 
			            "usable_cs": "6", 
			            "toal_cs": "6", 
			            "usable_disk": "72"
			        }, 
			        "b23d04": {
			            "total_disk": "71", 
			            "total_free_size": "101640", 
			            "name": "b23d04", 
			            "total_size": "249921", 
			            "usable_cs": "6", 
			            "toal_cs": "6", 
			            "usable_disk": "71"
			        }, 
			        "b23c13": {
			            "total_disk": "72", 
			            "total_free_size": "108735", 
			            "name": "b23c13", 
			            "total_size": "253441", 
			            "usable_cs": "6", 
			            "toal_cs": "6", 
			            "usable_disk": "72"
			        }, 
			        "b23d01": {
			            "total_disk": "72", 
			            "total_free_size": "105013", 
			            "name": "b23d01", 
			            "total_size": "253441", 
			            "usable_cs": "6", 
			            "toal_cs": "6", 
			            "usable_disk": "72"
			        }
			    }, 
			    "total_machine_size_avg": 0.57584934325270498
			},
			"cs_safe":[
		        {
		            "cs": "tcp://11.192.162.54:10260", 
		            "status": "SAFE"
		        }, 
		        {
		            "cs": "tcp://11.192.162.217:10260", 
		            "status": "SAFE"
		        }
		    ],
		    "get_cs_flag":[
		        {
		            "Status": "OK", 
		            "Value": "2293", 
		            "Server": "tcp://100.81.240.139:10260"
		        }, 
		        {
		            "Status": "OK", 
		            "Value": "2293", 
		            "Server": "tcp://100.81.240.140:10260"
		        }, 
		        {
		            "Status": "OK", 
		            "Value": "2293", 
		            "Server": "tcp://100.81.240.144:10260"
		        }
		    ],
			"abnchunk":{
			  "count": 300,
			  "list": [
			    {
			      "Type": "LESSMAX",
			      "FoundTime": 20180131141705,
			      "ChunkId": "48490180771844_0",
			      "Detail": "{[tcp://100.105.18.176:10260 7 REPLICA_EXPIRED][tcp://100.105.18.176:10260 7 REPLICA_EXPIRED]}"
			    },
			    {
			      "Type": "LESSMAX",
			      "FoundTime": 20180131141705,
			      "ChunkId": "48657684496393_0",
			      "Detail": "{[tcp://100.105.18.176:10260 7 REPLICA_EXPIRED][tcp://100.105.18.176:10260 7 REPLICA_EXPIRED]}"
			    },
			    {
			      "Type": "LESSMAX",
			      "FoundTime": 20180131141705,
			      "ChunkId": "48674864365581_0",
			      "Detail": "{[tcp://100.105.18.176:10260 7 REPLICA_EXPIRED][tcp://100.105.18.176:10260 7 REPLICA_EXPIRED]}"
			    }
			  ]
			},
			"check_rep_status":	{
			    "Destination CS number": 9, 
			    "Source CS number": 9, 
			    "lsRepStatus": [
			        {
			            "Dest": "tcp://11.238.200.230:10260", 
			            "Pri": "22", 
			            "ChunkId": "1583919514255371_12", 
			            "Source": "tcp://11.238.200.194:10260", 
			            "StartTime": "20180202021731", 
			            "Ttl": "350", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.213:10260", 
			            "Pri": "22", 
			            "ChunkId": "4312997568708614_72", 
			            "Source": "tcp://11.238.200.235:10260", 
			            "StartTime": "20180202025845", 
			            "Ttl": "345", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.198:10260", 
			            "Pri": "22", 
			            "ChunkId": "6093557865644035_10", 
			            "Source": "tcp://11.238.200.194:10260", 
			            "StartTime": "20180201131139", 
			            "Ttl": "348", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.230:10260", 
			            "Pri": "22", 
			            "ChunkId": "6323579134148614_13", 
			            "Source": "tcp://11.238.200.194:10260", 
			            "StartTime": "20180201001043", 
			            "Ttl": "347", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.198:10260", 
			            "Pri": "22", 
			            "ChunkId": "8031155051823113_12", 
			            "Source": "tcp://11.238.200.230:10260", 
			            "StartTime": "20180201132003", 
			            "Ttl": "347", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.194:10260", 
			            "Pri": "22", 
			            "ChunkId": "9175308569673734_25", 
			            "Source": "tcp://11.238.200.230:10260", 
			            "StartTime": "20180202001703", 
			            "Ttl": "346", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.234:10260", 
			            "Pri": "22", 
			            "ChunkId": "9725691448786951_0", 
			            "Source": "tcp://11.238.200.235:10260", 
			            "StartTime": "20180201181041", 
			            "Ttl": "343", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.216:10260", 
			            "Pri": "22", 
			            "ChunkId": "10246129815912455_13", 
			            "Source": "tcp://11.238.200.230:10260", 
			            "StartTime": "20180201224326", 
			            "Ttl": "350", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.194:10260", 
			            "Pri": "22", 
			            "ChunkId": "10755169339834374_16", 
			            "Source": "tcp://11.238.200.230:10260", 
			            "StartTime": "20180201062645", 
			            "Ttl": "349", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.235:10260", 
			            "Pri": "22", 
			            "ChunkId": "10798823387430920_157", 
			            "Source": "tcp://11.238.200.234:10260", 
			            "StartTime": "20180201123256", 
			            "Ttl": "350", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.198:10260", 
			            "Pri": "22", 
			            "ChunkId": "10822943923765255_13", 
			            "Source": "tcp://11.238.200.235:10260", 
			            "StartTime": "20180201192206", 
			            "Ttl": "349", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.235:10260", 
			            "Pri": "22", 
			            "ChunkId": "11143249699799047_10", 
			            "Source": "tcp://11.238.200.197:10260", 
			            "StartTime": "20180202003456", 
			            "Ttl": "344", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.194:10260", 
			            "Pri": "22", 
			            "ChunkId": "11614944483082247_1", 
			            "Source": "tcp://11.238.200.216:10260", 
			            "StartTime": "20180201140154", 
			            "Ttl": "349", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.239:10260", 
			            "Pri": "22", 
			            "ChunkId": "13399215631761416_13", 
			            "Source": "tcp://11.238.200.235:10260", 
			            "StartTime": "20180201144153", 
			            "Ttl": "347", 
			            "Type": "MAX_COPY"
			        }, 
			        {
			            "Dest": "tcp://11.238.200.234:10260", 
			            "Pri": "22", 
			            "ChunkId": "18662199836803078_13", 
			            "Source": "tcp://11.238.200.198:10260", 
			            "StartTime": "20180201192411", 
			            "Ttl": "349", 
			            "Type": "MAX_COPY"
			        }
			    ], 
			    "Total chunk number": 15
			},
			"chunk_info":{
			  "CompressType": "NO_COMPRESSION",
			  "ChunkNumber": 1,
			  "ChunkInfo": {
			    "lsReplicaInfo": [
			      {
			        "Status": "SHUTDOWN",
			        "Location": "tcp://10.101.221.45:10260",
			        "DiskId": 4
			      },
			      {
			        "Status": "normal",
			        "Location": "tcp://10.101.222.36:10260",
			        "DiskId": 12
			      }
			    ],
			    "Version": 1,
			    "ChunkFlag": "0",
			    "ReplicaNum": 2,
			    "ChunkId": 0
			  },
			  "AppName": "BIGFILE_APPNAME",
			  "MinCopy": 1,
			  "FileType": "NORMAL_FILE_TYPE_FLAG",
			  "CreateTime": "20180226062300",
			  "LastModifyTime": "20180226062637",
			  "MaxCopy": 1,
			  "FileLength": 16,
			  "PartName": "BIGFILE_PARTNAME",
			  "FileId": "123162482180097"
			},
			"pangu_file_whois":{
			    "strFileName": "/test/LogBackup/KVServerRole/tb2a01635.sqa.tbc/monitor_data/test.sh"
			},
			"list_dir":{
			    "file": {
			        "test.sh": {
			            "CompressType": "NO_COMPRESSION", 
			            "name": "test.sh", 
			            "FileType": "Normal file", 
			            "CreateTime": "2018-01-18 18:02:25", 
			            "LastModifyTime": "2018-01-18 18:02:25", 
			            "Length": "107", 
			            "Part": "BIGFILE_PARTNAME", 
			            "ReferenceCount": "1", 
			            "Copy": "3-3", 
			            "App": "BIGFILE_APPNAME"
			        }, 
			        "aaa": {
			            "CompressType": "NO_COMPRESSION", 
			            "name": "aaa", 
			            "FileType": "Normal file", 
			            "CreateTime": "2018-01-18 17:44:05", 
			            "LastModifyTime": "2018-01-18 17:44:05", 
			            "Length": "0", 
			            "Part": "BIGFILE_PARTNAME", 
			            "ReferenceCount": "1", 
			            "Copy": "1-1", 
			            "App": "BIGFILE_APPNAME"
			        }
			    }, 
			    "dir": {
			        "pangu_test": {
			            "Pinned": "0", 
			            "Length": "958509778128", 
			            "FileNumber": "4472", 
			            "name": "pangu_test", 
			            "DirNumber": "316"
			        },
			        "deleted": {
			            "Pinned": "0", 
			            "Length": "74924869732", 
			            "FileNumber": "1518", 
			            "name": "deleted", 
			            "DirNumber": "163"
			        }
			    }
			},
			"file_info":{
				"CompressType": "NO_COMPRESSION",
				"ChunkNumber":  9,
				"lsChunkInfo":  [{
					"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.198:10260",
								"DiskId":  21
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.194:10260",
								"DiskId":  9
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  20
							}
						],
						"Version":  10,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  0
					},
					{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.235:10260",
								"DiskId":  5
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.194:10260",
								"DiskId":  26
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  9
							}
						],
						"Version":  19,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  1
					},{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.235:10260",
								"DiskId":  5
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.194:10260",
								"DiskId":  26
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  9
							}
						],
						"Version":  19,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  1
					},{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.235:10260",
								"DiskId":  5
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.194:10260",
								"DiskId":  26
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  9
							}
						],
						"Version":  19,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  1
					},{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.235:10260",
								"DiskId":  5
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.194:10260",
								"DiskId":  26
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  9
							}
						],
						"Version":  19,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  1
					},
					{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.213:10260",
								"DiskId":  31
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.239:10260",
								"DiskId":  16
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  2
							}
						],
						"Version":  28,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  2
					},
					{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.194:10260",
								"DiskId":  18
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.197:10260",
								"DiskId":  17
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  25
							}
						],
						"Version":  37,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  3
					},
					{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.197:10260",
								"DiskId":  23
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.198:10260",
								"DiskId":  13
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  8
							}
						],
						"Version":  46,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  4
					},
					{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.216:10260",
								"DiskId":  25
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.198:10260",
								"DiskId":  19
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  24
							}
						],
						"Version":  55,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  5
					},
					{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.230:10260",
								"DiskId":  34
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.239:10260",
								"DiskId":  18
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  10
							}
						],
						"Version":  64,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  6
					},
					{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.213:10260",
								"DiskId":  7
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.194:10260",
								"DiskId":  9
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  6
							}
						],
						"Version":  74,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  7
					},
					{
						"lsReplicaInfo":  [{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.235:10260",
								"DiskId":  26
							},
							{
								"Status":   "normal",
								"Location":   "tcp://11.238.200.230:10260",
								"DiskId":  8
							},
							{
								"Status":   "normal",
								"Location":   "tcp://10.218.168.14:10260",
								"DiskId":  19
							}
						],
						"Version":  74,
						"ChunkFlag":   "0",
						"ReplicaNum":  3,
						"ChunkId":  8
					}
				],
				"AppName":   "BIGFILE_APPNAME",
				"MinCopy":  3,
				"FileType":   "NORMAL_FILE_TYPE_FLAG",
				"CreateTime":   "20180201184143",
				"LastModifyTime":   "20180201185014",
				"MaxCopy":  3,
				"FileLength":  536870959,
				"PartName":   "BIGFILE_PARTNAME",
				"FileId":   "460913844139589638"
			},
			"get_quota":{
			    "FilePhysicalLength": {
			        "Used": 258658368082460, 
			        "Limit": "unlimited"
			    }, 
			    "FileNumber": {
			        "Used": 1305952, 
			        "Limit": "unlimited"
			    }, 
			    "EntryNumber": {
			        "Used": 1307166, 
			        "Limit": "unlimited"
			    }, 
			    "FileLogicalLength": {
			        "Used": 86218680081878, 
			        "Limit": "unlimited"
			    }
			},
			"chunk_meta":{
			    "ChecksumTimestamps": 0, 
			    "Writable": true, 
			    "ChunkLength": 66799064, 
			    "ChunkStatus": 0, 
			    "ChecksumInitValue": 0, 
			    "Checksum": 2807288434, 
			    "DataErrorDetectionType": 2, 
			    "EncryptedDataKey": "", 
			    "Padding": 0, 
			    "StatusGot": "PANGU_CHUNKSERVER_DISK_ERROR",
			    "BelongedFileId": 377024117712355332, 
			    "SsdId": 2, 
			    "EncryptType": "", 
			    "ChecksumLength": 4096, 
			    "ChunkVersion": 66799064, 
			    "ChunkIndex": 102, 
			    "DiskId": 19
			}




		},
		"test":{	
		   "get_quota" :{
			    "FilePhysicalLength": {
			        "Used": 258658368082460, 
			        "Limit": "unlimited"
			    }, 
			    "FileNumber": {
			        "Used": 1305952, 
			        "Limit": "unlimited"
			    }, 
			    "EntryNumber": {
			        "Used": 1307166, 
			        "Limit": "unlimited"
			    }, 
			    "FileLogicalLength": {
			        "Used": 86218680081878, 
			        "Limit": "unlimited"
			    }
			},
			"chunk_info":{
			  "CompressType": "NO_COMPRESSION",
			  "ChunkNumber": 1,
			  "ChunkInfo": {
			    "lsReplicaInfo": [
			      {
			        "Status": "SHUTDOWN",
			        "Location": "tcp://10.101.221.45:10260",
			        "DiskId": 4
			      },
			      {
			        "Status": "normal",
			        "Location": "tcp://10.101.222.36:10260",
			        "DiskId": 12
			      }
			    ],
			    "Version": 1,
			    "ChunkFlag": "0",
			    "ReplicaNum": 2,
			    "ChunkId": 0
			  },
			  "AppName": "BIGFILE_APPNAME",
			  "MinCopy": 1,
			  "FileType": "NORMAL_FILE_TYPE_FLAG",
			  "CreateTime": "20180226062300",
			  "LastModifyTime": "20180226062637",
			  "MaxCopy": 1,
			  "FileLength": 16,
			  "PartName": "BIGFILE_PARTNAME",
			  "FileId": "123162482180097"
			},
			"chunk_meta":{
			    "ChecksumTimestamps": 0, 
			    "Writable": true, 
			    "ChunkLength": 66799064, 
			    "ChunkStatus": 0, 
			    "ChecksumInitValue": 0, 
			    "Checksum": 2807288434, 
			    "DataErrorDetectionType": 2, 
			    "EncryptedDataKey": "", 
			    "Padding": 0, 
			    "StatusGot": "PANGU_CHUNKSERVER_DISK_ERROR",
			    "BelongedFileId": 377024117712355332, 
			    "SsdId": 2, 
			    "EncryptType": "", 
			    "ChecksumLength": 4096, 
			    "ChunkVersion": 66799064, 
			    "ChunkIndex": 102, 
			    "DiskId": 19
			}
		}
	},
	pangu_block_showOperationTh:{
	    "getFlagTh":[
	      {"name":"Status","key":"Status"},
	      {"name":"Value","key":"Value"},
	      {"name":"Server","key":"Server"}
	    ],
	    "queryDeviceTh":[
	      {"name":"status","key":"status"},
	      {"name":"currentSnapshotVersion","key":"currentSnapshotVersion"},
	      {"name":"maxClientVersion","key":"maxClientVersion"},
	      {"name":"openVersion","key":"openVersion"},
	      {"name":"newSnapshotVersion","key":"newSnapshotVersion"},
	      // {"name":"meta","key":"meta","width":"500px"},
	    ],
	    // "queryDeviceDetailedTh":[
	    //   {"name":"segmentSizeInSectors","key":"segmentSizeInSectors"},
	    //   {"name":"stripeSegmentCount","key":"stripeSegmentCount"},
	    //   {"name":"ecPacketSizeBits","key":"ecPacketSizeBits"},
	    //   {"name":"stripeUnitSizeInSectors","key":"stripeUnitSizeInSectors"},
	    //   {"name":"ecGroupDataChunks","key":"ecGroupDataChunks"},
	    //   {"name":"format","key":"format"},
	    //   {"name":"snapshotBlockSizeInSectors","key":"snapshotBlockSizeInSectors"},
	    //   {"name":"sectorSize","key":"sectorSize"},
	    //   {"name":"copy","key":"copy"},
	    //   {"name":"ecGroupParityChunks","key":"ecGroupParityChunks"},
	    //   {"name":"compressionAlgorithm","key":"compressionAlgorithm"},
	    //   {"name":"deviceSize","key":"deviceSize"},
	    //   {"name":"enableStripe","key":"enableStripe"},
	    //   {"name":"migrationState","key":"migrationState"},
	    // ],
	    "queryDeviceDetailedTh":[
	      {"name":"segmentSizeInSectors","key":"segmentSizeInSectors"},
	      {"name":"stripeSegmentCount","key":"stripeSegmentCount"},
	      {"name":"ecPacketSizeBits","key":"ecPacketSizeBits"},
	      {"name":"stripeUnitSizeInSectors","key":"stripeUnitSizeInSectors"},
	      {"name":"ecGroupDataChunks","key":"ecGroupDataChunks"},
	      {"name":"format","key":"format"},
	      {"name":"snapshotBlockSizeInSectors","key":"snapshotBlockSizeInSectors"},
	      // {"name":"sectorSize","key":"sectorSize"},
	      // {"name":"copy","key":"copy"},
	      // {"name":"ecGroupParityChunks","key":"ecGroupParityChunks"},
	      // {"name":"compressionAlgorithm","key":"compressionAlgorithm"},
	      // {"name":"deviceSize","key":"deviceSize"},
	      // {"name":"enableStripe","key":"enableStripe"},
	      // {"name":"migrationState","key":"migrationState"},
	    ],
	    "queryDeviceSegmentBasicTh":[
	      {"name":"errorCode","key":"errorCode"},
	      {"name":"errorMsg","key":"errorMsg"},
	      {"name":"deviceId","key":"deviceId"}
	    ],
	    "queryDeviceSegmentEnvTh":[
	      {"name":"status","key":"status"},
	      // {"name":"MEDIUM_TYPE","key":"MEDIUM_TYPE"},
	      {"name":"snapVersion","key":"snapVersion"},
	      {"name":"configVersion","key":"configVersion"},
	      {"name":"location","key":"location"},
	      {"name":"segmentIdx","key":"segmentIdx"}
	    ],
	    "queryDeviceSnapshotEnvTh":[
	      {"name":"快照ID","key":"SNAPDEVICEID"},
	      {"name":"MODE","key":"MODE"},
	      {"name":"状态","key":"status"},
	      {"name":"大小","key":"SIZE"},
	      {"name":"COPY","key":"COPY"},
	      {"name":"REFCOUNT","key":"REFCOUNT"},
	      {"name":"SNAPINDEX","key":"SNAPINDEX"}
	    ],
	    "listClusterDcgcTh":[
	      {"name":"location","key":"location"},
	      {"name":"状态","key":"status"},
	      {"name":"scrub","key":"scrub"},
	      {"name":"time_s","key":"time_s"},
	      {"name":"segment","key":"segment"},
	      {"name":"strategy","key":"strategy"}
	    ],
	    "listClusterDcgcBasicTh":[
	        {"name":"finish","key":"finish"},
	        {"name":"querying","key":"querying"},
	        {"name":"t_ignore","key":"t_ignore"},
	        {"name":"t_fail","key":"t_fail"},
	        {"name":"selectworker","key":"selectworker"},
	        {"name":"t_succ","key":"t_succ"},
	        {"name":"notify","key":"notify"},
	        {"name":"importing","key":"importing"},
	        {"name":"t_all","key":"t_all"}
	    ],
	    "basic_buildinfoTh":[
	      {"name":"ReleaseName","key":"ReleaseName"},
	      {"name":"Target","key":"Target"},
	      {"name":"TiantengId","key":"TiantengId"},
	      {"name":"HostName","key":"HostName"},
	      {"name":"Mode","key":"Mode"},
	      {"name":"Time","key":"Time"},
	      {"name":"Path","key":"Path"},
	      {"name":"Env","key":"Env"}
	    ],
	    "env_buildinfoTh":[
	      {"name":"Name","key":"Name"},
	      {"name":"Branch","key":"Branch"},
	      {"name":"Revision","key":"Revision"},
	      {"name":"URL","key":"URL"},
	    ],
	    "BlockDeviceCheckreadyTH":[
	        {"name":"listDeviceFail","key":"listDeviceFail"},
	        {"name":"normalSegment","key":"normalSegment"},
	        {"name":"checkSegmentFail","key":"checkSegmentFail"},
	        {"name":"locationDeviceFail","key":"locationDeviceFail"},
	    ],
	    "BlockDeviceAbnCheckreadyTH":[
	        {"name":"DeviceId","key":"DeviceId"},
	        {"name":"Segment","key":"Segment"},
	        {"name":"Result","key":"Result"},
	    ],
	    "BlockDeviceSistsegTH":[
          {"name":"deviceId","key":"deviceId"},
          {"name":"group","key":"group"},
          {"name":"bs0","key":"bs0"},
          {"name":"bs1","key":"bs1"},
          {"name":"bs2","key":"bs2"},
          {"name":"bs3","key":"bs3"},
          {"name":"bs4","key":"bs4"},
          {"name":"bs5","key":"bs5"},
          {"name":"bs6","key":"bs6"},
          {"name":"bs7","key":"bs7"},
          {"name":"sum","key":"sum"},
      	],
	},
	pangu_blockTh:{
		"BlockMasterTH":[
	        {"name":"节点地址","key":"machine","width":"170px"},
	        {"name":"角色","key":"ROLE"},
	        {"name":"LogId","key":"LOGID"},
	        {"name":"操作","key":"operation","width":"210px"},
	    ],
	    "BlockMasterGciTh":[
	      {"name":"DeviceCount","key":"DeviceCount"},
	      {"name":"SegmentCount","key":"SegmentCount"},
	      {"name":"errorMsg","key":"errorMsg"},
	      {"name":"DeviceLogicalGB","key":"DeviceLogicalGB"},
	      {"name":"TotalPhysicalGB","key":"TotalPhysicalGB"},
	      {"name":"FreeGB","key":"FreeGB"},
	      {"name":"errorCode","key":"errorCode"},
	      {"name":"UsedGB","key":"UsedGB"},
	      {"name":"AvgDeviceCount","key":"AvgDeviceCount"}
	    ],
	    "BlockMasterGciListTh":[
	      {"name":"Medium","key":"Medium"},
	      {"name":"Total(GB)","key":"Total(GB)"},
	      {"name":"Free(GB)","key":"Free(GB)"},
	      {"name":"Usage(%)","key":"Usage(%)"},
	    ],
	    "BlockDeviceTH":[
	        {"name":"DeviceId","key":"DeviceId","width":"170px"},
	        {"name":"状态","key":"status"},
	        {"name":"逻辑容量(GB)","key":"size_GB"},
	        {"name":"Segment情况","key":"segments"},
	        {"name":"mode","key":"mode"},
	        {"name":"标志位","key":"flags"},
	        {"name":"操作","key":"operation","width":"233px"},
	    ],
	    "BlockSnapshotTH":[
	        {"name":"快照","key":"SNAPVERSION","width":"170px"},
	        {"name":"状态","key":"STATUS"},
	        {"name":"SNAPINDEX","key":"SNAPINDEX"},
	        {"name":"REFCOUNT","key":"REFCOUNT"},
	        {"name":"COPY","key":"COPY"},
	        {"name":"SNAPDEVICEID","key":"SNAPDEVICEID"},
	        {"name":"SIZE","key":"SIZE"},
	        {"name":"操作","key":"operation","width":"100px"},
	    ],
	    "BlockSnapshotServerTH":[
	        {"name":"快照","key":"Location","width":"170px"},
	        {"name":"状态","key":"Status"},
	        {"name":"SNAPINDEX","key":"Load"},
	        {"name":"REFCOUNT","key":"LazyLoad"},
	        {"name":"COPY","key":"UpLoad"},
	        {"name":"操作","key":"operation","width":"100px"},
	    ],
	    "BlockServerTH":[
	        {"name":"节点地址","key":"machine","width":"170px"},
	        {"name":"状态","key":"STATUS"},
	        {"name":"segment数","key":"N_PARTS"},
	        {"name":"r/s","key":"r/s"},
	        {"name":"w/s","key":"w/s"},
	        {"name":"rMB/s","key":"rMB/s"},
	        {"name":"wMB/s","key":"wMB/s"},
	        {"name":"rLat","key":"rLat"},
	        {"name":"wLat","key":"wLat"},
	        {"name":"操作","key":"operation","width":"100px"},
	    ],
	    "BlockServerLsschbsTH":[
	        {"name":"节点地址","key":"machine"},
	        {"name":"操作","key":"operation","width":"100px"},
	    ],
	    "BlockGcworkerTH":[
	        {"name":"节点地址","key":"machine","width":"170px"},
	        {"name":"状态","key":"STATUS"},
	        {"name":"操作","key":"operation","width":"100px"},
	    ],
	    "BlockDeviceCheckreadyTH":[
	        {"name":"listDeviceFail","key":"listDeviceFail"},
	        {"name":"normalSegment","key":"normalSegment"},
	        {"name":"checkSegmentFail","key":"checkSegmentFail"},
	        {"name":"locationDeviceFail","key":"locationDeviceFail"},
	    ],
	    "BlockDeviceAbnCheckreadyTH":[
	        {"name":"DeviceId","key":"DeviceId"},
	        {"name":"Segment","key":"Segment"},
	        {"name":"Result","key":"Result"},
	    ],
	    "queryDeviceSegmentEnvTh":[
	      {"name":"DeviceId","key":"DeviceId"},
	      // {"name":"MEDIUM_TYPE","key":"MEDIUM_TYPE"},
	      {"name":"status","key":"status"},
	      {"name":"snapVersion","key":"snapVersion"},
	      {"name":"configVersion","key":"configVersion"},
	      {"name":"location","key":"location"},
	      {"name":"segmentIdx","key":"segmentIdx"},
	      {"name":"操作","key":"operation","width":"170px"},
	    ],
	    "queryDeviceSegmentBasicTh":[
	      {"name":"medium_size","key":"medium_size"},
	      {"name":"threadid","key":"threadid"},
	      {"name":"medium_type","key":"medium_type"},
	      {"name":"segmentIdx","key":"segmentIdx"},
	      {"name":"fast_medium","key":"fast_medium"},
	    ],
	    "queryDeviceSnapshotEnvTh":[
	      {"name":"DeviceId","key":"DeviceId"},
	      {"name":"MODE","key":"MODE"},
	      {"name":"状态","key":"status"},
	      {"name":"大小","key":"SIZE"},
	      {"name":"COPY","key":"COPY"},
	      {"name":"REFCOUNT","key":"REFCOUNT"},
	      {"name":"SNAPINDEX","key":"SNAPINDEX"},
	      {"name":"操作","key":"operation","width":"170px"},
	    ],
	},
	cluBaseCopywriting:{
		"quota":[{"name":"盘古可以对每个目录设置quota，quota从四个维度进行限制（递归包含所有子目录）"},{"name":"EntryNumber：此目录下能保存的文件和目录总数。"},{"name":"FileNumber：此目录下能保存的文件总数。"},{"name":"FileLogicalLength：此目录下文件的逻辑长度最大值。"},{"name":"FilePhysicalLength：此目录下文件的物理长度的最大值，值取正整数，或者两个特殊字符串：default, unlimited。其中default表明保持该entry对应的老quota值不变，unlimited表明对该entry不设置quota。"}]
	},
	initPageSize: 20,
	mapChart:{
		MIN_STR:'"min":0',
	},
	strChart:{
		title: {
			text: 'Styled color zones'
		},
		yAxis:{
			
	    },
	    xAxis:{
	    	type: 'datetime',
			},
	    series: [
	    {	
	    	zoneAxis:'x',
	    	zones: [
	    	{
            	// value:500,
            	value:1509694830000,
            	color:'blue',
            },
	    	 {
            	value:1509694860000,
            	color:'yellow',
            },
	    	{
                value: 1509694890000,
                color:'red'
            },{
                value: 1509694920000,
                color:'#00FFCC',
            }, {
            	value:  1509694950000,
            	color:'pink',
            }],
            marker:{enabled:false},
	        type: 'line',
	        pointStart:1509694815000,
	        pointInterval:15000,
	        data: [-3211,2150,3674,3453,2564,1345,5344,1235,-2454,4456]
	    }
	    ]
	}
})