const url = require("url");

// let requestNumber = 1;

// let idCounter = 1;

// class Book {
//   constructor(title, author, printYear, price, genres) {
//     this.id = idCounter++;
//     this.title = title;
//     this.author = author;
//     this.year = printYear;
//     this.price = price;
//     this.genres = genres;
//   }

//   static validateGenre(genre) {
//     const validGenres = [
//       "SCI_FI",
//       "NOVEL",
//       "HISTORY",
//       "MANGA",
//       "ROMANCE",
//       "PROFESSIONAL",
//     ];
//     return validGenres.includes(genre);
//   }

//   static validateGenres(genres) {
//     return genres.every(Book.validateGenre);
//   }

//   static createBook(title, author, printYear, price, genres) {
//     if (typeof title !== "string" || typeof author !== "string") {
//       throw new Error("Title and author must be strings.");
//     }
//     if (!Number.isInteger(printYear) || printYear.toString().length !== 4) {
//       throw new Error("Print year must be a 4-digit integer.");
//     }
//     if (!Number.isInteger(price) || price <= 0) {
//       throw new Error("Price must be a positive integer.");
//     }
//     if (!Array.isArray(genres) || !Book.validateGenres(genres)) {
//       throw new Error(
//         "Genres must be an array containing valid genre strings."
//       );
//     }

//     return new Book(title, author, printYear, price, genres);
//   }
// }

// app.use(express.json());
// app.use((req, res, next) => {
//   const currentRequestNumber = requestNumber;
//   const parsedUrl = url.parse(req.originalUrl);
//   const resource = parsedUrl.pathname; // This strips the query parameters
//   const httpVerb = req.method;

//   // Add the request number to the log context
//   requestLogger.addContext("requestNumber", currentRequestNumber);
//   booksLogger.addContext("requestNumber", requestNumber);

//   // Log the incoming request
//   requestLogger.info(
//     `Incoming request | #${currentRequestNumber} | resource: ${resource} | HTTP Verb ${httpVerb}`
//   );

//   const start = Date.now();

//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     requestLogger.debug(
//       `request #${currentRequestNumber} duration: ${duration}ms`
//     );
//   });
//   requestNumber++;

//   next();
// });

// let books = [];
// app.get("/books/health", (req, res) => {
//   res.status(200).send("OK");
// });

// app.post("/book", (req, res) => {
//   const { title, author, year, price, genres } = req.body;

//   // Check if a book with the same title already exists
//   const existingBook = books.find(
//     (book) => book.title.toLowerCase() === title.toLowerCase()
//   );
//   if (existingBook) {
//     booksLogger.error(
//       `Error: Book with the title [${title}] already exists in the system`
//     );
//     return res.status(409).json({
//       errorMessage: `Error: Book with the title [${title}] already exists in the system`,
//     });
//   }

//   // Validate the year
//   if (year < 1940 || year > 2100) {
//     booksLogger.error(
//       `Error: Can’t create new Book that its year [${year}] is not in the accepted range [1940 -> 2100]`
//     );
//     return res.status(409).json({
//       errorMessage: `Error: Can’t create new Book that its year [${year}] is not in the accepted range [1940 -> 2100]”`,
//     });
//   }

//   // Validate the price
//   if (price <= 0) {
//     booksLogger.error(`Error: Can’t create new Book with negative price`);
//     return res.status(409).json({
//       errorMessage: `Error: Can’t create new Book with negative price`,
//     });
//   }

//   // Create a new book
//   try {
//     const newBook = Book.createBook(title, author, year, price, genres);
//     books.push(newBook);
//     booksLogger.info(`Creating new Book with Title [${title}]`);
//     booksLogger.debug(
//       `Currently there are ${
//         books.length - 1
//       } Books in the system. New Book will be assigned with id ${newBook.id}`
//     );
//     res.status(200).send({ result: newBook.id });
//   } catch (error) {
//     booksLogger.error(error.message);
//     res.status(409).json({ errorMessage: error.message });
//   }
// });

// app.get("/books/total", (req, res) => {
//   const {
//     author,
//     "price-bigger-than": priceBiggerThan,
//     "price-less-than": priceLessThan,
//     "year-bigger-than": yearBiggerThan,
//     "year-less-than": yearLessThan,
//     genres,
//   } = req.query;

