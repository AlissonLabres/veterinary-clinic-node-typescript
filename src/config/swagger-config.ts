import expressJSDocSwagger from "express-jsdoc-swagger";

export const SwaggerConfig = (application: any) => {
  expressJSDocSwagger(application)({
    info: {
      version: '1.0.0',
      title: 'Veterinary Clinical API',
      description: "Veterinary Clinical with Clean Architecture and SOLID principles",
      contact: {
        name: 'Swagger API JSON',
        url: 'http://localhost:3000/v3/api-docs'
      }
    },
    "servers": [
      {
        "url": "http://localhost:3000",
        "description": "Development server"
      }
    ],
    baseDir: __dirname,
    filesPattern: ['../application/controller/**/*.ts'],
    swaggerUIPath: '/swagger-ui',
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: '/v3/api-docs',
    notRequiredAsNullable: false
  });
}