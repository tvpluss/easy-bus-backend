import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/vars/:id')
  getVarsByRoute(@Param('id') id: string) {
    return this.appService.getVarsByRoute(id);
  }

  @Get('/paths/:id/:varId')
  getPathsByVar(@Param('id') id: string, @Param('varId') varId: string) {
    return this.appService.getPathsByVars(id, varId);
  }
  @Get('/stops/:id/:varId')
  getStopsByVar(@Param('id') id: string, @Param('varId') varId: string) {
    return this.appService.getStopsByVars(id, varId);
  }
}
