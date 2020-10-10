export default ({ markup, js, styles }) => `
<!doctype html>
<html lang="es">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Meli challenge</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${js.getLinkTags()}
      <style>${[...styles].join('')}</style>
  </head>
  <body>
    <div id="root">${markup}</div>
    ${js.getScriptTags()}
  </body>
</html>
`;
