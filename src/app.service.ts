import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { PrismaService } from './prisma/prisma.service';
import { GetVarsQuery } from './dto/get-vars.query';
import { start } from 'repl';
@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  async pathfindingByPos(start: string, end: string) {
    return this.httpService
      .get(
        `https://cdn.buytbuyt.com/cms/pathfinding/getpathbystop/${start}/${end}/2`,
      )
      .pipe(map((res) => res.data));
  }
  async getVars(query: GetVarsQuery) {
    return await this.prismaService.bus.findMany({
      where: {
        ...(query.search && {
          OR: [
            {
              name: {
                search: query.search,
              },
            },
            {
              no: {
                search: query.search,
              },
            },
          ],
        }),
      },
      orderBy: {
        ...(query.search
          ? {
              _relevance: {
                fields: ['no', 'name'],
                search: query.search,
                sort: 'desc',
              },
            }
          : {
              no: 'asc',
            }),
      },
    });
  }
  pathfinding(startStop: string, endStop: string) {
    return this.httpService
      .get(
        `https://cdn.buytbuyt.com/cms/pathfinding/getpathbystop/${startStop}/${endStop}/2`,
      )
      .pipe(map((res) => res.data));
  }
  getStopsForAutocomplete() {
    return this.httpService
      .get('https://cdn.buytbuyt.com/cms/businfo/getstopsforautocomplete')
      .pipe(map((res) => res.data));
  }
  getStopsInBound(tla: string, tlo: string, bla: string, blo: string) {
    return this.httpService
      .get(
        `https://cdn.buytbuyt.com/cms/businfo/getstopsinbounds/${tla}/${tlo}/${bla}/${blo}`,
      )
      .pipe(map((res) => res.data));
  }
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
