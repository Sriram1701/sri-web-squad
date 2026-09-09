import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def clean_logo(img_path):
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for r, g, b, a in datas:
        if a > 0:
            # Calculate saturation-like metric
            c_max = max(r, g, b)
            c_min = min(r, g, b)
            diff = c_max - c_min
            
            # The blue logo should have a high difference between blue and red/green
            # The white/gray artifacts will have a low difference and high brightness
            
            if r > 120 and g > 120 and b > 120 and diff < 60:
                # It's a light gray/white pixel
                newData.append((255, 255, 255, 0))
            elif r > 200 or g > 200:
                # Anything very bright that isn't purely blue
                newData.append((255, 255, 255, 0))
            else:
                newData.append((r, g, b, a))
        else:
            newData.append((r, g, b, a))

    img.putdata(newData)
    img.save(img_path, "PNG")

clean_logo("public/logo.png")
print("Done")
