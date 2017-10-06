/* Students: Using the tools and techniques you learned so far,
 * you will scrape a website of your choice, then place the data
 * in a MongoDB database. Be sure to make the database and collection
 * before running this exercise.

 * Consult the assignment files from earlier in class
 * if you need a refresher on Cheerio. */

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

app.use(express.static("public"));
// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapeData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});


app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapeData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)

// Route 2
// =======
app.get("/scrape", function(req, res) {
  request("https://www.mountainproject.com/u/michael-anderson24//109155979?action=ticks&", function(error, response, html) {
    var $ = cheerio.load(html);
    $(".objectList tr:not(:has(.objectListColumnHeader))").each(function(i, element) {
     var name = $(element).find('td:nth-of-type(1)').text().trim();
     var rating = $(element).find('td:nth-of-type(2) span.rateYDS').text().trim();
     var location = $(element).find('td:nth-of-type(3)').text().trim();
     var comments = $(element).find('td:nth-of-type(4)').text().trim();
     var tickDate = $(element).find('td:nth-of-type(5)').text().trim();

  // Insert the name in the scrapedname db
  if (name && location) {
  db.scrapeData.insert({
    name: name,
    rating: rating,
    location: location,
    comments: comments,
    tickDate: tickDate
    // url: link
  },
  function(err, inserted) {
    if (err) {
      // Log the error if one is encountered during the query
      console.log(err);
    }
    else {
      // Otherwise, log the inserted data
      console.log(inserted);
    }
  });
}
   })
   });
  res.send("Scrape Complete");
  });

  app.get("/name", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything,
    // but this time, sort it by name (1 means ascending order)
    db.scrapeData.find().sort({ name: 1 }, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });

  app.get("/rating", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything,
    // but this time, sort it by name (1 means ascending order)
    db.scrapeData.find().sort({ rating: 1 }, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });

  app.get("/loc", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything,
    // but this time, sort it by name (1 means ascending order)
    db.scrapeData.find().sort({ location: 1 }, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });

  app.get("/date", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything,
    // but this time, sort it by name (1 means ascending order)
    db.scrapeData.find().sort({ tickDate: 1 }, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });
// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
})
