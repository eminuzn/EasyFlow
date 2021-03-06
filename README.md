# EasyFlow
 My project to draw flowchart in web environment

 ## Demo 
 [EasyFlow Demo Link](https://easyflowjs.netlify.app/)

 <img src="https://raw.githubusercontent.com/eminuzn/EasyFlow/main/assets/images/1.gif" width="500px" style="margin:10px auto;">

 <img src="https://raw.githubusercontent.com/eminuzn/EasyFlow/main/assets/images/2.gif" width="500px" style="margin:10px auto;">

# Usage

+ Include necessary javascript library files

  ```html
  <script src="assets/js/libraries/jquery-3.5.1.min.js"></script>
  <script src="assets/js/libraries/jquery-ui.min.js"></script>
  <script src="assets/js/libraries/pablo.js"></script>
  <script src="assets/js/libraries/infiniteDrag.js"></script>
  ```
+ Include easy-flow js and css file from dist folder to your project
  ```html
  <script src="./easy-flow.min.js"></script>
  ```
+ Then you can use it as follows
  ```html
  <script>
    let flow = new EasyFlow({
      el: "#example-box"
    })
  </script>

  ```

+ With Data
```html
<script>
  let flow = new EasyFlow({
    el: "#example-box",
    processes: [
      {
        id: "0d7c0925-dbe1-465a-adab-837612ce3c31",
        type: 'question',
        question: 'example question',
        text: 'example text',
        posX: 500,
        posY: 50
      },
      {
        id: "ae22e0c6-1b3f-4f05-87eb-28ff6936bf8c",
        type: 'text',
        question: '',
        text: 'example text 2',
        posX: 300,
        posY: 300
      }
    ],
    links: [
      {
        id: "9efb33a9-d1eb-4d37-8637-1faf98fd52e0",
        text: 'example text 1',
        from: "0d7c0925-dbe1-465a-adab-837612ce3c31",
        to: "ae22e0c6-1b3f-4f05-87eb-28ff6936bf8c"
      }
    ]
  })
</script>
```

## Events
  ```html
  <script>
    let flow = new EasyFlow({
      el: "#example-box",
      onProcessAdded: (process) => {
        //Insert DB or Do something
        console.log("Added process:", process)
      },
      onProcessDragged: (process, links) => {
        //Update DB positions or Do something
        console.log("Dragged process and affected links:", process, links)
      },
      onProcessDeleted: (process, links) => {
        //Update DB positions or Do something
        console.log("Deleted Process and links:", process, links)
      },
      onLinkAdded: (link) => {
        //Insert DB or Do something
        console.log("Added link:", link)
      },
      onLinkUpdated: (link) => {
        //Update DB or Do something
        console.log("Updated link:", link)
      },
      onLinkDeleted: (link) => {
        //Delete DB or Do something
        console.log("Deleted link:", link)
      },
      onProcessUpdated: (process) => {
        //Update DB or Do something
        console.log("Updated Process:", process)
      }
    })
  </script>
  ```

## Dependencies
  + [Jquery 3.5.1](https://jquery.com/download/)
  + [Jqueryui 1.12.1](https://jqueryui.com/download/all/)
  + [PabloJs for svg](http://pablojs.com/)
  + [Jquery Infinite Drag](https://ianli.github.io/jquery-infinite-drag/)

## License
[MIT](https://choosealicense.com/licenses/mit/)