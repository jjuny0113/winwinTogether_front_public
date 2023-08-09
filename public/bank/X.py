import os
dir = os.listdir()

for d in dir:
    if('.png' in d):
        ico = d.replace(".png","")
        # print("case \"" + ico + "\":")
        # print("    return Icon"+ico)
        
        # print("import Icon" + ico + " from \"./account/assets/"+ico+".png\"")