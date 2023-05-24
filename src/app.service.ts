import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getVarsByRoute(id: string) {
    return this.httpService
      .get('https://api.xe-buyt.com/businfo/getvarsbyroute/' + id)
      .pipe(map((res) => res.data));
  }
  getPathsByVars(id: string, varId: string) {
    return this.httpService
      .get(`https://api.xe-buyt.com/businfo/getpathsbyvar/${id}/${varId}`)
      .pipe(map((res) => res.data));
  }
  getStopsByVars(id: string, varId: string) {
    return this.httpService
      .get(`https://api.xe-buyt.com/businfo/getstopsbyvar/${id}/${varId}`)
      .pipe(map((res) => res.data));
  }
}
