#!/usr/bin/python3

from sys import argv
from requests import put
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
        pessoa = pessoas[0]
        pessoa["_id"] = pessoa["id"]
        del pessoa["id"]

        pessoa["nome"] = "Artur Jorge Castro Leite"

        response = put(URL + f"/pessoas/{pessoa['_id']}", json=pessoa)
        print(response)
        

if __name__ == "__main__":
    main()