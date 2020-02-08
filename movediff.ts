
namespace movedifferential {
    /**
     * A Move Differential controller.
     * 
     * Reference: As implemented in ev3dev2-python
     */
    //% fixedInstances
    export class MDController {

        //% blockCombine 
        public mdBaseSpeed: number;

        //% blockCombine
        public mdRadius: number;
        
        //% blockCombine
        public mdDistance: number;

        constructor() {
            this.mdBaseSpeed = 25;
            this.mdRadius = 15;
            this.mdDistance = 10;
        }

        /**
         * calculate motor speed and rotations for move tank arcing to the right
         * @param speed speed to travel at
         * @param radius radius of circle
         * @param distance distance
         */
        //% blockId=mdArcRight block="set %speed for circle of radius %radius for distance %distance"
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
        //% blockId=mdArcLeft block="set %speed for circle of radius %radius for distance %distance"
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

    //% fixedInstance
    export const md1 = new MDController();

    //% fixedInstance
    export const md2 = new MDController();
}