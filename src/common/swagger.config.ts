import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, version } from '../../package.json';

export default (app: INestApplication): void => {
  const documentBuilder = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api-docs', app, document);
};
