import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { PrismaService } from './prisma/prisma.service';
import { GetVarsQuery } from './dto/get-vars.query';
@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  async getVars(query: GetVarsQuery) {
    return await this.prismaService.bus.findMany({
      where: {
        name: {
          search: query.search,
        },
      },
      orderBy: {
        _relevance: {
          fields: ['name'],
          search: query.search,
          sort: 'desc',
        },
      },
    });
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
