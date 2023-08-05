export const blocks = {
    control: [
        {
          id:0,
          action:'Wait',
  count:3,
            title: 'Wait 3 second'
        }
    ],
    events: [
        {
          id:0,
          action:'Key',
          key:'space',
          title: 'When "Space" key press',
        }
    ],
    looks: [
        {
          id:0,
          action:"Say",
          word:"Hello",
          duration:2,
          title: 'Say Hello for 2 seconds'
        }
    ],
    motion: [
        {
          id:0,
          action:'Move',
          count:20,
          title: 'Move 20 steps'
        },
        {
          id:1,
          action:'Turn',
          count:90,
          diretion:'undo',
            title: 'Turn clockwise 90 degrees',
        },
    ]
  };
  