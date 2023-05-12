import bpy
from bpy.app.handlers import persistent


@persistent
def load_handler(_dummy):
    print(f"Load handler: {bpy.data.filepath}")


def remove_collection_and_objects(collection_name):
    collection = bpy.data.collections.get(collection_name)
    if collection is not None:
        for obj in collection.objects:
            bpy.data.objects.remove(obj)
        bpy.data.collections.remove(collection)
