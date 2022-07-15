import pymongo
import tarfile
import sys
import gzip
import json
import os
import glob


def extract():
    file_tar = 'raw-bid-win.tar.gz'
    with tarfile.open(file_tar, 'r:gz') as tar:
        tar.extractall()

def read():
    arr = []
    zip_files = read_gzip_files()
    for fileName in zip_files:
        with gzip.open(fileName,'r') as fin:        
            for line in fin:        
                json_str = line.decode('utf-8')
                data = json.loads(json_str)
                arr.append(data)
    print(arr)
    return arr

def read_gzip_files():
    base_path = './raw-bid-win/2017/01/11/00'
    arr = []
    for i in range(0,60):
        number = f"{i:02d}"
        zip_files = f'{base_path}/{number}/*.gz'
        filelist = glob.glob(zip_files)
        for gzfile in filelist:
            arr.append(gzfile)
            return arr
    return arr

def insert(data):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/", username='admin', password='admin')
    mydb = myclient["analyticsInterview"]
    mycol = mydb["individualWins"]
    mycol.insert_many(data)
    myclient.close()

extract()
data = read()
insert(data)