//   // Validate genres
//   if (genres) {
//     const genreArray = genres.split(",");
//     for (let genre of genreArray) {
//       if (!Book.validateGenre(genre)) {
//         return res
//           .status(400)
//           .json({ errorMessage: `Error: Invalid genre ${genre}` });
//       }
//     }
//   }

//   // Apply filters
//   let filteredBooks = books;

//   if (author) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.author.toLowerCase() === author.toLowerCase()
//     );
//   }
//   if (priceBiggerThan) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.price >= Number(priceBiggerThan)
//     );
//   }
//   if (priceLessThan) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.price <= Number(priceLessThan)
//     );
//   }
//   if (yearBiggerThan) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.year >= Number(yearBiggerThan)
//     );
//   }
//   if (yearLessThan) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.year <= Number(yearLessThan)
//     );
//   }
//   if (genres) {
//     const genreArray = genres.split(",");
//     filteredBooks = filteredBooks.filter((book) =>
//       genreArray.some((genre) => book.genres.includes(genre))
//     );
//   }

//   booksLogger.info(
//     `Total Books found for requested filters is ${filteredBooks.length}`
//   );
//   res.status(200).json({ result: filteredBooks.length });
// });

// app.get("/books", (req, res) => {
//   const {
//     author,
//     "price-bigger-than": priceBiggerThan,
//     "price-less-than": priceLessThan,
//     "year-bigger-than": yearBiggerThan,
//     "year-less-than": yearLessThan,
//     genres,
//   } = req.query;

//   // Validate genres
//   if (genres) {
//     const genreArray = genres.split(",");
//     if (!genreArray.every((genre) => Book.validateGenre(genre))) {
//       return res
//         .status(400)
//         .json({ errorMessage: `Error: Invalid genre ${genre}` });
//     }
//   }

//   // Apply filters
//   let filteredBooks = books;

//   if (author) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.author.toLowerCase() === author.toLowerCase()
//     );
//   }
//   if (priceBiggerThan) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.price >= Number(priceBiggerThan)
//     );
//   }
//   if (priceLessThan) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.price <= Number(priceLessThan)
//     );
//   }
//   if (yearBiggerThan) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.year >= Number(yearBiggerThan)
//     );
//   }
//   if (yearLessThan) {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.year <= Number(yearLessThan)
//     );
//   }
//   if (genres) {
//     const genreArray = genres.split(",");
//     filteredBooks = filteredBooks.filter((book) =>
//       genreArray.some((genre) => book.genres.includes(genre))
//     );
//   }

//   // Sort the filtered books by title
//   filteredBooks.sort((a, b) =>
//     a.title.localeCompare(b.title, "en", { sensitivity: "base" })
//   );

//   booksLogger.info(
//     `Total Books found for requested filters is ${filteredBooks.length}`
//   );
//   res.status(200).json({ result: filteredBooks });
// });

// app.get("/book", (req, res) => {
//   const { id } = req.query;

//   // Find the book with the given id
//   const book = books.find((book) => book.id === Number(id));

//   // If the book is not found, return 404
//   if (!book) {
//     booksLogger.error(`Error: no such Book with id ${id}`);
//     return res.status(404).json({
//       errorMessage: `Error: no such Book with id ${id}`,
//     });
//   }
//   booksLogger.debug(`Fetching book id ${id} details`);
//   // If the book is found, return it
//   res.status(200).json({ result: book });
// });

// // Update Book's price
// app.put("/book", (req, res) => {
//   const { id, price } = req.query;
//   if (!id || !price)
//     res.status(400).json({
//       errorMessage: `Error: price and id must be sent`,
//     });
//   // Find the book with the given id
//   const bookIndex = books.findIndex((book) => book.id === Number(id));

//   // If the book is not found, return 404
//   if (bookIndex === -1) {
//     booksLogger.error(`Error: no such Book with id ${id}`);

//     return res.status(404).json({
//       errorMessage: `Error: no such Book with id ${id}`,
//     });
//   }

//   // Validate the new price
//   if (price <= 0) {
//     booksLogger.error(
//       `Error: price update for book [${id}] must be positive integer`
//     );

//     return res.status(409).json({
//       errorMessage: `Error: price update for book [${id}] must be positive integer`,
//     });
//   }
//   const oldPrice = books[bookIndex].price;

//   booksLogger.info(`Update Book id [${books[bookIndex].id}] price to ${price}`);
//   booksLogger.debug(
//     `Book [${books[bookIndex].title}] price change: ${oldPrice} --> ${price}`
//   );
//   // Update the book's price
//   books[bookIndex].price = Number(price);

