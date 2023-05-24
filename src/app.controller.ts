import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetVarsQuery } from './dto/get-vars.query';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/vars')
  @UsePipes(new ValidationPipe({ transform: true }))
  getVars(@Query() query: GetVarsQuery) {
    return this.appService.getVars(query);
  }
  @Get('/vars/:id')
  getVarsByRoute(@Param('id') id: string) {
    return this.appService.getVarsByRoute(id);
  }

  @Get('/paths/:varId/:routeVarId')
  getPathsByVar(
    @Param('varId') id: string,
    @Param('routeVarId') varId: string,
  ) {
    return this.appService.getPathsByVars(id, varId);
  }
  @Get('/stops/:varId/:routeVarId')
  getStopsByVar(
    @Param('varId') id: string,
    @Param('routeVarId') varId: string,
  ) {
    return this.appService.getStopsByVars(id, varId);
  }
}
