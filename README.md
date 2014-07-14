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




### Installation

1. Copy the `gravity-point.css` into the `<head>` section of your HTML. [Download the CSS.](assets/gravity-point.css)
2. Copy the `jquery.gravity-point.js` into the bottom of your `<body>` element after the jQuery initialization. [Download the JS.](assets/jquery.gravity-point.js)
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



### Usage

The most important is to set up properly the JSON variable with the elements which will count in gravity calculations.

The syntax is very easy:

* `id` - is either a HTML element (h1, div, article) or a HTML element with id (#header) or a class ('.intro')
* `type` - is either "text" or "image". If you have a video embedded use "image".
* `collection` - if this element stays for a collection of elements or not. It can have any value like "true".


#### Example

Collect the `<h1>` element as text, the `#logo` as image, and all `<img>` elements as images.

```
<script>
  var gravityPointElements = '[{"id" : "h1", "type" : "text"},{"id" : "#logo", "type" : "image"},{"id" : "img", "type" : "image", "collection" : "true"}]';
</script>
```



### Customisation

You can change the color of the guides, the rectangle and the gravity point, manually, in the `gravity-point.css` file.


### License

MIT License