import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Report } from './reports.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/createReport.dto';
import { User } from '../users/users.entity';
import { GetEstimateDto } from './dtos/getEstimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report: Report = this.reportsRepository.create(reportDto);
    report.user = user;
    return this.reportsRepository.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportsRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.reportsRepository.save(report);
  }
  async createEstimate({
    make,
    model,
    lng,
    lat,
    year,
    mileage,
  }: GetEstimateDto) {
    return await this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('ABS(lng - :lng) <= 5', { lng }) // 위도 차이 절대값 5 이하
      .andWhere('ABS(lat - :lat) <= 5', { lat }) // 경도 차이 절대값 5 이하
      .andWhere('ABS(year - :year) <= 3', { year }) // 년도 차이 절대값 3 이하
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
