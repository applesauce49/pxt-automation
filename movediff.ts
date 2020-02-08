
namespace movedifferential {
    /**
     * A Move Differential controller.
     * 
     * Reference: As implemented in ev3dev2-python
     */
    //% fixedInstances
    export class MDController extends motors.SynchedMotorPair {

        //% blockCombine 
        private mdBaseSpeed: number;

        //% blockCombine
        private mdRadius: number;
        
        //% blockCombine
        private mdDistance: number;

        constructor(ports: Output) {
            super(ports);
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