import {Position} from "./vector.js";

export class Rectangle {

    constructor(position, dimensions) {
        this.position = position;
        this.dimensions = dimensions;
        this.corners = this._corners()
    }

    _corners() {
        let x = this.position.x,
            y = this.position.y;
        let w = this.dimensions[0],
            h = this.dimensions[1];
        return [
            new Position(x - w / 2, y - h / 2),
            new Position(x + w / 2, y - h / 2),
            new Position(x + w / 2, y + h / 2),
            new Position(x - w / 2, y + h / 2),
        ];
    }

    contains(position) {
        let threshold = 0.01;
        return position.x <= this.corners[1].x - threshold
            && position.x >= this.corners[0].x + threshold
            && position.y <= this.corners[2].y - threshold
            && position.y >= this.corners[0].y + threshold;
    }

    closest_corner_indices(position) {
        let sign_x_difference = Math.sign(this.position.x - position.x);
        let sign_y_difference = Math.sign(this.position.y - position.y);
        let corners = this.corners;
        if (sign_x_difference * sign_y_difference == 1) {
            if (sign_x_difference < 0) {
                return [2];
            } else {
                return [0];
            }
        } else if (sign_x_difference * sign_y_difference == -1) {
            if (sign_x_difference < 0) {
                return [1];
            } else {
                return [3];
            }
        } else {
            // Two corners are of same distance.
            if (sign_x_difference < 0) {
                return [1, 2];
            } else if (sign_x_difference > 0) {
                return [0, 3];
            } else if (sign_y_difference < 0) {
                return [2, 3];
            } else {
                return [0, 1];
            }
        }
    }

    overlaps_towards_direction(rects, direction) {
        let projected_position = this.position.add(direction);
        let closest_corners_idx = this.closest_corner_indices(projected_position);
        let opp_closest_corners_idx = closest_corners_idx.map(idx => (idx + 2)%4);
        let collision = false;
        rects.forEach((rect) => {
            opp_closest_corners_idx.forEach((corner_id) => {
                let opp_corner = rect.corners[corner_id];
                if (this.contains(opp_corner.sub(direction))) {
                    collision = true;
                    return;
                }
            });
            if (!collision) {
                closest_corners_idx.forEach((corner_id) => {
                    let corner = this.corners[corner_id];
                    if (rect.contains(corner.add(direction))) {
                        collision = true;
                        return;
                    }
                });
            }
            if (collision) {
                return;
            }
        });
        return collision;
    }
}