//   res.status(200).json({ result: oldPrice });
// });

// app.delete("/book", (req, res) => {
//   const { id } = req.query;
//   if (!id)
//     res.status(400).json({
//       errorMessage: `Error: book id must be sent`,
//     });

//   // Find the book with the given id
//   const bookIndex = books.findIndex((book) => book.id === Number(id));

//   // If the book is not found, return 404
//   if (bookIndex === -1) {
//     booksLogger.error(`Error: no such Book with id ${id}`);
//     return res.status(404).json({
//       errorMessage: `Error: no such Book with id ${id}`,
//     });
//   }
//   booksLogger.info(`Removing book [${books[bookIndex].title}]`);
//   booksLogger.debug(
//     `After removing book [${books[bookIndex].title}] id: [${
//       books[bookIndex].id
//     }] there are ${books.length - 1} books in the system`
//   );

//   // Delete the book
//   books.splice(bookIndex, 1);

//   res.status(200).json({ result: books.length });
// });

// app.get("/logs/level", (req, res) => {
//   const loggerName = req.query["logger-name"];
//   if (!loggerName) {
//     return res.status(400).send("Failure: Missing logger-name query parameter");
//   }

//   const logger = log4js.getLogger(loggerName);
//   if (!logger) {
//     booksLogger.error(`Failure: Logger ${loggerName} not found`);
//     return res.status(404).send(`Failure: Logger ${loggerName} not found`);
//   }

//   const level = logger.level.levelStr;
//   res.send(level.toUpperCase());
// });

// app.put("/logs/level", (req, res) => {
//   const loggerName = req.query["logger-name"];
//   const loggerLevel = req.query["logger-level"];

//   if (!loggerName || !loggerLevel) {
//     return res
//       .status(400)
//       .send("Failure: Missing logger-name or logger-level query parameter");
//   }

//   const logger = log4js.getLogger(loggerName);
//   if (!logger) {
//     booksLogger.error(`Failure: Logger ${loggerName} not found`);
//     return res.status(404).send(`Failure: Logger ${loggerName} not found`);
//   }

//   logger.level = loggerLevel.toUpperCase();
//   res.send(loggerLevel.toUpperCase());
// });
const express = require("express");
const app = express();
const port = 7002;

app.get("/generate-url", (req, res) => {
  const queryParams = {
    version: 2,
    userId: "64ad4c0dcc1a482bac465443",
    userName: "Lidor1",
    email: "lidor@appcharge.com",
    company: "Appcharge - Internal",
    projects: [
      {
        publisherId: "64ad4c0dcc1a482bac465441",
        role: "Super Administrator",
        publisherName: "lidor-store",
        publisherLogo:
          "https://media-dev.appcharge.com/media/64ad4c0dcc1a482bac465441/1717944017011__3826cbaf-294a-43bc-b0d8-6ee533011eb0",
        permissions: [
          "company:updateDetails",
          "company:view",
          "users:manage",
          "integration:manage",
          "authentication:manage",
          "orders:refund",
          "orders:view",
          "evidence:submit",
          "evidence:view",
          "financial_report:generate",
          "financial_report:view",
          "payouts:view",
          "analytics:view",
          "builder:manage",
          "pricing:manage",
          "asset_library:manage",
          "offers:manage",
          "offers:view",
          "offer_design:manage",
          "offer_design:view",
          "bundles:manage",
          "bundles:view",
          "promotions:manage",
          "promotions:view",
          "popups:manage",
          "popups:view",
          "products:manage",
          "products:view",
          "badges:manage",
          "badges:view",
          "financial:update",
          "financial:view",
          "publisher-settings:view",
          "segments:view",
          "publisher-settings:manage",
          "superadmin",
        ],
        projectType: "webStore",
      },
    ],
  };

  // Convert queryParams object to a query string
  const queryString = Buffer.from(JSON.stringify(queryParams)).toString(
    "base64"
  );
  const url = `https://dashboard-dev.appcharge.com?data=${queryString}`;
  console.log(url.length);
  // Set the cookie
  res.cookie(
    "connect.sid",
    "s%3AP_WQYL8jpeWST8Bl7fs1dEBDOFZ1bd5P.NKhfy9128LsFk2JoKZmKWEzKvPbd4X5Dc1MDrMMKcyg",
    {
      httpOnly: true,
      secure: true,
    }
  );

  res.send(url);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
