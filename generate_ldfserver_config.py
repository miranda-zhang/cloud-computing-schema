import glob, json, os

version="v1.0.1"
prefix="cocoon_"+version
config = {
  "title": "CoCoOn Linked Data Fragments server",
  "datasources": {}
}
config["datasources"][prefix]={
    "title": "CoCoOn "+version+" dataset",
    "type": "CompositeDatasource",
    "description": "A composite datasource for CoCoOn " + version,
    "settings": {
        "references": []
    }
}

path = version+os.sep
for f in glob.glob(path + "**"+os.sep+"*.ttl", recursive=True):
    # print(f)
    key=f.replace(os.sep, "_")
    # print(key)
    config["datasources"][key]={
        "hide": True,
        "type": "TurtleDatasource",
        # use linux style file seperator for server
        "settings": { "file": f.replace(os.sep, "/") }
    }
    config["datasources"][prefix]["settings"]["references"].append(key)

print(json.dumps(config,indent=4))
