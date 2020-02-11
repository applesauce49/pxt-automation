namespace bar {
    /**
     * A Move controller.
     * 
     * Reference: Feedback System, Karl Johan Astrom & Rickard M. Murry
     */
    //% fixedInstances
    export class Move {
        /*
        ** radius of circle
        */
        //% blockCombine 
        public radius: number;
        /*
        ** Distance to move around the circle
        */
        //% blockCombine
        public distance: number;

        // assign this value to log internal data
        public log: (name: string, value: number) => void;

        private wheel_size: number;
        private wheel_distance: number;

        constructor() {
            this.radius = 100;
            this.distance = 50;
            this.wheel_size = 80;
            this.wheel_distance = 150;
        }

        /**
         * Sets the Move radius and distance
         * @param radius radius of circle
         * @param distance distance to travel
         */
        //% blockId=moveSetDefaults block="set %move|defaults radius %radius|distance %distance"
        //% group=Move
        //% inlineInputMode=inline
        //% weight=99
        setDefaults(radius: number, distance: number = 50) {
            this.radius = radius;
            this.distance = distance;
        }
    }
}