from sys import argv
import json

def main():
    filename = argv[1]

    with open(filename) as file:

        out_file = "dataset_with_id.json"
        data = json.load(file)
        #print(data)

        pessoas = data["pessoas"]

        index = 1
        for pessoa in pessoas:
            pessoa["id"] = f"p{index}"
            index += 1

        with open(out_file, "w") as out_file:
            json.dump(data, out_file)


    

if __name__ == "__main__":
    main()
