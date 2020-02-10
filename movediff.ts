// / <reference path="./core/Output.ts" />

namespace movedifferential {
    /**
     * A Move Differential controller.
     * 
     * Reference: As implemented in ev3dev2-python
     */
    //% fixedInstances
    export class Wheel {
        //% blockCombine
        public diameter_mm: Number;
        //% blockCombine
        public width_mm: Number;
        //% blockCombine
        public circumference_mm: Number;

        constructor(diameter: Number, width: Number) {
            this.diameter_mm = diameter;
            this.width_mm = width;
            // this.circumference_mm = this.diameter_mm.valueOf() * Math.PI;
        }
    }

    //% block="EV3-Tire"
    export const EV3Tire = new Wheel(43.2, 21);
  
    //% block="EV3-Education Tire"
    export const EV3EducationSetTire = new Wheel(56, 28);
    
    //% block="Small Motorcycle Tire"
    export const SmallMotorcycleTire = new Wheel(81.6, 13.6);

    //% fixedInstances
    export class MDController extends motors.SynchedMotorPair {

        private mdBaseSpeed: number;
        private mdRadius: number;
        private mdDistance: number;        
        private wheel: Wheel;
        private wheel_distance_mm: Number;
        private circumference_mm: Number;
        private min_circle_radius_mm: Number;
    
        constructor(ports: Output, wheelType: Wheel, wheelDistance: Number) {
            super(ports);
            // this.wheel = wheelType;
            // this.wheel_distance_mm = wheelDistance
    
            // //The circumference of the circle made if this robot were to rotate in place
            // this.circumference_mm = this.wheel_distance_mm.valueOf() * Math.PI;
    
            // this.min_circle_radius_mm = this.wheel_distance_mm.valueOf() / 2

        }

        // private onArc(speed: number, radius_mm: number, distance_mm: number, arc_right: Boolean = true) {
        //     let left_speed: number = 0;
        //     let right_speed: number = 0;

        //     if (radius_mm < this.min_circle_radius_mm) {
        //         return;
        //     }

        //     let circle_outer_mm = 2 * Math.PI * (radius_mm + (this.wheel_distance_mm.valueOf() / 2));
        //     let circle_middle_mm = 2 * Math.PI * radius_mm;
        //     let circle_inner_mm = 2 * Math.PI * (radius_mm - (this.wheel_distance_mm.valueOf() / 2));
            
        //     if (arc_right) {
        //         // The left wheel is making the larger circle and will move at 'speed'
        //         // The right wheel is making a smaller circle so its speed will be a fraction of the left motor's speed
        //         left_speed = speed;
        //         right_speed = (circle_inner_mm / circle_outer_mm) * left_speed;
        //     }
        //     else {
        //         // The right wheel is making the larger circle and will move at 'speed'
        //         // The left wheel is making a smaller circle so its speed will be a fraction of the right motor's speed
        //         right_speed = speed
        //         left_speed = (circle_inner_mm / circle_outer_mm) * right_speed;

        //     }

        //     // # We know we want the middle circle to be of length distance_mm so
        //     // # calculate the percentage of circle_middle_mm we must travel for the
        //     // # middle of the robot to travel distance_mm.
        //     let circle_middle_percentage = distance_mm / circle_middle_mm;

        //     // # Now multiple that percentage by circle_outer_mm to calculate how
        //     // # many mm the outer wheel should travel.
        //     let circle_outer_final_mm = circle_middle_percentage * circle_outer_mm;

        //     let outer_wheel_rotations = circle_outer_final_mm / this.wheel.circumference_mm.valueOf();
        //     let outer_wheel_degrees = outer_wheel_rotations * 360;

        //     // MoveTank.on_for_degrees(self, left_speed, right_speed, outer_wheel_degrees, brake, block)
        //     this.tank(right_speed, left_speed, outer_wheel_degrees, MoveUnit.Degrees);
        // }

        /**
         * calculate motor speed and rotations for move tank arcing to the right
         * @param speed speed to travel at
         * @param radius radius of circle
         * @param distance distance
         */
        //% blockId=mdArcRight block="Arc Right %md|at speed %speed for circle of radius %radius for distance %distance"
        //% group=Arc
        //% inlineInputMode=inline
        //% weight=99
        arcRight(speed: number, radius: number, distance: number) {
            // update variables
            //this.init();
            //this.onArc(speed, radius, distance, true);             
        }

        /**
         * calculate motor speed and rotations for move tank arcing to the left
         * @param speed speed to travel at
         * @param radius radius of circle
         * @param distance distance
         */
        //% blockId=mdArcLeft block="Arc Left %md|at speed %speed for circle of radius %radius for distance %distance"
        //% group=Arc
        //% inlineInputMode=inline
        //% weight=99
        arcLeft(speed: number, radius: number, distance: number) {
            // update variables
            //this.init();
            //this.onArc(speed, radius, distance, false);             
        }

    }

    //% whenUsed fixedInstance block="B-C"
    export const md1 = new MDController(Output.BC, SmallMotorcycleTire, 150);

    //% whenUsed fixedInstance block="A-D"
    export const md2 = new MDController(Output.AD, SmallMotorcycleTire, 150);

    //% whenUsed fixedInstance block="A-B"
    export const md3 = new MDController(Output.AB, SmallMotorcycleTire, 150);

    //% whenUsed fixedInstance block="C-D"
    export const md4 = new MDController(Output.AB, SmallMotorcycleTire, 150);

}