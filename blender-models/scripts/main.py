#!/usr/bin/env python3

import os
import sys
from pathlib import Path

import bpy

# Setup path to `scripts` directory so that Blender knows it.
path_to_main_blender_file = bpy.data.filepath
path_to_parent_dir = Path(path_to_main_blender_file).parent.absolute()
PATH_TO_SCRIPTS = os.path.join(path_to_parent_dir, "scripts")
sys.path.append(PATH_TO_SCRIPTS)

from config import MODEL_CATEGORIES
from config import CAMERA_LOCATIONS, CAMERA_ROTATIONS, CAMERA_ORTHOGRAPHIC_SCALE
from config import LIGHT_STRENGTH
from config import CARDINAL_DIRECTIONS
import utils

PATH_TO_STATIC = os.path.join(path_to_parent_dir, "..", "server", "static")
PATH_TO_MODELS = os.path.join(path_to_parent_dir, "models")
PATH_TO_SPRITES = os.path.join(path_to_parent_dir, "sprites")


def main():
    # Make it possible to open multiple files at once. (Necessary!)
    bpy.app.handlers.load_post.append(utils.load_handler)

    for model_category in MODEL_CATEGORIES:
        # Define list of models in given category.
        models = sorted([
            d for d in os.listdir(os.path.join(PATH_TO_MODELS, model_category))
            if os.path.isdir(os.path.join(PATH_TO_MODELS, model_category, d))
        ])
        
        # Loop over models, set up cameras & lights, then render (if necessary).
        for model in models:
            # Define paths to Blender file as well as sprites directory for that model.
            path_to_blender_file = os.path.join(PATH_TO_MODELS, model_category, model, f"{model}.blend")
            path_to_sprites_dir = os.path.join(PATH_TO_SPRITES, model_category, model)
            # Check if new render export is even needed.
            if not utils.is_necessary_to_render(path_to_blender_file, path_to_sprites_dir):
                continue
            # Load the Blender model file, apply modifications, & save to disk.
            bpy.ops.wm.open_mainfile(filepath=path_to_blender_file)
            modify_project(model_category, model)
            bpy.ops.wm.save_mainfile()

        # Link sprites to static folder in server.
        for model in models:
            link_sprites_to_static(model_category, model)
    
        # Return to main Blender file.
        bpy.ops.wm.open_mainfile(filepath=path_to_main_blender_file)


def modify_project(model_category, model):
    setup_cameras()
    setup_lights()
    create_sprites(model_category, model)


def setup_cameras():

    # Remove "Cameras" collection, if it exists (to avoid duplicates).
    utils.remove_collection_and_objects("Cameras")

    # Create new collection named "Cameras", & add it to scene.
    collection = bpy.data.collections.new("Cameras")
    bpy.context.scene.collection.children.link(collection)

    # Create cameras.
    for i in range(4):
        cam = bpy.data.cameras.new(name=f"Camera {CARDINAL_DIRECTIONS[i]}")
        obj = bpy.data.objects.new(name=f"Camera {CARDINAL_DIRECTIONS[i]}", object_data=cam)
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
        sun = bpy.data.lights.new(name=f"Sun {CARDINAL_DIRECTIONS[i]}", type="SUN")
        sun.energy = LIGHT_STRENGTH
        obj = bpy.data.objects.new(name=f"Sun {CARDINAL_DIRECTIONS[i]}", object_data=sun)
        obj.location = CAMERA_LOCATIONS[i]
        bpy.data.collections["Lights"].objects.link(obj)


def create_sprites(model_category, model):
    # Set background to transparent.
    bpy.context.scene.render.film_transparent = True

    # Make sure the `sprites` output directory exists.
    if not (os.path.exists(PATH_TO_SPRITES) and os.path.isdir(PATH_TO_SPRITES)):
        os.mkdir(PATH_TO_SPRITES)
    # Make sure the `sprites/<model_category>` output directory exists.
    catpath = os.path.join(PATH_TO_SPRITES, model_category)
    if not (os.path.exists(catpath) and os.path.isdir(catpath)):
        os.mkdir(catpath)
    # Define path to output files (& create directory, if not existing).
    dirpath = os.path.join(catpath, model)
    if not (os.path.exists(dirpath) and os.path.isdir(dirpath)):
        os.mkdir(dirpath)

    # Loop over cameras.
    cameras = bpy.data.collections.get("Cameras")
    for i, cam in enumerate(cameras.objects):
        filename = f'./{CARDINAL_DIRECTIONS[i]}.png'
        filepath = os.path.join(dirpath, filename)
        # Get camera object & specify details for output image.
        bpy.context.scene.camera = cam
        bpy.context.scene.render.filepath = filepath
        bpy.context.scene.render.image_settings.file_format = 'PNG'
        # Write to file.
        bpy.ops.render.render(write_still=True)


def link_sprites_to_static(model_category, model):
    # Define origin & target paths for symlink
    path_to_model_sprites = os.path.join(
        PATH_TO_SPRITES, model_category, model)
    path_to_model_sprites_in_static = os.path.join(
        PATH_TO_STATIC, "img", "sprites", model_category, model)
    # Create symbolic link to static directory (if not already done).
    if os.path.exists(path_to_model_sprites_in_static):
        if os.path.islink(path_to_model_sprites_in_static):
            os.unlink(path_to_model_sprites_in_static)
        else:
            raise Exception(f"Cannot create link, directory with same name exists already: {path_to_model_sprites}")
    os.symlink(path_to_model_sprites, path_to_model_sprites_in_static)


if __name__ == "__main__":
    main()
