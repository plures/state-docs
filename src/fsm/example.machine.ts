/**
 * Example state machine for testing
 */
export const trafficLightMachine = {
  id: 'trafficLight',
  initial: 'red',
  states: {
    red: {
      description: 'Stop - vehicles must wait',
      on: {
        TIMER: {
          target: 'green',
          description: 'Light changes to green'
        }
      }
    },
    yellow: {
      description: 'Caution - prepare to stop',
      on: {
        TIMER: {
          target: 'red',
          description: 'Light changes to red'
        }
      }
    },
    green: {
      description: 'Go - vehicles may proceed',
      on: {
        TIMER: {
          target: 'yellow',
          description: 'Light changes to yellow'
        }
      }
    }
  }
};
