#!/usr/bin/env python3

import os
import sys
from pathlib import Path

import bpy

# Setup path to `scripts` directory so that Blender knows it.
path_to_main_blender_file = bpy.data.filepath
path_to_parent_dir = Path(path_to_main_blender_file).parent.absolute()
path_to_scripts = os.path.join(path_to_parent_dir, "scripts")
sys.path.append(path_to_scripts)

from config import PROJECTS
from config import CAMERA_LOCATIONS, CAMERA_ROTATIONS, CAMERA_ORTHOGRAPHIC_SCALE
from config import CARDINAL_DIRECTIONS, PATH_TO_SPRITES
import utils


def main():
    # Make it possible to open multiple files at once. (Necessary!)
    bpy.app.handlers.load_post.append(utils.load_handler)

    # Loop over Blender projects.
    for project in PROJECTS:
        # TODO Check if new render export is even needed!
        filename = f"{project}.blend"
        filepath = os.path.join(path_to_parent_dir, "models", project, filename)
        # Load the Blender project file, apply modifications, & save to disk.
        bpy.ops.wm.open_mainfile(filepath=filepath)
        modify_project(project)
        bpy.ops.wm.save_mainfile()

    # Return to main Blender file.
    bpy.ops.wm.open_mainfile(filepath=path_to_main_blender_file)


def modify_project(project):
    setup_cameras()
    setup_lights()
    create_sprites(project)


def setup_cameras():

    # Remove "Cameras" collection, if it exists (to avoid duplicates).
    utils.remove_collection_and_objects("Cameras")

    # Create new collection named "Cameras", & add it to scene.
    collection = bpy.data.collections.new("Cameras")
    bpy.context.scene.collection.children.link(collection)

    # Create cameras.
    for i in range(4):
        cam = bpy.data.cameras.new(name=f"Camera {i}")
        obj = bpy.data.objects.new(name=f"Camera {i}", object_data=cam)
        obj.data.type = "ORTHO"
        obj.data.ortho_scale = CAMERA_ORTHOGRAPHIC_SCALE
        obj.location = CAMERA_LOCATIONS[i]
        obj.rotation_euler = CAMERA_ROTATIONS[i]
        bpy.data.collections["Cameras"].objects.link(obj)


def setup_lights():

    # Remove "Lights" collection, if it exists (to avoid duplicates).
    utils.remove_collection_and_objects("Lights")

    # Create new collection named "Cameras", & add it to scene.
    collection = bpy.data.collections.new("Lights")
    bpy.context.scene.collection.children.link(collection)

    # Create lights.
    for i in range(4):
        sun = bpy.data.lights.new(name=f"Sun {i}", type="SUN")
        obj = bpy.data.objects.new(name=f"Sun {i}", object_data=sun)
        obj.location = CAMERA_LOCATIONS[i]
        bpy.data.collections["Lights"].objects.link(obj)


def create_sprites(project):
    # Set background to transparent.
    bpy.context.scene.render.film_transparent = True

    # Make sure the `sprites` output directory exists.
    if not os.path.exists(PATH_TO_SPRITES):
        os.mkdir(PATH_TO_SPRITES)

    # Loop over cameras.
    cameras = bpy.data.collections.get("Cameras")
    for i, cam in enumerate(cameras.objects):
        # Define path to output file (& create directory, if not existing).
        dirpath = os.path.join(PATH_TO_SPRITES, project)
        if not (os.path.exists(dirpath) and os.path.isdir(dirpath)):
            os.mkdir(dirpath)
        filename = f'./{CARDINAL_DIRECTIONS[i]}.png'
        filepath = os.path.join(dirpath, filename)
        # Get camera object & specify details for output image.
        bpy.context.scene.camera = cam
        bpy.context.scene.render.filepath = filepath
        bpy.context.scene.render.image_settings.file_format = 'PNG' 
        # Write to file.
        bpy.ops.render.render(write_still=True)


if __name__ == "__main__":
    main()
