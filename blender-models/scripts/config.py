import numpy as np

PI = np.pi
DEG_TO_RAD = 2 * PI / 360

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
