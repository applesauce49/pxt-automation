/// <reference path="./node_modules/pxt-ev3/libs/core/Output.ts" />

enum EV3Wheels {
    //% block="EV3-Tire"
    A = 0x01,
    //% block="EV3-Education Tire"
    B = 0x02,
    //% block="Small Motorcycle Tire"
    C = 0x04,
}


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
            this.circumference_mm = this.diameter_mm.valueOf() * Math.PI;
        }
    }

//    export const EV3Rim = new Wheel(30, 20);
//    export const EV3EducationSetRim = new Wheel(43, 26);
//    export const SmallMotorcycleRim = new Wheel(61.6, 15);

    //% whenUsed fixedInstance block="EV3-Tire"
    export const EV3Tire = new Wheel(43.2, 21);
  
    //% whenUsed fixedInstance block="EV3-Education Tire"
    export const EV3EducationSetTire = new Wheel(56, 28);
    
    //% whenUsed fixedInstance block="Small Motorcycle Tire"
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
            this.wheel = wheelType;
            this.wheel_distance_mm = wheelDistance
    
            //The circumference of the circle made if this robot were to rotate in place
            this.circumference_mm = this.wheel_distance_mm.valueOf() * Math.PI;
    
            this.min_circle_radius_mm = this.wheel_distance_mm.valueOf() / 2

        }

        // def _on_arc(self, speed, radius_mm, distance_mm, brake, block, arc_right):
        // """
        // Drive in a circle with 'radius' for 'distance'
        // """

        // if radius_mm < self.min_circle_radius_mm:
        //     raise ValueError("{}: radius_mm {} is less than min_circle_radius_mm {}".format(
        //         self, radius_mm, self.min_circle_radius_mm))

        // # The circle formed at the halfway point between the two wheels is the
        // # circle that must have a radius of radius_mm
        // circle_outer_mm = 2 * math.pi * (radius_mm + (self.wheel_distance_mm / 2))
        // circle_middle_mm = 2 * math.pi * radius_mm
        // circle_inner_mm = 2 * math.pi * (radius_mm - (self.wheel_distance_mm / 2))

        // if arc_right:
        //     # The left wheel is making the larger circle and will move at 'speed'
        //     # The right wheel is making a smaller circle so its speed will be a fraction of the left motor's speed
        //     left_speed = speed
        //     right_speed = float(circle_inner_mm / circle_outer_mm) * left_speed

        // else:
        //     # The right wheel is making the larger circle and will move at 'speed'
        //     # The left wheel is making a smaller circle so its speed will be a fraction of the right motor's speed
        //     right_speed = speed
        //     left_speed = float(circle_inner_mm / circle_outer_mm) * right_speed

        // log.debug(
        //     "%s: arc %s, radius %s, distance %s, left-speed %s, right-speed %s, circle_outer_mm %s, circle_middle_mm %s, circle_inner_mm %s"
        //     % (self, "right" if arc_right else "left", radius_mm, distance_mm, left_speed, right_speed, circle_outer_mm,
        //        circle_middle_mm, circle_inner_mm))

        // # We know we want the middle circle to be of length distance_mm so
        // # calculate the percentage of circle_middle_mm we must travel for the
        // # middle of the robot to travel distance_mm.
        // circle_middle_percentage = float(distance_mm / circle_middle_mm)

        // # Now multiple that percentage by circle_outer_mm to calculate how
        // # many mm the outer wheel should travel.
        // circle_outer_final_mm = circle_middle_percentage * circle_outer_mm

        // outer_wheel_rotations = float(circle_outer_final_mm / self.wheel.circumference_mm)
        // outer_wheel_degrees = outer_wheel_rotations * 360

        // log.debug(
        //     "%s: arc %s, circle_middle_percentage %s, circle_outer_final_mm %s, outer_wheel_rotations %s, outer_wheel_degrees %s"
        //     % (self, "right" if arc_right else "left", circle_middle_percentage, circle_outer_final_mm,
        //        outer_wheel_rotations, outer_wheel_degrees))

        // MoveTank.on_for_degrees(self, left_speed, right_speed, outer_wheel_degrees, brake, block)



        /**
         * calculate motor speed and rotations for move tank arcing to the right
         * @param speed speed to travel at
         * @param radius radius of circle
         * @param distance distance
         */
        //% blockId=mdArcRight block="set %md|speed %speed for circle of radius %radius for distance %distance"
        //% group=Arc
        //% inlineInputMode=inline
        //% weight=99
        arcRight(speed: number, radius: number, distance: number) {
            // update variables
            this.mdBaseSpeed = speed;
            this.mdRadius = radius;
            this.mdDistance = distance;

             
        }

        /**
         * calculate motor speed and rotations for move tank arcing to the left
         * @param speed speed to travel at
         * @param radius radius of circle
         * @param distance distance
         */
        //% blockId=mdArcLeft block="set %md|speed %speed for circle of radius %radius for distance %distance"
        //% group=Arc
        //% inlineInputMode=inline
        //% weight=99
        arcLeft(speed: number, radius: number, distance: number) {
            // update variables
            this.mdBaseSpeed = speed;
            this.mdRadius = radius;
            this.mdDistance = distance;
        }

    }

    //% whenUsed fixedInstance block="B+C" jres=icons.portBC
    export const largeBC = new MDController(Output.BC);

    //% whenUsed fixedInstance block="A+D" jres=icons.portAD
    export const largeAD = new MDController(Output.AD);

    //% whenUsed fixedInstance block="A+B" jres=icons.portAB
    export const largeAB = new MDController(Output.AB);

    //% whenUsed fixedInstance block="C+D" jres=icons.portCD
    export const largeCD = new MDController(Output.CD);
}