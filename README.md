## Gravity Point

Find the centre of gravity of a webpage.

![The Gravity Point](example.png "The Gravity Point")

### Description

Every element of a webpage (text, image/video) can have a weight given by the area and the tone of the element.

Using [weighted aritmetic mean](http://en.wikipedia.org/wiki/Weighted_arithmetic_mean) calculations we can find the centre of gravity of every webpage.

### Why?

When watching a picture, a magazine, a website our brains are looking automagically to find equilibrum. If balance found we feel satisfaction.

A page is in *perfect equilibrum* if it's centre, and, the weighted average point of all elements on the page (gravity point) are the same.

If the gravity point is inside a golden ratio rectangle around the page centre we can say the page is in *good equilibrum*.


### Who is it for?

This aims to be a tool for web designers and developers to help them organize the elements of a webpage into harmony.

Remember, beauty is oneness and diversity in harmony.


### Instalation

1. Copy the `gravity-point.css` into the `<head>` section of your HTML. [Download the CSS.](assets/gravity-point.css)
2. Copy the `jquery.gravity-point.js` into the bottom of your `<body>` element after the jQuery initialization. [Download the JS](assets/jquery.gravity-point.js)
3. Add the elements of the page which will count for the gravity point calculations into a JSON variable

#### Example

```
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ....

      <link href="assets/gravity-point.css" media="screen, projection" rel="stylesheet" type="text/css" />

      ....
    </head>

    <body>
      ....


      <!-- All the elements of the page for the Gravity Point script -->
      <script>
        var gravityPointElements = '[{"id" : "h1", "type" : "text"}]';
      </script>


      <!-- jQuery from CDN -->
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

      <!-- The Gravity Point script -->
      <script type="text/javascript" src="assets/jquery.gravity-point.js"></script>
    </body>
  </html>
```


### License

MIT License