import numpy as np

PI = np.pi
DEG_TO_RAD = 2 * PI / 360
CARDINAL_DIRECTIONS = ["east", "north", "west", "south"]

MODEL_CATEGORIES = ["structures", "items", "organisms"]

CAMERA_LOCATIONS = [
    (+10, -10, +10),
    (-10, -10, +10),
    (-10, +10, +10),
    (+10, +10, +10),
]

CAMERA_ROTATIONS = [
    (DEG_TO_RAD * 60, 0, DEG_TO_RAD * 45),
    (DEG_TO_RAD * 60, 0, DEG_TO_RAD * -45),
    (DEG_TO_RAD * 60, 0, DEG_TO_RAD * -135),
    (DEG_TO_RAD * 60, 0, DEG_TO_RAD * 135),
]

CAMERA_ORTHOGRAPHIC_SCALE = 15

LIGHT_STRENGTH = 1
