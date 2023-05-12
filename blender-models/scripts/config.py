import os

import numpy as np

PI = np.pi
DEG_TO_RAD = 2 * PI / 360

# TODO Define this dynamically.
foo = os.path.join(
    "/", "Users", "vinc", "org", "Projects", "Code projects",
    "Develop game \"Lager-Simulator 2023\".", "lager-simulator-2023.nosync",
    "blender-models",
)

PATH_TO_MODELS = os.path.join(foo, "models")
PATH_TO_SPRITES = os.path.join(foo, "sprites")

PROJECTS = os.listdir(PATH_TO_MODELS)
PROJECTS = [d for d in PROJECTS if os.path.isdir(os.path.join(PATH_TO_MODELS, d))]

CAMERA_LOCATIONS = [
    (+10, +10, +10),
    (+10, -10, +10),
    (-10, +10, +10),
    (-10, -10, +10),
]

CAMERA_ROTATIONS = [
    (DEG_TO_RAD * 60, 0, DEG_TO_RAD * 135),
    (DEG_TO_RAD * 60, 0, DEG_TO_RAD * 45),
    (DEG_TO_RAD * 60, 0, DEG_TO_RAD * -135),
    (DEG_TO_RAD * 60, 0, DEG_TO_RAD * -45),
]

CAMERA_ORTHOGRAPHIC_SCALE = 15

CARDINAL_DIRECTIONS = ["east", "north", "west", "south"]
