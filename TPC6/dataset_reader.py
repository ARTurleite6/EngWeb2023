#!/usr/bin/python3

from sys import argv
from requests import post
import json

def main():
    if len(argv) == 1:
        print("Expected file on execution");
        return

    URL = 'http://localhost:7777'

    file_path = argv[1]
    print("file_path=", file_path)

    with open(file_path, "r") as file:
        content = json.load(file)
        pessoas = content["pessoas"]
        numero_pessoas = len(pessoas)
        counter = 0
        for pessoa in pessoas:
            pessoa["_id"] = pessoa["id"]
            del pessoa["id"]
            if post(URL + "/pessoas", json=pessoa).status_code == 200:
                counter += 1
        if counter == numero_pessoas:
            print("Todas as pessoas foram adicionadas com sucesso")
        

if __name__ == "__main__":
    main()