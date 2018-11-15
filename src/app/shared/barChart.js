module.exports = {
        scales: {
          y: {
            data: { field: 'score' },
            invert: true,
            include: [0]
          },
          c: {
            data: { field: 'score' },
            type: 'color'
          },
          t: { data: { extract: { field: 'name' } }, padding: 0.3 }
        },

        components: [{
          type: 'axis',
          dock: 'left',
          scale: 'y'
        },{
          type: 'axis',
          dock: 'bottom',
          scale: 't'
        },{
          key: 'bars',
          type: 'box',
          data: {
            extract: {
              field: 'name',
              props: {
                start: 0,
                end: { field: 'score' }
              }
            }
          },
          settings: {
            major: { scale: 't' },
            minor: { scale: 'y' },
            box: {
              fill: { scale: 'c', ref: 'end' }
            }
          }
        }]
}