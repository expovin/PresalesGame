module.exports = {
  barchart : {
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
  },
    scatterplot : {
      scales: {
        s: {
          data: {
            field: 'Sales'
          },
          invert: true,
          expand: 0.1
        },
        m: {
          data: {
            field: 'Margin'
          },
          expand: 0.1
        },
        col: {
          data: { extract: { field: 'Year' } },
          type: 'color'
        }
      },
      components: [{
        type: 'legend-cat',
        scale: 'col',
        dock: 'top',
        brush: {
          trigger: [{
            contexts: ['highlight'],
            on: 'tap',
            action: 'toggle'
          }],
          consume: [{
            context: 'highlight',
            style: {
              inactive: {
                opacity: 0.4
              }
            }
          }]
        }
      }, {
        type: 'axis',
        scale: 's',
        dock: 'left'
      }, {
        type: 'axis',
        scale: 'm',
        dock: 'bottom'
      }, {
        type: 'point',
        data: {
          extract: {
            field: 'Month',
            props: {
              y: { field: 'Sales' },
              mar: { field: 'Margin' },
              fill: { field: 'Year' }
            }
          }
        },
        settings: {
          x: { scale: 'm', ref: 'mar' },
          y: { scale: 's' },
          size: () => Math.random(),
          opacity: 0.8,
          fill: { scale: 'col' }
        },
        brush: {
          trigger: [{
            contexts: ['highlight'],
            on: 'tap',
            action: 'toggle',
            data: ['fill']
          }],
          consume: [{
            context: 'highlight',
            style: {
              inactive: {
                opacity: 0.4
              }
            }
          }]
        }
      }]

    }

}