import os

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


def is_necessary_to_render(path_to_blender_file, path_to_sprites_dir):
    # Check if sprites directory even exists. If not: Return `True`.
    if not (os.path.exists(path_to_sprites_dir) and os.path.isdir(path_to_sprites_dir)):
        return True
    # Get timestamps of last modification.
    model_modification_time = os.path.getmtime(path_to_blender_file)
    sprites_modification_time = modification_timestamp_for_directory(path_to_sprites_dir)
    # Return `True` only if Blender file was modified after last render.
    dt_in_secs = model_modification_time - sprites_modification_time
    return dt_in_secs > 10
    # ^ NOTE Just returning `model_modification_time > sprites_modification_time`
    # is NOT a sensible solution here, since the Blender file is saved after exporting
    # the images. For that reason, the Blender file's modification date will ALLWAYS be
    # larger than that of the sprites. To make this work anyway, we just define "later"
    # to mean "at least 10 seconds later".
 

def modification_timestamp_for_directory(path_to_dir):
    # For some reason it can happen that a directory's timestamp of last modification
    # is smaller than that of one of its entries. In other words: I can modify a file
    # in a directory, without the directory's modification time being updated. No idea
    # why that is, but anyhow: That's why this function exists. NOTE: This will only
    # work reliably for directories that do NOT themselves contain other directories.

    # Get the modification timestamp for each of the directory's entries.
    entry_modification_times = [
        os.path.getmtime(os.path.join(path_to_dir, entry))
        for entry in os.listdir(path_to_dir)
    ]
    # Return the maximum of those.
    return max(entry_modification_times)
