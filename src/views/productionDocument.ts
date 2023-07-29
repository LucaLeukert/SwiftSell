const hbs = `
<!doctype html>
<html lang="en" class="w-full bg-white">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="/tailwind.css" rel="stylesheet">
    <title>Hello, world!</title>
    <base target="_parent">
  </head>
  <body>
  
  <div class="w-full lg:p-20 md:p-10 sm:p-5 flex flex-col m-0">
    {{{content}}}
  </div>
  
  </body>
</html>
`;

const productionDocument = {
    hbs,
    name: "Default Preview (Bootstrap 4.5)",
};

export default productionDocument;
